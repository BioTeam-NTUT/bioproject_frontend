import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "../Home";
import { About } from "../About";
import { Result } from "../Result";
import { Header } from "../../components/Header";

const RouterPage = (_: {}) => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/result">
                    <Result />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default RouterPage;
