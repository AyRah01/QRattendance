import React from 'react'
import * as SecureStore from 'expo-secure-store';


export default function useStorage() {
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }
      
      async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
          return result
        } else {
          return false
        }
      }
  return {save, getValueFor}
}