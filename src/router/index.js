import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/Login/index.vue'
import layout from '@/views/Layout/index.vue'
import home from '@/views/Home/index.vue'
import category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import detail from '@/views/Detail/index.vue'
import cartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import pay from '@/views/Pay/index.vue'
import payback from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import MemberInfo from '@/views/Member/components/UserInfo.vue'
import MemberOrder from '@/views/Member/components/UserOrder.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        {
          path: '',
          component: home,
        },
        {
          path: '/category/:id',
          component:category,
        },
        {
          path: '/category/sub/:id',
          component: SubCategory
        },
        {
          path: '/detail/:id',
          component: detail
        },
        {
          path: '/cartList',
          component: cartList
        },
        {
          path: '/checkout',
          component: Checkout
        },
        {
          path: '/pay',
          component: pay
        }
        ,
        {
          path: '/paycallback',
          component: payback
        },
        {
          path: '/member',
          component: Member,
          children: [
          {
            path: '',
            component: MemberInfo
          },
          {
            path: 'userorder',
            component: MemberOrder
          }
          ]
        }
        
      ]
    },
    {
      path: '/login',
      component: login
    }
  ],
  scrollBehavior () {
    return {
      top:0
    }
  }
})

export default router
