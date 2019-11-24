import React from 'react';

import Row from './components/Row'

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
    tie: false
  }

  selectSpot = col => {
    const { board, player1Turn } = this.state
    const { isBoardFull } = this
    const newBoard = board
    for(let i = newBoard.length - 1; i >= 0; i--){
      if(newBoard[i][col] === ''){
        newBoard[i][col] = player1Turn? 'R' : 'Y'
        break
      }
      if(i === 0) return 
      /* 
        if the player clicks on the same col again and it's maxed out we break out of the selectSpot function and 
        leave the app in the same state it was (the same player's turn and same board state so the player can make another choice)
      */
    }
    
    const fullBoard = isBoardFull(newBoard)
  
    if(fullBoard){
      this.setState({
        ...this.state,
        newBoard,
        player1Turn: !player1Turn,
        tie: true
      })
    } else {
      this.setState({
        ...this.state,
        newBoard,
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

  isWinner = board => {
    
  }

  render(){
    const { board, player1Turn, tie } = this.state
    const { selectSpot } = this
    return (
      <div>
        {tie? <h2>Tie</h2> : null}
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
