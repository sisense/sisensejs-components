import {
  Component,
  h,
  State,
  Prop,
  Watch,
  EventEmitter,
  Event,
  Method,
  Element,
} from '@stencil/core';
import { HighchartsChart, WidgetModel } from '../../types';
import { debounce, wait } from '../../utils/utils';
import { contextRegistry } from '../../contextRegistry';

@Component({
  tag: 'sisense-widget',
  shadow: false,
})
export class SisenseWidget {
  private widgetHandle!: HTMLDivElement;

  @State() private widgetContext;

  @Method()
  async getHighchartsChart(): Promise<HighchartsChart> {
    const ref = this.widgetHandle.getElementsByClassName(
      'widget-body',
    )[0] as any;

    return ref
      ? window['Sisense'].internalScope.Highcharts.charts[
          ref.dataset.highchartsChart
        ]
      : null;
  }

  @Element() el: HTMLElement;

  async _getContext() {
    if (this.widgetContext) {
      return this.widgetContext;
    }

    return new Promise(resolve => {
      this.el.addEventListener(
        'loaded',
        () => {
          resolve(this.widgetContext);
        },
        { once: true },
      );
    });
  }

  /**
   * @returns An object with readonly attributes that describe a widget. Based off of https://sisense.dev/reference/js/widget/.
   */
  @Method()
  async getModel(): Promise<WidgetModel> {
    const context = await this._getContext();

    if (!context) {
      return undefined;
    }

    const {
      oid,
      title,
      type,
      subtype,
      owner,
      userId,
      instanceType,
      datasource,
      metadata,
      style,
    } = context.$$model;

    return Object.freeze({
      oid,
      title,
      type,
      subtype,
      owner,
      userId,
      instanceType,
      datasource,
      metadata,
      style,
    });
  }

  /**
   * The ID of an existing widget
   */
  @Prop() oid: string;

  @Watch('oid')
  idUpdatedHandler() {
    void this.loadWidget();
  }

  /**
   * The width of the widget
   */
  @Prop() width: number;

  @Watch('width')
  widthUpdatedHandler() {
    this.widgetContext.debouncedRefresh();
  }

  /**
   * The height of the widget
   */
  @Prop() height: number;

  @Watch('height')
  heightUpdatedHandler() {
    this.widgetContext.debouncedRefresh();
  }

  /**
   * Fires during the widget's native result processing. Allows for
   * customization of the result being rendered. "reason" specifies the event
   * that caused this to fire (e.g. "dashboardrefreshed").
   */
  @Event({ bubbles: false }) private processResult: EventEmitter<{
    result: any;
    reason: string;
  }>;

  /**
   * Fires when widget has finished rendering.
   */
  @Event({ bubbles: false }) private ready: EventEmitter;

  /**
   * Fires before the query is executed.
   */
  @Event({ bubbles: false }) private beforeQuery: EventEmitter;

  /**
   * Fires when widget is loaded into the dashboard object.
   */
  @Event({ bubbles: false }) private loaded: EventEmitter;

  connectedCallback() {
    void this.loadWidget();
  }

  disconnectedCallback() {
    this.free();
  }

  async loadWidget() {
    const w = await contextRegistry.withNearestContext(
      this,
      'sisense-dashboard',
      (context: any) =>
        context.widgets.get(this.oid) ?? context.widgets.load(this.oid),
    );

    if (!w) return;

    while (!this.widgetHandle) {
      console.debug('Widget waiting for handle', this.oid);
      await wait(0); // wait for widgetHandle to populate in initial render
    }
    w.container = this.widgetHandle;

    w.on('ready', () => {
      this.ready.emit();
    });

    w.on('processresult', (_, { result, reason }) => {
      this.processResult.emit({
        result,
        reason,
      });
    });

    w.on('beforequery', () => {
      this.beforeQuery.emit();
    });

    w.debouncedRefresh = debounce(w.refresh.bind(w), 10);

    this.widgetContext = w;

    this.loaded.emit();

    console.debug('Loaded Widget', this.oid);

    void contextRegistry.withNearestContext(
      this,
      'sisense-dashboard',
      context => context.refresh(),
    );
  }

  free() {
    if (!this.widgetContext) return;
    console.debug('Freeing', this.oid);
    this.widgetContext.destroy();
    this.widgetContext.$$model.destroy();
    this.widgetContext = null;
  }

  render() {
    return (
      <div
        style={{
          width: this.width ? `${this.width}px` : '',
          height: this.height ? `${this.height}px` : '',
        }}
        ref={el => (this.widgetHandle = el)}
      />
    );
  }
}
