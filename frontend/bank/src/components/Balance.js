import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import logo from '../static/banklogo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#bfbfbf',
        borderRadius: 10
    },
    title: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

const Balance = () => {
    const classes = useStyles();

    let history = useHistory();

    const handleBack = () => {
        history.push("/main");
    }

    const handleExit = () => {
        history.push("/");
    }

    return (
        <Container maxWidth="xs">
            <div className={classes.root}>
                <div>
                    <img src={logo} />
                </div>

                <div className={classes.title}>
                    <Typography variant="h4" component="h2">Bienvenido a Bank</Typography>
                </div>

                <div className={classes.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<FontAwesomeIcon icon={faArrowLeft} size={"1x"} />}
                        onClick={handleBack}
                    >Atras</Button>
                    {' '}
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<FontAwesomeIcon icon={faSignOutAlt} size={"1x"} />}
                        onClick={handleExit}
                    >Salir</Button>
                </div>
            </div>
        </Container>
    );
}

export default Balance;