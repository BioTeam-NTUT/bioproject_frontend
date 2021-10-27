import React from "react";
import { Oval } from "@agney/react-loading";

import { ResultProperties, ResultStates } from "./index.d";
import { AnalysisResult } from "./components/AnalysisResult";
import { WaitingProgress } from "./components/WaitingProgress";
import { sleep } from "../../helpers";
import "./Result.css";
import { Loading } from "../../components/Loading";

class Result extends React.Component<ResultProperties, ResultStates> {
    constructor(props: ResultProperties) {
        super(props);
        this.checkTaskStatus = this.checkTaskStatus.bind(this);
        this.finishFakeTask = this.finishFakeTask.bind(this);
        this.getResultView = this.getResultView.bind(this);

        this.state = {
            isFinished: false,
        };
    }

    componentDidMount() {
        this.checkTaskStatus();
    }

    componentDidUpdate() {
        if (this.state.task && !this.state.isFinished) {
            this.finishFakeTask();
        }
    }

    async finishFakeTask() {
        await sleep(5000);
        console.log("finished");
        this.setState((prevState, props) => ({
            isFinished: true,
            task: {
                taskInfo: {
                    id: props.match.params.taskId,
                    status: "Finished",
                    title: prevState.task!.taskInfo.title,
                    submittedTime: prevState.task!.taskInfo.submittedTime,
                },
                runningTime: prevState.task!.runningTime,
            },
        }));
    }

    async checkTaskStatus() {
        console.log("loading");
        await sleep(2000);
        console.log("got");
        this.setState((_, props) => ({
            isFinished: false,
            task: {
                taskInfo: {
                    id: props.match.params.taskId,
                    status: "Searching...",
                    title: "SGIV_MCP",
                    submittedTime: new Date(),
                },
                runningTime: new Date(0),
            },
        }));
    }

    getResultView(status: boolean) {
        const task = this.state.task;
        if (task) {
            return status ? <AnalysisResult /> : <WaitingProgress {...task} />;
        }

        return (
            <div className="loading">
                <Loading
                    indicator={<Oval color="white" width="70" height="70" />}
                    loading={true}
                />
            </div>
        );
    }

    render() {
        return this.getResultView(this.state.isFinished);
    }
}

export default Result;
