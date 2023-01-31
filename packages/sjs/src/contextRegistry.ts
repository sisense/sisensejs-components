/**
 * This allows Sisense elements to communicate with each other without
 * exposing public methods on the elements themselves
 */
import { wait } from './utils/utils';

function createInternalRegistry() {
  const providers = new Map<Element, ContextProvider>([]);

  const register = (contextProvider: ContextProvider) => {
    providers.set(contextProvider.el, contextProvider);
  };

  const unregister = (contextProvider: ContextProvider) => {
    providers.delete(contextProvider.el);
  };

  const withNearestContext = async (
    contextConsumer: ContextConsumer,
    ancestorTagName: string,
    cb: (context: any) => any,
  ) => {
    const ancestorEl = contextConsumer.el.closest(ancestorTagName);
    if (!ancestorEl) {
      throw new Error(
        `contextRegistry: ${getTagName(
          contextConsumer,
        )}: Unable to locate ancestor ${ancestorTagName}`,
      );
    }

    let provider = providers.get(ancestorEl);
    while (!provider) {
      console.debug(
        `contextRegistry: ${getTagName(
          contextConsumer,
        )}: Unable to locate provider via ${ancestorTagName}, waiting`,
      );
      await wait(0);
      provider = providers.get(ancestorEl);
      if (provider) {
        console.debug(
          `contextRegistry: ${getTagName(
            contextConsumer,
          )}: Located provider via ${ancestorTagName}`,
        );
      }
    }

    return await provider._getContext().then(cb);
  };

  return {
    register,
    unregister,
    withNearestContext,
  };
}

export type ContextProvider = { el: Element; _getContext: () => Promise<any> };
export type ContextConsumer = { el: Element };

export const contextRegistry = createInternalRegistry();

export const getTagName = ({ el }: ContextConsumer | ContextProvider) => {
  const tagName = el?.tagName.toLowerCase();
  const oid = ((el as any) || {}).oid;
  return oid ? `${tagName}-${oid}` : tagName;
};
