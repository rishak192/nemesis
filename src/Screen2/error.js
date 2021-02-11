import { Typography } from '@material-ui/core'
import React from 'react'

const Error = (props) => {
    return (
        <Typography style={{position:"absolute",color:"red"}}>
            {props.error}!
        </Typography>
    )
}

export default Error
