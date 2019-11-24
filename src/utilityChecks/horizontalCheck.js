const horizontalCheck = (board, color, row) => {
    for(let i = 0; i < board[row].length; i++){
        if(board[row][i] === color && board[row][i + 1] === color && board[row][i + 2] === color && board[row][i + 3] === color) return true
    }
    return false 
}

export default horizontalCheck