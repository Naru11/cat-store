<script setup>
import { getCategoryDataAPI } from '@/apis/category';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSubCategoryAPI } from '@/apis/category'
import GoodsItem from '../Home/components/GoodsItem.vue'
const CategoryData = ref({})
const route=useRoute()
const getCategoryData = async (id)=> {
    const res = await getCategoryDataAPI(id)
    CategoryData.value = res.result
}

onMounted(()=>getCategoryData(route.params.id))


const goodsList = ref([])
const data = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField:'publishTime'
})
const getGoodList = async () => {
    const res = await getSubCategoryAPI(data.value)
    goodsList.value = res.result.items
    console.log(res)
}
onMounted(() => getGoodList())

const tabChange = () => {
    data.value.page=1
    getGoodList()
}

const disabled =ref(false)
const load = async () => {
    console.log('loading')
    data.value.page++;
    const res = await getSubCategoryAPI(data.value)
    goodsList.value = [...goodsList.value, ...res.result.items]

    if (res.result.items.length == 0) {
        disabled.value =ref(true)
    }
}
</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${CategoryData.parentId}` }">{{CategoryData.parentName}}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{CategoryData.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="data.sortField" @tab-change="tabChange" >
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <!-- 商品列表-->
                <GoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods"/>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>