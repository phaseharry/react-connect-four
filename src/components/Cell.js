import React from 'react'

class Cell extends React.Component{
    redOrYellow(cellData){
        switch(cellData){
            case 'R':
                return styles.red
            case 'Y':
                return styles.yellow
            default:
                return styles.emptyCell
        }
    }

    render(){
        const { cellData, selectSpot, col }= this.props
        const { redOrYellow } = this
        return (
            <td style={redOrYellow(cellData)} onClick={ev => selectSpot(col)}></td>
        )
    }
}

const styles = {
    emptyCell: {
        border: '1px solid black',
        width: '20px',
        height: '20px'
    },
    red: {
        backgroundColor: 'red',
        border: '1px solid black',
        width: '20px',
        height: '20px'
    },
    yellow: {
        backgroundColor: 'yellow',
        border: '1px solid black',
        width: '20px',
        height: '20px'
    }
}

export default Cell