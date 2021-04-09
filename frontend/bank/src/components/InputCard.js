import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';

import { setStorage } from '../services/StorageService';

import axios from "axios";
import { ApiUrl } from '../config/Config';

import { Notify } from './Notify';
import { Toaster } from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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

const InputCard = () => {
    const classes = useStyles();

    let history = useHistory();

    const [card, setCard] = useState('');
    const [isDisabled, setIsDisabled] = useState(true)

    const handleChange = (data) => {
        setCard(data);
        data.length === 16 ? setIsDisabled(false) : setIsDisabled(true);
    };

    const handleClean = () => {
        setCard('');
    }

    const handleSubmit = () => {
        axios
            .get(`${ApiUrl}/client/${card}`)
            .then((res) => {
                setStorage('card', { id: res.data.id });
                history.push("/pin");
            })
            .catch((error) => {
                Notify("Número de tajeta inválida o bloqueada");
            });
    }

    return (
        <Container maxWidth="xs">
            <div className={classes.root}>
                <div>
                    <img src={logo} alt='logo' />
                </div>

                <div className={classes.title}>
                    <Typography variant="h5" component="h2">Ingrese el número de tarjeta</Typography>
                </div>

                <div className={classes.input}>
                    <NumberFormat
                        format="####-####-####-####"
                        customInput={TextField}
                        value={card}
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
            </div>
            <Toaster />
        </Container>
    );
}

export default InputCard;