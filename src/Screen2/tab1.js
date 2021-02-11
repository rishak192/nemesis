import { Box, Button, Collapse, Container, IconButton, Grid, Input, makeStyles, Typography } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, useEffect, useRef } from 'react'
import Error from './error';

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
    },
    alert: {
        position: "absolute",
        left: "0",
        right: "0",
        margin: "auto",
    },
    alertborder: {
        border: "1px solid red"
    },
    error:{
        position:"absolute"
    }
}))

const Tab1 = (props) => {

    const classes = useStyle()

    const [user, setUser] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [success, setSuccess] = useState(false)
    const [log, setLog] = useState(false)

    const [expired, setExpired] = useState(false)
    const [open, setOpen] = useState(false)

    const [dv, setdv] = useState({ username: true, email: true, address: true, mobile: true })
    const errors = ["Username should be only alphanumeric with no spaces.",
        "Mobile number should be of length 10 and containe digits.",
        "Email not valid.",
        "Address is required."]

    const handleUser = (e) => {
        setUser(() => {
            return e.target.value.trim()
        })
    }
    const handleEmail = (e) => {
        setEmail(() => {
            return e.target.value.trim()
        })
    }

    const handleMobile = (e) => {
        setMobile(() => {
            return e.target.value.trim()
        })
    }

    const handleAddress = (e) => {
        setAddress(() => {
            return e.target.value.trim()
        })
    }

    const validate = () => {
        var valid = true
        if (/^[a-z0-9]+$/i.test(user)) {
            setdv(prev => {
                return { ...prev, ["username"]: true }
            })
        } else {
            setdv(prev => {
                return { ...prev, ["username"]: false }
            })
            valid = false
        }

        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            setdv(prev => {
                return { ...prev, ["email"]: true }
            })
        } else {
            setdv(prev => {
                return { ...prev, ["email"]: false }
            })
            valid = false
        }
        if (/^\d+$/.test(mobile) && mobile.length === 10) {
            setdv(prev => {
                return { ...prev, ["mobile"]: true }
            })
        } else {
            setdv(prev => {
                return { ...prev, ["mobile"]: false }
            })
            valid = false
        }
        if (address.length !== 0) {
            setdv(prev => {
                return { ...prev, ["address"]: true }
            })
        } else {
            setdv(prev => {
                return { ...prev, ["address"]: false }
            })
            valid = false
        }
        return valid
    }

    const submitHandler = (e) => {
        var fv = validate()
        if (mobile.length !== 10 && user.length === 0 && email.length === 0 && address.length === 0) {
            fv = false
        }

        if (fv) {
            var Details = {
                username: user,
                mobile: mobile,
                email: email,
                address: address,
            };
            fetch('http://localhost:4000/addDetails', {
                method: 'post',
                body: JSON.stringify({
                    Details,
                    "token": props.token
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((json) => {
                    if (json.mes !== "expired") {
                        setSuccess(true)
                        window.document.cookie = `idtoken=${json.id}`;
                    } else {
                        setExpired(() => {
                            return true
                        })
                        setOpen(() => {
                            return true
                        })
                    }
                })
                .catch((error) => {
                });
        }
    }

    return (
        <Box width={1} className={classes.border}>
            {expired || open ?
                <Collapse in={open}>
                    <Alert className={classes.alert} severity="error" style={{ boxShadow: "0 0 500px 100px red", backgroundColor: "red", color: "white" }}
                        action={
                            <IconButton
                                aria-label="close"
                                style={{ color: "white" }}
                                size="medium"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Session Expired login again!
                            </Alert>
                </Collapse> : null}
            {success ? <Alert className={classes.alert} onClose={() => { setSuccess(false) }}>Data Added!</Alert> : null}
            <Typography variant="h4" align="center" style={{marginBottom:"20px", borderBottom:"1px solid gray", color: "Black", fontWeight: "bold" }}>
                    Enter Details
                </Typography>
            <Box padding={3} className={classes.border}>
                <Input fullWidth name="username" placeholder="Username"
                    className={dv.username ? null : classes.alertborder}
                    onKeyUp={(e) => handleUser(e)} />
                    {dv.username?null:<Error error={errors[0]}/>}
            </Box>
            <Box padding={3} className={classes.border}>
                <Input fullWidth name="mobile" placeholder="Mobile"
                    className={dv.mobile ? null : classes.alertborder}
                    onKeyUp={(e) => handleMobile(e)} />
                    {dv.mobile?null:<Error error={errors[1]}/>}
            </Box>
            <Box padding={3} className={classes.border}>
                <Input fullWidth name="email" placeholder="Email"
                    className={dv.email ? null : classes.alertborder}
                    onKeyUp={(e) => handleEmail(e)} />
                    {dv.email?null:<Error error={errors[2]}/>}
            </Box>
            <Box padding={3} className={classes.border}>
                <Input fullWidth name="address" placeholder="Address"
                    className={dv.address ? null : classes.alertborder}
                    onKeyUp={(e) => handleAddress(e)} />
                    {dv.address?null:<Error error={errors[3]}/>}
            </Box>
            <Box padding={2} display="flex" justifyContent="center" alignItems="center" className={classes.border}>
                <Button endIcon={<ArrowForward />} size="large"
                    variant="contained"
                    style={{ fontSize: "20px", fontWeight: "bold",backgroundColor:"rgba(0,0,0,0)",
                border:"1px solid blue" }}
                    onClick={() => submitHandler()}>
                    <Typography style={{marginTop:"5px"}}>Submit</Typography>
                    </Button>
            </Box>
        </Box >
    )
}

export default Tab1
