import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Todo {
  id: string;
  text: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  // 🔹 Load dữ liệu khi app mở
  useEffect(() => {
    const loadTodos = async () => {
      const saved = await AsyncStorage.getItem("todos");
      if (saved) setTodos(JSON.parse(saved));
    };
    loadTodos();
  }, []);

  // 🔹 Lưu dữ liệu mỗi khi todos thay đổi
  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text }]);
    setText("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter task..."
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10, color: "white" }}
      />
      <Button title="Add" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white" }}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
