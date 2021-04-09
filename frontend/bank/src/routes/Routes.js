import React from "react";
import { Route, Switch } from "react-router-dom";
import InputCard from '../components/InputCard';
import InputPin from '../components/InputPin';
import BlockPage from '../components/BlockPage';
import Main from '../views/Main';
import Balance from '../components/Balance';
import Error404 from '../views/Error404';

export const Routes = () => (
    <Switch>
        <Route path="/" exact={true} component={InputCard} />
        <Route path="/pin" exact={true} component={InputPin} />
        <Route path="/block" exact={true} component={BlockPage} />
        <Route path="/main" exact={true} component={Main} />
        <Route path="/balance" exact={true} component={Balance} />
        <Route component={Error404} />
    </Switch>
);