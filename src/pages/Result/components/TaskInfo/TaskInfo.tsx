import "./TaskInfo.css";

interface TaskInfoProperty {
    id: string;
    status: string;
}

const TaskInfo = (props: TaskInfoProperty) => {
    return (
        <div className="taskInfo">
            <label className="taskID">Task ID: {props.id}</label>
            <br />
            <label className="taskStatus">Task Status: {props.status}</label>
        </div>
    );
};

export default TaskInfo;
