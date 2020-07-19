This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


Heyy, this is a note from given. The creator of this game.

First and foremost, clone this repo.

Then, go to the server file, which is found in src/server, and run the command "node server.js" from that directory. This is to get the socket.io server up and running.

then go to the master folder and type "npm start"

This will lead to all the dependancies being installed first and then the app will pop up.

To try if this app works, you could open two different browsers, it has to be different browsers as this app works with cookies/localStorage, as this has been created for friends, who are distant, that want to play each other. 

so open 2 different browsers, go to the localhost address

when 2 browsers are opened, it represents 2 people.

the first will be given an id of 1 and the 2nd an ID of 2.

So on browser of user with id = 1, they will see user of ID 2, as an opponent they can verse and so forth.

When you request to play an opponent, there will be a notification on the opponents browser, when it pops up, you get to either accept or decline the invite.

And the challenger will be notified of this.

Lastly, the game is designed for laptop screens. I didn't get the time to make it suitable for both laptops and mobile phones. But i'll continue with it over time.




## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
