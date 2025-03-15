import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { MenuBar } from "@/components/MenuBar";
import { Main } from "@/components/Main";
import { TodayContainer } from "@/components/TodayContainer";
import { useState } from "react"
import { WeeklyContainer } from "@/components/WeeklyContainer";
import { MonthlyContainer } from "@/components/MonthlyContainer";
import { TaskSetModal } from "@/components/TaskSetModal";
import { Button } from "@rneui/base";
import { deleteDB } from "@/function/dbfunction";
import { useContext } from "react";
import { ModalContextProvider, ModalContext } from "@/hooks/ModalProvider";

const CalenderPage = () => {
    const context = useContext(ModalContext);

    if(!context){
        throw new Error("context is not defined")
    }

    const { openModal, setModalOpen, modalId, modalType, setModalType } = context

    return (
        <ModalContextProvider>
        <Main>
            <MenuBar/>
            {/* 
                modalの中身をidによって区別する。
                modalの状態をmodalTypeで管理する。
                id を受け取る。
                idのデータベースを呼び出す。
                データベースの書き換え。
                閉じるボタンで閉じる。
                可視化を他のファイルから扱う。
            */}
            <TaskSetModal isVisible={openModal} setIsVisible={setModalOpen} modalType = {modalType} id = {modalId} /> 
            {modalType === "daily"? <TodayContainer/>:(modalType === "monthly"?<WeeklyContainer/>:<MonthlyContainer/>)}
        </Main>
        </ModalContextProvider>
    )
}

export default CalenderPage;