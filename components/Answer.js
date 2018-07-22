import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { primaryDark, darkGray } from '../utils/colors'

const Answer = ({ answer, num, deckSize, onCorrectAnswer, onIncorrectAnswer }) => {
	return (
		<View style={{ flex: 1 }}>
			<Text style={styles.num}>{`${num}/${deckSize}`}</Text>
			<View style={styles.container}>
				<Text style={styles.answer}>{answer}</Text>
				<Text style={styles.type}>Answer</Text>
				<View style={styles.row}>
					<View style={{ flex: 1 }}>
						<TouchableOpacity
							style={{ height: 60 }}
							onPress={() => onIncorrectAnswer()}
						>
							<Ionicons
								style={styles.icon}
								name={Platform.OS == 'ios'
									? 'ios-close-circle-outline'
									: 'md-close-circle'
								}
								size={60}
								color={primaryDark}
							/>
						</TouchableOpacity>
						<Text style={styles.icon}>Incorrect</Text>
					</View>
					<View style={{ flex: 1 }}>
						<TouchableOpacity
							style={{ height: 60 }}
							onPress={() => onCorrectAnswer()}
						>
							<Ionicons
								style={styles.icon}
								name={Platform.OS == 'ios'
									? 'ios-checkmark-circle-outline'
									: 'md-checkmark-circle'
								}
								size={60}
								color={primaryDark}
							/>
						</TouchableOpacity>
						<Text style={styles.icon}>Correct</Text>
					</View>
				</View>
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
	answer: {
		fontSize: 48,
	},
	type: {
		fontSize: 24,
		color: darkGray,
		marginBottom: 40,
	},
	row: {
		flexDirection: 'row',
	},
	icon: {
		textAlign: 'center',
	}
})

export default Answer
