import { Platform, StyleSheet } from "react-native";

const lightColors = {
  background: "#fff",
  text: "#000",
  card: "#f9f9f9",
  border: "#ddd",
  button: "#26a059ff",
  borderColor: "#382c2cff",
};
const darkColors = {
  background: "#000000",
  text: "#fff",
  card: "#1e1e1e",
  border: "#444",
  button: "#333",
  borderColor: "#ddccccff",
};

const getStyles = (darkMode: boolean) => {
  const colors = darkMode ? darkColors : lightColors;
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      padding: 20,
      backgroundColor: colors.background,
    },
    centeredContent: {
      alignItems: "center",
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 20,
      textAlign: "center",
    },
    input: {
      height: 45,
      width: "100%",
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 20,
      color: colors.text,
      fontSize: 16,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.button,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginVertical: 6,

      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 3,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
        },
      }),
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    weatherInfo: {
      marginTop: 20,
      padding: 16,
      marginBottom: 65,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    forecastCard: {
      marginVertical: 10,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      backgroundColor: colors.background,
      alignItems: "center",
      width: "90%",
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 3,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
        },
      }),
    },
    heading: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
      textAlign: "center",
    },
    subheading: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginTop: 4,
    },
    weatherText: {
      color: colors.text,
      fontSize: 15,
      marginBottom: 6,
      textAlign: "center",
    },
  });
};
export default getStyles;
