/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import {
  registerDependencies,
  registerFlyValue,
  container,
  AppDependencies,
} from '@di';
import {RootNavigator} from '@presentation';
import {StoreContainer} from '@shared-state';

registerDependencies();
registerFlyValue();
const App = () => {
  return (
    <Provider
      store={
        container.resolve<StoreContainer>(AppDependencies.StoreContainer).store
      }>
      <RootNavigator />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
