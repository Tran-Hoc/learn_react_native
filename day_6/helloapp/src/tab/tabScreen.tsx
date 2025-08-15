import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../stack/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingScreen from './SettingScreen';
import DetailScreen from './DetailScreen';

const Tab = createBottomTabNavigator();
export default function TabScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
        <Tab.Screen name="Detail" component={DetailScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
