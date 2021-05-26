import axios from './axios'
export const getAllProduct = () => {
    return axios.request({
        url: '/product/getAllProduct',
        method: 'get'
    })
}