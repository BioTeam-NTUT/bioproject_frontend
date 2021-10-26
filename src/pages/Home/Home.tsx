import React from "react";
import "./Home.css";
import { QueryForm } from "./components/QueryForm";

interface StateDataTypes {
    hostsList: Array<string>;
}

interface FormDataTypes {
    type: string;
    text: string;
    requiredRecords: string;
    useEmail: boolean;
    email: string;
    genTaxonomy: boolean;
    LE: {
        threshold: string;
        minLength: string;
    };
    selectedHost: string | null;
}

class Home extends React.Component<{}, StateDataTypes> {
    constructor(props: {}) {
        super(props);

        this.state = {
            hostsList: [],
        };
    }

    componentDidMount() {
        this.setState({
            hostsList: ["Test1", "Test2", "Test3", "Test4", "Test5"],
        });
    }
    handleSubmit(data: FormDataTypes) {}

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
