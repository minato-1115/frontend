import {createContext, ReactNode, SetStateAction, useState} from "react";

interface ModalContextProps{
    openModal:boolean;
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
    modalId:string;
    setModalId:React.Dispatch<React.SetStateAction<string>>;
    modalType:"daily"|"weekly"|"monthly";
    setModalType:React.Dispatch<React.SetStateAction<"daily" | "weekly" | "monthly">>
}


export const ModalContext = createContext<ModalContextProps|undefined>(undefined)

interface ModalProviderProps{
    children: ReactNode;
}

export const ModalContextProvider: React.FC<ModalProviderProps>  = ({children}) => {
    const [openModal,setModalOpen] =  useState(false)
    const [modalId,setModalId] =  useState<string>("")
    const [modalType,setModalType] = useState<"daily" | "weekly" | "monthly">("daily")
    return(
        <ModalContext.Provider value={{openModal,setModalOpen,modalId,setModalId,modalType,setModalType}}>
            {children}
        </ModalContext.Provider>
    )
}