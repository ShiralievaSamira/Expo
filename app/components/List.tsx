import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export interface ICompletedProps {
  id: string | number,
  incompleteItem: (id: string | number) => void;
  completeItem: (id: string | number) => void;
  deleteItem: (id: string | number) => void;
  text: string;
  isCompleted: boolean;
}

const { height, width } = Dimensions.get('window');
class List extends Component<ICompletedProps, {}> {
  onToggleCircle = () => {
    const {incompleteItem, completeItem, id, isCompleted} = this.props;
      if (isCompleted) {
        incompleteItem(id);
      } else {
        completeItem(id);
      }
  };
  render() {
    const { text, deleteItem, id, isCompleted } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this.onToggleCircle}>
            <View
              style={[
                styles.circle,
                isCompleted
                  ? { borderColor: '#90ee90' }
                  : { borderColor: '#ecbfbe' }
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              isCompleted
                ? {
                    color: '#c4c4cc',
                    textDecorationLine: 'line-through'
                  }
                : { color: '#555555' }
            ]}
          >{text}
          </Text>
        </View>
        {isCompleted ? (
          <View style={styles.button}>
            <TouchableOpacity onPressOut={() => deleteItem(id)}>
              <MaterialIcons
                name="delete-forever"
                size={24}
                color={'#bc2e4c'}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width - 50,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    height: width / 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 1.5
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 15
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    margin: 10
  },
  button: {
    marginRight: 10
  }
});
export default List;