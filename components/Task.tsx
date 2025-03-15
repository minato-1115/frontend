import { useEffect,useState } from "react"
import { View,Text} from "react-native"

interface TaskContainerProps{
    todayTaskInfo?:{
        taskName:string,
        description:string,
        startTime:string,
        endTime:string,
        status:string,
    }[]
}


export const TaskContainer = (props:TaskContainerProps) =>{
    const startTime = ""
    const [taskName,setTaskName] = useState("")
    const date = new Date()
    const H = date.getHours(),
                M = date.getMinutes(),
                S = date.getSeconds();
               
    useEffect(()=>{
        if(startTime=== `${H}:${M}:${S}`){
            setTaskName("")
        }
    },[])
    return(
        <View>
            <Text>{taskName}</Text>
        </View>
    )
}
/*
Table:today_Task
primary key 
##################################################################
# id  # taskName # description # start_time # end_time # status #
###################################################################
# int #  text    #   null      # HH:MM:SS # HH:MM:SS   # in process|done|yet#
################################################################
start_timeの昇順で取り出す。

*/