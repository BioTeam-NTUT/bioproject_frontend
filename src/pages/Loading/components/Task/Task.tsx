import React from 'react';
import './Task.css';
interface TaskProperty {
	TaskID:string;
    Status:string;
}

const Task = (props: TaskProperty) => {
	return (
		<div className="taskDiv">
			<label className="taskID">Task ID: {props.TaskID}</label><br></br>
			<label className="taskID">Task Status: {props.Status}</label>
		</div>
		
	);
}

export default Task;