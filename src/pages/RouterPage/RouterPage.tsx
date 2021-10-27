import { HashRouter, Route, Switch } from "react-router-dom";
import { Home } from "../Home";
import { About } from "../About";
import { Result } from "../Result";
import { Header } from "../../components/Header";

const RouterPage = (_: {}) => {
    return (
        <HashRouter>
            <Header />
            <Switch>
                <Route exact path="/result/:taskId" component={Result} />
                <Route exact path="/about">
                    <About />
                </Route>

                {/* This route will catch all paths if the above routes are not matched */}
                <Route exact path="/" component={Home} />

                <Route path="*">
                    <p className="text-white">404 Not Found</p>
                </Route>
            </Switch>
        </HashRouter>
    );
};

export default RouterPage;
