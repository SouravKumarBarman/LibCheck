import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserRole = async (role) => {
  await AsyncStorage.setItem('userRole', role);
};

export const getUserRole = async () => {
  return await AsyncStorage.getItem('userRole');
};

export const clearUserRole = async () => {
  await AsyncStorage.removeItem('userRole');
};
