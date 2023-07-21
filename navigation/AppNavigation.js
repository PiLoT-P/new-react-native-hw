import 'react-native-gesture-handler';
import {StyleSheet } from 'react-native';
import Registration from '../Screens/RegistrationScreen';
import Login from '../Screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../Screens/signedIn/Home';
import Comments from '../Screens/signedIn/CommentsScreen';
import Map from '../Screens/signedIn/MapScreen';
import { useSelector } from 'react-redux';
import { selectIsSignedIn } from '../redus/auth/authSelector';

const MainStack = createStackNavigator();

export default function AppNavigation() {

  const isSignedIn = useSelector(selectIsSignedIn); 

  return (
        <NavigationContainer>
          {isSignedIn === true ?
            <MainStack.Navigator>
            <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <MainStack.Screen name="Comments" component={Comments} options={{
              title: "Коментарі",
              headerStyle: {
                borderBottomWidth: 0.5,
                borderBottomColor: '#0000004d',
              },  
              headerTitleStyle: {
                marginLeft: '40%',
                color: '#212121',
                fontFamily: 'Roboto-Medium',
                fontSize: 17,
                fontWeight: 500,
                lineHeight: 22,
              },
            }} />
            <MainStack.Screen name="Map" component={Map} options={{
              title: "Карта",
              headerStyle: {
                borderBottomWidth: 0.5,
                borderBottomColor: '#0000004d',
              },  
              headerTitleStyle: {
                marginLeft: '51%',
                color: '#212121',
                fontFamily: 'Roboto-Medium',
                fontSize: 17,
                fontWeight: 500,
                lineHeight: 22,
              },
            }}/>
            </MainStack.Navigator>
            :
            <MainStack.Navigator initialRouteName="Login">
              <MainStack.Screen name="Login" component={Login} options={{headerShown: false}}/>
              <MainStack.Screen name="Registration" component={Registration} options={{headerShown: false}}/>
            </MainStack.Navigator>
          }
        </NavigationContainer>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
