import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import {insertCartAPI,findNewCartListAPI ,delCartAPI} from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {

  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 1. 定义state - cartList
  const cartList = ref([])
  // 2. 定义action - addCart

  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value=res.result
  }
  const addCart = async(goods) => {
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    const {skuId,count}=goods
    if (isLogin.value) {
      await insertCartAPI({ skuId, count })
      updateNewList()
    }
    else {
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count++
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }
    
  }

  const delCart = async(skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId])
      updateNewList()
    }
    else {
      const idx=cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx,1)
    }
    
  }

  const clearCart = () => {
    cartList.value=[]
  }
  const singleCheck = (skuId, selected) => {
    const item=cartList.value.find((item) => item.skuId === skuId)
    item.selected=selected
  }

  const allCheck = (selected) => {
    cartList.value.forEach(item=>item.selected=selected)
  }
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  const selectedCount = computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
  
  const selectedPrice = computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))

  const isAll = computed(()=>cartList.value.every((item)=>item.selected))
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList

  }
}, {
  persist: true,
})