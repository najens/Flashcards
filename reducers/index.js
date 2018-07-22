import { ADD_DECK, RECEIVE_DECKS, ADD_CARD,
	DELETE_DECK
} from '../actions/actionTypes'

function decks (state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS :
			return {
				...state,
				...action.decks,
			}
		case ADD_DECK :
			return {
				...state,
				...action.deck,
			}
		case DELETE_DECK :
			delete state[action.id]
			return {
				...state,
			}
		case ADD_CARD :
			const deck = state[action.id]
			console.log('DECK: ', deck)
			const questions = deck.questions
			const newQuestions = {
				...questions,
				...action.card,
			}
			return {
				...state,
				[action.id]: {
					...state[action.id],
					['questions']: {
						...newQuestions,
					}
				}
			}
		default :
			return state
	}
}

export default decks
