import React from 'react';
import './App.css';

function ListItem(props) {
    return (
        <div className='ListItem' key={props.item.id}>
            {props.item.enteredDate} 
            {props.item.energy} 
             ${props.item.cost}
             <br></br>
            
        </div>

    )
};

export default ListItem;
