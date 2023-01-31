jest.mock('../../../contextRegistry');

import { newSpecPage } from '@stencil/core/testing';
import { SisenseWidget } from '../sisense-widget';
import { contextRegistry } from '../../../contextRegistry';
import { mockDashboardContext } from '../../../__mocks__/dashboardContext';
import { MockWidget } from '../../../__mocks__/widget';
import { wait } from '../../../utils/utils';

const mockedContextRegistry = jest.mocked(contextRegistry);

// hide debug msg in test console
jest.spyOn(console, 'debug').mockImplementation(() => {});

describe('sisense-widget', () => {
  beforeEach(() => {
    mockDashboardContext.widgets.get.mockImplementation(
      (oid: string) => oid && new MockWidget(oid),
    );
    mockDashboardContext.widgets.load.mockImplementation(
      async (oid: string) => oid && new MockWidget(oid),
    );
    mockedContextRegistry.withNearestContext.mockImplementation(
      async (_1, _2, cb) => cb?.(mockDashboardContext),
    );
  });

  afterEach(() => {
    mockedContextRegistry.withNearestContext.mockClear();
    mockDashboardContext.widgets.get.mockClear();
    mockDashboardContext.widgets.load.mockClear();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [SisenseWidget],
      html: `<sisense-widget oid="12345"></sisense-widget>`,
    });

    expect(page.root).toEqualHtml(`
      <sisense-widget oid="12345"><div/></sisense-widget>
    `);

    await wait(0);
  });

  it('renders without oid', async () => {
    const page = await newSpecPage({
      components: [SisenseWidget],
      html: `<sisense-widget></sisense-widget>`,
    });

    expect(page.root).toEqualHtml(`
      <sisense-widget><div/></sisense-widget>
    `);
  });

  it('gets widget from a loaded dashbaord', async () => {
    const page = await newSpecPage({
      components: [SisenseWidget],
      html: `<sisense-widget oid="12345"></sisense-widget>`,
    });

    const onLoaded = jest.fn();

    page.root.addEventListener('loaded', onLoaded);

    expect(page.root.querySelector('div')).toEqual(
      page.rootInstance.widgetHandle,
    );

    expect(mockDashboardContext.widgets.get).toHaveBeenCalledTimes(1);
    expect(mockDashboardContext.widgets.get).toHaveBeenCalledWith('12345');

    expect(mockDashboardContext.widgets.load).toHaveBeenCalledTimes(0);

    await wait(0);

    expect(onLoaded).toHaveBeenCalledTimes(1);
  });

  it('loads widget from server', async () => {
    mockDashboardContext.widgets.get.mockImplementation(() => undefined);

    const page = await newSpecPage({
      components: [SisenseWidget],
      html: `<sisense-widget oid="12345"></sisense-widget>`,
    });

    const onLoaded = jest.fn();

    page.root.addEventListener('loaded', onLoaded);

    expect(page.root.querySelector('div')).toEqual(
      page.rootInstance.widgetHandle,
    );

    expect(mockDashboardContext.widgets.get).toHaveBeenCalledTimes(1);
    expect(mockDashboardContext.widgets.get).toHaveBeenCalledWith('12345');

    expect(mockDashboardContext.widgets.load).toHaveBeenCalledTimes(1);
    expect(mockDashboardContext.widgets.load).toHaveBeenCalledWith('12345');

    await wait(0);

    expect(onLoaded).toHaveBeenCalledTimes(1);
  });

  it('renders after changing oid prop', async () => {
    const page = await newSpecPage({
      components: [SisenseWidget],
      html: `<sisense-widget oid="2132"></sisense-widget>`,
    });

    page.root.setAttribute('oid', '9876');

    await page.waitForChanges();

    await wait(0);

    expect(page.root).toEqualHtml(`
      <sisense-widget oid="9876"><div/></sisense-widget>
    `);
  });

  describe('events', () => {
    test('ready', async () => {
      let triggerEvent;
      let mockWidget;

      mockDashboardContext.widgets.get.mockImplementation((oid: string) => {
        mockWidget = new MockWidget(oid);
        mockWidget.on = jest.fn().mockImplementation((eventName, cb) => {
          if (eventName === 'ready') {
            triggerEvent = cb;
          }
        });
        return mockWidget;
      });
      const onBeforeQuery = jest.fn();

      const page = await newSpecPage({
        components: [SisenseWidget],
        html: `<sisense-widget oid="12345"></sisense-widget>`,
      });

      await wait(0); // wait for widgetHandle

      page.root.addEventListener('ready', onBeforeQuery);

      expect(onBeforeQuery).toHaveBeenCalledTimes(0);

      triggerEvent?.();

      expect(onBeforeQuery).toHaveBeenCalledTimes(1);
      expect(onBeforeQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          target: page.root,
        }),
      );
    });

    test('processResult', async () => {
      let triggerEvent;
      let mockWidget;

      mockDashboardContext.widgets.get.mockImplementation((oid: string) => {
        mockWidget = new MockWidget(oid);
        mockWidget.on = jest.fn().mockImplementation((eventName, cb) => {
          if (eventName === 'processresult') {
            triggerEvent = cb;
          }
        });
        return mockWidget;
      });
      const onProcessResult = jest.fn();

      const page = await newSpecPage({
        components: [SisenseWidget],
        html: `<sisense-widget oid="12345"></sisense-widget>`,
      });

      await wait(0); // wait for widgetHandle

      page.root.addEventListener('processResult', onProcessResult);

      expect(onProcessResult).toHaveBeenCalledTimes(0);

      triggerEvent?.(undefined, { result: 'result', reason: 'reason' });

      expect(onProcessResult).toHaveBeenCalledTimes(1);
      expect(onProcessResult).toHaveBeenCalledWith(
        expect.objectContaining({
          target: page.root,
          detail: { result: 'result', reason: 'reason' },
        }),
      );
    });

    test('beforeQuery', async () => {
      let triggerEvent;
      let mockWidget;

      mockDashboardContext.widgets.get.mockImplementation((oid: string) => {
        mockWidget = new MockWidget(oid);
        mockWidget.on = jest.fn().mockImplementation((eventName, cb) => {
          if (eventName === 'beforequery') {
            triggerEvent = cb;
          }
        });
        return mockWidget;
      });
      const onBeforeQuery = jest.fn();

      const page = await newSpecPage({
        components: [SisenseWidget],
        html: `<sisense-widget oid="12345"></sisense-widget>`,
      });

      await wait(0); // wait for widgetHandle

      page.root.addEventListener('beforeQuery', onBeforeQuery);

      expect(onBeforeQuery).toHaveBeenCalledTimes(0);

      triggerEvent?.();

      expect(onBeforeQuery).toHaveBeenCalledTimes(1);
      expect(onBeforeQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          target: page.root,
        }),
      );
    });
  });

  describe('_getContext', () => {
    it('waits for context to populate before returning', async () => {
      let getWidgetPromise, resolveGetWidget, mockWidget;

      mockDashboardContext.widgets.get.mockImplementation((oid: string) => {
        getWidgetPromise = new Promise(resolve => {
          mockWidget = new MockWidget(oid);
          resolveGetWidget = () => resolve(mockWidget);
        });
        return getWidgetPromise;
      });

      const page = await newSpecPage({
        components: [SisenseWidget],
        html: `<sisense-widget oid="12345"></sisense-widget>`,
      });

      expect(page.rootInstance.widgetContext).toBeFalsy();

      expect(page.rootInstance._getContext()).toEqual(getWidgetPromise);

      resolveGetWidget();

      await wait(0);

      expect(page.rootInstance.widgetContext).toEqual(mockWidget);

      await expect(page.rootInstance._getContext()).resolves.toBe(mockWidget);
    });
  });

  describe('getModel', () => {
    it('returns', async () => {
      const page = await newSpecPage({
        components: [SisenseWidget],
        html: `<sisense-widget oid="12345"></sisense-widget>`,
      });

      await expect(page.rootInstance.getModel()).resolves.toEqual({
        oid: '12345',
        title: 'mockTitle',
        type: 'mockType',
        subtype: 'mockSubtype',
        owner: 'mockOwner',
        userId: 'mockUserId',
        instanceType: 'mockInstanceType',
        datasource: 'mockDatasource',
        metadata: 'mockMetadata',
        style: 'mockStyle',
      });
    });
  });

  describe('when unmounting', () => {
    it('calls destroy on widget and model', async () => {
      let mockWidget;

      mockDashboardContext.widgets.get.mockImplementation((oid: string) => {
        mockWidget = new MockWidget(oid);
        jest.spyOn(mockWidget, 'destroy');
        return mockWidget;
      });

      const page = await newSpecPage({
        components: [SisenseWidget],
        html: `<sisense-widget oid="12345"></sisense-widget>`,
      });

      await wait(0); // wait for widgetHandle

      page.root.remove();

      expect(mockWidget.destroy).toHaveBeenCalledTimes(1);
      expect(mockWidget.$$model.destroy).toHaveBeenCalledTimes(1);
    });
  });
});
