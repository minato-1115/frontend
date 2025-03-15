import { useEffect, useState } from "react";
import { Text,TouchableOpacity,View} from "react-native";
import  DateTimePicker  from "@react-native-community/datetimepicker";
import { Button, Input ,Overlay} from "@rneui/themed";
import { pushDB, updateDB } from "@/function/dbfunction";
import { ColorPicker } from "./ColorPicker";
import { Icon } from "@rneui/base";
import { getRecord } from "@/function/dbfunction";
import { dbType } from "@/const/type/dbtype"; 
interface TaskSetModalProps{
    isVisible:boolean;
    setIsVisible:(type:boolean)=>void;
    id?:string;
    modalType?:"daily"|"weekly"|"monthly";
    changeType?: 'create'|'edit';
}
export const  TaskSetModal = ({
    isVisible,
    setIsVisible,
    id = "",
    modalType = "daily",
    changeType = "create"
    }:TaskSetModalProps
    ) =>{
    let data = null;
    if(changeType ===  "edit"){
    //特定のデータを取得する関数を用いてデータの取得とstateにセットする。
        data = getRecord(id)
    }
    const [startTime, setStartTime] = useState<Date|null>(null);
    const [endTime, setEndTime] = useState<Date|null>(null);
    const [openDatePicker,setOpenTimePicker] = useState(false)
    const [taskName,setTaskName] = useState("") 
    const [description,setDescriptionName] = useState("") 
    const [type,setType] = useState("start")
    const  [openColorPiker, setOpenColorPicker] = useState(false)
    const [color,setColor] = useState("#000")
    interface DateTimePickerEvent {
        type: string;
        nativeEvent: any;
    }
    const handleChange = (event: DateTimePickerEvent, selectedTime: Date | undefined) => {
        setOpenTimePicker(false);  // ピッカーを閉じる
        if (event.type ==="set" && selectedTime) {
            if(type==="start"){
                setStartTime(selectedTime);
            }
            else{
                setEndTime(selectedTime);
            }
        }
    }

// TODO タイプ別のモダルの内容に切り替えたい
//ID が存在しない場合には、データの追加をする。
        return(
        <Overlay isVisible={isVisible} onBackdropPress={()=>setIsVisible(!isVisible)} overlayStyle = {{height:"80%",width:"80%",backgroundColor:"white",alignItems:"center",justifyContent:"space-evenly"}}>
            <Text>新規タスク</Text>
            <Input label="タスク名" value={taskName} onChangeText={(value)=>setTaskName(value)}></Input>
            <Input label = "詳細" value={description} onChangeText={(value)=>setDescriptionName(value)}></Input> 
            <View style ={{width:"100%",alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
                <Text  
                    onPress={()=>{
                        setOpenTimePicker(!openDatePicker)
                        setType("start")
                    }} 
                    style ={{textAlign:"center", width:"40%",borderBottomWidth:1,borderBottomColor:"rgb(134, 147, 158)",marginVertical:16,marginHorizontal:8,padding:4,color:"rgb(134, 147, 158)"}}>
                    {startTime? `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`:"開始時刻"}
                    
                </Text>
                <Text
                    onPress={()=>{
                        setOpenTimePicker(!openDatePicker)
                        setType("end")
                    }} 
                    style ={{textAlign:"center",width:"40%",borderBottomWidth:1,borderBottomColor:"rgb(134, 147, 158)",marginVertical:16,padding:4,color:"rgb(134, 147, 158)"}}>
                    {endTime? `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`:"終了時刻"}</Text>
                
            </View> 
            <TouchableOpacity onPress={()=>{
                    setOpenColorPicker(!openColorPiker)
                }}>
            <View style = {{flexDirection:"row",borderBottomWidth:1}} >
                <Text style = {{textAlign:"center",marginHorizontal:8}}>
                {color?"選択した色: "+color:"タスクの色を選択"}
                
                </Text>
                <Icon name = "circle" color={color} />
            </View>
            </TouchableOpacity>
            {openColorPiker && <ColorPicker onPress = {(value)=>setColor(value)}/> }
            <View style = {{flexDirection:"row",width:"100%",justifyContent:"flex-start"}}>
            <Button 
            containerStyle ={{marginHorizontal:8}} 
            title = {id ? "更新" :"登録"} 
            onPress = {()=>{
                if((startTime&&endTime)&&(startTime<endTime)){
                    if(id){
                        updateDB("@tasks_"+id,{task:taskName,
                            description: description,
                            start_time: startTime,
                            end_time: endTime,
                            completed_time: undefined,
                            taskColor: color,
                            status: "undo"})
                    }else{ 
                        pushDB({
                            task:taskName,
                            description: description,
                            start_time: startTime,
                            end_time: endTime,
                            completed_time: undefined,
                            taskColor: color,
                            status: "undo"
                        })
                    }
                }
            else{
                console.log("予定開始時刻または予定終了時刻の入力がありません")
            }
            }}/>
            <Button containerStyle = {{marginHorizontal:8}} title = "閉じる"/>
            </View>
            {
            openDatePicker&&
            <DateTimePicker 
                value={(type==="start"?startTime:endTime) || new Date()} 
                mode="time"
                display="default" 
                onChange={handleChange}
            />
            }
        </Overlay>

    )}