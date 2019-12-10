import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface ISubtitleProps {
  subtitle: string;
}

class SubTitle extends Component<ISubtitleProps, {}>{
  render() {
    const { subtitle } = this.props;
    return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{subtitle.toUpperCase()}</Text>
    </View>
    )
  }
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 40
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
});
export default SubTitle;
