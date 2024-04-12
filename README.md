## development-test

This example shows how to create a React app in a WordPress admin page.

1. Install dependencies
2. Generate the build
3. Use it in a WordPress installation

For that, you'll need to do the following

- Remove any node_modules folder inside this folder
- Run npm install to install the dependencies
- Run npm build to generate the "build" version of the blocks

## Understanding the Example Code

The `index.js` defines a root React component containing the app (`MyFirstApp`) that is "inserted" in the DOM via [`createRoot` of `react-dom`](https://react.dev/reference/react-dom/client/createRoot)

- [`useSelect`](https://developer.wordpress.org/block-editor/reference-guide/packages/packages-_data/#useselect) is used to get info about the entities (pages)
- [`useDispatch`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-_data/#usedispatch) is used to trigger actions over the entities (pages)
- Several UI components are used from [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

## Related resources

- [useEntityRecords: an easier way to fetch WordPress data](https://developer.wordpress.org/news/2023/05/useentityrecords-an-easier-way-to-fetch-wordpress-data/) | Developer Blog
- [Application state managed withDispatch, withSelect and compose 101](https://developer.wordpress.org/news/2022/12/application-state-managed-withdispatch-withselect-and-compose-101/) | Developer Blog
- [useSelect](https://developer.wordpress.org/block-editor/reference-guide/packages/packages-data/#useselect) | Block Editor Handbook
- [data module documentation](https://developer.wordpress.org/block-editor/reference-guide/packages/packages-data/) | Block Editor Handbook
- [WordPress API documentation](https://developer.wordpress.org/rest-api/reference/pages/) | Block Editor Handbook
- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/) (also see [Storybook](https://wordpress.github.io/gutenberg/?path=/docs/docs-introduction--page))
