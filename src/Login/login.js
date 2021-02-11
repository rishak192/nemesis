import { Box, Button, Collapse, Container, IconButton, Grid, Input, makeStyles, Typography } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, useEffect } from 'react'
import Screen from '../Screen2/screen2';

const useStyle = makeStyles(theme => ({
    maincont: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    logcont: {
        backgroundColor: "rgba(0,0,0,0)",
        boxShadow: "0 0 50px 5px gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px"
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
        // border: "1px solid red"s
    },
    eb: {
        backgroundColor: ""
    }
}))

const Login = () => {

    const classes = useStyle()

    const [Email, setEmail] = useState("")
    const [Pass, setPass] = useState("")
    const [open, setOpen] = useState(true);
    const [didl, setDidl] = useState(false)


    const [log, setLog] = useState(false)

    const [token, setToken] = useState("")

    const submit = () => {
        var Login = {
            email: Email,
            pass: Pass
        };

        fetch('https://nembackend.herokuapp.com/login', {
            method: 'post',
            body: JSON.stringify({
                Login
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((json) => {
                var mes = json.mes
                if (mes !== "error") {
                    console.log(json.mes);
                    setLog(false)
                    setDidl(true)
                    setToken(mes)
                }else{
                    setLog(true)
                    setDidl(false)
                }

            })
            .catch((error) => {
            });
    }

    return (
        <Container className={classes.maincont}>
            {
                didl ?
                    (token !== "") ? <Screen token={token} /> : null
                    :
                    <Container maxWidth="sm" className={classes.logcont}>
                        {log ?
                            <Container maxWidth="sm" className={classes.error}>
                                <Collapse in={open}>
                                    <Alert severity="error" style={{ boxShadow: "0 0 500px 100px red", backgroundColor: "red", color: "white" }}
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                style={{ color: "white" }}
                                                size="medium"
                                                onClick={() => {
                                                    setLog(false);
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        Invalid credentials!
                                </Alert>
                                </Collapse>
                            </Container>
                            : null}
                        <Box width={1} className={classes.border}>
                            <Box padding={10} display="flex" justifyContent="center" className={classes.border}>
                                <Typography variant="h4" style={{ color: "white", fontWeight: "bold" }}>
                                    LOGIN
                                </Typography>
                            </Box>
                            <Box padding={4} className={classes.border}>
                                <Input fullWidth name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </Box>
                            <Box padding={4} className={classes.border}>
                                <Input fullWidth name="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
                            </Box>
                            <Box padding={2} display="flex" justifyContent="center" alignItems="center" className={classes.border}>
                                <Button endIcon={<ArrowForward />} size="large"
                                    color="primary"
                                    variant="contained"
                                    style={{ fontSize: "20px", fontWeight: "bold" }}
                                    onClick={() => submit()}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </Container>
            }
        </Container>
    )
}

export default Login
