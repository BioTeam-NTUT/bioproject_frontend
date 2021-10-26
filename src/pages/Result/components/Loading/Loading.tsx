import { LoadingProperty } from "./index.d";
import { TaskInfo } from "../TaskInfo";
import "./Loading.css";

const Loading = (props: LoadingProperty) => {
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

export default Loading;
