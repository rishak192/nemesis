import { Box, Button, Collapse, Container, IconButton, Grid, Input, makeStyles, Typography } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, useEffect, useRef } from 'react'
import Data from './userdata';

const useStyle = makeStyles(theme => ({
    logcont: {
        backgroundColor: "rgba(0,0,0,0)",
        boxShadow: "0 0 50px 5px gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh"
    },
    cont: {

    },
    lotxt: {
        backgroundColor: "lightgray"
    },
    error: {
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
        // border: "1px solid red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2
    },
    border: {
        // border: "1px solid red"
    },
    eb: {
        backgroundColor: ""
    }
}))

const Tab2 = (props) => {
    const classes = useStyle()

    const [data, setData] = useState(() => {
        { }
    })

    const [expired, setExpired] = useState(false)
    const [open, setOpen] = useState(false)
    var cookie=document.cookie
    var alc=cookie!==undefined?cookie.split('='):"null"
    var idtoken=alc[alc.length-1]
    const fields = ['email', 'username', 'mobile', 'address']

    useEffect(() => {
        fetch('https://nembackend.herokuapp.com/getDetails', {
            method: 'post',
            body: JSON.stringify({
                "token": props.token,
                "idtoken":idtoken
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((json) => {
                if (json.mes === "expired") {
                    setExpired(() => {
                        return true
                    })
                    setOpen(() => {
                        return true
                    })
                } else if(json.mes!=="NoData") {
                    var mes = json.mes[0]
                    setData(mes)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const Delete = (e) => {
        var field = e.target.id
        fetch(`https://nembackend.herokuapp.com/update/${field}`, {
            method: 'post',
            body: JSON.stringify({
                "token": props.token,
                "idtoken":idtoken
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((json) => {
            })
            .catch((error) => {
                console.error(error);
            });

        setData(prev => {
            return { ...prev, [field]: "" }
        })
    }

    return (
        <Box width={1} className={classes.border}>
            {expired || open ?
                <Collapse in={open}>
                    <Alert severity="error" style={{ boxShadow: "0 0 500px 100px red", backgroundColor: "red", color: "white" }}
                        action={
                            <IconButton
                                aria-label="close"
                                style={{ color: "white" }}
                                size="medium"
                                onClick={() => {
                                    window.location.reload()
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Session Expired close to login again!
                            </Alert>
                </Collapse> : null}
            <Typography variant="h4" align="center" style={{ marginBottom: "20px", borderBottom: "1px solid gray", color: "Black", fontWeight: "bold" }}>
                User Details
            </Typography>

            <Box>
                {
                    data !== undefined ? fields.map((item, id) => {
                        if (data[item] !== undefined && data[item] !== "") {
                            return (
                                <Box padding={3} className={classes.border}>
                                    <Data text={data[item]} delete={Delete} id={item} />
                                </Box>
                            )
                        }
                    }) : <Typography align="center" color="textSecondary" variant="h4">Enter Details</Typography>
                }
            </Box>
        </Box>
    )
}

export default Tab2
