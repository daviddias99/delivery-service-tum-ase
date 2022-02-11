# Setup and Usage guide

## Steps

1. Run the `yarn` command to install all the dependencies
2. To start the application run the `yarn start` command. It will create the app on `http://localhost:3000` and it will open a browser window on this address.
3. When you save changes the server will reload
4. (Optional) The application can be configured using environment variables. To define them create a `.env` file in the current directory. The `.env.template` file contains an example of these variables:
   1. (IMPORTANT) When defining new variables you need to append them with `REACT_APP_` so that React can automatically import them.
5. (Optional) It is useful to have an IDE plugin to report ESLint errors (in VSCode you can search for extension dbaeumer.vscode-eslint).

```
REACT_APP_API_URI=http://localhost:8000 # URI for the backend API
```
## Usage and development

- The `src/assets` folder contains static files (pictures, icons, global stylesheets) that are in the project.
  - `src/styles` contains global stylesheets. `common.scss` is where you put style directives that apply to the entire project. `variables.modules.scss` is used to declare varaibles that can be reused in other `scss` files or Typescript modules (you just need to import them)
- The `src/components` contains React components. `common` is where you put components that can be reused in other components. Other folders contain components that are specific to one page.
- Name the component folders with the name of the component `/Component` , containing a `Layout.tsx` and a `styles.scss` (where you put the component styles) 
  - Note that if you create a style `h2 { color: red; }` this style will apply to all `h2`s, even if it is defined in the `.scss` of that component. Instead, suppose that your component is wrapped in a div with class `post`, then you can do the scss style as:
  ```scss
  .post {
    h2 {
      color: red
    }
  }
  ```
  - This makes sure that the rule only applies to h2's which are descendants of elements with class post. Is is equivalent to having a `.post h2` selector in css.
- `Router.tsx` and `routes.ts` are related to the routes in the webapp.
- Import `services/api` to call backend API endpoints (you need to define them there first).
- The `pages` folder contains components that are single-used and represent different pages (they usually make API calls and construct a page using other components).
- The `types` directory contains type definitions for User, Box and Delivery, to aid Typescript
- The `redux` folder contains the different slices used by Redux
- The `nginx` folder contains configuration files used for deploying the application in an nginx instance

## Available Scripts

In the project directory, you can run:

### `yarn`

Use this command to install all the dependencies to the project.

### `yarn lint`

Run the linter on the project.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
