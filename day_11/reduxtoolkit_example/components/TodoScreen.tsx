import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addTodo,
  clearCompleted,
  fetchTodos,
  removeTodo,
  setFilter,
  toggleTodo,
} from "@/store/slices/todosSlice";
import { Todo, TodoFilter } from "@/type";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ListRenderItem,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";

const TodoScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, filter } = useAppSelector(
    (state) => state.todos
  );
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (): void => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo("");
    }
  };

  const filteredTodos = items.filter((todo: Todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const renderTodo: ListRenderItem<Todo> = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoCheckbox}
        onPress={() => dispatch(toggleTodo(item.id))}
      >
        <View style={[styles.checkbox, item.completed && styles.checkedBox]}>
          {item.completed && <Text style={styles.checkMark}>√</Text>}
        </View>
      </TouchableOpacity>

      <Text style={[styles.todoText, item.completed && styles.completedText]}>
        {item.text}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => dispatch(removeTodo(item.id))}
      >
        <Text style={styles.deleteText}>x</Text>
      </TouchableOpacity>
    </View>
  );

  const filterOptions: TodoFilter[] = ["all", "active", "completed"];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo list</Text>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}> Loading Todo ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo.."
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {filterOptions.map((filterType) => (
          <TouchableOpacity
            key={filterType}
            style={[
              styles.filterButton,
              filter === filterType && styles.activeFilter,
            ]}
            onPress={() => dispatch(setFilter(filterType))}
          >
            <Text
              style={[
                styles.filterText,
                filter === filterType && styles.activeFilterText,
              ]}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTodos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id.toString()}
        style={styles.todoList}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {items.filter((todo) => !todo.completed).length} active,{" "}
          {items.length} total
        </Text>

        {items.some((todo) => todo.completed) && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => dispatch(clearCompleted())}
          >
            <Text style={styles.clearButtonText}> Clear completed</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TodoScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    maxHeight: 500,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  inputContainer: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  activeFilter: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    color: "#333",
  },
  activeFilterText: {
    color: "white",
    fontWeight: "bold",
  },

  todoList: {
    flex: 1,
    marginBottom: 15,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  todoCheckbox: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#060707ff",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    borderColor: "#060707ff",
    backgroundColor: "#007AFF",
  },
  checkMark: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  todoText: { flex: 1, fontSize: 16 },
  completedText: { textDecorationLine: "line-through", color: "#999" },
  deleteButton: { padding: 5 },
  deleteText: { color: "#FF3B30", fontSize: 18, fontWeight: "bold" },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsText: { color: "#666", fontSize: 14 },
  clearButton: {
    backgroundColor: "#FF9500",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  clearButtonText: { color: "white", fontSize: 12, fontWeight: "bold" },

  errorContainer: {
    backgroundColor: "#FFEBEE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },

  errorText: { color: "#C62828", textAlign: "center" },
});
