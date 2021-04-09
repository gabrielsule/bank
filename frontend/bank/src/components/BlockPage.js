import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';

import { getStorage } from '../services/StorageService';

import axios from "axios";
import { ApiUrl } from '../config/Config';

import { v4 as uuidv4 } from "uuid";
import moment from "moment";

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

const BlockPage = () => {
    const classes = useStyles();

    let history = useHistory();

    useEffect(() => {
        let storage = getStorage('card');
        BlockCard(storage.id);
        Log(storage.id);
    }, []);

    const BlockCard = (idCard) => {
        axios
            .put(`${ApiUrl}/client/${idCard}`);
    }

    const Log = (idCard) => {
        const data = JSON.stringify({
            id: uuidv4(),
            idCard: idCard,
            codOper: 'L',
            amount: 0,
            date: moment().format()
        });

        const headers = {
            "Content-Type": "application/json",
        };

        axios
            .post(`${ApiUrl}/log`, data, { headers });
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
                    <Typography variant="h4" component="h2">Tarjeta bloqueada</Typography>
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

export default BlockPage;