import { Button, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react'

const Data = (props) => {
    return (
        <ListItem id={props.id} style={{border:"1px solid blue",borderRadius:"20px",backgroundColor:"lightblue"}}>
            <ListItemText primary={props.text} />
            <button onClick={(e) => props.delete(e)} style={{cursor:"pointer",border:"none",backgroundColor:"lightblue",color:"red"}} id={props.id}>Delete</button>
        </ListItem>
    )
}

export default Data
