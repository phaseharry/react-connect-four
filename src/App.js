import React from 'react';

import Row from './components/Row'

import horizontalCheck from './utilityChecks/horizontalCheck'

class App extends React.Component {
  state = {
    board: [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ],
    player1Turn: true,
    isThereAWinner: false,
    tie: false,
  }

  selectSpot = col => {
    const { board, player1Turn, tie, isThereAWinner } = this.state
    const { isBoardFull, checkIfWinner } = this

    if(tie || isThereAWinner) return // making sure game state cant be changed once a tie or a win occurs

    const newBoard = board
    let rowCheckWasPlaced
    
    for(let i = newBoard.length - 1; i >= 0; i--){
      if(newBoard[i][col] === ''){
        newBoard[i][col] = player1Turn? 'R' : 'Y'
        rowCheckWasPlaced = i
        break
      }
      if(i === 0) return 
      /* 
        if the player clicks on the same col again and it's maxed out we break out of the selectSpot function and 
        leave the app in the same state it was (the same player's turn and same board state so the player can make another choice)
      */
    }
    
    const fullBoard = isBoardFull(newBoard)
    const isWinner = checkIfWinner(newBoard, player1Turn, col, rowCheckWasPlaced)
  
    if(isWinner){
      this.setState({
        ...this.state,
        board: newBoard,
        isThereAWinner: true
      })
    } else if(fullBoard){
      this.setState({
        ...this.state,
        board: newBoard,
        player1Turn: !player1Turn,
        tie: true
      })
    } else {
      this.setState({
        ...this.state,
        board: newBoard,
        player1Turn: !player1Turn,
      })
    }
  }

  isBoardFull = board => {
    for(let i = 0; i < board.length; i++){
      const row = board[i]
      for(let j = 0; j < row.length; j++){
       if(board[i][j] === ''){
         return false
       } 
      }
    }
    return true
  }

  checkIfWinner = (board, player1, col, row) => { //if player1 is true, check for R's else check for Y's
    const color = player1? 'R' : 'Y'
    return horizontalCheck(board, color, row)
  }

  render(){
    const { board, player1Turn, tie, isThereAWinner } = this.state
    const { selectSpot } = this
    return (
      <div>
        {tie? <h2>Tie</h2> : null}
        {isThereAWinner? player1Turn? <h1>Red Wins</h1> : <h1>Yellow Wins</h1> : null} 
         <table style={styles.tableBorder}>
           <tbody> 
        {
          board.map((row, idx) => <Row key={idx} row={row} player1Turn={player1Turn} selectSpot={selectSpot}/>)
        }
          </tbody>
        </table>
      </div>
    )

  }
}

const styles = {
  tableBorder: {
    border: '1px solid black'
  }
}

export default App;
