import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import Router from './src/router/Router';
import {useSelector} from 'react-redux';
import BottomPlayer from './src/components/BottomPlayer';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={{colors: {background: '#1C1B1B'}}}>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
