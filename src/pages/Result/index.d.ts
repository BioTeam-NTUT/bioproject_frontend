import { RouteComponentProps } from "react-router";
import { WaitingProgressProperties as WaitingProgressInfo } from "./components/WaitingProgress/index.d";

interface PathParameters {
    taskId: string;
}

interface ResultProperties extends RouteComponentProps<PathParameters> {}

interface ResultStates {
    isFinished: boolean;
    task?: WaitingProgressInfo;
}

export { ResultProperties, ResultStates };
