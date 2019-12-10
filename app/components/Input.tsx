import React, {Component} from 'react';
import { StyleSheet, TextInput } from 'react-native';

export interface IInputProps {
  inputValue: string;
  onChangeText: any;
  onDoneAddItem: any;
}

class Input extends Component<IInputProps, {}> {
  render() {
    const { inputValue, onChangeText, onDoneAddItem } = this.props;
    return (
    <TextInput
      style={styles.input}
      value={inputValue}
      onChangeText={onChangeText}
      placeholder="Type here to add note"
      placeholderTextColor={'#ecbfbe'}
      multiline={true}
      autoCapitalize="sentences"
      underlineColorAndroid="transparent"
      selectionColor={'white'}
      maxLength={30}
      returnKeyType="done"
      autoCorrect={false}
      blurOnSubmit={true}
      onSubmitEditing={onDoneAddItem}
    />
    )
  }
};
const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 34,
    color: 'white',
    fontWeight: '500'
  }
});
export default Input;
