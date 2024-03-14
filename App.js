import { useState} from 'react'
//mport { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TextInput, Button, ScrollView, Platform, StatusBar} from 'react-native';

import CardGrid from './CardGrid';
import CalculateHigh from './CalculateHigh';
import CalculateRazz from './CalculateRazz';
import NLHE from './Components/NLHE';
import BigO from './Components/BigO';







export default function App() {

  const [textOneOne, setTextOneOne] = useState('');
  const [textOneTwo, setTextOneTwo] = useState('');
  const [textOneThree, setTextOneThree] = useState('');
  const [textOneFour, setTextOneFour] = useState('');
  const [textOneFive, setTextOneFive] = useState('');

  const [textTwoOne, setTextTwoOne] = useState('');
  const [textTwoTwo, setTextTwoTwo] = useState('');
  const [textTwoThree, setTextTwoThree] = useState('');
  const [textTwoFour, setTextTwoFour] = useState('');
  const [textTwoFive, setTextTwoFive] = useState('');

  const [textBoardOne, setTextBoardOne] = useState('');
  const [textBoardTwo, setTextBoardTwo] = useState('');
  const [textBoardThree, setTextBoardThree] = useState('');
  const [textBoardFour, setTextBoardFour] = useState('');
  const [textBoardFive, setTextBoardFive] = useState('');

  const [currentGame, setCurrentGame] = useState('NLHE');

  
  const [playerOneEquity, setPlayerOneEquity] = useState('');
  const [playerOneScoops, setPlayerOneScoops] = useState('');

  const [playerTwoEquity, setPlayerTwoEquity] = useState('');
  const [playerTwoScoops, setPlayerTwoScoops] = useState('');

  const [chops, setChops] = useState('');

  const [theGrid, setCardGrid] = useState('');

  const numTrials = 100;

  function chooseGame(props) {
    if(props == currentGame) {
      alert('no game change');
    }
    else {
      setCurrentGame(props);
      alert('change to ' + props);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Comment>Need players and cards and equities</Comment>
        <Button title="Play NLHE" onPress={() => chooseGame('NLHE')}></Button>
        <Button title="Play Big O" onPress={() => chooseGame('Big O')}></Button>
        <Comment>Need cards to choose</Comment>
        <Comment>Calculate Button</Comment>
        <Comment>Clear Cards Button</Comment>
      </ScrollView>
    </SafeAreaView>
  )


}

const styles = StyleSheet.create({
  container: {
    //flex:1,
     paddingTop:Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})
;




