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
                    username: [
                        { required: true, message: '姓名不能为空！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空！', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '电话不能为空！', trigger: 'blur' }
                    ],
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
