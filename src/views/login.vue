<template>
    <div class="loginFrom">
        <div class="bg">
            <iframe height="100%" width="100%" src="http://art.zslyoo.top/bg.html" frameborder="0"></iframe>
        </div>

        <div class="center">
            <div class="center_title">专家登录</div>
            <div class="center_input">
                <!--
                <input type="text" v-model="inviteCode" placeholder="请输入智镜邀请码">
                -->
                <input type="text" v-model="inviteCode" placeholder="2KMOO5JIWRKB">
            </div>
            <div class="btn" @click="handleLogin">专家验证</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: "loginFrom",
    data() {
        return {
            inviteCode: ''
        }
    },
    methods: {
        async handleLogin() {

            try {
                const url = `http://47.122.63.229:5055/api/login?invite_code=${this.inviteCode}`
                const res = await axios.get(url)
                console.log(res.data, '===res');
                if ( res.data.message && res.data.message === 'Login successful') {
                    this.$store.commit('setUserId', res.data.user_id);
                    localStorage.setItem('user_id', res.data.user_id);
                    this.$router.push('/gallery')
                } else if (res.data.error) {
                    this.$message.error(res.data.error);
                } else {
                    this.$message.error('登录失败，请重试');
                }
            } catch (error) {
                this.$message.error('登录失败，请重试');
                console.error('Error login:', error);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.loginFrom {
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    .bg {
        position: absolute;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        overflow: hidden;
    }

    .center {
        position: absolute;
        left: 0;
        top: 207px;
        right: 0;
        margin: 0 auto;
        z-index: 9;
        width: 860px;
        height: 485px;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 24px 24px 24px 24px;
        pointer-events: none;

        .center_title {
            height: 57px;
            font-weight: 400;
            font-size: 50px;
            color: #212121;
            text-align: center;
            margin-top: 64px;
        }

        .center_input {
            margin: 0 auto;
            margin-top: 89px;
            padding: 0 12px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 690px;
            height: 56px;
            border-radius: 8px 8px 8px 8px;
            border: 1px solid rgba(102, 102, 102, 0.8);
            pointer-events: auto;

            input {
                height: 56px;
                line-height: 56px;
                width: 100%;
                background: none;
                border: none;
                font-size: 18px;
            }

            input:focus {
                outline: none;
            }



        }

        .btn {
            width: 398px;
            height: 75px;
            line-height: 75px;
            background: #9D0000;
            box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.25);
            border-radius: 38px 38px 38px 38px;
            margin: 0 auto;
            margin-top: 94px;
            font-weight: 400;
            font-size: 30px;
            color: #FFFFFF;
            text-align: center;
            cursor: pointer;
            pointer-events: all;
        }
    }



}
</style>