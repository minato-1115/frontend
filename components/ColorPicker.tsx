import { View,Text } from "react-native"
import { Icon } from "@rneui/themed"
import { color } from "@/const/color"

interface ColorPickerProps{
    onPress:(value:string)=>void
}
export const ColorPicker = ({onPress}:ColorPickerProps) => {
    return (
        <View style={{ flexDirection: "row" }}>
            {Object.values(color).map((value, index) => (
                <Icon key={index} name="circle" color={value} onPress={()=>onPress(value)} />
            ))}
        </View>
    )
}