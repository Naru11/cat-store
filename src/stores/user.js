import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value=res.reslut
    }

    return {
        userInfo,
        getUserInfo
    }
})