import axios from './axios'
export const createOrder = (list,phone) => {
    // console.log(list)
    return axios.request({
        url: '/counter/createOrder',
        method: 'post',
        data: {
            list,
            phone
        }
    })
}