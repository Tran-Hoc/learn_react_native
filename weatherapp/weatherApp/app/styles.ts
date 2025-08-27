import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  centeredContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    width: "100%",
    borderColor: "#228B22",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    color: "#228B22",
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#228B22",
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
    alignItems: "center",
  },
  forecastCard: {
    marginVertical: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
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
    color: "#228B22",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#228B22",
    marginTop: 4,
  },
  weatherText: {
    color: "#228B22",
    fontSize: 15,
    marginBottom: 6,
    textAlign: "center",
  },
});

export default styles;
