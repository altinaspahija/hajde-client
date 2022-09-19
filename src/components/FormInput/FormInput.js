
import React from 'react';
import { Input, Icon } from "react-native-elements";
import { useTheme } from '@/hooks';

export default (props) => {
    const { icon, refInput, colorIcon = "#FFF", placeholderTextColor="#707070", maxLength = 40, autoFocus, ...otherProps } = props;
    const { Common } = useTheme();
    const { login } = Common;
    
    return (
      <Input
        {...otherProps}
        ref={refInput}
        inputContainerStyle={login.inputContainer}
        // leftIcon={icon === undefined ? null : 
        //   <Icon name={icon} type={"simple-line-icon"} color={colorIcon} size={18} /> 
        // }
        inputStyle={[login.inputStyle, props.inputStyle]}
        autoFocus={autoFocus}
        autoCapitalize="none"
        keyboardAppearance="dark"
        errorStyle={login.errorInputStyle}
        autoCorrect={false}
        blurOnSubmit={false}
        placeholderTextColor={placeholderTextColor}
        maxLength={maxLength}
      />
    );
  };