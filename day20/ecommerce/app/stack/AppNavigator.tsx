import { RootStackParamList } from "@/navigation/RootStackParamList";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductList from "../screen/ProductList";
import ProductDetail from "../screen/ProductDetail";
import Cart from "../screen/Cart";
import Checkout from "../screen/Checkout";
import { Provider } from "react-redux";
import { store } from "../store";
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </Provider>
  );
};

export default AppNavigator;
