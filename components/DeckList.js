import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { receiveDecks } from '../actions'
import { fetchDeckResults } from '../utils/storage'
import { View, FlatList } from 'react-native'
import { primary } from '../utils/colors'
import { AppLoading } from 'expo'
import Deck from './Deck'

class DeckList extends Component {
	state = {
		ready: false,
	}
	componentDidMount () {
		const { receiveDecks } = this.props
		fetchDeckResults()
			.then((decks) => receiveDecks(decks))
			.catch((error) => {
				console.log(error)
			})
			.then(() => this.setState((prevState) => ({
				ready: !prevState.ready,
			})))
	}
	render () {
		const { deckIds, navigation } = this.props
		const { ready } = this.state
		let ids = []
		for (let i = 0; i < deckIds.length; i++) {
			ids.push({key: deckIds[i]})
		}

		if (ready === false) {
			return <AppLoading />
		}
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={ids}
					renderItem={({ item }) => (
						<Deck id={item.key} navigation={navigation} />
					)}
				/>
			</View>
		)
	}
}

function mapStateToProps (decks) {
	return {
		deckIds: Object.keys(decks)
	}
}

export default connect(
	mapStateToProps,
	{ receiveDecks }
)(DeckList)
