import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Home } from "../Home";
import { About } from "../About";
import { Header } from "../../components/Header";

const RouterPage = (props: {}) => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/search">
                    <Home />
                </Route>
                <Route exact path="/query">
                    <Home />
                </Route>
                <Route exact path="/">
                    <About />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default RouterPage;
