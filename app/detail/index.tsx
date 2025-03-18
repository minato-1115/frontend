import React from "react";
import { Main } from "@/molecules/Main";
import { ModalContextProvider, ModalContext } from "@/hooks/ModalProvider";


const CalenderPage = () => {
    
    return (
        <ModalContextProvider>
        <Main/>
        </ModalContextProvider>
    )
}

export default CalenderPage;