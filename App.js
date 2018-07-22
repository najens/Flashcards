import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import { createStackNavigator } from 'react-navigation'
import { View } from 'react-native'
import Tabs from './components/Tabs'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import FCStatusBar from './components/FCStatusBar'
import { setLocalNotification } from './utils/helpers'
import { white, primary } from './utils/colors'

const store = createStore(reducer, middleware)

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: primary,
      }
    }
  }
})

class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FCStatusBar backgroundColor={primary} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

export default App
