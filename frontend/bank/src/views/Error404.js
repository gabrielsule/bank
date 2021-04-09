import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, TextField, Typography } from '@material-ui/core';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

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

const Error404 = () => {
    const classes = useStyles();

    let history = useHistory();

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
                    <Typography variant="h4" component="h2">Página no encontrada</Typography>
                </div>

                <div className={classes.button}>
                    <Button
                        variant="contained"
                        color="default"
                        endIcon={<FontAwesomeIcon icon={faSignOutAlt} size={"1x"} />}
                        onClick={handleExit}
                    >Volver</Button>
                </div>
            </div>
        </Container>
    );
}

export default Error404;