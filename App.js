import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {
  Header,
  Left,
  Body,
  Title,
  Button,
  Icon,
  Text
} from 'native-base';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import commonColor from './native-base-theme/variables/commonColor';


const Stack = createStackNavigator();

const CustomHeader = ({scene, previous, navigation}) => {
  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Header>
      <Left>
        {previous ? (
          <Button transparent onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </Button>
        ) : (
          undefined
        )}
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
    </Header>
  );
};

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <StyleProvider style={getTheme(commonColor)}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Root" 
            component={BottomTabNavigator}
            options={{
              header: (props) => <CustomHeader {...props} />,
            }}
             />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
