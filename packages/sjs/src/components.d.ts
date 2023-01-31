/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { AppModel, DashboardModel, DataSource, Filter, HighchartsChart, WidgetModel } from "./types";
export namespace Components {
    interface SisenseApp {
        "getModel": () => Promise<AppModel>;
        "logout": () => Promise<void>;
        /**
          * If true, persist filter changes
         */
        "persist"?: boolean;
        /**
          * Base Sisense instance URL, e.g. https://sisense.example.com
         */
        "url": string;
        /**
          * Web access token
         */
        "wat"?: string;
    }
    interface SisenseDashboard {
        "applyFilters": (filters: Filter[]) => Promise<void>;
        "clearFilters": () => Promise<void>;
        /**
          * Datasource used for a "blank" dashboard
         */
        "datasource"?: DataSource;
        "getModel": () => Promise<DashboardModel>;
        /**
          * The ID of an existing dashboard - if omitted, a "blank" temporary dashboard is created instead
         */
        "oid"?: string;
        "refresh": () => Promise<void>;
        "removeFilters": (filters: Filter[]) => Promise<void>;
    }
    interface SisenseFilters {
        /**
          * The height of the filters panel
         */
        "height": number;
        /**
          * The width of the filters panel
         */
        "width": number;
    }
    interface SisenseWidget {
        "getHighchartsChart": () => Promise<HighchartsChart>;
        /**
          * @returns An object with readonly attributes that describe a widget. Based off of https://sisense.dev/reference/js/widget/.
         */
        "getModel": () => Promise<WidgetModel>;
        /**
          * The height of the widget
         */
        "height": number;
        /**
          * The ID of an existing widget
         */
        "oid": string;
        /**
          * The width of the widget
         */
        "width": number;
    }
}
export interface SisenseAppCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLSisenseAppElement;
}
export interface SisenseDashboardCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLSisenseDashboardElement;
}
export interface SisenseWidgetCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLSisenseWidgetElement;
}
declare global {
    interface HTMLSisenseAppElement extends Components.SisenseApp, HTMLStencilElement {
    }
    var HTMLSisenseAppElement: {
        prototype: HTMLSisenseAppElement;
        new (): HTMLSisenseAppElement;
    };
    interface HTMLSisenseDashboardElement extends Components.SisenseDashboard, HTMLStencilElement {
    }
    var HTMLSisenseDashboardElement: {
        prototype: HTMLSisenseDashboardElement;
        new (): HTMLSisenseDashboardElement;
    };
    interface HTMLSisenseFiltersElement extends Components.SisenseFilters, HTMLStencilElement {
    }
    var HTMLSisenseFiltersElement: {
        prototype: HTMLSisenseFiltersElement;
        new (): HTMLSisenseFiltersElement;
    };
    interface HTMLSisenseWidgetElement extends Components.SisenseWidget, HTMLStencilElement {
    }
    var HTMLSisenseWidgetElement: {
        prototype: HTMLSisenseWidgetElement;
        new (): HTMLSisenseWidgetElement;
    };
    interface HTMLElementTagNameMap {
        "sisense-app": HTMLSisenseAppElement;
        "sisense-dashboard": HTMLSisenseDashboardElement;
        "sisense-filters": HTMLSisenseFiltersElement;
        "sisense-widget": HTMLSisenseWidgetElement;
    }
}
declare namespace LocalJSX {
    interface SisenseApp {
        /**
          * Fires when the Sisense app has loaded
         */
        "onLoaded"?: (event: SisenseAppCustomEvent<any>) => void;
        /**
          * If true, persist filter changes
         */
        "persist"?: boolean;
        /**
          * Base Sisense instance URL, e.g. https://sisense.example.com
         */
        "url"?: string;
        /**
          * Web access token
         */
        "wat"?: string;
    }
    interface SisenseDashboard {
        /**
          * Datasource used for a "blank" dashboard
         */
        "datasource"?: DataSource;
        /**
          * The ID of an existing dashboard - if omitted, a "blank" temporary dashboard is created instead
         */
        "oid"?: string;
        /**
          * Fires when filters are changed
         */
        "onFiltersChanged"?: (event: SisenseDashboardCustomEvent<{
    items: Filter[];
    type: 'add' | 'remove' | 'update';
  }>) => void;
        /**
          * Fires when dashboard has loaded
         */
        "onLoaded"?: (event: SisenseDashboardCustomEvent<any>) => void;
        /**
          * Fires when dashboard has refreshed
         */
        "onRefreshed"?: (event: SisenseDashboardCustomEvent<any>) => void;
    }
    interface SisenseFilters {
        /**
          * The height of the filters panel
         */
        "height"?: number;
        /**
          * The width of the filters panel
         */
        "width"?: number;
    }
    interface SisenseWidget {
        /**
          * The height of the widget
         */
        "height"?: number;
        /**
          * The ID of an existing widget
         */
        "oid"?: string;
        /**
          * Fires before the query is executed.
         */
        "onBeforeQuery"?: (event: SisenseWidgetCustomEvent<any>) => void;
        /**
          * Fires when widget is loaded into the dashboard object.
         */
        "onLoaded"?: (event: SisenseWidgetCustomEvent<any>) => void;
        /**
          * Fires during the widget's native result processing. Allows for customization of the result being rendered. "reason" specifies the event that caused this to fire (e.g. "dashboardrefreshed").
         */
        "onProcessResult"?: (event: SisenseWidgetCustomEvent<{
    result: any;
    reason: string;
  }>) => void;
        /**
          * Fires when widget has finished rendering.
         */
        "onReady"?: (event: SisenseWidgetCustomEvent<any>) => void;
        /**
          * The width of the widget
         */
        "width"?: number;
    }
    interface IntrinsicElements {
        "sisense-app": SisenseApp;
        "sisense-dashboard": SisenseDashboard;
        "sisense-filters": SisenseFilters;
        "sisense-widget": SisenseWidget;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "sisense-app": LocalJSX.SisenseApp & JSXBase.HTMLAttributes<HTMLSisenseAppElement>;
            "sisense-dashboard": LocalJSX.SisenseDashboard & JSXBase.HTMLAttributes<HTMLSisenseDashboardElement>;
            "sisense-filters": LocalJSX.SisenseFilters & JSXBase.HTMLAttributes<HTMLSisenseFiltersElement>;
            "sisense-widget": LocalJSX.SisenseWidget & JSXBase.HTMLAttributes<HTMLSisenseWidgetElement>;
        }
    }
}
