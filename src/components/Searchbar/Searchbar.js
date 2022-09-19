import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import styles from "./styles";
export default function Searchbar(props) {
  const [value, onChangeText] = useState("");

  return (
    <SearchBar
      {...props}
      placeholder={props.placeholder ? props.placeholder : "Kërko"}
      autoFocus={props.foucus}
      lightTheme
      round
      leftIcon={props.leftIcon}
      leftIconContainerStyle={props.leftIconContainerStyle}
      containerStyle={[styles.container, props.containerStyle]}
      inputContainerStyle={[styles.input, props.inputContainerStyle]}
      onChangeText={text => {
        props.onSubmitEditing(text)
        onChangeText(text)
      }}
      value={value}
      onSubmitEditing={() => props.onSubmitEditing(value)}
    />
  );
}
