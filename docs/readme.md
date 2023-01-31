# SisenseJS React - Documentation

**Table of contents**

 - [Getting started](#getting-started)
 - [API Reference](#api-reference)
 - [Examples](#examples)

----

## Getting Started

### Step 1: Prepare your environment

 - You will need access to the Sisense instance containing the widgets you wish to embed, as well as access to the dashboards containing these widgets.
 - Make sure you can log into the Sisense instance directly (with CSRF protection disabled) or via SSO
 - Make sure the instance has CORS set up correctly to allow your application; You may also need to set up SSL.
 - Make sure the instance is accssible to your application via HTTPS

### Step 2: Include the package in your project

This is a monorepo, containing several packages as well as sample projects.

The various npm packages contained within, are deployed via Github Packages. Follow these steps to install them:

#### Step 2A - Adding the namespace to your project

For npm and Yarn classic:

```sh
npm config set @sisense:registry "https://npm.pkg.github.com" --userconfig .npmrc
```

For Yarn 2+:

```sh
yarn config set npmScopes.sisense.npmRegistryServer "https://npm.pkg.github.com"
```

#### Step 2B - Installing the package

Yarn:

```sh
yarn add @sisense/sjs-react
```

npm:

```sh
npm install @sisense/sjs-react --save
```

### Step 3: Import the package into your code

Import all or some of the types the package includes, for example:

```ts
// Import the components you need
import { SisenseApp, SisenseDashboard, SisenseWidget } from "@sisense/sjs-react";
```

### Step 4: Embed using components

You will need:

 - The full URL of your Sisense instance
 - The `oid` of any dashboards containing widgets to embed
 - The `oid` of each widget to embed

Example:

```jsx
function App() {
  return (
    <SisenseApp url="https://myinstance.example.com">
      <SisenseDashboard oid="{dashboard_id}">
          <SisenseWidget oid="{widget_id_1}" />
          <SisenseWidget oid="{widget_id_2}" />
      </SisenseDashboard>
    </SisenseApp>
  );
}

export default App;
```

----

## API Reference

API references can be found under [docs/components](docs/components) for each of these components:

| Component        | Documentation                                                                        |
|------------------|--------------------------------------------------------------------------------------|
| SisenseApp       | [docs/components/sisense-app/readme.md](docs/components/sisense-app/readme.md)       |
| SisenseDashboard | [docs/components/sisense-dashboard/readme.md](docs/components/sisense-dashboard/readme.md) |
| SisenseWidget    | [docs/components/sisense-widget/readme.md](docs/components/sisense-widget/readme.md) |
| SisenseFilters   | [docs/components/sisense-filters/readme.md](docs/components/sisense-filters/readme.md) |

Since this library has been built with Typescript, you should be able to easily explore the properties and methods exposed by each of these components. Additional documentation will be added over time.

----

## Examples

You'll find sample projects within the [/examples](/examples/) directory.
