// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './.env';

export const environment = {
  production: false,
  hmr: true,
  version: env.npm_package_version + '-dev',
  serverUrl: '/api',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'fr-FR'],
  firebase: {
    apiKey: 'AIzaSyCfXyyX8659PT2dc87yCp9695bj6HOT1jE',
    authDomain: 'torahvote.firebaseapp.com',
    databaseURL: 'https://torahvote.firebaseio.com',
    projectId: 'torahvote',
    storageBucket: 'torahvote.appspot.com',
    messagingSenderId: '466177246794',
    appId: '1:466177246794:web:aeb82becff550f76f908b3',
    measurementId: 'G-CDBF02PZ8M'
  },
  readsHash: [
    {
      sefer: 1,
      seferEnName: 'Genesis',
      seferHeName: 'בראשית',
      numOfPrakim: 50,
      readedPrakim: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    {
      sefer: 2,
      seferEnName: 'Exodus',
      seferHeName: 'שמות',
      numOfPrakim: 40,
      readedPrakim: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    {
      sefer: 3,
      seferEnName: 'Leviticus',
      seferHeName: 'ויקרא',
      numOfPrakim: 27,
      readedPrakim: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    {
      sefer: 4,
      seferEnName: 'Numbers',
      seferHeName: 'במדבר',
      numOfPrakim: 36,
      readedPrakim: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    {
      sefer: 5,
      seferEnName: 'Deuteronomy',
      seferHeName: 'דברים',
      numOfPrakim: 34,
      readedPrakim: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
