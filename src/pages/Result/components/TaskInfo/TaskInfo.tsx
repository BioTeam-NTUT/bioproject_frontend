import { TaskInfoProperty } from "./index.d";
import "./TaskInfo.css";

const TaskInfo = (props: TaskInfoProperty) => {
    return (
        <div className="centered-card taskInfo">
            <label className="taskTitle">Task title: {props.title}</label>
            <hr />
            <div>
                <label className="task">Task ID: {props.id}</label>
                <br />
                <label className="task">Task Status: {props.status}</label>
                <br />
                <label className="task">
                    Submitted At: {props.submittedTime.toTimeString()}
                </label>
            </div>
        </div>
    );
};

export default TaskInfo;
