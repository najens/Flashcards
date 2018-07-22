import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { primaryDark, primary, white, black } from '../utils/colors'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import Question from './Question'
import Answer from './Answer'
import { Ionicons } from '@expo/vector-icons'

class Quiz extends Component {
	state = {
		questionNum: -1,
		isQuestion: true,
		score: 0,
	}
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params
		return {
			title,
		}
	}
	startQuiz = () => {
		this.setState({
			questionNum: 0,
		})
	}
	onSwipeLeft(gestureState) {
    this.setState({isQuestion: false})
  }

  onSwipeRight(gestureState) {
    this.setState({isQuestion: true})
  }
	onCorrectAnswer = () => {
		const { score } = this.state
		this.setState((prevState) => ({
			questionNum: prevState.questionNum + 1,
			isQuestion: true,
			score: prevState.score + 1,
		}))
	}
	onIncorrectAnswer = () => {
		this.setState((prevState) => ({
			questionNum: prevState.questionNum + 1,
			isQuestion: true,
		}))
	}
	onRetake = () => {
		this.setState({
			questionNum: 0,
			isQuestion: true,
			score: 0,
		})
	}
	onPressAdd = () => {
		const { navigation, deck, id } = this.props
		return navigation.navigate(
			'AddCard',
			{
				id,
				title: 'New Card',
			}
		)
	}
	render () {
		console.log(this.props)
		const { navigation, deck } = this.props
		const { questionNum, isQuestion, score } = this.state
		const deckSize = Object.keys(deck.questions).length
		const questionIds = Object.keys(deck.questions)
		const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    }
		const percent = (score * 100 / deckSize).toFixed(0)
		if (!deck) {
			return null
		}
		if (questionNum === -1) {
			return (
				<View style={{ flex: 1 }}>
					<View style={styles.addContainer}>
						<TouchableOpacity style={styles.addBtn} onPress={this.onPressAdd}>
								<Ionicons
									name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
									size={40}
									color={black}
								/>
							</TouchableOpacity>
					</View>
					<View style={styles.container}>
						<Text style={styles.heading}>{deck.title}</Text>
						<Text style={styles.subHeading}>{deckSize} cards</Text>
						{deckSize > 0 &&
							<TouchableOpacity style={styles.btn} onPress={this.startQuiz}>
								<Text style={styles.btnText}>Start Quiz</Text>
							</TouchableOpacity>
						}
					</View>
				</View>
			)
		}
		for (let i = 0; i < deckSize; i++) {
			const id = questionIds[i]
			const num = i + 1
			if (questionNum === i) {
				if (isQuestion) {
					return (
						<GestureRecognizer
							onSwipeLeft={(state) => this.onSwipeLeft(state)}
							onSwipeRight={(state) => this.onSwipeRight(state)}
							config={config}
							style={{ flex: 1 }}
						>
							<Question
								num={num}
								deckSize={deckSize}
								question={deck.questions[id].question}
							/>
						</GestureRecognizer>
					)
				}
				return (
					<GestureRecognizer
						onSwipeLeft={(state) => this.onSwipeLeft(state)}
						onSwipeRight={(state) => this.onSwipeRight(state)}
						config={config}
						style={{ flex: 1 }}
					>
						<Answer
							num={num}
							deckSize={deckSize}
							answer={deck.questions[id].answer}
							onCorrectAnswer={this.onCorrectAnswer}
							onIncorrectAnswer={this.onIncorrectAnswer}
						/>
					</GestureRecognizer>
				)
			}
		}


		return (
			<View style={styles.container}>
				<Text style={styles.scoreHeading}>Score</Text>
				<Text style={styles.score}>{`${score}/${deckSize}`}</Text>
				<Text style={styles.percent}>{`${percent}%`}</Text>
				<TouchableOpacity onPress={this.onRetake}>
					<Text style={styles.retake}>Retake?</Text>
				</TouchableOpacity>
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
	addContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	addBtn: {
		padding: 10,
	},
	heading: {
		fontSize: 36,
		marginBottom: 18,
	},
	subHeading: {
		fontSize: 24,
		color: primaryDark,
		marginBottom: 48,
	},
	btn: {
		backgroundColor: primary,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: primary,
	},
	btnText: {
		color: white,
		paddingHorizontal: 14,
		paddingVertical: 10,
	},
	scoreHeading: {
		fontSize: 48,
		marginBottom: 16,
	},
	score: {
		fontSize: 32,
		color: primaryDark,
		marginBottom: 16,
	},
	percent: {
		fontSize: 32,
		marginBottom: 48,
	},
	retake: {
		fontSize: 20,
		color: primary,
	}
})

const mapStateToProps = (decks, props) => {
	if (props.navigation) {
		const { id } = props.navigation.state.params
		const deck = decks[id]
		return {
			deck,
			id,
		}
	}
	return {}
}

export default connect(mapStateToProps)(Quiz)
