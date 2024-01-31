# features
* ✅ display a simple workflow with nodes as
* ✅ shown in the screenshot
* ✅ display a search field
* ✅ when typing, show list of possible new nodes to
* ✅ add (hard coded list or mocked HTTP response)
* ✅ allow adding nodes to the workflow
* ✅ allow free moving of nodes
* ✅ draw the node connections

## additional features
* ✅ you can remove edges between nodes with backspace or draggin out (should be close to the handle) the line
* ✅ feedback protection - you can not connect your output with input on the same node
* ✅ all additional stuff that flow provides you from the box - like zooming, dragging the dnd field
* ✅ you can not connect outputs


## My thoughts
– i ve been using clean css without vars or preprocessors, to save some time. On my last project we were using JSS but I heard there are some issues with SSR
– because of reflow library... which makes almost everything required in the task, I was kinda confused, about what should i do and demonstrate. I decided to write my autocomplete. I quickly realized that it could be done in many different ways and it takes some time. I could use ant.design though or something similar, to save some time... but what's done its done. I did not have enough time to polish things up so there might be bugs :D.
– because of this i do not have tests, but I place just one for one of the util functions because I had it done already
– there are some things to do  still. I mean autocomplete is not quite finished and i think it would be better to place it above the dnd field, and may be there should not be connection between triangle and square, but i think we can just talk about it.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
