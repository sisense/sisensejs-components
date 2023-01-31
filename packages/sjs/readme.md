`@sisense/sjs`

This is a library that wraps SisenseJS to provide a cleaner and easier to use interface, either in vanilla web component form (this package), or in React component form (`@sisense./sjs-react`).

This is the base package in the monorepo. `sjs-react` depends on this and various demos/examples either depend on `sjs-react` or this package. Therefore, it needs to be built first.

```sh
yarn build
```
```sh
yarn build.watch
```

`build.watch` can be useful during development iterations.

The individual components are found under `./src/components`. Docs for them are under `../../docs/components`

When adding a new component, you need to generate the corresponding React component and build `sjs-react` once.

```sh 
yarn run generate
```
