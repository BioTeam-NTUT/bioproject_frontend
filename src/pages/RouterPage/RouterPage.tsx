import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import { Home } from '../Home';
import { About } from '../About';
import { Result } from '../Result';
import { Header } from '../../components/Header';

const RouterPage = (props: {}) => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/result">
                    <Result />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default RouterPage;