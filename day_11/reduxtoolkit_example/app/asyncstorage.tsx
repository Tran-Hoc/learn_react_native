import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

function NoteScreen() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem("day1");
        if (value !== null) setData(value);
      } catch (e) {}
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("day2", data);
      } catch (e) {}
    };
    saveData();
  }, [data]);

  return null;
}

export default NoteScreen;

async function test() {
  const user = {
    name: "Jonse Cena",
    age: 30,
    isStudent: false,
  };

  let jsonVal = JSON.stringify(user);
  await AsyncStorage.setItem("user", jsonVal);
  let data = (await AsyncStorage.getItem("user")) || "";
  const objVal = JSON.parse(data);
  return objVal;
}

async function test2() {
  const todos = [
    { id: 1, text: "Học React Native", completed: false },
    { id: 2, text: "Viết app đầu tiên", completed: true },
  ];
  let jsonVal = JSON.stringify(todos);
  await AsyncStorage.setItem("todos", jsonVal);
  let data = (await AsyncStorage.getItem("todos")) || "";
  const objVal = JSON.parse(data);
  return objVal;
}
