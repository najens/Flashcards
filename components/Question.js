import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { darkGray } from '../utils/colors'

const Question = ({ question, num, deckSize }) => {
	return (
		<View style={{ flex: 1 }}>
			<Text style={styles.num}>{`${num}/${deckSize}`}</Text>
			<View style={styles.container}>
				<Text style={styles.question}>{question}</Text>
				<Text style={styles.type}>Question</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	num: {
		padding: 8,
		fontSize: 18,
	},
	question: {
		fontSize: 48,
	},
	type: {
		fontSize: 24,
		color: darkGray,
	}
})

export default Question
