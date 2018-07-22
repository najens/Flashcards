import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { primary, white } from '../utils/colors'

function SubmitBtn ({ onPress }) {
	return (
		<TouchableOpacity
			style={Platform.OS === 'ios'
				? styles.iosSubmitBtn
				: styles.androidSubmitBtn
			}
			onPress={onPress}
		>
			<Text style={styles.submitBtnText}>SUBMIT</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	iosSubmitBtn: {
		backgroundColor: primary,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginRight: 40,
		marginLeft: 40,
	},
	androidSubmitBtn: {
		backgroundColor: primary,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
	},
})

export default SubmitBtn
