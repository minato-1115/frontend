export type dbType= {
    id: string;
    task: string;
    description: string;
    start_time: Date;
    end_time: Date;
    completed_time: Date | undefined;
    taskColor: string;
    status: "undo" | "done";
}
export type controlDBType= {
    task: string;
    description: string;
    start_time: Date;
    end_time: Date;
    completed_time: Date | undefined;
    taskColor: string;
    status: "undo" | "done";
}