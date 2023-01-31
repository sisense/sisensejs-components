declare global {
  interface Window {
    Sisense: {
      connect(url: string, persist?: boolean, token?: string): any;
      internalScope: {
        prism: Prism;
        Highcharts: any;
      };
    };
    Dashboard: any;
  }
}

export type Filter = {
  datatype: 'text' | 'datetime' | 'numeric';
  dim: string;
  filter: FilterOptions;
};

export type FilterOptions = {
  explicit: boolean;
  multiSelection: boolean;
  members: string[];
};

export type DataSource = {
  fullname: string;
  id: string;
  address: string;
  database: string;
  live: boolean;
  title: string;
};

export type Prism = {
  user: {
    _id: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    roleId: string;
    roleName: string;
  };
  license: {
    isTrial: boolean;
  };
  version: string;
};

// Resembles https://sisense.dev/reference/embedding/embed-sdk.html#appinfo
export type AppModel = {
  version: string;
  isTrial: boolean;
  user: UserInfo;
};

// Resembles https://sisense.dev/reference/embedding/embed-sdk.html#userinfo
export type UserInfo = {
  oid: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: {
    oid: string;
    name: string;
  };
};

export type DashboardModel = {
  filters: Filter[];
  widgets: WidgetModel[];
  oid: string;
  title: string;
  description?: string;
  instanceType: string;
  owner: string;
  userId: string;
  datasource: DataSource;
  defaultFilters: Filter[];
};

export type HighchartsChart = unknown;

export type WidgetModel = {
  oid: string;
  title: string;
  type: string;
  subtype: string;
  owner: string;
  userId: string;
  instanceType: string;
  datasource: DataSource;
  metadata: {
    panels: WidgetMetadataPanel[];
    ignore: object;
  };
  style: object;
};

export type WidgetMetadataPanel = {
  items: WidgetMetadataPanelItem[];
  name: string;
  title: string;
  type: string;
};

export type WidgetMetadataPanelItem = {
  format: object;
  jaql: {
    dim: string;
    datatype: string;
    title: string;
    collapsed: boolean;
    filter: object;
    agg: string;
    merged: boolean;
    indexed: boolean;
    table: string;
    column: string;
    formula: string;
    context: object;
  };
  isCascading: boolean;
};
