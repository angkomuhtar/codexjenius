import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './presentations/screen/home.screen';
import {Provider} from 'react-redux';
import {store} from './applications/utils/store';
import Create from './presentations/screen/create.screen';
import {navigationRef} from './applications/utils/rootNavigation';
import Edit from './presentations/screen/edit.screen';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="create" component={Create} />
          <Stack.Screen name="edit" component={Edit} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
