<template>
    <div class="shareMirror">
        <div v-if="!show">
            <div class="main" @click="showNotification = false">
                <div class="del" v-if="showCloseIcon" @click="handleDel">
                    <img src="@/assets/home/gb.png" alt="">
                </div>
                <div class="main_text">
                    <div class="close_icon" @click="handleDel">
                        <img src="@/assets/home/gb.png" alt="">
                    </div>
                    <div class="main_text_title fs">分享智镜</div>
                    <div class="image_div" ref="captureArea">
                        <img class="main_img" :src="this.rate.imgs" alt="">
                        <div class="model_title">
                            <img src="@/assets/user/cup.png" alt="">
                            <div class="fixed_title">胜出大模型评估</div>
                        </div>

                        <div class="model_context">
                            <div class="model_name">{{ this.rate.winner_name }}</div>
                            <div class="model_output">{{ rate.selected_response }}</div>
                        </div>

                        <div class="sharerInfo">
                            <div class="user_img">
                                <img class="reviewerImg" :src="userInfo.img" alt="">
                            </div>
                            <div class="userText">
                                <div class="user_name">{{ userInfo.name }}</div>
                                <div class="user_type"> 
                                    <img class="userStar" src="@/assets/user/star.png" alt="">
                                    {{ userInfo.type }}
                                    </div>
                            </div>
                            <div class="date">{{ rate.date }}</div>
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
                        <button class="changeButton" @click="fetchRatings">
                            <img class="changeIcon" src="@/assets/logo/refresh.png" alt="">
                            换一张
                        </button>
                        <button class="downloadButton" @click="downloadImage">
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
import { API_BASE } from '@/config'
import html2canvas from 'html2canvas';
export default {
    name: 'ShareMirror',
    data() {
        return {
            showCloseIcon: false,
            show: false,
            showNotification: false,
            active: false,
            battleItem: this.showGalleryFromItem,
            showGalleryFromItem: '',
            rates: [],
            userInfo: {
                name: '用户名/USERNAME',
                type: '专家',
                img: require('@/assets/home/logo3.png'),
            },
            rate: {
                evaluation_id: '',
                artwork_id: '',
                artwork_name: '',
                winner: '',
                winner_name: '',
                selected_response: '《四季花卉册》：宫廷花鸟画的精工与诗意 ## 作品审美价值概述 清代宫廷花鸟画在康乾时期达到鼎盛，邹元斗作为乾隆朝如意馆核心画家，承续“没骨花鸟”传统并注入工笔写实精神。《四季花卉册》创作于18世纪中叶，正值“院画”体系成熟期，既延续明代院体花鸟的装饰性，又吸收文人画的诗意内核。作品以四季花卉为媒介，通过精微的物象刻画与含蓄的意境营造，展现宫廷艺术“格物致知”的美学追求，成为中国花鸟画从写意抒情向科学写生过渡的关键例证，',
                imgs: '@/assets/list/1.png',
                feedback: '',
                date: '2025.10.11',
            }
        }
    },
    mounted() {
        const id = localStorage.getItem('user_id');
        this.fetchRatings();
    this.userInfo.img = `${API_BASE}/avatar/${id}.png`, // 头像地址
        this.fetchUserInfo();
    },
    methods: {
        handleDel() {
            console.log('emit closeSharePage');
            this.$emit('closeSharePage')
        },
        handleShow() {
            this.show = true
        },
        downloadImage() {
            // 截取 main_text 区域
            const captureArea = this.$refs.captureArea;
            if (captureArea) {
                html2canvas(captureArea, {useCORS: true,
                                         dpi:900,
                                         scale: 3,
                                         backgroundColor: null}).then((canvas) => {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = '分享图片.png';
                    link.click();
                });
            }
        },
        async fetchUserInfo() {
            const id = localStorage.getItem('user_id');
            try{
                const url = `${API_BASE}/getReviewersByID?id=${id}`
                const res = await axios.get(url, { withCredentials: true });
                console.log(res.data, '===data');
                // 处理返回结果
                const reviewer = res.data.reviewers;
                this.userInfo.name = reviewer[0].name;
			} catch (error) {
                if(error.response && error.response.status === 401) {
                    return;
                }
				alert('网络异常或服务器错误，请稍后重试');
				console.error('获取用户信息异常:', error);
			}
        },
        async fetchRatings() {
            const id = localStorage.getItem('user_id');
            if (id) {
                this.$store.commit('setUserId', id);
            }
            try {
                const url = `${API_BASE}/getVote?num=20&user_id=${id}`;
                const res = await axios.get(url, { withCredentials: true })
                console.log(res.data)
                this.rates = res.data.map(
                    item => ({
                        evaluation_id: item.evaluation_id,
                        artwork_id: item.artwork_id,
                        artwork_name: item.artwork_name,
                        winner: item.winner,
                        winner_name: item.winner_name,
                        selected_response: item.selected_response,
                        imgs: `${API_BASE}/${item.path}`, // 图片地址
                        feedback: item.feedback,
                        date: this.formatDate(item.timestamp),
                    })
                );
                console.log(this.rates, '===rates');
                // 不需要 import random
                this.rate = this.rates[Math.floor(Math.random() * this.rates.length)];
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    return;
                }
                alert('网络异常或服务器错误，请稍后重试');
                console.error('获取评价异常:', error);
            }
        },
        formatDate(ts) {
            const date = new Date(ts);
            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
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
                    object-fit: cover;
                    object-position: center;
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
                        line-clamp: 3; /* 标准属性，增强兼容性 */
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-right: 8px;
                        text-align: justify;
                        height: 24px;
                        width: 198px
                    }
                }

                .sharerInfo{
                    display: flex;
                    align-items: center;
                    margin-top: 15px;
                    width: 100%;
                    height: 46px;
                    border-radius: 4px;

                    .user_img {
                        .reviewerImg{ 
                            width: 30px;
                            height: 33px;
                            margin-left: 14px;
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
                            margin-left: -2px;

                            .userStar{
                                width: 10px;
                                height: 10px;
                                margin-right: 3px;
                            }   
                        }
                    }

                    .date{
                        font-family: "FangSong", "仿宋", "宋体", serif;
                        font-size: 8px;
                        font-weight: 500;
                        margin-right: 19px;
                        margin-left: auto;
                        margin-bottom: 13px;
                        color: #B4B4B4;
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