import httpInstance from './../utils/http';

export const getGoodsAPI = (id) => {
    return httpInstance({
        url: '/goods',
        params: {
            id
        }
    })
}
