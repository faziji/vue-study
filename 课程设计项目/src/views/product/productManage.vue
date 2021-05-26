<template>
    <Table border :columns="columns12" :data="productList">
        <template slot-scope="{ row }" slot="productId">
            <strong>{{ row.productId }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
</template>
<script>
import {getAllProduct} from '@/api/product'
export default {
    data () {
        return {
            columns12: [
                {
                    title: '商品编号',
                    slot: 'productId'
                },
                {
                    title: '商品名称',
                    key: 'productName'
                },
                {
                    title: '品牌',
                    key: 'productBrand'
                },
                {
                    title: '品种',
                    key: 'productKind'
                },
                {
                    title: '普通价',
                    key: 'productPrice'
                },
                {
                    title: '会员价',
                    key: 'productVipPrice'
                },

                {
                    title: '操作',
                    slot: 'action',
                    width: 200,
                    align: 'center'
                }
            ],
            productList: []
        }
    },



    async mounted(){
        let _ = this
        await getAllProduct().then(res=>{
            console.log(res.data.list)
            _.productList = res.data.list
        })
    },

    methods: {
        show (index) {
            // this.$Modal.info({
            //     title: 'User Info',
            //     content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            // })
        },
        remove (index) {
            this.productList.splice(index, 1);
        }
    }
}
</script>