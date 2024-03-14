import { useState} from 'react'
//mport { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TextInput, Button, ScrollView, Platform, StatusBar} from 'react-native';

import CardGrid from '../CardGrid';
import CalculateHigh from '../CalculateHigh';
import CalculateRazz from '../CalculateRazz';







export default function BigO() {

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

  
  const [playerOneEquity, setPlayerOneEquity] = useState('');
  const [playerOneScoops, setPlayerOneScoops] = useState('');

  const [playerTwoEquity, setPlayerTwoEquity] = useState('');
  const [playerTwoScoops, setPlayerTwoScoops] = useState('');

  const [chops, setChops] = useState('');

  const [theGrid, setCardGrid] = useState('');

  const numTrials = 100;

  function clearCards() {
    setTextOneOne('');
    setTextOneTwo('');
    setTextOneThree('');
    setTextOneFour('');
    setTextOneFive('');

    setTextTwoOne('');
    setTextTwoTwo('');
    setTextTwoThree('');
    setTextTwoFour('');
    setTextTwoFive('');


    setTextBoardOne('');
    setTextBoardTwo('');
    setTextBoardThree('');
    setTextBoardFour('');
    setTextBoardFive(''); 
  }

  function checkCards() {
    return 1;
  }

  function calculateEquities() {
    if(checkCards() == 0) {
      alert('Duplicate Cards');
      return;
    }

    
    setPlayerOneEquity('');
    setPlayerOneScoops('');
    setChops('');
    setPlayerTwoEquity('');
    setPlayerTwoScoops('');

    let p1c1;
    let p1c2;
    let p1c3;
    let p1c4;
    let p1c5;
    
    let p2c1;
    let p2c2;
    let p2c3;
    let p2c4;
    let p2c5;

    let b1, b2, b3, b4, b5;
    
    p1c1 = getCard(textOneOne);
    p1c2 = getCard(textOneTwo);
    p1c3 = getCard(textOneThree);
    p1c4 = getCard(textOneFour);
    p1c5 = getCard(textOneFive);


    p2c1 = getCard(textTwoOne);
    p2c2 = getCard(textTwoTwo);
    p2c3 = getCard(textTwoThree);
    p2c4 = getCard(textTwoFour);
    p2c5 = getCard(textTwoFive);

    b1 = -1;
    b2 = -1;
    b3 = -1;
    b4 = -1; 
    b5 = -1;

    let cardCount;
    cardCount = 5;
    
    let i;
    for(i = 1; i <= 5; i++) {
      if(i == 1) {
        if(textBoardOne == '') {
          cardCount = 0;
          i = 6;
        }
        else
          b1 = getCard(textBoardOne);
      }
      if(i == 2) {
        if(textBoardTwo == '') {
          cardCount = 1;
          i = 6;
        }
        else
          b2 = getCard(textBoardTwo);
      }
      if(i == 3) {
        if(textBoardThree == '') {
          cardCount = 2;
          i = 6;
        }
        else
          b3 = getCard(textBoardThree);
      }
      if(i == 4) {
        if(textBoardFour == '') {
          cardCount = 3;
          i = 6;
        }
        else
          b4 = getCard(textBoardFour);
      }
      if(i == 5)
        if(textBoardFive == '') {
          cardCount = 4;
          i = 6;
        }
        else  
          b5 = getCard(textBoardFive);
    }

    let player1Wins;
    let player2Wins;
    let chop;
    let j;

    player1Wins = 0;
    player2Wins = 0;
    let playerOneScoopCount = 0;
    let playerTwoScoopCount = 0;
    chop = 0;
    for(i = 0; i < numTrials; i++) {
      if(i% 100 == 0)
        console.log("Trial #: " + i);
      for(j = cardCount + 1; j <= 5; j++) {
        if(j == 1) {
          b1 = randomCard(p1c1, p1c2, p1c3, p1c4, p1c5, p2c1, p2c2, p2c3, p2c4, p2c5, b1, b2, b3, b4, b5, j);
        }
        if(j == 2) {
          b2 = randomCard(p1c1, p1c2, p1c3, p1c4, p1c5, p2c1, p2c2, p2c3, p2c4, p2c5, b1, b2, b3, b4, b5, j);
        }
        if(j == 3) {
          b3 = randomCard(p1c1, p1c2, p1c3, p1c4, p1c5, p2c1, p2c2, p2c3, p2c4, p2c5, b1, b2, b3, b4, b5, j);
        }
        if(j == 4) {
          b4 = randomCard(p1c1, p1c2, p1c3, p1c4, p1c5, p2c1, p2c2, p2c3, p2c4, p2c5, b1, b2, b3, b4, b5, j);
        }
        if(j == 5) {
          b5 = randomCard(p1c1, p1c2, p1c3, p1c4, p1c5, p2c1, p2c2, p2c3, p2c4, p2c5, b1, b2, b3, b4, b5, j);
        }
      }

      let playerOneHighScore;
      let playerTwoHighScore;

      playerOneHighScore = calculatePlayerScore(p1c1, p1c2, p1c3, p1c4, p1c5, b1, b2, b3, b4, b5, 'high');
      playerTwoHighScore = calculatePlayerScore(p2c1, p2c2, p2c3, p2c4, p2c5, b1, b2, b3, b4, b5, 'high');

      
      let playerOneLowScore;
      let playerTwoLowScore;

      playerOneLowScore = calculatePlayerScore(p1c1, p1c2, p1c3, p1c4, p1c5, b1, b2, b3, b4, b5, 'low');
      playerTwoLowScore = calculatePlayerScore(p2c1, p2c2, p2c3, p2c4, p2c5, b1, b2, b3, b4, b5, 'low');
      
      console.log("p1low: " + playerOneLowScore);
      console.log("p2low: " + playerTwoLowScore);
      
      console.log("p1high: " + playerOneHighScore);
      console.log("p2high: " + playerTwoHighScore);

      let lowIsPaid = 0;
      let playerOneScoopsLow = 0;
      let playerTwoScoopsLow = 0;
      

      if(playerOneLowScore < playerTwoLowScore) {
        //player 1 wins
        if (playerOneLowScore <= '10807060504') {
          player1Wins += 2;
          playerOneScoopsLow = 1;
          lowIsPaid = 1;
        }
      }
      else if(playerTwoHighScore == playerOneHighScore) {
        //chop
        if (playerOneLowScore <= '10807060504') {
          chop++;
          player1Wins++;
          player2Wins++;
          lowIsPaid = 1;
        }
      }
      else {
        //player 2 wins;
        
        if (playerTwoLowScore <= '10807060504') {
          player2Wins += 2;
          playerTwoScoopsLow = 1;
          lowIsPaid = 1;
        }
      }

      if(playerOneHighScore > playerTwoHighScore) {
        //player 1 wins
        if(lowIsPaid == 1) {
          if(playerOneScoopsLow == 1) {
            playerOneScoopCount++;
          }
          player1Wins += 2;
        }
        else {
          playerOneScoopCount++;
          player1Wins += 4;
        }
      }
      else if(playerTwoHighScore == playerOneHighScore) {
        //chop
        if(lowIsPaid == 1) {
          player1Wins++;
          player2Wins++;
        }
        else {
          player1Wins += 2;
          player2Wins += 2;
        }
      }
      else {
        //player 2 wins;
        
        if(lowIsPaid == 1) {
          if(playerTwoScoopsLow == 1) {
            playerTwoScoopCount++;
          }
          player2Wins += 2;
        }
        else {
          playerTwoScoopCount++;
          player2Wins += 4;
        }
      }
    }

    setPlayerOneEquity(((player1Wins)/(player1Wins + player2Wins))*100+"%");
    setPlayerOneScoops(((playerOneScoopCount)/(numTrials))*100+"%");

    setPlayerTwoEquity(((player2Wins)/(player1Wins + player2Wins))*100+"%");
    setPlayerTwoScoops(((playerTwoScoopCount)/(numTrials))*100+"%");
    
    setChops(((numTrials - playerOneScoopCount - playerTwoScoopCount)/numTrials)*100+"%");
    
  }

  function calculatePlayerScore(c1, c2, c3, c4, c5, b1, b2, b3, b4, b5, game) {
    let returnScore;
    let i;
    let j;
    let cardArray;
    let score;
    if(game == 'high')
      returnScore = '00000000000';
    else
      returnScore = '99999999999';
    cardArray = [c1, c2, c3, c4, c5];
    boardArray = [b1, b2, b3, b4, b5];
    sendArray = [0,0,0,0,0]
    for(i = 0; i < 4; i++) {
      sendArray[0] = cardArray[i];
      for(j = i + 1; j < 5; j++) {
        sendArray[1] = cardArray[j];
        for(k = 0; k < 3; k++) {
          sendArray[2] = boardArray[k];
          for(m = k + 1; m < 4; m++) {
            sendArray[3] = boardArray[m];
            for(n = m + 1; n < 5; n++) {
              sendArray[4] = boardArray[n];
              if(game == 'high') {
                score = CalculateHigh(sendArray);
                if(score > returnScore) {
                  returnScore = score;
                }
              }
              else {
                score = CalculateRazz(sendArray);
                if(score < returnScore) {
                  returnScore = score;
                }
              }
            }
          }
        }
      }
    }

    return returnScore;
  }

  

  function randomCard(p1c1, p1c2, p2c1, p2c2, b1, b2, b3, b4, b5, j) {
    for(;;) {
      rando = Math.floor(Math.random() * (52));
      if(rando != p1c1 && rando != p1c2 && rando != p2c1 && rando != p2c2 && rando != b1 && rando != b2 &&
          rando != b3 && rando != b4 && rando != b5) {
            //console.log("R: " + rando);
            return rando;
          }
    }
  }
  
  function getCard(cardString) {
    //get left char
    leftDigit = 0;
    if(cardString == '2c')
      return 0;
    if(cardString == '3c')
      return 1;
    if(cardString == '4c')
      return 2;
    if(cardString == '5c')
      return 3;
    if(cardString == '6c')
      return 4;
    if(cardString == '7c')
      return 5;
    if(cardString == '8c')
      return 6;
    if(cardString == '9c')
      return 7;
    if(cardString == 'Tc')
      return 8;
    if(cardString == 'Jc')
      return 9;
    if(cardString == 'Qc')
      return 10;
    if(cardString == 'Kc')
      return 11;
    if(cardString == 'Ac')
      return 12;
    if(cardString == '2d')
      return 13;
    if(cardString == '3d')
      return 14;
    if(cardString == '4d')
      return 15;
    if(cardString == '5d')
      return 16;
    if(cardString == '6d')
      return 17;
    if(cardString == '7d')
      return 18;
    if(cardString == '8d')
      return 19;
    if(cardString == '9d')
      return 20;
    if(cardString == 'Td')
      return 21;
    if(cardString == 'Jd')
      return 22;
    if(cardString == 'Qd')
      return 23;
    if(cardString == 'Kd')
      return 24;
    if(cardString == 'Ad')
      return 25;
    if(cardString == '2h')
      return 26;
    if(cardString == '3h')
      return 27;
    if(cardString == '4h')
      return 28;
    if(cardString == '5h')
      return 29;
    if(cardString == '6h')
      return 30;
    if(cardString == '7h')
      return 31;
    if(cardString == '8h')
      return 32;
    if(cardString == '9h')
      return 33;
    if(cardString == 'Th')
      return 34;
    if(cardString == 'Jh')
      return 35;
    if(cardString == 'Qh')
      return 36;
    if(cardString == 'Kh')
      return 37;
    if(cardString == 'Ah')
      return 38;
    if(cardString == '2s')
      return 39;
    if(cardString == '3s')
      return 40;
    if(cardString == '4s')
      return 41;
    if(cardString == '5s')
      return 42;
    if(cardString == '6s')
      return 43;
    if(cardString == '7s')
      return 44;
    if(cardString == '8s')
      return 45;
    if(cardString == '9s')
      return 46;
    if(cardString == 'Ts')
      return 47;
    if(cardString == 'Js')
      return 48;
    if(cardString == 'Qs')
      return 49;
    if(cardString == 'Ks')
      return 50;
    if(cardString == 'As')
      return 51;

    
  }

  function pressFromCardGrid(number) {
    if(textOneOne == '') {
      setTextOneOne(number);
    }
    else if(textOneTwo == '') {
      setTextOneTwo(number);
    }
    else if(textOneThree == '') {
      setTextOneThree(number);
    }
    else if(textOneFour == '') {
      setTextOneFour(number);
    }
    else if(textOneFive == '') {
      setTextOneFive(number);
    }
    else if(textTwoOne == '') {
      setTextTwoOne(number);
    }
    else if(textTwoTwo == '') {
      setTextTwoTwo(number);
    }
    else if(textTwoThree == '') {
      setTextTwoThree(number);
    }
    else if(textTwoFour == '') {
      setTextTwoFour(number);
    }
    else if(textTwoFive == '') {
      setTextTwoFive(number);
    }
    else if(textBoardOne == '') {
      setTextBoardOne(number);
    }
    else if(textBoardTwo == '') {
      setTextBoardTwo(number);
    }
    else if(textBoardThree == '') {
      setTextBoardThree(number);
    }
    else if(textBoardFour == '') {
      setTextBoardFour(number);
    }
    else if(textBoardFive == '') {
      setTextBoardFive(number);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      
      <Text>Player1</Text>
      <Text>{textOneOne}</Text>
      <Text>{textOneTwo}</Text>
      <Text>{textOneThree}</Text>
      <Text>{textOneFour}</Text>
      <Text>{textOneFive}</Text>
      <Text>Equity: </Text>
      <Text>{playerOneEquity}</Text>
      <Text>Scoops: </Text>
      <Text>{playerOneScoops}</Text>
      <Text>Player2</Text>
      <Text>{textTwoOne}</Text>
      <Text>{textTwoTwo}</Text>
      <Text>{textTwoThree}</Text>
      <Text>{textTwoFour}</Text>
      <Text>{textTwoFive}</Text>
      <Text>Equity: </Text>
      <Text>{playerTwoEquity}</Text>
      <Text>Scoops: </Text>
      <Text>{playerTwoScoops}</Text>
      <Text>Chops: </Text>
      <Text>{chops}</Text>
      <Text>Board</Text>
      <Text>{textBoardOne}</Text>
      <Text>{textBoardTwo}</Text>
      <Text>{textBoardThree}</Text>
      <Text>{textBoardFour}</Text>
      <Text>{textBoardFive}</Text>
      {new CardGrid(pressFromCardGrid)}
      <Button title="Calculate Equities" onPress={() => calculateEquities()}></Button>
      <Button title="Clear Cards" onPress={() => clearCards()}></Button>
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




