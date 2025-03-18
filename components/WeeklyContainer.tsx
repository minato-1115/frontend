import {View,Text,FlatList, ScrollView} from "react-native"
import { useWindowDimensions } from "react-native";
export const WeeklyContainer = () => {
        const { width, height } = useWindowDimensions();
    
    return(
        <ScrollView style = {{flexDirection:"column",backgroundColor:"#D8D8D8"}}>
            
            <View style = {{flexDirection:"row",width:width,marginVertical:4,justifyContent:"space-evenly"}}>
                <View style = {{width:width*0.2,height:height/7,borderWidth:2,borderColor:"#5f5f5f",justifyContent:"center",backgroundColor:"#fff",elevation:8}}>
                    <Text style = {{textAlign:"center",lineHeight:height/21,color:"red",fontSize:12,fontWeight:"bold",height:height/21}}>祝日</Text>
                    <Text style = {{textAlign:"center",lineHeight:height/21,fontSize:18,height:height/21}}>1/1</Text>
                    <Text style = {{textAlign:"center",lineHeight:height/21,color:"red",fontWeight:"bold",height:height/21}}>日</Text>
                </View>

               
                <ScrollView style = {{width:width*0.75,height:height/7,borderWidth:2,borderColor:"#5f5f5f",backgroundColor:"#fff",elevation:8}}>
                    
                    <View style ={{marginLeft:16,flexDirection:"row",alignItems:"center",width:width*0.75,justifyContent:"space-between",borderBottomWidth:1}}>
                        <Text style = {{marginVertical:4,fontWeight:"bold"}}>タスク名</Text>
                        <View style = {{width:width*0.25,alignItems:"flex-end",justifyContent:"space-evenly",flexDirection:"row"}}>
                            <Text style = {{marginVertical:4,marginRight:24,fontWeight:"bold"}}>難易度</Text>
                        </View>
                    </View>

                    <View style ={{flexDirection:"row",alignItems:"center",width:width*0.75,justifyContent:"space-between"}}>
                        <Text style = {{marginLeft:16}}>タスク１</Text>
                        <View style = {{width:width*0.25,alignItems:"flex-end",justifyContent:"space-evenly",flexDirection:"row"}}>
                            <View style = {{backgroundColor:"black",width:16,height:16}}/>
                            <View style = {{backgroundColor:"black",width:16,height:16}}/>
                            <View style = {{backgroundColor:"black",width:16,height:16}}/>
                            <View style = {{backgroundColor:"black",width:16,height:16}}/>
                            <View style = {{backgroundColor:"black",width:16,height:16}}/>
                        </View>
                    </View>
                </ScrollView>

            </View>

            
            

            
        </ScrollView>
    )
}