import axios from 'axios';

export const loginData = (datas) => dispatch => {
    dispatch({type: 'CHANGE_LOADING_LOGIN',value: false})
    return axios.post('https://penjualanapp-api.herokuapp.com/api/v1/auth/login',datas)
        .then(res => {
            localStorage.setItem('api_token',res.data.data.token)
            dispatch({type: 'CHANGE_LOADING_LOGIN',value: true})
        })
}
