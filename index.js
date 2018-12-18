/** @format */

import { AppRegistry } from 'react-native';
// import App from './App';
import Entrypoint from './app/Entrypoint';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Entrypoint);
