import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  clearError,
  fectchUser,
  login,
  logout,
  updateUserProfile,
} from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

const UserScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser, isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.user
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);
  const handlerFetchUser = (): void => {
    dispatch(fectchUser(1));
  };

  const handleUpdateProfle = (): void => {
    dispatch(updateUserProfile({ name, email }));
    setEditMode(false);
  };

  const handleLogin = (): void => {
    dispatch(
      login({ id: 1, name: "Demoe euyuse user", email: "demio@meme.mooi" })
    );
  };

  const handlerCancelEdit = (): void => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
    }
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>User Management</Text>
        <ActivityIndicator size="large" color="#00ff40ff" />
        <Text style={styles.loadingText}>Loading ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> User management</Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}> {error} </Text>
          <TouchableOpacity onPress={() => dispatch(clearError())}>
            <Text style={styles.clearError}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isAuthenticated ? (
        <View style={styles.loginContainer}>
          <Text style={styles.subtitle}> Not logged</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Quick login </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlerFetchUser}>
            <Text style={styles.buttonText}>Fetch User </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userContainer}>
          <Text style={styles.subtitle}> Welcome, {currentUser?.name}!</Text>
          {editMode ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleUpdateProfle}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelbutton}
                  onPress={handlerCancelEdit}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.profileContainer}>
              <Text style={styles.profileText}>Name: {currentUser?.name}</Text>
              <Text style={styles.profileText}>
                Email: {currentUser?.email}
              </Text>
              <Text style={styles.profileText}>ID: {currentUser?.id}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setEditMode(true)}
                >
                  <Text style={styles.buttonText}> Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.logoutbutton}
                  onPress={() => dispatch(logout())}
                >
                  <Text style={styles.buttonText}> Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default UserScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  loadingText: { textAlign: "center", marginTop: 10, fontSize: 16 },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText: {
    color: "#C62828",
    flex: 1,
  },
  clearError: { color: "#007AFF" },
  loginContainer: { alignItems: "center" },
  subtitle: { fontSize: 18, textAlign: "center", marginBottom: 15 },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    margin: 5,
  },
  cancelbutton: {
    backgroundColor: "#ff0000ff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    margin: 5,
  },
  logoutbutton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  userContainer: { alignItems: "center" },
  editContainer: { width: "100%" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonRow: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  profileContainer: { width: "100%", alignItems: "center" },
  profileText: { fontSize: 16, alignItems: "center" },
});
