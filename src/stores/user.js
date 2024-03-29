import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia';
import { useCartStore } from './cartStore'
import {mergeCartAPI} from '@/apis/cart'
import httpInstance from '@/utils/http';
export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const cartStore=useCartStore()
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result

        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count:item.count
            }
        }))
        cartStore.updateNewList()
    }
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},
  {
    persist: true,
    },)
  


export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}
