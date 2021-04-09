import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';

import { getStorage } from '../services/StorageService';

import axios from "axios";
import { ApiUrl } from '../config/Config';

import { Notify } from './Notify';
import { Toaster } from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faPaperPlane, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

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
    input: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

const InputPin = () => {
    const classes = useStyles();

    let history = useHistory();

    const [idCard, setIdCard] = useState('');
    const [pin, setPin] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let storage = getStorage('card');
        setIdCard(storage.id);
    }, []);

    const handleChange = (data) => {
        setPin(data);
        data.length === 4 ? setIsDisabled(false) : setIsDisabled(true);
    };

    const handleClean = () => {
        setPin('');
    }

    const handleExit = () => {
        history.push("/");
    }

    const handleSubmit = () => {
        const data = JSON.stringify({
            idCard: idCard,
            pin: pin
        });

        const headers = {
            "Content-Type": "application/json",
        };

        axios
            .post(`${ApiUrl}/client`, data, { headers })
            .then((res) => {
                history.push('/main');
            })
            .catch((error) => {
                Notify("PIN inválido");

                setCount(count + 1);

                if (count === 3) {
                    history.push('/block');
                }
            });
    }

    return (
        <Container maxWidth="xs">
            <div className={classes.root}>
                <div>
                    <img src={logo} />
                </div>

                <div className={classes.title}>
                    <Typography variant="h5" component="h2">Ingrese el número de PIN</Typography>
                </div>

                <div className={classes.input}>
                    <NumberFormat
                        format="####"
                        customInput={TextField}
                        value={pin}
                        type="tel"
                        autoFocus
                        onValueChange={(e) => handleChange(e.value)} />
                </div>

                <div className={classes.button}>
                    <Button
                        variant="contained"
                        color="secondary"
                        endIcon={<FontAwesomeIcon icon={faUndoAlt} size={"1x"} />}
                        onClick={handleClean}
                    >Limpiar</Button>
                    {' '}
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<FontAwesomeIcon icon={faPaperPlane} size={"1x"} />}
                        disabled={isDisabled}
                        onClick={handleSubmit}
                    >Aceptar</Button>
                </div>

                <div className={classes.button}>
                    <Button
                        variant="contained"
                        color="default"
                        endIcon={<FontAwesomeIcon icon={faSignOutAlt} size={"1x"} />}
                        onClick={handleExit}
                    >Salir</Button>
                </div>
            </div>
            <Toaster />
        </Container>
    );
}

export default InputPin;