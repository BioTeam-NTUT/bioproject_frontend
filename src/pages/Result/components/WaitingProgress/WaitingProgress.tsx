import { WaitingProgressProperties } from "./index.d";
import { TaskInfo } from "../TaskInfo";
import "./WaitingProgress.css";

const WaitingProgress = (props: WaitingProgressProperties) => {
    return (
        <>
            <TaskInfo
                id={props.taskInfo.id}
                title={props.taskInfo.title}
                status={props.taskInfo.status}
                submittedTime={props.taskInfo.submittedTime}
            ></TaskInfo>
            <div className="centered-card progress">Test</div>
        </>
    );
};

export default WaitingProgress;
