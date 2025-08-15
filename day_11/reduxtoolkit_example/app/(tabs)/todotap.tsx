
import { Provider } from "react-redux";
import { store } from "../../store/store";
import TodoScreen from "@/components/TodoScreen";

export default function TodoTab() {
  return (
    <Provider store={store}>
      <TodoScreen />
    </Provider>
  );
}


