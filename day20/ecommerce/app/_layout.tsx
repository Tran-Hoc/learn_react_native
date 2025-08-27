import { Provider } from "react-redux";
import { store } from "@/src/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/RootStackParamList";
import ProductList from "./(screens)/ProductList";
import ProductDetail from "./(screens)/ProductDetail";
import Cart from "./(screens)/Cart";
import Checkout from "./(screens)/Checkout";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
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
}
