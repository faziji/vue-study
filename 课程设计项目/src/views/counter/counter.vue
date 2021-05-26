<template>
    <div>
        <!-- style="background:red;" -->
    <Row style="margin-top:20px;">
        <Col span='9' offset="2">
            <h1 style="margin-left:109px;">商品清单</h1>
            <Form ref="formDynamic" :model="formDynamic" :label-width="110" style="width: 350px">
                <template v-for="(item, index) in formDynamic.items">
                    <Divider v-if="item.status" :key="`divider_${index}`"/>
                    <FormItem
                        v-if="item.status"
                        :key="`id_${index}`"
                        :label="'商品编号'"
                        :prop="'items.' + index + '.productId'"
                        :rules="{required: true, message: '商品编号不能为空', trigger: 'blur'}">
                    <Row>
                        <Col span="18">
                            <Input type="text" v-model="item.productId"></Input>
                        </Col>
                        <Col span="4" offset="1">
                            <Button @click="handleRemove(index)">Delete</Button>
                        </Col>
                    </Row>
                    </FormItem>
                    
                    <FormItem
                        v-if="item.status"
                        :key="`num_${index}`"
                        :label="'商品的数量'" 
                        :prop="'items.' + index + '.productNum'"
                        >
                    <Row>
                        <Col span="9">
                            <InputNumber :max="999" :min="1" v-model="item.productNumber"></InputNumber>
                        </Col>
                    </Row>
                    </FormItem>
                </template>
                
                <FormItem>
                    <Row>
                        <Col span="12">
                            <Button type="dashed" long @click="handleAdd" icon="md-add">加商品</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
                    <Button @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
                </FormItem>
                
            </Form>
        </Col>
        
        <Col span="10" offset="1">
            <Row>
                <Col style="margin-bottom:20px;">
                    <Card dis-hover>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            输入会员电话号码
                        </p>
                        <Input />
                    </Card>
                </Col>
                <Col style="margin-bottom:20px;">
                    <Card dis-hover>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            打印订单
                        </p>
                        <Table show-summary :summary-method="handleSummary" :columns="columns" :data="tableData"></Table>
                    </Card>
                </Col>
                <Col >
                    <Card dis-hover>
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            测试数据
                        </p>
                        <p>商品编号：1 红苹果</p>
                        <p>商品编号：2 绿苹果</p>
                        <p>商品编号：3 黄苹果</p>
                    </Card>
                </Col>
            </Row>
        </Col>
    </Row>
    </div>
</template>
<script>

import {createOrder} from '@/api/counter'
import editTable from '../../components/edit-table/edit-table.vue'
export default {
  components: { editTable },
        data () {
            return {
                tableData: [],
                columns: [
                    {key:'productId',title:'编号',editable: true},
                    {key:'productName',title:'名称',editable: true},
                    {key:'productPrice',title:'单价',editable: true},
                    {key:'productNumber',title:'数量',editable: true},
                    {key:'isVip',title:'会员',editable: true},
                    {key:'proTotalPrice',title:'总价',editable: true}
                ],
                index: 1,
                formDynamic: {
                    items: [
                        {
                            productId: '123',
                            productNumber: 1,
                            index: 1,
                            status: 1
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        let _ = this
                        this.formDynamic.items = this.formDynamic.items.filter(item=>{
                            if (item.status) return true
                        })
                        await createOrder(this.formDynamic.items,'123').then(res=>{
                            if (res.code == 200) {
                                console.log(res.data.list)
                                _.tableData = res.data.list
                                this.$Message.success('订单生成成功！');   
                            } else {
                                this.$Message.error(res.msg);
                            }
                        })
                    } else {
                        this.$Message.error('商品编号不能为空!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    productId: '',
                    productNumber: 1,
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            },
            handleSummary({ columns, data }){
                const sums = {};
                columns.forEach((column, index) => {
                    const key = column.key;
                    if (index === 0) {
                        sums[key] = {
                            key,
                            value: '总价'
                        };
                        return;
                    }
                    if (index !== 5) {
                        sums[key] = {
                            key,
                            value: ''
                        };
                        return
                    }

                    const values = data.map(item => Number(item[key]));
                    if (!values.every(value => isNaN(value))) {
                        const v = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[key] = {
                            key,
                            value: v + '元'
                        };
                    }
                });

                return sums;
            }
        }
    }
</script>