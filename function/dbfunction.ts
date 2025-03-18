import AsyncStorage from '@react-native-async-storage/async-storage';
import { controlDBType, dbType } from '@/const/type/dbtype';

interface pushDBProps{
    task:string;
    description:string;
    start_time:Date;
    end_time:Date;
    completed_time?:Date;
    taskColor:string;
    status:"undo"|"progressing"|"done"
}

export const pushDB = async({
    task,
    description,
    start_time,
    end_time,
    completed_time,
    taskColor,
    status="undo"
}:pushDBProps) =>{
    const taskId = Date.now().toString();
    const newTask = {
        id:taskId,
        task,
        description,
        start_time,
        end_time,
        completed_time: completed_time|| null,
        taskColor,
        status,
    }
    try{
    await AsyncStorage.setItem(`@tasks_${taskId}`,JSON.stringify(newTask));
    console.log("データの保存に成功しました。")
    }
    catch(error){
        console.log("データの保存に失敗しました。")
    }
}

export const getDB = async() => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const taskKeys = keys.filter(key => key.startsWith("@tasks_"));
        const taskData = await AsyncStorage.multiGet(taskKeys);
        const tasks = taskData.map(([keys,value]) =>JSON.parse(value!));
        console.log(tasks)
        return tasks
    }catch(error){
        console.error("タスクの取得に失敗しました:",error)
    }

}

export const deleteDB = async() => {
    try{
        const keys = await AsyncStorage.getAllKeys();
        const taskKeys = keys.filter(key => key.startsWith("@tasks_"));
        await AsyncStorage.multiRemove(taskKeys);
        console.log("タスクの削除に成功しました。")
    }catch(error){
        console.error("タスクの削除に失敗しました:",error)
    }
}

export const updateDB = async(id:string,updatedData:dbType) => {
    try{
        const keys = await AsyncStorage.getAllKeys();
        if(keys.includes(id)){
            const currentData = await AsyncStorage.getItem(id); 
            currentData && updatedData &&
            await AsyncStorage.setItem(id, JSON.stringify(updatedData));
        }
    }catch(error){
        console.error("タスクの更新に失敗しました:",error)
        }finally{
            getDB();
        }
}

export const getRecord = async(id:string) => {
    try{
        const keys = await AsyncStorage.getAllKeys();
        if(keys.includes(id)){
            const currentData = await AsyncStorage.getItem(id); 
            return currentData;
        }
    }catch(error){
        console.error("レコードの取得に失敗しました。:",error)
    }
}

export const deleteRecord = async(id:string) => {
    try{
        await AsyncStorage.removeItem("@tasks_"+id);
        console.log("タスクの削除に成功しました。")
        getDB()
    }catch(error){
        console.error("タスクの削除に失敗しました:",error)
    }
}

export const getTodayData = async() => {
    try {
        const keys = await AsyncStorage.getAllKeys();

        const taskKeys = keys.filter(key => key.startsWith("@tasks_"));

        const taskData = await AsyncStorage.multiGet(taskKeys);

        const tasks = taskData.map(([keys,value]) =>JSON.parse(value!)).filter(task => {
            const today = new Date();
            const taskDate  = new Date(task.start_time);
            return(today.getFullYear() === taskDate.getFullYear() && today.getMonth() === taskDate.getMonth() && today.getDate() === taskDate.getDate());
        });
        return tasks
    }catch(error){
        console.error("タスクの取得に失敗しました:",error)
    }

}
