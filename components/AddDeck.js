import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { primary } from '../utils/colors'
import SubmitBtn from './SubmitBtn'
import { addDeck } from '../actions'
import { submitDeck } from '../utils/storage'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
	state = {
		deck: '',
	}
	handleNameChange = (name) => {
		this.setState({
			deck: name,
		})
	}
	submit = () => {
		const { deck } = this.state
    const { addDeck } = this.props
    const key = Date.now()

    addDeck({
      [key]: {
				title: deck,
				questions: {},
			}
    })

    this.setState({
      deck: '',
    })

		this.toHome()

    submitDeck({ key, deck })

		clearLocalNotification()
			.then(setLocalNotification())
	}
	toHome = () => {
		const { navigation } = this.props
		navigation.dispatch(NavigationActions.back({
			key: 'AddDeck'
		}))
	}
	render () {
		const { deck } = this.state
		return (
			<View style={styles.container}>
				<TextInput
          style={styles.input}
          autoFocus={true}
          placeholder='Deck Name'
          value={ deck }
          onChangeText={(text) => this.handleNameChange(text)}
				/>
				<SubmitBtn onPress={this.submit} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		fontSize: 30,
		marginBottom: 30,
	}
})

export default connect(null, { addDeck })(AddDeck)
