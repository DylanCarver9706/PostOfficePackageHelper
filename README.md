# PostOfficePackageHelper

This mobile app will help carriers at the post office keep track of their packages that need to be delivered and help them reduce the time it takes to get out the door and start delivering. This will reduce misdeliveries, save time on backtracks, and provide more peace of mind while performing one of the hardest jobs in the world.

## TO DO

- Release the mobile app to the Google Play Store and the Apple App Store.
- Host the database and API server on an AWS EC2 instance.
- Start beta testing with real users

Track development progress on Trello. [View the Trello board](https://trll.io/CXV4TEITMD/test-share-link?pwd=Xw2HIHI2l3xcXcpK).

## Features

- **Cross-Platform Compatibility**: Built with React Native and Expo CLI for seamless performance on both Android and iOS devices.
- **Backend Integration**: Connected to an Express.js API with a MySQL relational database for data storage and retrieval.
- **Machine Learning & AI**: Integrated with Google Vision and OpenAI APIs to leverage advanced machine learning and artificial intelligence capabilities.
- **User Authentication & Analytics**: Utilizes Firebase SDK for secure user authentication and analytics to improve app security and user insights.

## Tech Stack

- **Frontend**: React Native, Expo CLI
- **Backend**: Express.js, MySQL
- **APIs**: Google Vision, OpenAI
- **Authentication and Analytics**: Firebase SDK

## Prerequisites and Tools

Before you start, ensure you have the following installed on your system:

- **Node.js**: Version 18 or higher for both React Native and Express.js. You can download it from the [official Node.js website](https://nodejs.org/).
- **MySQL Workbench**: Required to create the database and locally host the database for development purposes.
- **Ngrok**: For development port forwarding. You can find installation instructions [here](https://ngrok.com/).
- **Android Studio**: Useful for testing on different kinds of android devices and the ability to export an APK for the app
- **Xcode**: Necessary for testing on different kinds of IOS devices
- **Expo Go App**: (Optional but highly recommended) Download the Expo Go app from your device's app store and create an account.

## Installation

To set up the Postal Package Helper app, follow these steps:

1. **Initialize database using schema**
   - Open MySQL Workbench.
   - Copy the contents of the latest schema file from the `./postal-carrier-app-backend/schemas` into the editor window.
   - Run the SQL script to create the necessary database, tables, and testing data.

1. **Create a `.env` file** in the root directory of the project folder and fill in the required secret keys:

    ```plaintext
    GOOGLE_VISION_CREDENTIALS_PRIVATE_KEY=
    GOOGLE_VISION_CREDENTIALS_CLIENT_EMAIL=

    MYSQL_CREDENTIALS_HOST=
    MYSQL_CREDENTIALS_USER=
    MYSQL_CREDENTIALS_PASSWORD=
    MYSQL_CREDENTIALS_DATABASE=

    SESSION_SECRET_KEY=

    PORT=

    OPENAI_API_KEY=

    DEV_API_BASE_URL= (Don't worry about this one until later)
    ```

3. **Update the import statement** for the `dotenv` library in `./postal-carrier-app-backend/app.js` to match the path to the `.env` file.

5. **Update configuration files** in `FirebaseConfig.js`, update the `firebaseConfig` object with the secret key information from your Firebase project.

## Running the App

To run the app, open two terminal windows: one for the Express app and another for the React Native Expo app.

### Running the Express App

Navigate to the backend directory:

```bash
cd PostOfficePackageHelper/postal-carrier-app-backend
npm install
npm start
```

### Forward the development port using Ngrok

React Native needs to be able to interact with the Express API via a port forwarded url that uses HTTPS.

To get around this we can forward http://localhost:3000 using Ngrok.

Open the Ngrok app and enter:

```bash
ngrok http 3000
```
Take the url it gives you and enter it into the DEV_API_BASE_URL variable located at PostOfficePackageHelper/config.js.

### Running the React Native Expo App

Navigate to the base directory:

```bash
cd ..
```

Run the following commands for Expo Go users only:
```bash
npx expo login -u <Expo username> -p <Expo password>
npm i
npm start
```

When the CLI opens and you are greeted with options for different methods for running the app. The choice is really up to you for how to do this, but I recommend opening the Expo Go app on your mobile device and running the development server shown within the app. This is the fastest way to start using the app.