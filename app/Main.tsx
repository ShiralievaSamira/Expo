import React from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import uuid from 'uuid/v1';
import Header from './components/Header';
import Input from './components/Input';
import List from './components/List';
import SubTitle from './components/SubTitle';
import { MaterialIcons } from '@expo/vector-icons';

export interface IItemState {
    inputValue: string,
    loadingItems: boolean,
    allItems: Object,
    isCompleted: boolean
}

export default class Main extends React.Component<{}, IItemState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      inputValue: '',
      loadingItems: false,
      allItems: {},
      isCompleted: false
    }
  }
  componentDidMount = () => {
    this.loadingItems();
  };
  newInputValue = value => {
    this.setState({
      inputValue: value
    });
  };
  loadingItems = async () => {
      const _allItems = await AsyncStorage.getItem('ToDos');
      this.setState({
        loadingItems: true,
        allItems: JSON.parse(_allItems) || {}
      });
  };
  onDoneAddItem = () => {
    const { inputValue } = this.state;
    if (inputValue !== '') {
      this.setState(prevState => {
        const id = uuid();
        const newItemObject = {
          [id]: {
            id,
            isCompleted: false,
            text: inputValue,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          inputValue: '',
          allItems: {
            ...prevState.allItems,
            ...newItemObject
          }
        };
        this.saveItems(newState.allItems);
        return { ...newState };
      });
    }
  };
  deleteItem = id => {
    this.setState(prevState => {
      const allItems = prevState.allItems;
      delete allItems[id];
      const newState = {
        ...prevState,
        ...allItems
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  };
  completeItem = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          [id]: {
            ...prevState.allItems[id],
            isCompleted: true
          }
        }
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  };
  incompleteItem = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          [id]: {
            ...prevState.allItems[id],
            isCompleted: false
          }
        }
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  };
  deleteAllItems = async () => {
      await AsyncStorage.removeItem('ToDos');
      this.setState({ allItems: {} });
  };
  saveItems = newItem => {
    const saveItem = AsyncStorage.setItem('To Dos', JSON.stringify(newItem));
  };
  render() {
    const { inputValue, loadingItems, allItems } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.centered}>
          <Header title={'Notes'} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            inputValue={inputValue}
            onChangeText={this.newInputValue}
            onDoneAddItem={this.onDoneAddItem}
          />
        </View>
        <View style={styles.list}>
          <View style={styles.column}> 
          <View style={styles.title}>
            <SubTitle subtitle={'Recent notes'} />
            </View>
              <View style={styles.deleteAllButton}>
                <TouchableOpacity onPress={this.deleteAllItems}>
                  <MaterialIcons
                    name="delete-sweep"
                    size={24}
                    color={'#FFFFFF'}
                  />
                </TouchableOpacity>
              </View>       
          </View>
          {loadingItems ? (
            <ScrollView contentContainerStyle={styles.scrollableList}>
              {Object.values(allItems)
                .reverse()
                .map(item => (
                  <List
                    key={item.id}
                    {...item}
                    deleteItem={this.deleteItem}
                    completeItem={this.completeItem}
                    incompleteItem={this.incompleteItem}
                  />
                ))}
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BFE0EE',
    flex: 1
  },
  centered: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 40,
    paddingLeft: 15
  },
  list: {
    flex: 1,
    marginTop: 70,
    paddingLeft: 15,
    marginBottom: 10
  },
  scrollableList: {
    marginTop: 15
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  deleteAllButton: {
    marginRight: 30,
    marginTop: 30
  },
  title: {
    marginRight: 10
  }
});