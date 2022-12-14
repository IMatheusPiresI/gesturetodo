import React from 'react';
import {Home} from './src/screens/Home';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Home />
    </GestureHandlerRootView>
  );
};

export default App;
