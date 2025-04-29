import React from "react";

import { View, StyleSheet } from "react-native";

import Button from './src/components/button'
import Input from "./src/components/input";


export default function App() {
  return (
    <View style={styles.container}>

      <Input />
      <Input />
      <Button />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
    flex: 1,
    padding: 32
  }
})