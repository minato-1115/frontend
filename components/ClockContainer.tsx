import { View , Text ,Button } from "react-native";
import { useEffect ,useState} from "react";

export const Clock = () =>{

// 現在時刻を取得して返す関数
const fetchCurrentTime = () => {
        const date = new Date;
        const hour = date.getHours().toString().padStart(2,"0");
        const minutes = date.getMinutes().toString().padStart(2,"0");
        const seconds = date.getSeconds().toString().padStart(2,"0");
        return `${hour}:${minutes}:${seconds}`
    };

// 現在時刻をレンダリングして返す関数


    // 現在時刻管理のuseStateを定義
    const [currentTime, setCurrentTime] = useState(fetchCurrentTime);
    const updateCurrentTime = () =>{
        setCurrentTime(fetchCurrentTime);
    };

    // 初回レンダリング時にのみ、実行
    useEffect(() => {
        // 0.5秒間隔でuseState更新
        const intervalId = setInterval(updateCurrentTime, 500);
        // クリーンナップ関数（コンポーネント削除時に実行)
        return () => { clearInterval(intervalId); };
    },[]);
    

    return(
    <View style = {{height:"100%",position:"relative",top:"30%",alignItems:"center"}}>
        <Text style = {{fontSize:80,textAlign:"center"}}>{currentTime}</Text>
        <View style = {{aspectRatio:"3/4",width:"40%",borderRadius:6}}>
            <Button title = "タスク完了" />
        </View>
     </View>
     )
}

export default Clock;