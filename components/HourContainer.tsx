import { ListItem } from "@rneui/base"
import { View,Text } from "react-native"

interface HourContainerProps{
    taskNumbers:number;
}

export const  HourContainer = ({taskNumbers}:HourContainerProps) => {
    const views = Array.from({length:taskNumbers})
    
    return (
    <View style = {{flexDirection:"row",height:"100%"}}>
        
    {
    views.map((value,index)=>{
        return(
        <ListItem 
            key= {index} 
            containerStyle = {{width:100,marginHorizontal:8,backgroundColor:"#000"}} >
        </ListItem>)
    })           
    }
    </View>
     )
}