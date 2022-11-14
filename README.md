## Folder Structure

- `config` folder will contain commonly used configurations/settings/utilities
- `controllers` folder will contain HTTP request controllers
- `middlewares` folder will contain middleware logic
- `models` folder will contain database operations
- `routes` folder will contain HTTP routes and bind it to controllers
- `services` folder will contain application logic and will serve as a glue between controllers and models
- `utils` folder will contain helper functions to perform required operations
- `validations` folder will contain HTTP request body validations

<br />

## Setup the codebase

**Install all the packages and dependencies:**

`npm install`

Then copy the .env-sample and save it with .env file, and fill in the configuration settings.

<br />

## Run the application

**Run the app:**

`npm start`

**Run while developing:**

`npm run dev`

**Check source code errors:**

`npm run lint`
