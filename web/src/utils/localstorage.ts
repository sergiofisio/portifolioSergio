import AsyncStorage from "@react-native-async-storage/async-storage";

async function getItem(key: string) {
  return await AsyncStorage.getItem(key);
}

async function setItem(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

async function removeItem(key: string) {
  await AsyncStorage.removeItem(key);
}

async function clear() {
  await AsyncStorage.clear();
}

export { getItem, setItem, removeItem, clear };
