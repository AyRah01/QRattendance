import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function useStorage() {
    async function save(key, value) {
     //   await SecureStore.setItemAsync(key, value);
        try {
          await AsyncStorage.setItem(
            key,
            value,
          );
        } catch (error) {
          // Error saving data
          console.log(error)
        }
      }
      
      async function getValueFor(key) {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // We have data!!
            return value
            console.log(value);
          }
        } catch (error) {
          return false
          // Error retrieving data
        }

        // let result = await SecureStore.getItemAsync(key);
        // if (result) {
        //   return result
        // } else {
        //   return false
        // }
      }
  return {save, getValueFor}
}