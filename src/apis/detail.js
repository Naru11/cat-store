import httpInstance from './../utils/http';

export const getGoodsAPI = (id) => {
    return httpInstance({
        url: '/goods',
        params: {
            id
        }
    })
}

export const getDetailHotAPI = ({ id, type, limit = 3 })=>{
    return httpInstance({
        url: '/goods/hot',
        params: {
            id,
            type,
            limit
        }
    })
}