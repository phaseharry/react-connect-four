import React from 'react'

import Cell from './Cell'

class Row extends React.Component {
    render(){
        const { row, selectSpot } = this.props
        return (
        <tr>{row.map((cell, idx) => <Cell  key={idx} col={idx} cellData={cell} selectSpot={selectSpot}/>)}</tr>
        )
    }
}

export default Row