import { View } from "react-native"
import { Clock } from "../components/ClockContainer";
import { Link, useRouter } from "expo-router";
import { getDB } from "@/function/dbfunction";
import { Button } from "@rneui/themed";
import { useEffect } from "react";

const HomeScreen = () => {

  return(
  <Link href={{pathname:"/detail",params:{}}}>
  <View  style ={{backgroundColor:"#fff", width:"100%", height:"100%"}}>
  <Button title={"getDB"} onPress={getDB} containerStyle={{width:30}}></Button>
    <Clock/>
  </View>
  </Link>
  )
}

export default HomeScreen;