import { Text, View } from "react-native"
import { Button, ListItem } from '@rneui/themed';
import { useContext } from "react";
import { ModalContext } from "@/hooks/ModalProvider";
import { deleteDB } from "@/function/dbfunction";
export const MenuBar = () =>{
    const section = ["今日","週","月"]
    const sectionType = ["daily","weekly","monthly"]
    const  context = useContext(ModalContext)
    if(!context){
        throw new Error("contextに値が含まれていません")
    }
    
    const  {modalType,setModalOpen,setModalType,setModalId} = context

    return (
        <View style = {{alignItems:"center",margin:16,height:"16%",justifyContent:"space-around",width:"100%"}}>
            <View style = {{flexDirection:"row",width:200,borderRadius:8,justifyContent:"center", backgroundColor: 'rgba(78, 116, 289, 1)',elevation:8}}>
                {section.map((item,index)=>{
                    return(
                    <ListItem 
                        key = {index} 
                        containerStyle={{padding:0 , backgroundColor: 'rgba(78, 116, 289, 1)'}}>
                        <Button 
                            buttonStyle = {{margin:0 , backgroundColor: 'rgba(78, 116, 289, 1)',width:"100%",height:50}} 
                            disabledStyle = {{backgroundColor: 'rgba(78, 110, 289, 0.2)'}}
                            titleStyle = {{fontWeight:"bold",color:"#fff",textShadowColor:"#fff",textShadowRadius:1}}
                            onPress={()=>{
                                switch(index){
                                    case 0:
                                        setModalType("daily");
                                        break;
                                    case 1:
                                        setModalType("weekly");
                                        break;
                                    case 2:
                                        setModalType("monthly");
                                        break; 
                                }
                                }}
                            disabled ={sectionType[index] === modalType}>
                            {item}
                        </Button>
                    </ListItem>
            )})}
                    
                
            </View>
            <Button 
            title = "新規作成" 
            containerStyle = {{width:100}} 
            onPress={()=>{
                setModalId("") 
                setModalOpen(true) }}/>
        </View>
    )
} 