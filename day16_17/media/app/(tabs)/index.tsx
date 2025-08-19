import { Image } from "expo-image";
import { ActivityIndicator, Alert, Button, StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // xin quyền truy cập
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickPostImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("Không có ảnh để upload");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = await res.json();
      Alert.alert("Upload thành công", JSON.stringify(data, null, 2));
    } catch (err) {
      Alert.alert("Upload thất bại", err.message);
    } finally {
      setUploading(false);
    }
  };

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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image" onPress={pickImage} />
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        )}

        <Button title="Take a photo" onPress={takePhoto} />
        <Button title="Chọn ảnh" onPress={pickPostImage} />
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          />
        )}
        <Button
          title="Upload ảnh"
          onPress={uploadImage}
          disabled={!imageUri || uploading}
        />
        {uploading && (
          <ActivityIndicator style={{ marginTop: 10 }} size="large" />
        )}
      </View>
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
});
