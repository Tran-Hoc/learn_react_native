import * as React from "react";
import { Text, View, Button } from "react-native";
import {  useNavigation } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";

// Define the navigation parameter list
type RootDrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

// Create typed drawer navigator
const Drawer = createDrawerNavigator<RootDrawerParamList>();

// Type for navigation prop
type DrawerNavProp = DrawerNavigationProp<RootDrawerParamList>;

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

function HomeScreen() {
  const navigation = useNavigation<DrawerNavProp>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

function ProfileScreen() {
  const navigation = useNavigation<DrawerNavProp>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <MyDrawer />
    // <NavigationContainer>

    // </NavigationContainer>
  );
}
