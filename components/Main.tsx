import { View } from "react-native"
import { ReactNode } from "react"
interface MainProps{
    children?:ReactNode;
    backgroundColor?:string;
}
export const Main = ({
    children,
    backgroundColor = "#fff"
}:MainProps) => {
    return (
        <View style = {{backgroundColor:backgroundColor,width:"100%",height:"100%",alignItems:"center"}}>
            {children}
        </View>
    ) 
}