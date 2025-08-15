import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { enhancedStore, persistor } from "../store/enhancedStore";
import MainApp from "./MainApp";

const LoadingView: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

const EnhancedApp: React.FC = () => {
  return (
    <Provider store={enhancedStore}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default EnhancedApp;
