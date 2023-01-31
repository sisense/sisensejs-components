import {
  Component,
  h,
  State,
  Event,
  EventEmitter,
  Prop,
  Method,
  Element,
} from '@stencil/core';
import { debounce } from '../../utils/utils';
import { DashboardModel, DataSource, Filter } from '../../types';
import { contextRegistry } from '../../contextRegistry';
import { newDashboard } from '../../globals';

@Component({
  tag: 'sisense-dashboard',
  shadow: false,
})
export class SisenseDashboard {
  @Element() el: HTMLElement;

  /**
   * The ID of an existing dashboard - if omitted, a "blank" temporary dashboard is created instead
   */
  @Prop() oid?: string = undefined;

  /**
   * Datasource used for a "blank" dashboard
   */
  @Prop() datasource?: DataSource;

  @State() dashboardContext;

  /**
   * Fires when filters are changed
   */
  @Event({ bubbles: false }) filtersChanged: EventEmitter<{
    items: Filter[];
    type: 'add' | 'remove' | 'update';
  }>;

  /**
   * Fires when dashboard has refreshed
   */
  @Event({ bubbles: false }) refreshed: EventEmitter;

  /**
   * Fires when dashboard has loaded
   */
  @Event({ bubbles: false }) loaded: EventEmitter;

  async loadDashboard() {
    const d = await contextRegistry.withNearestContext(
      this,
      'sisense-app',
      (context: any) => {
        if (this.oid) return context.dashboards.load(this.oid);

        const dashboard = newDashboard();
        if (this.datasource) {
          dashboard.datasource = this.datasource;
        }
        context.dashboards.add(dashboard);
        return dashboard;
      },
    );

    if (!d) return;

    d.debouncedRefresh = debounce(d.refresh.bind(d), 10);

    d.on('filterschanged', (_, { items, type }) => {
      this.filtersChanged.emit({ items, type });
    });

    d.on('refreshend', () => {
      this.refreshed.emit();
    });

    this.dashboardContext = d;

    this.loaded.emit();
  }

  async _getContext() {
    if (this.dashboardContext) {
      return this.dashboardContext;
    }

    return new Promise(resolve => {
      this.el.addEventListener(
        'loaded',
        () => {
          resolve(this.dashboardContext);
        },
        { once: true },
      );
    });
  }

  @Method()
  async getModel(): Promise<DashboardModel> {
    const context = await this._getContext();
    const model = context?.$$model;

    return (
      model &&
      Object.freeze({
        filters: model.filters?.$$items,
        widgets: model.widgets?.$$widgets,
        oid: model.oid,
        title: model.title,
        description: model.description,
        instanceType: model.instanceType,
        owner: model.owner,
        userId: model.userId,
        datasource: model.datasource,
        defaultFilters: model.defaultFilters,
      })
    );
  }

  @Method()
  async applyFilters(filters: Filter[]) {
    const context = await this._getContext();

    filters.forEach(filter => {
      context?.$$model?.filters?.update({ jaql: filter }, { save: false });
    });

    context.debouncedRefresh();
  }

  @Method()
  async removeFilters(filters: Filter[]) {
    const context = await this._getContext();

    filters.forEach(filter => {
      if (filter.dim) {
        context?.$$model?.filters?.remove(filter.dim);
      }
    });

    context.debouncedRefresh();
  }

  @Method()
  async clearFilters() {
    const context = await this._getContext();

    context?.$$model?.filters?.clear();
    context.debouncedRefresh();
  }

  connectedCallback() {
    contextRegistry.register(this);
    void this.loadDashboard();
  }

  disconnectedCallback() {
    contextRegistry.unregister(this);
  }

  @Method()
  async refresh() {
    const context = await this._getContext();

    context.debouncedRefresh();
  }

  render() {
    return <slot></slot>;
  }
}
