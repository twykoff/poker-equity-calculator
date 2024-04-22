export async function runGameServer (game, playerCount, cardArray, boardArray, path) {
    return await postTodo(game,playerCount, cardArray, boardArray, path)

    function postTodo(game, playerCount, cardArray, boardArray, path) {
        //return fetch('http://18.188.193.162:3000/',
        return fetch(path,
        
        {
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
        /*.then(res => {
          return res.json();
        })*/
        .then(data => theText = data.json())
        .then(response => {
          //console.log(JSON.stringify(response))
          return response
          //const jsonObj = {theObj: response}
          //console.log(jsonObj)
        })
        /*
        const restOperation = get({
          apiName: myAPI,
          path: path,
          options: {
            body: {
              message: 'Mow the lawn',
              game: "NLHE",
              cards: [1,2,3,4,5]
            }
          }
        });
    
        console.log("BEF AWAIT 1")
        const { body } = await restOperation.response;
        console.log("AFTER BODY")
        const response = await body.json();
        console.log("AFER RESONSE")
    
        console.log('POST call succeeded');
        console.log(response);
        setResponse(response)\
      */
    }
}