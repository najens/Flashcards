import React from 'react'
import {
	createBottomTabNavigator,
	createMaterialTopTabNavigator
} from 'react-navigation'
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { primary, white } from '../utils/colors'

const routeConfigs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
				<Ionicons
					name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
					size={30}
					color={tintColor}
				/>
			),
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => (
				<FontAwesome name='plus-square' size={30} color={tintColor} />
			),
    }
  }
}

const tabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? primary : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : primary,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
}

let Tabs
if (Platform.OS === 'ios') {
  Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig)
} else {
  Tabs = createMaterialTopTabNavigator(routeConfigs, tabNavigatorConfig)
}

export default Tabs
