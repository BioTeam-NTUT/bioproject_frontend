import "./Loading.css";
import { TaskInfo } from "../TaskInfo";

const Loading = (_: {}) => {
    return (
        <div>
            <TaskInfo id={taskSample.id} status={taskSample.status}></TaskInfo>
        </div>
    );
};

const taskSample = {
    id: "YP_009552282",
    status: "Searching",
};

export default Loading;
