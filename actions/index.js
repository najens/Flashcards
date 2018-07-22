import { ADD_DECK, RECEIVE_DECKS, DELETE_DECK, ADD_CARD } from './actionTypes'

export function receiveDecks (decks) {
	return {
		type: RECEIVE_DECKS,
		decks,
	}
}

export function addDeck (deck) {
	return {
		type: ADD_DECK,
		deck,
	}
}

export function deleteDeck (id) {
	return {
		type: DELETE_DECK,
		id,
	}
}

export function addCard (id, card) {
	return {
		type: ADD_CARD,
		id,
		card,
	}
}
