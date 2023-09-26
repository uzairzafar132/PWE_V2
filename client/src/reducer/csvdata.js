const initialState =[];
const saveTheData = (state = initialState,action)=>{
   // console.log(action);
    if(action.type==="SaveData"){
        state=action.payload;
        return state;
    }else{
       return state;
    }

}
export default saveTheData;
