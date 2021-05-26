<template>
    <Row style="margin-top:20px;">
        <h1 style="margin-left:109px;">新添管理员</h1>
        <Col span='12' offset="0">
            <Form style="margin-top:20px;"  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="姓名" prop="username">
                <Input v-model="formValidate.username" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formValidate.password" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="手机号" prop="phone">
                <Input v-model="formValidate.phone" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="权限" prop="role">
                <RadioGroup v-model="formValidate.role">
                    <Radio label="0">普通店员</Radio>
                    <Radio label="1">超级管理员</Radio>
                </RadioGroup>
            </FormItem>
                
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
        </Col>
    </Row>
</template>
<script>
import {getAllProduct} from '@/api/product'
export default {
    data () {
        return {
            formValidate: {
                username: '',
                password: '',
                phone: '',
                role: '0'
            },
            ruleValidate: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                ],
                city: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],
                gender: [
                    { required: true, message: 'Please select gender', trigger: 'change' }
                ],
                interest: [
                    { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                    { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                ],
                date: [
                    { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                ],
                time: [
                    { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                    { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>