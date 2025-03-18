import { View, Button } from "react-native"
import { useState, useContext} from "react"
import { MenuBar } from "../components/MenuBar";
import { TaskSetModal } from "../components/TaskSetModal";
import { TodayContainer } from "../components/TodayContainer";
import { WeeklyContainer } from "../components/WeeklyContainer";
import { MonthlyContainer } from "../components/MonthlyContainer";
import { ModalContext } from "@/hooks/ModalProvider";
interface MainProps{
    backgroundColor?:string;
}
export const Main = ({
    backgroundColor = "#fff"
}:MainProps) => {

    
    const context = useContext(ModalContext);
        if(!context){
            throw new Error("context is not defined")
        }
    
        const { openModal, setModalOpen, modalId, modalType } = context
    return (
        <View style = {{backgroundColor:backgroundColor,width:"100%",height:"100%",alignItems:"center"}}>
            <MenuBar/>
            <View style= {{width:"100%",height:4,elevation:8}}></View>
            <TaskSetModal isVisible={openModal} setIsVisible={setModalOpen} modalType = {modalType} id = {modalId} changeType={modalId ? "edit": "create"} /> 
            {modalType === "daily"? <TodayContainer />:(modalType === "monthly"?<WeeklyContainer/>:<MonthlyContainer/>)}
        </View>
    ) 
}