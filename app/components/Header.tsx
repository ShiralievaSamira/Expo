import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface IHeaderProps {
  title: string;
}

class Header extends Component<IHeaderProps, {}> {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title.toUpperCase()}</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 40
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '500'
  }
});
export default Header;
