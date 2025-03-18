import { useEffect, useState,useContext } from "react";
import React from "react";
import { Text,TouchableOpacity,View,KeyboardAvoidingView, ScrollView} from "react-native";
import  DateTimePicker  from "@react-native-community/datetimepicker";
import { Button, Input ,Overlay} from "@rneui/themed";
import { pushDB, updateDB,deleteRecord } from "@/function/dbfunction";
import { ColorPicker } from "./ColorPicker";
import { Icon } from "@rneui/base";
import { getRecord } from "@/function/dbfunction";
import { ModalContext } from "@/hooks/ModalProvider";
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

         const context = useContext(ModalContext);
        
            if(!context){
                throw new Error("context is not defined")
            }
        
            const { setModalOpen } = context    

    //特定のrecordが存在する場合には、レコード内容をstateに保存したい
    const [startTime, setStartTime] = useState<Date|null>(null);
    const [endTime, setEndTime] = useState<Date|null>(null);
    const [openDatePicker,setOpenTimePicker] = useState(false)
    const [taskName,setTaskName] = useState("") 
    const [description,setDescriptionName] = useState("") 
    const [type,setType] = useState("start")
    const [openColorPiker, setOpenColorPicker] = useState(false)
    const [color,setColor] = useState("#ffc107")

    useEffect(()=>{
            if(changeType ===  "edit" && id){
                //特定のデータを取得する関数を用いてデータの取得とstateにセットする。
                (async () => {
                    const data = await getRecord("@tasks_"+id);
                    if (data) {
                        const parsedData = JSON.parse(data);
                        setTaskName(parsedData["task"])
                        setDescriptionName(parsedData["description"])
                        setStartTime(new Date(parsedData["start_time"]))
                        setEndTime(new Date(parsedData["end_time"]))
                        setColor(parsedData["taskColor"])
                    }
                })();
            }else{
                setTaskName("")
                        setDescriptionName("")
                        setStartTime(null)
                        setEndTime(null)
                        setColor("#ffc107")
            }
        },[id]);
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
            { changeType === "create" ? <Text>新規タスク</Text>:<Text>タスクの変更</Text> }
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
            {/* 削除の要件も加えたいですね。 */}
            <Button 
            containerStyle ={{marginHorizontal:8}} 
            title = {id ? "更新" :"登録"} 
            onPress = {()=>{
                try{
                if((startTime&&endTime)&&(startTime<endTime)){
                    if(id){
                        updateDB("@tasks_"+id,{
                            id:id,
                            task:taskName,
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
                    setModalOpen(false)   
                }
                else{
                    console.log("予定開始時刻または予定終了時刻の入力がありません")
                }
            }catch(error){
                console.error("データベースの登録に失敗しました。")
            }
            }}/>
            <Button 
                containerStyle = {{marginHorizontal:8}} 
                title = "削除" 
                onPress={()=>{
                    deleteRecord(id) 
                    setModalOpen(false)
                }}/>
            <Button containerStyle = {{marginHorizontal:8}} title = "閉じる" onPress={()=>setModalOpen(false)}/>
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