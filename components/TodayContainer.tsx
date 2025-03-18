import { View ,Text ,TouchableOpacity,FlatList,useWindowDimensions } from "react-native"
import {useMemo,useState,useEffect,useContext} from "react"
import { getTodayData,getDB, updateDB, pushDB } from "@/function/dbfunction"
import { dbType } from "@/const/type/dbtype"
import { ModalContext } from "@/hooks/ModalProvider"

const TOTAL_BLOCKS = 288;

export const TodayContainer = () =>{
    const [data, setData] = useState<any[] | undefined>([]);

    const context = useContext(ModalContext);
        if(!context){
            throw new Error("context is not defined")
        }
        const { openModal, setModalOpen, setModalId, setModalType } = context

    useEffect(() => {
        getTodayData()
        .then((res)=>{
            setData(res);
        });
    }, [openModal]);

    const { width } = useWindowDimensions();

    const numberList = useMemo(()=>{
        return Array.from({length:TOTAL_BLOCKS*(data?data.length:1)}).map((data,index)=>index)
    },[data]);
    
    
    const renderColorBlockCondition = (data:dbType[],index:number) => {
        const colorSettings  = data.map(({start_time,end_time,taskColor})=>{
            const startHour = new Date(start_time).getHours();
            const startMinute = new Date(start_time).getMinutes();
            const endHour = new Date(end_time).getHours();
            const endMinute = new Date(end_time).getMinutes();
            const start = data.length* (startHour*4 + Math.floor(startMinute / 15));
            const end = data.length* (endHour*4 + Math.floor(endMinute / 15));
            return{start:start,end:end,color:taskColor}
        });

        let column = index%data.length
        if (index>=colorSettings[column].start && index <= colorSettings[column].end) {
            return{backgroundColor:colorSettings[column].color} 
        } else {
            return{backgroundColor:"#fff"}    
        }
    }
    
    const renderWidth = () =>{
        if(data){
            return {width:width*0.6/(data.length)}
        }else{
            return {width:width}
        }
    } 

    const clockStyle = data ? {width:width*0.2/(data.length)}:{width:width*0.2}

    const renderBorder = (index: number, column: number) => {
        for(let i = 0; i < column; i++){
            if(i === index % column){
                if(index % (4 * column) === i){
                    return {borderTopColor: "#000", borderTopWidth:1}
                }
            }
            
        }
    }

//dataのindexを受け取って制御をしたい。 column が存在する場合には、columnの情報のアップデートなければ追加
    const  modalController = async (column?:number) => {
        if(column === 0 ||column ){
            if(!openModal) {
                if(data) {
                    setModalOpen(true);
                    setModalType('daily');
                    setModalId(data[column]["id"])       
            }
            } else {
                setModalOpen(false)
            }
        }else{
            setModalOpen(true);
        }

    } 

    const  renderColorBlockItem = (index: number) => {
        return (
            
            // TouchableOpacity でタッチしたときにモダルの表示
            <>
            {index%2? 
            <View style = {{borderTopWidth:1,backgroundColor:"#fff",elevation:8}}><Text style = 
                    {{height:20,marginHorizontal:2,textAlign:"center", ...clockStyle}}>11</Text></View>:
            <TouchableOpacity 
            onPress = {()=> {
                if(data){
                    modalController(index%data.length)
                }else{
                    modalController()
                }
                }}>
                <View  style = {[
                    {alignSelf:"center",height:20,marginHorizontal:2,elevation:8},
                    (
                        data && 
                        renderColorBlockCondition(data,index)
                    )
                    ,renderBorder(index,data?data.length:1),renderWidth()]}>
                </View>
            </TouchableOpacity>
    }
            </>
        )
    }

    return (
        <View>
        <FlatList
            key = {`${data ? data.length + 1 : 1}`}
            numColumns={data ? data.length + 1 : 1}
            data = {numberList}
            extraData={numberList}
            renderItem={({item,index})=>renderColorBlockItem(index)}
            keyExtractor={(item)=>item.toString()}
            initialNumToRender={100}
            initialScrollIndex={0}
            style= {{width:"90%"}}
            contentContainerStyle = {{alignItems:"center"}}
        ></FlatList>
        </View>
    )
}