import { View ,Text ,TouchableOpacity,FlatList } from "react-native"
import {useMemo,useState,useEffect,useContext} from "react"
import { getDB, updateDB } from "@/function/dbfunction"
import { dbType } from "@/const/type/dbtype"
import { ModalContext } from "@/hooks/ModalProvider"

const TOTAL_BLOCKS = 288;

export const TodayContainer = () =>{
    const [data, setData] = useState<any[] | undefined>([]);
    useEffect(() => {
        getDB().then((res)=>{
            setData(res);
        });
    }, []);
    
     const context = useContext(ModalContext);
    
        if(!context){
            throw new Error("context is not defined")
        }
    
        const { openModal, setModalOpen, modalId, setModalId, modalType, setModalType } = context

    const numberList = useMemo(()=>{
        return Array.from({length:TOTAL_BLOCKS*(data?data.length:1)}).map((data,index)=>index)
    },[data]);
    
    
    const renderColorBlockCondition = (data:dbType[],index:number) => {
        const colorSettings  = data.map(({start_time,end_time,taskColor})=>{
            const startHour = new Date(start_time).getHours();
            const startMinute = new Date(start_time).getMinutes();
            const endHour = new Date(end_time).getHours();
            const endMinute = new Date(end_time).getMinutes();
            const start = 3* (startHour*4 + Math.floor(startMinute / 4));
            const end = 3* (endHour*4 + Math.floor(endMinute / 4));
            return{start:start,end:end,color:taskColor}
        });

        let column = index%data.length
        if (index>=colorSettings[column].start && index <= colorSettings[column].end) {
            return{backgroundColor:colorSettings[column].color} 
        } else {
            return{backgroundColor:"#fff"}    
        }
    }
    

    const renderBorder = (index: number, column: number) => {
        for(let i = 0; i<column; i++){
            if(i === index % column){
                if(index % (12 * column) === i){
                    return {borderTopColor: "#000", borderTopWidth:3}
                }else if(index % (6 * column) === i){
                    return {borderTopColor: "#000", borderTopWidth:2}
                }
            }
            
        }
    }
//dataのindexを受け取って制御をしたい。
    const  modalController = async (column:number) => {
        if(!openModal) {
            if(data) {
                setModalType('daily');
                setModalId(data[column])
                setModalOpen(true);
            }
        } else {
            setModalOpen(false)
        }
    } 

    const  renderColorBlockItem = (index: number) => {
        return (
            // TouchableOpacity でタッチしたときにモダルの表示
            <TouchableOpacity 
            onPress = {()=> {
                }} >
                <View  style = {[
                    {alignSelf:"center",width:100,marginHorizontal:2},
                    (data && 
                    renderColorBlockCondition(data,index))
                    ,renderBorder(index,data?data.length:1)]}>
                    <Text style = {{color:"#fff",textAlign:"center"}} >
                        {index}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        
        <FlatList
            key = {`${data ? data.length : 1}`}
            numColumns={data ? data.length : 1}
            data = {numberList}
            renderItem={({item,index})=>renderColorBlockItem(index)}
            keyExtractor={(item)=>item.toString()}
            initialNumToRender={100}
            initialScrollIndex={0}
        ></FlatList>
    )
}