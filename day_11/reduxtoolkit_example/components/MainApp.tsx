import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CounterScreen from "./CouterScreen";

const MainApp: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CounterScreen />
        {/* <UserScreen />
        <TodoScreen /> */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default MainApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 16,
  },
});
