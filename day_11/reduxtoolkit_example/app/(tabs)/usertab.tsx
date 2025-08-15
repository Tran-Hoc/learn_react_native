
import UserScreen from "@/components/UserScreen";

import { Provider } from "react-redux";
import { store } from "../../store/store";

export default function TabTwoScreen() {
  return (
    <Provider store={store}>
      <UserScreen />
    </Provider>
  );
}


