# About project

This project has both front and back.

Front was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Back is prepared with Node.js v16.13.0

#### Technical task

This project is a homework task for frontend developer position. 
Task requirements:
1. Set up a project with a calorie counter for vegeterian diet.
2. Specific funtionalities not required

#### Result
You can check fully functioning project app here: [https://veggiediet.minfra.eu/](https://veggiediet.minfra.eu/)

Project guide:
1. for non registered / logged-in users only search functionality is available
2. available functionalities for registered users:
  - saving recipes to favorites for later access;
  - saving recipes to daily plan for calorie monitoring;
  - calculating and tracking body mass measures like BMI, daily calorie intake. This part is mandatory for each meal calorie calculations;
  - statistics page where each planned meal can be selected as already consumed / consumed part of it. Based on portion eaten, calorie counter is updated;


## Prerequisites for BACK (server) setup

To start server you will need:
1. .env file
2. Mongo DB 
3. Edamam DB API key

#### 1. create your own .env file
```
PORT=4000
PRODUCTION=true/false
APP_ID=<edamam_app_id>
APP_KEY=<edamam_app_key>
URL=https://api.edamam.com/api/recipes/v2?type=public&imageSize=LARGE&random=true&health=vegetarian
MONGO_KEY=mongodb+srv://<USER>:<PASSWORD><DATABASE, DRIVERS>
SESSION_KEY=<UNIQUE STRING OF CHARCTERS>
CORS_ORIGIN=http://localhost:3000
```

* PORT. By default server is running on port 4000: `http://localhost:4000`. If running on different port specify it in .env file by providing PORT value. 
* EDAMAM APP ID & KEY. You will need and API key for recipe search database. API documentation: [https://developer.edamam.com/edamam-docs-recipe-api](https://developer.edamam.com/edamam-docs-recipe-api)
* MONGO KEY. You will need a mongo connection uri string with your user and password `mongodb+srv://<user>:<password><database, drivers>`.
* SESSION KEY. Your own secret key in string format.
* CORS OROGIN. `http://localhost:3000`. Replace port number if running app client (front) on different port. 


#### To start a server run

```diff
npm run start
```

## Prerequisites for FRONT (client) setup

Before starting the project, update server port number if it is different than 4000. File to update [/client/src/plugins/http.js](/client/src/plugins/http.js).

In the project directory, you can:

### Start a client in development mode

```diff
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Build the app for production

```diff
npm run build
```
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Other scripts

##### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run eject`

##### **Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.




