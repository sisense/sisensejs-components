# SisenseJS Components - Examples

This directory contains multiple examples for using the `@sisense/sjs` and `@sisense/sjs-react` packages.

## Setting up examples

1. Clone or download the example you wish to run
1. Find and replace any references to `https://example.com/` with the full URL of your Sisense environment (including port, if not defailt)
1. Find and replace any references to `{dashboard_id}` with a valid dashboard `oid` from your Sisense environment
1. Find and replace any references to `{widget_id_1}` and `{widget_id_2}` with valid widget `oid`s from your Sisense environment
1. Install dependencies: `yarn install`
1. Build the project: `yarn build`
1. Make sure you are logged on to your Sisense environment in an active session in your browser (otherwise, you can set up SSO)
1. Start the example: `yarn start`

## Available examples

| Directory                                                                                                                          | Description                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **[vanilla-js-demo](/vanilla-js-demo/)**                                                                         | Basic example of using vanilla WebComponents in Javascript                              |
| **[react-demo](/react-demo/)**                                                                                   | Basic example using React components in Javascript                                      |
| **[react-ts-demo](/react-ts-demo/)**                                                                             | Basic example using React components in Typescript                                      |
| **[react-ts-demo-dynamic-widgets](/react-ts-demo-dynamic-widgets/)**                                             | React + Typescript example of dynamically loading widgets from a dashboard              |
| **[react-ts-demo-mix-widgets-from-different-dashboards](/react-ts-demo-mix-widgets-from-different-dashboards/)** | React + Typescript example of rendering widgets from different dashboards               |
| **[react-ts-demo-sso](/react-ts-demo-sso/)**                                                                     | React + Typescript example of combining the Component library with SSO                  |
| **[react-ts-demo-widget-manipulate-highcharts](/react-ts-demo-widget-manipulate-highcharts/)**                   | React + Typescript example of accessing a widget's underlying Highcharts chart instance |
| **[react-ts-demo-widget-onloaded](/react-ts-demo-widget-onloaded/)**                                             | React + Typescript example of accessing a widget's underlying object model              |
| **[react-ts-demo-widget-process-results](/react-ts-demo-widget-process-results/)**                               | React + Typescript example of modifying a widget's result data before rendering         |
