import { Text, View } from "react-native"
import { Button, ListItem } from '@rneui/themed';
import { useContext } from "react";
import { ModalContext } from "@/hooks/ModalProvider";

export const MenuBar = () =>{
    const section = ["今日","月","週"]
    const  context = useContext(ModalContext)
    if(!context){
        throw new Error("contextに値が含まれていません")
    }
    
    const  {setModalType} = context

    return (
        <View style = {{flexDirection:"row",width:"30%", justifyContent:"space-evenly",borderRadius:8 , backgroundColor: 'rgba(78, 116, 289, 1)',margin:16}}>
            {section.map((item,index)=>{
                return(
                <ListItem 
                    key = {index} 
                    containerStyle={{padding:0 , backgroundColor: 'rgba(78, 116, 289, 1)'}}>
                    <Button 
                        buttonStyle = {{margin:0 , backgroundColor: 'rgba(78, 116, 289, 1)',width:"100%"}} 
                        titleStyle = {{fontWeight:"bold",color:"#fff"}}
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
                            }}>
                            {item}
                    </Button>
                </ListItem>
        )})}
                
            
        </View>
    )
} 