# PostOfficePackageHelper

**Use** - This app will help carriers at the post office keep track of their packages that need to be delivered. This will reduce misdeliveries, save time on backtracks, and provide more peace of mind while performing one of the hardest jobs in the world.

**Tech stacks** - This is a react native app running on Expo CLI for cross platform compatibility. The backend is handled on an Express API connected to a MYSQL database.

**Install:**

**Prerequisites:**
- Node.js 18+ - find install instructions [here](https://nodejs.org/)
- Ngrok for development port forwarding - Find install instructions [here](https://ngrok.com/)
- (Optional but HIGHLY recommended) Download the Expo Go app from your device's app store and create an account in the app

If all prerequisites are met, clone the app into your working directory.

**App Setup:**

1. Create a `.env` file in the root directory of the project folder and fill in this information regarding the required secret keys:

```
GOOGLE_VISION_CREDENTIALS_PRIVATE_KEY=
GOOGLE_VISION_CREDENTIALS_CLIENT_EMAIL=

MYSQL_CREDENTIALS_HOST=
MYSQL_CREDENTIALS_USER=
MYSQL_CREDENTIALS_PASSWORD=
MYSQL_CREDENTIALS_DATABASE=

SESSION_SECRET_KEY=

PORT=

OPENAI_API_KEY=

DEV_API_BASE_URL=
```

2. Then update the import statement in `./postal-carrier-app-backend/app.js` for the `dotenv` library to match the path to the `.env` file.

3. Open the Ngrok client app and start a port forward on port 3000 (or whatever port you are running the Express app on).

4. Open the `apiConfig.js` file and update the `API_BASE_URL` variable to the Ngrok forwarding URL. Note: leave the \"/api\" as this is part of the full URL.

5. Open the `FirebaseConfig.js` file to update the `firebaseConfig` object variable with the secret key information you would get from your Firebase project.

**Run App:**

To run the app, I recommend opening two terminals. One for the Express app, and the other for the React Native Expo app.

**For the Express app**, navigate to the `/PostOfficePackageHelper/postal-carrier-app-backend` directory. 
Run:
```
npm i
npm start
```

**For the React Native Expo app**, navigate to the base directory using `cd ..`.
Run:
```
(For Expo Go users only) npx expo login -u <Expo username> -p <Expo password>
npm i
npm start
```

When the CLI opens and you are greeted with options for different methods for running the app. The choice is really up to you for how to do this, but I recommend opening the Expo Go app on your mobile device and running the development server shown within the app. This is the fastest way to start using the app.

**TO-DO: App Walkthrough & Features:**

- Auth
- Home Screen
- Profile
- Case Builder
- Package Helper
