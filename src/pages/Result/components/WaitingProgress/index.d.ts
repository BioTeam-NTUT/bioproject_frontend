import { TaskInfoProperties } from "../TaskInfo/index.d";

interface WaitingProgressProperties {
    taskInfo: TaskInfoProperties;
    runningTime: Date;
}

export { WaitingProgressProperties };
