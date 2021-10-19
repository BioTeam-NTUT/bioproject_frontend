import React from 'react';
import './Loading.css';
import {Task} from './components/Task'

const $3Dmol = window.$3Dmol;

class Loading extends React.Component<{}, {}> {
    constructor(props: {}) {
      super(props);
    }

    componentDidMount() {
    }

    render() {
      return (
        <div>
            <Task TaskID={testProp.TaskID} Status={testProp.Status}></Task>
        </div>
      );
    }
  }
const testProp={
    TaskID: "YP_009552282",
    Status: "Searching"
}
export default Loading;