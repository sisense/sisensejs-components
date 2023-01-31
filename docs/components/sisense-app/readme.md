# sisense-app



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                 | Type      | Default     |
| --------- | --------- | ----------------------------------------------------------- | --------- | ----------- |
| `persist` | `persist` | If true, persist filter changes                             | `boolean` | `false`     |
| `url`     | `url`     | Base Sisense instance URL, e.g. https://sisense.example.com | `string`  | `undefined` |
| `wat`     | `wat`     | Web access token                                            | `string`  | `undefined` |


## Events

| Event    | Description                           | Type               |
| -------- | ------------------------------------- | ------------------ |
| `loaded` | Fires when the Sisense app has loaded | `CustomEvent<any>` |


## Methods

### `getModel() => Promise<AppModel>`



#### Returns

Type: `Promise<AppModel>`



### `logout() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
