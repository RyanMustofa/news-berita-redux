const globalState = {
    loading : true,
    loadingDetail : false,
    loadingLogin: true,
    cek:false
}
export const rootReducer = (state = globalState,action) => {
    if(action.type === 'CHANGE_LOADING'){
        return{
            ...state,
            loading: action.value
        }
    }
    if(action.type === 'CHANGE_LOADING_DETAIL'){
        return{
            ...state,
            loadingDetail: action.value
        }
    }
    if(action.type === 'CHANGE_LOADING_LOGIN'){
        return{
            ...state,
            loadingLogin: action.value
        }
    }
    if(action.type === 'CEK'){
        return{
            ...state,
            cek: action.value
        }
    }
    return state
}
