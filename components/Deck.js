import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { primary, gray, primaryDark, black, red, white } from '../utils/colors'
import Quiz from './Quiz'
import AddDeck from './AddCard'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import { deleteDeck } from '../actions'
import { removeDeck } from '../utils/storage'

class Deck extends Component {
	state = {
		showDelete: false,
	}
	onPressDeck = () => {
		const { navigation, id, deck } = this.props
		return navigation.navigate(
			'Quiz',
			{
				id,
				title: deck.title,
			}
		)
	}
	onPressAdd = () => {
		const { navigation, id, deck } = this.props
		return navigation.navigate(
			'AddCard',
			{
				id,
				title: deck.title,
			}
		)
	}
	onSwipeLeft(gestureState) {
    this.setState({showDelete: true})
  }

  onSwipeRight(gestureState) {
    this.setState({showDelete: false})
  }
	onPressDelete = () => {
		const { id, deleteDeck } = this.props
		console.log(id)
		deleteDeck(id)
		removeDeck(id)
	}
	render () {
		const { showDelete } = this.state
		const { id, deck, navigation } = this.props
		const deckSize = Object.keys(deck.questions).length
		const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    }
		return (
			<GestureRecognizer
				onSwipeLeft={(state) => this.onSwipeLeft(state)}
				onSwipeRight={(state) => this.onSwipeRight(state)}
				config={config}
				style={{ flex: 1 }}
			>
			<View style={styles.deckContainer}>
				<TouchableOpacity style={styles.row} onPress={this.onPressDeck}>
					<FontAwesome
						style={styles.icon}
						name='clone'
						size={30}
						color={primary}
					/>
					<Text style={styles.num}>{deckSize}</Text>
					<Text style={styles.text}>{deck.title}</Text>
				</TouchableOpacity>
				{showDelete
					? <TouchableOpacity
							style={styles.deleteBtn}
							onPress={this.onPressDelete}
						>
							<Text style={styles.deleteText}>Delete</Text>
						</TouchableOpacity>
					: <TouchableOpacity style={styles.addBtn} onPress={this.onPressAdd}>
							<Ionicons
								style={styles.icon}
								name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
								size={40}
								color={black}
							/>
						</TouchableOpacity>
				}
			</View>
			</GestureRecognizer>
		)
	}
}

styles = StyleSheet.create({
	deckContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: gray,
		height: 60,
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	icon: {
		paddingHorizontal: 12,
	},
	num: {
		color: primaryDark,
		marginRight: 8,
		width: 30,
		textAlign: 'center',
	},
	text: {
		fontSize: 20,
	},
	addBtn: {
		padding: 10,
	},
	deleteContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: gray,
	},
	deleteText: {
		fontSize: 20,
		color: white,
		paddingHorizontal: 18,
	},
	deleteBtn: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: red,
	}
})

function mapStateToProps (decks, { id, navigation }) {
	const deck = decks[id]
	return {
		deck,
		navigation,
	}
}

export default connect(
	mapStateToProps,
	{ deleteDeck },
)(Deck)
