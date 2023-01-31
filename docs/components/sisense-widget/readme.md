# sisense-widget



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                  | Type     | Default     |
| -------- | --------- | ---------------------------- | -------- | ----------- |
| `height` | `height`  | The height of the widget     | `number` | `undefined` |
| `oid`    | `oid`     | The ID of an existing widget | `string` | `undefined` |
| `width`  | `width`   | The width of the widget      | `number` | `undefined` |


## Events

| Event           | Description                                                                                                                                                                                   | Type                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `beforeQuery`   | Fires before the query is executed.                                                                                                                                                           | `CustomEvent<any>`                              |
| `loaded`        | Fires when widget is loaded into the dashboard object.                                                                                                                                        | `CustomEvent<any>`                              |
| `processResult` | Fires during the widget's native result processing. Allows for customization of the result being rendered. "reason" specifies the event that caused this to fire (e.g. "dashboardrefreshed"). | `CustomEvent<{ result: any; reason: string; }>` |
| `ready`         | Fires when widget has finished rendering.                                                                                                                                                     | `CustomEvent<any>`                              |


## Methods

### `getHighchartsChart() => Promise<HighchartsChart>`



#### Returns

Type: `Promise<unknown>`



### `getModel() => Promise<WidgetModel>`



#### Returns

Type: `Promise<WidgetModel>`

An object with readonly attributes that describe a widget. Based off of https://sisense.dev/reference/js/widget/.


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
