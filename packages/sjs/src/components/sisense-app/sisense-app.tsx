import {
  Component,
  h,
  Prop,
  State,
  Method,
  Event,
  EventEmitter,
  Element,
  Watch,
} from '@stencil/core';
import { AppModel } from '../../types';
import Libloader from '../../utils/libloader';
import { contextRegistry } from '../../contextRegistry';

@Component({
  tag: 'sisense-app',
  shadow: false,
})
export class SisenseApp {
  @Element() el: HTMLElement;

  @State() private appContext: any; // Contains Sisense app object

  /**
   * Base Sisense instance URL, e.g. https://sisense.example.com
   */
  @Prop() url: string;

  /**
   * If true, persist filter changes
   */
  @Prop() persist? = false;

  /**
   * Web access token
   */
  @Prop() wat?: string;

  /**
   * Fires when the Sisense app has loaded
   */
  @Event({ bubbles: false }) loaded: EventEmitter;

  connectedCallback() {
    contextRegistry.register(this);
  }

  disconnectedCallback() {
    contextRegistry.unregister(this);
  }

  componentWillLoad() {
    this.loadSisenseJS();
  }

  @Watch('url')
  onUrlChange(newUrl, oldUrl) {
    if (newUrl !== oldUrl) this.loadSisenseJS();
  }

  loadSisenseJS() {
    if (!this.url) {
      return;
    }

    const src = new URL(`${this.url}/js/sisense.v1.js`);

    if (this.wat) {
      src.searchParams.append('wat', 'true');
    }

    Libloader(src).then(() => {
      console.debug('SisenseJS Downloaded');
      this.loadSisense();
    });
  }

  @Method()
  async logout() {
    const context = await this._getContext();
    context.$$dashboard.$identity.signout();
  }

  async _getContext() {
    if (this.appContext) {
      return this.appContext;
    }

    return new Promise(resolve => {
      this.el.addEventListener(
        'loaded',
        () => {
          resolve(this.appContext);
        },
        { once: true },
      );
    });
  }

  @Method()
  async getModel(): Promise<AppModel> {
    await this._getContext();
    const prism = window['Sisense'].internalScope.prism;

    const {
      version,
      license: { isTrial },
      user,
    } = prism;

    return Object.freeze({
      version,
      isTrial,
      user: Object.freeze({
        oid: user._id,
        email: user.email,
        username: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: Object.freeze({
          oid: user.roleId,
          name: user.roleName,
        }),
      }),
    });
  }

  // Load SisenseJS
  loadSisense() {
    console.debug(
      `Sisense.connect('${this.url}', ${this.persist}, ${JSON.stringify(
        this.wat,
      )})`,
    );

    window['Sisense'].connect(this.url, this.persist, this.wat).then(app => {
      console.debug('Connected to', this.url);
      this.appContext = app;
      this.loaded.emit();
    });
  }

  render() {
    return (
      <div id="sisenseApp">
        <slot></slot>
      </div>
    );
  }
}
