# Flashcards
Flashcards is an iOS application that allows users to create decks of flashcards and quiz how well they have learned the material.

## Note to Reviewer
- This project was tested for iOS only
- The button to add cards to a deck is in the Deck List view rather than in the Deck view (this was a design decision).
- When a user adds a deck, they are redirected to the Deck List view rather than the deck view since this is where they can add cards to the deck.
- To view the answer to a question the user needs to swipe left rather than click on a show answer button.
- To delete a deck, the user can swipe left on a Deck in the Deck List view.

## Software Requirements
- [git](https://git-scm.com/downloads)
- [npm](https://nodejs.org/en/download/)
- iPhone simulator or iOS mobile device to test/run app
  - [Xcode (Mac)](https://developer.apple.com/xcode/)
    - Open Xcode and go to "Preferences."
    - Go to the "Locations" panel and select the most recent version in the "Command Line Tools" drop-down list.
  - [expo (iOS mobile device)](https://itunes.apple.com/us/app/expo-client/id982107779)

## Installation Instructions
- Open command line shell in your workspace directory
- Clone the GitHub repository
```
$ git clone https://github.com/najens/Flashcards.git
```
- Navigate to project folder
```
$ cd Flashcards
```
- Install Module Dependencies
```
$ npm install
```

## Run App
```
$ npm start
```
- Press i to open iOS simulator
- Or scan QR code with iPhone
If you are on a public network expo will not load the app and will suggest that you try using a tunnel.
- Setting up a tunnel
  - Install [Expo XDE](https://github.com/expo/xde)
  - Follow instructions in documentation
  - Open project with Expo XDE rather than running npm start in command line
  - After project is finished loading, click Share and scan QR code with your iOS device using the camera. This will set up a tunnel to run the project on your device.

## References
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).
