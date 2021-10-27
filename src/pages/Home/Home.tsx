import React from "react";
import "./Home.css";
import { FormDataTypes, HomeStates } from "./index.d";
import { QueryForm } from "./components/QueryForm";
import { RouteComponentProps } from "react-router-dom";
import { sleep } from "../../helpers";

class Home extends React.Component<RouteComponentProps, HomeStates> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            hostsList: [],
        };
    }

    componentDidMount() {
        this.setState({
            hostsList: ["Test1", "Test2", "Test3", "Test4", "Test5"],
        });
    }

    async handleSubmit(data: FormDataTypes) {
        await sleep(2000);
        this.props.history.push(`/result/1`);
    }

    render() {
        return (
            <div className="flex flex-col justify-start items-center mt-28">
                <QueryForm
                    formName="query"
                    hostsList={this.state.hostsList}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default Home;
