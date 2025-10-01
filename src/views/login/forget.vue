<template>
    <div class="loginFrom">
        <div class="bg">
            <iframe height="100%" width="100%" src="http://art.zslyoo.top/bg.html" frameborder="0"></iframe>
        </div>

        <div class="center">
            <div class="center_title">忘记密码</div>

            <div class="item">
                <div class="title fs">手机号或邮箱</div>
                <div class="input fs">
                    <input type="text" placeholder="请输入">
                    <div class="get_code">获取验证码</div>
                </div>
            </div>

            <div class="item">
                <div class="title fs">验证码</div>
                <div class="input fs">
                    <input type="text" placeholder="请输入">
                </div>
            </div>
            <div class="item">
                <div class="title fs">
                    <span>密码</span>
                    <span>
                        <img src="@/assets/login/ck.png" alt="">
                        隐藏</span>
                </div>
                <div class="input fs">
                    <input type="text" placeholder="请输入您的密码">
                </div>
            </div>
            <div class="btn">确认</div>
            <div class="zc">
                已经有账户？<span @click="handleLogin">点击登录</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "loginFrom",
    data() {
        return {
        }
    },
    methods: {
        handleLogin() {
            this.$router.push('/userLogin')
        },

    }
}
</script>
<style lang="less" scoped>
.loginFrom {
    height: calc(100vh);
    // width: 100vw;
    overflow: hidden;
    position: relative;

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
        top: 46px;
        right: 0;
        margin: 0 auto;
        z-index: 9;
        width: 860px;
        height: 742px;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 24px 24px 24px 24px;
        padding: 0 85px;
        box-sizing: border-box;

        

        .center_title {
            height: 57px;
            font-weight: 400;
            font-size: 50px;
            color: #212121;
            text-align: center;
            margin-top: 60px;
        }

        .item {
            margin-top: 44px;

            .title {
                height: 26px;
                line-height: 26px;
                font-weight: 300;
                font-size: 18px;
                color: #424242;
                margin-bottom: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    cursor: pointer;

                    img {
                        position: relative;
                        top: 5px;
                        width: 27px;
                        height: 26px;
                    }

                }
            }

            .input {
                width: 690px;
                height: 56px;
                line-height: 56px;
                border-radius: 8px 8px 8px 8px;
                border: 1px solid rgba(102, 102, 102, 0.8);
                position: relative;

                input {
                    padding-left: 20px;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    border: none;
                    background: none;
                    font-size: 18px;
                    outline: none;
                }

                .get_code {
                    position: absolute;
                    right: 12px;
                    top: 10px;
                    width: 120px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    background: #9D0000;
                    border-radius: 6px 6px 6px 6px;
                    font-weight: 400;
                    font-size: 16px;
                    color: #FFFFFF;
                    pointer-events: all;
                    cursor: pointer;
                    &:active{
                        opacity: 0.8;
                    }
                }

            }
        }

        .wj_password {
            height: 20px;
            line-height: 20px;
            font-weight: 300;
            font-size: 14px;
            margin-top: 48px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;

            /deep/.el-checkbox__inner {
                margin-right: 4px;
                margin-top: -4px;
                border: none;
                background-color: #111111;
            }
        }

        .zc {
            height: 23px;
            line-height: 23px;
            font-weight: 300;
            font-size: 16px;
            margin-top: 20px;
            text-align: center;

            span {
                cursor: pointer;
                color: #B53334;
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
            margin-top: 50px;
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