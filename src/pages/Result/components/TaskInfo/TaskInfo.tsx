import { TaskInfoProperties } from "./index.d";
import { Loading } from "../../../../components/Loading";
import "./TaskInfo.css";
import { Oval } from "@agney/react-loading";

const TaskInfo = (props: TaskInfoProperties) => {
    return (
        <div className="centered-card taskInfo">
            <label className="taskTitle">Task title: {props.title}</label>
            <hr />
            <div>
                <label className="task">Task ID: {props.id}</label>
                <br />
                <label className="flex items-center task">
                    Task Status: {props.status}
                    <Loading
                        indicator={<Oval color="gray" width="25" height="25" />}
                        loading={true}
                    />
                </label>
                <label className="task">
                    Submitted At: {props.submittedTime.toTimeString()}
                </label>
            </div>
        </div>
    );
};

export default TaskInfo;
