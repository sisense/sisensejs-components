# sisense-dashboard



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description                                                                                    | Type                                                                                                 | Default     |
| ------------ | --------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------- |
| `datasource` | --        | Datasource used for a "blank" dashboard                                                        | `{ fullname: string; id: string; address: string; database: string; live: boolean; title: string; }` | `undefined` |
| `oid`        | `oid`     | The ID of an existing dashboard - if omitted, a "blank" temporary dashboard is created instead | `string`                                                                                             | `undefined` |


## Events

| Event            | Description                        | Type                                                                     |
| ---------------- | ---------------------------------- | ------------------------------------------------------------------------ |
| `filtersChanged` | Fires when filters are changed     | `CustomEvent<{ items: Filter[]; type: "remove" \| "add" \| "update"; }>` |
| `loaded`         | Fires when dashboard has loaded    | `CustomEvent<any>`                                                       |
| `refreshed`      | Fires when dashboard has refreshed | `CustomEvent<any>`                                                       |


## Methods

### `applyFilters(filters: Filter[]) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `clearFilters() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getModel() => Promise<DashboardModel>`



#### Returns

Type: `Promise<DashboardModel>`



### `refresh() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `removeFilters(filters: Filter[]) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
