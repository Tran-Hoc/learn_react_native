import { Image } from "expo-image";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import axios from "axios";

const BasicFetchRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

const HandingDiffHTTPMethod = () => {
  const [response, setResponse] = useState(null);

  const postData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "JHSon hehe", email: "jkask@hehe.com" }),
    })
      .then((response) => response.json())
      .then((json) => {
        setResponse(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Post data" onPress={postData} />
      {response && <Text>{JSON.stringify(response)}</Text>}
    </View>
  );
};

const HandingError = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://example.com/api")
      .then((response) => response.json())
      .then((json) => {
        setResponse(json);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text> Loading ...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text> Error: {error?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(response)}</Text>
    </View>
  );
};

const BasicAxios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <ActivityIndicator style={styles.center} size="large" color="green" />
    );
  if (error)
    return <Text style={styles.center}> Error: {error?.message} </Text>;
  return (
    <View>
      <Text></Text>
      <Text>{data?.body}</Text>
    </View>
  );
};

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fetch basic!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle"></ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">
            <BasicFetchRequest />
          </ThemedText>{" "}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fetch - POST!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle"></ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">
            <HandingDiffHTTPMethod />
          </ThemedText>{" "}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fetch - Error!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle"></ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">
            <HandingError />
          </ThemedText>{" "}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Axios!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle"></ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">
            <BasicAxios />
          </ThemedText>{" "}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
