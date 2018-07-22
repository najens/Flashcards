import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { primary } from '../utils/colors'
import SubmitBtn from './SubmitBtn'
import { addCard } from '../actions'
import { submitCard } from '../utils/storage'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'

const defaultState = {
	question: '',
	answer: '',
}

class AddCard extends Component {
	state = defaultState

	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params
		return {
			title,
		}
	}
	handleQuestionChange = (question) => {
		this.setState({
			question,
		})
	}
	handleAnswerChange = (answer) => {
		this.setState({
			answer,
		})
	}
	submit = () => {
		const { question, answer } = this.state
    const { addCard, id } = this.props
    const key = Date.now()
		card = { question, answer }

    addCard(id, {
      [key]: card,
    })

    this.setState({
      ...defaultState,
    })

		this.toHome()

    submitCard({ id, key, card })

		clearLocalNotification()
			.then(setLocalNotification())
	}
	toHome = () => {
		const { navigation } = this.props
		navigation.dispatch(NavigationActions.back({
			key: 'AddCard'
		}))
	}
	render () {
		const { question, answer } = this.state
		return (
			<View style={styles.container}>
				<TextInput
          style={styles.input}
          autoFocus={true}
          placeholder='Question'
          value={ question }
          onChangeText={(question) => this.handleQuestionChange(question)}
				/>
				<TextInput
          style={styles.input}
          placeholder='Answer'
          value={ answer }
          onChangeText={(answer) => this.handleAnswerChange(answer)}
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

const mapStateToProps = (state, props) => {
	if (props.navigation) {
		return {
			...props.navigation.state.params
		}
	} else {
		return {}
	}
}

export default connect(
	mapStateToProps,
	{ addCard }
)(AddCard)
