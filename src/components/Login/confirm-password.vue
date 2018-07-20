<template>
    <div class="confirmPass">
        <x-header :showBack="true"></x-header>
        <div class="confirmPassInput">
            <input v-model="newPass" class="newPassInput" type="text" placeholder="请输入新密码" />            
            <input v-model="confirmNewPass" class="confirmNewPass" type="text" placeholder="请重新输入新密码" />
        </div>
        <div class="fonfirmBtn">确认密码</div>     
        <div class="prompt">提示：如果您原来的手机号已经停用，请拨打神兽客服热线：4007-999-999</div> 
    </div>
</template>

<script>

import XHeader from '../common/header'


export default {
    name: "confirmpassword",
    data: function() {
        return {
            newPass: '',
            confirmNewPass: ''
        }
    },
    components: {
        XHeader
    },
    methods: {
        
    }
}
</script>

<style scoped lang="less">
    .confirmPass {      
        .confirmPassInput {
            margin-top: .4rem;
            padding: 0 .12rem;
            .newPassInput {
                margin-top: .64rem;
            }
            .confirmNewPass {
                margin-top: .12rem;
            }
            .newPassInput, .confirmNewPass {
                display: inline-block;
                border-right: none;
                height: .36rem;
                border-radius: 4px; 
                border-top: solid 1px #F9F9F9;
                border-bottom: solid 1px #E9E9E9; 
                border-left: none;
                border-right: none;
                width: 100%;
                text-indent: .08rem;
            }           
        }
        .fonfirmBtn {
            height: .4rem;
            text-align: center;
            margin: .36rem .16rem 0 .16rem;
            background: #2577E3;
            border-radius: 4px;
            color: #fff;
            line-height: .4rem;
            font-size: .14rem;
        }
        .prompt {
            margin: .12rem .16rem 0 .16rem;
            font-size: .14rem;
            color: #4E4E4E;
        }
    }
</style>
