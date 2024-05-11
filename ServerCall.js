import {Alert} from 'react-native'

import axios from 'axios'



export async function runGameServer (game, playerCount, cardArray, boardArray, path) {
  return await postTodo(game,playerCount, cardArray, boardArray, path)

  function postTodo(game, playerCount, cardArray, boardArray, path) {
      //return fetch('http://18.188.193.162:3000/',
      return axios.post(path,
      
      {
          
          body:JSON.stringify( {
            game: game, 
            playerCount: playerCount, 
            playerCards: cardArray,
            boardCards: boardArray
          })
      })
      //.then(data => theText = data.json())
      .then(function(response) {
        //Alert.alert(response)
        console.log(response)
        console.log(response.data.numTrials)
        return response.data
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("ERROR RESPONSE")
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("ERROR REQUEST")
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("OTHER ERROR")
          console.log('Error', error.message);
        }
        console.log(error.config);
        Alert.alert(error)

        
      })
  }
}
/*
export async function runGameServer (game, playerCount, cardArray, boardArray, path) {
    return await postTodo(game,playerCount, cardArray, boardArray, path)

    function postTodo(game, playerCount, cardArray, boardArray, path) {
        //return fetch('http://18.188.193.162:3000/',
        return fetch(path,
        
        {
            mode: 'cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              
            },
            body:JSON.stringify( {
              game: game, 
              playerCount: playerCount, 
              playerCards: cardArray,
              boardCards: boardArray
            })
        })
        .then(data => theText = data.json())
        .then(response => {
          //Alert.alert(response)
          return response
        })
    }
}
*/