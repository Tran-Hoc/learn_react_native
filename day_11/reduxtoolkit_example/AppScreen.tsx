import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MainApp from "./components/MainApp";

const AppScreen: React.FC = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default AppScreen;
