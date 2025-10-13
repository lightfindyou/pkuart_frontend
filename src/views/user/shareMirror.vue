<template>
    <div class="shareMirror">
        <div v-if="!show">
            <div class="main" @click="showNotification = false">
                <div class="del" @click="handleDel">
                    <img src="@/assets/home/gb.png" alt="">
                </div>
                <div class="main_text">
                    <div class="close_icon" @click="handleDel">
                        <img src="@/assets/home/gb.png" alt="">
                    </div>
                    <div class="main_text_title fs">分享智镜</div>
                    <div class="image_div">
                        <img class="main_img" src="@/assets/list/1.png" alt="">
                        <div class="model_title">
                            <img src="@/assets/user/cup.png" alt="">
                            <div class="fixed_title">胜出大模型评估</div>
                        </div>

                        <div class="model_context">
                            <div class="model_name">123123</div>
                            <div class="model_output">12312312 </div>
                        </div>

                        <div class="sharerInfo">
                            <div class="user_img">
                                <img class="reviewerImg" :src="require('@/assets/list/img.png')" alt="">
                            </div>
                            <div class="userText">
                                <div class="user_name">曹操</div>
                                <div class="user_type"> 
                                    <img class="userStar" src="@/assets/user/star.png" alt="">
                                    专家
                                    </div>
                            </div>
                        </div>
                        <div class="footer">
                            <div class="footer-left">
                                <img class="footerLogo" src="@/assets/logo/top.png" alt="">
                                <div class="footerLogoText">
                                    诚邀你一起加入“智镜计划”，一同为AI校准东方美学罗盘。
                                </div>

                            </div>
                            <div class="footer-right">
                                <img class="QRCode" src="@/assets/logo/QRCode.png" alt="">
                            </div> 
                        </div>
                    </div>

                    <div class="bottomText">
                        <div class="bottomHead">
                            <div class="title">分享文案：</div>
                            <img class="copy" src="@/assets/homeFrom/copy.png" alt="">

                        </div>
                        <div class="bottomContent">
                            我正在使用智镜——大语言模型审美评估平台！ 智镜计划通过传统审美视角评估AI大模型的艺术理解能力，非常有意思！ https://pkumi.chat
                        </div>
                    </div>

                    <div class="buttonDiv">
                        <button class="changeButton">
                            <img class="changeIcon" src="@/assets/logo/refresh.png" alt="">
                            换一张
                        </button>
                        <button class="downloadButton">
                            <img class="downloadIcon" src="@/assets/logo/download.png" alt="">
                            下载图片
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'ShareMirror',
    data() {
        return {
            show: false,
            showNotification: false,
            active: false,
            battleItem: this.showGalleryFromItem,
            showGalleryFromItem: '',
        }
    },
    mounted() {
        this.checkFavorite();
    },
    methods: {
        handleDel() {
            console.log('emit closeSharePage');
            this.$emit('closeSharePage')
        },
        handleShow() {
            this.show = true
        },
        handleActive() {
            if(this.active) {
                this.delFavorite()
            } else {
                this.addFavorite()
            }

            this.active = !this.active;
        },
        async addFavorite() {
            const id = this.$store.state.user_id;
            console.log('添加收藏');
            // 发送 POST 请求
            try {
                const url = `http://47.122.63.229:5055/api/addFavorite?artwork_id=${this.showGalleryFromItem.id}&user_id=${id}`
                await axios.get(url, { withCredentials: true })
            } catch (error) {
                if(error.response && error.response.status === 401) {
                    alert('用户未登录，请先登录');
                    this.$router.push('/login');
                    return;
                }
                console.error('Error adding favorite:', error);
            }
        },
        async delFavorite() {
            const id = this.$store.state.user_id;
            console.log('删除收藏');
            // 发送 POST 请求
            try {
                const url = `http://47.122.63.229:5055/api/delFavorite?artwork_id=${this.showGalleryFromItem.id}&user_id=${id}`
                await axios.get(url, { withCredentials: true })
            } catch (error) {
                if(error.response && error.response.status === 401) {
                    alert('用户未登录，请先登录');
                    this.$router.push('/login');
                    return;
                }
                console.error('Error deleting favorite:', error);
            }
        },
        async checkFavorite() {
            const id = this.$store.state.user_id;
            console.log('检查是否收藏, id:', id);
            try {
                const url = `http://47.122.63.229:5055/api/inFavoriteList?artwork_id=${this.showGalleryFromItem.id}&user_id=${id}`
                const res = await axios.get(url, { withCredentials: true })
                this.active = res.data.in_favorite_list;
                // if(this.active) {
                //     console.log('已收藏');
                // } else {
                //     console.log('未收藏');
                // }
            } catch (error) {
                console.error('Error checking favorite:', error);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.shareMirror{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background: rgba(0,0,0,0.5); /* 可选，半透明遮罩 */

    .main {
        width: 100%;
        height: 100vh;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 8vw;
        box-sizing: border-box;
        gap: 3vw;
        flex-direction: column;

        .del {
            position: absolute;
            width: 50px;
            height: 50px;
            cursor: pointer;
            right: 35px;
            top: 20px;

            img {
                width: 100%;
                height: 100%;
            }
        }


        .main_text {
            width: 394px;
            height: 639px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 23px;
            border: 1px solid #F7E5E5;
            box-sizing: border-box;
            position: relative;
//            display: flex;
            justify-content: center;

            .close_icon {
                width: 28px;
                height: 28px;
                position: absolute;
                right: 20px;
                top: 20px;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .main_text_title {
                margin-top: 34px;
                height: 16px;
                font-weight: 400;
                color: #212121;
                line-height: 16px;
                text-stroke: 0px #FFF5F5;
                text-align: center;
                font-family: Helvetica, Arial, "STHeiti", "华文黑体", sans-serif;
                font-size: 18px;
            }

            .image_div {
                align-self: center;
                width: 308px;
                height: 397px;
                margin-top: 15px;
                border: 0.2px solid #000000;
                background: #a62525;
                border-radius: 22px;
                margin-left: auto;
                margin-right: auto;
                background: linear-gradient(211.37deg, #DDC3DD -2.72%, #F1E5D9 49.89%, #E6B0B2 101.69%);
                object-position: center; /* 可选：将图片居中显示 */
                position: relative;

                .main_img {
                    width: 278px;
                    height: 170px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    margin-top: 20px;
                }

                .model_title {
                    display: flex;
                    align-items: center;
                    margin-top: 6px;
                    height: 10px;
                    img {
                        width: 10.82px;
                        height: 15px;
                        margin-right: 8px;
                        margin-left: 20px;
                    }
                    .fixed_title {
                        font-family: "STHeiti", "Hiragino Sans GB", "Arial", sans-serif;
                        font-size: 10px;
                        font-weight: 500;
                        margin-top: 2px;
                        height: 6px;
                        font-size: 10px;
                    }
                }

                .model_context {
                    display: flex;
                    align-items: center;
                    margin: 15px auto 0 auto; // 居中
                    margin-top: 15px;
                    height: 46px;
                    border-radius: 4px;
                    width: 276px;
                    opacity: 1;
                    background: #F0FDF480;

                    .model_name{
                        width: 51px;
                        height: 13px;
                        border-radius: 6.5px;
                        margin-right: 8px;
                        margin-left: 8px;
                        font-size: 8px;
                        background-color: #22c55e;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 14px;
                        display: flex;
                    }
                    .model_output{
                        font-family: "STHeiti", "Hiragino Sans GB", "Arial", sans-serif;
                        font-size: 8px;
                        font-weight: 500;
                        display: -webkit-box;
                        -webkit-line-clamp: 3; /* 最多显示3行 */
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                .sharerInfo{
                    display: flex;
                    align-items: center;
                    margin: 15px auto 0 13px;
                    margin-top: 15px;
                    width: 235px;
                    height: 46px;
                    border-radius: 4px;

                    .user_img {
                        .reviewerImg{ 
                            width: 30px;
                            height: 33px;
                            margin-left: 8px;
                            margin-right: 8px;
                        }
                    }

                    .userText{
                        height: 33px;
                        .user_name{
                            font-size: 8px;
                        }

                        .user_type{
                            font-size: 8px;
                            display: flex;
                            align-items: center;
                            margin-top: 4px;

                            .userStar{
                                width: 10px;
                                height: 10px;
                                margin-right: 3px;
                            }   
                        }
                    }
                }

                .footer{
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    background: #FFFFFF;
                    border-bottom-left-radius: 23px;
                    border-bottom-right-radius: 23px;
                    height: 57px;
                    opacity: 1;
                    
                    .footer-left{
                        height: 100%;
                        .footerLogo{
                            width: 154px;
                            height: auto;
                            margin-left: 9px;
                            margin-top: 5px;
                        }
                        .footerLogoText{
                            font-size: 6px;
                            margin-left: 20px;
                            margin-top: 0;
                            color: #B4B4B4;
                        }
                    }

                    .footer-right{
                        position: absolute;
                        right: 0;
                        top: 0;
                        height: 100%;

                        .QRCode{
                            width: 36px;
                            height: auto;
                            margin-right: 9px;
                            margin-top: 9px;
                        }
                    }
                }

            }

            .bottomText{
                width: 308px;
                height: 96px;
                opacity: 1;
                border-radius: 13px;
                margin-top: 14px;
                position: relative;
                justify-content: center;
                margin-left: auto;
                margin-right: auto;
                object-position: center; /* 可选：将图片居中显示 */
                background: #D9D9D942;
                .bottomHead{
                    width: 100%;
                    height: 20px;
                    .title{
                        font-size: 12px;
                        font-family: "STHeiti", "黑体", sans-serif;
                        padding-top: 17px;
                        padding-left: 13px;
                    }

                    .copy{
                        width: 14px;
                        height: 14px;
                        position: absolute;
                        right: 13px;
                        top: 14px;
                        cursor: pointer;    
                    }
                }

                .bottomContent{
                    font-size: 10px;
                    padding-top: 14px;
                    padding-left: 13px;
                    padding-right: 13px;
                }
            }

            .buttonDiv{
                width: 408px;
                height: 40px;
                opacity: 1;
                border-radius: 13px;
                margin-top: 8px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: auto;
                margin-right: auto;
                object-position: center; 

                .changeButton{
                    width: 140px;
                    height: 33px;
                    border-radius: 16.5px;
                    background: #B4B4B4;
                    font-family: "STHeiti", "黑体", sans-serif;
                    font-size: 14px;
                    margin-right: 8px;
                    border: none;

                    .changeIcon{
                        width: 14px;
                        height: 14px;
                    }
                }

                .downloadButton{
                    width: 140px;
                    height: 33px;
                    border-radius: 16.5px;
                    background: #007AFF;
                    font-family: "STHeiti", "黑体", sans-serif;
                    font-size: 14px;
                    margin-left: 8px;
                    border: none;

                    .downloadIcon{
                        width: 17px;
                        height: 17px;
                    }
                }

            }
        }

    }
}
</style>