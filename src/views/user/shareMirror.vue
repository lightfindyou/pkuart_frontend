<template>
    <div class="shareMirror">
        <div v-if="!show">
            <div class="main" @click="showNotification = false">
                <div class="del" @click="handleDel">
                    <img src="@/assets/home/gb.png" alt="">
                </div>
                <div class="mian_text">
                    <div class="main_icon" @click="handleDel">
                        <img src="@/assets/home/gb.png" alt="">
                    </div>
                    <div class="mian_text_title fs">分享智镜</div>
                    <div class="image_div">
                        <img class="main_img" src="@/assets/home/icon1.png" alt="">
                    </div>
                    <!--
                        <div class="type_item">
                            <div class="type_item_title fs">材质</div>
                            <div class="type_item_name fs">{{ showGalleryFromItem.texture }}</div>
                        </div>
                        <div class="type_item">
                            <div class="type_item_title fs">形制</div>
                            <div class="type_item_name fs">{{ showGalleryFromItem.format }}</div>
                        </div>
                        <div class="type_item">
                            <div class="type_item_title fs">材料</div>
                            <div class="type_item_name fs">{{ showGalleryFromItem.materials }}</div>
                        </div>
                        <div class="type_item">
                            <div class="type_item_title fs">收藏地</div>
                            <div class="type_item_name fs">{{ showGalleryFromItem.location }}</div>
                        </div>
                    </div>
                    <div class="main_title1 fs">作品简介</div>
                    <div class="main_texter fs">
                        画中有蜡梅一枝，自右下方向左上方挺生，枝细瘦，却用双线勾成，并略加晕染，勾出结节。蜡梅花用勾线填色法画成，疏朗地缀于枝头。一对白头翁安逸地栖于枝上，形态各异，用笔精炼准确，形象生动。
                    </div>
                     -->
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

    .imgFrom {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;



        .img {
            height: 100%;
            position: relative;

            .dels {
                position: absolute;
                right: 29px;
                top: 33px;
                width: 50px;
                height: 50px;
                cursor: pointer;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .header {
        width: 100%;
        height: 90px;
        line-height: 90px;
        background: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 440px 0 437px;
        box-sizing: border-box;
        position: relative;

        .select_box {
            height: 24px;
            line-height: 24px;
            font-weight: 400;
            font-size: 22px;
            color: #000000;
            display: flex;
            align-items: center;
            cursor: pointer;

            img {
                width: 24px;
                height: 24px;
            }
        }

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
    }

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


        .mian_text {
            width: 394px;
            height: 639px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 23px;
            border: 1px solid #F7E5E5;
            box-sizing: border-box;
            position: relative;
//            display: flex;
            justify-content: center;

            .main_icon {
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

            .mian_text_title {
                margin-top: 40px;
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
                margin-top: 20px;
                border: 0.2px solid #000000;
                background: #a62525;
                border-radius: 22px;
                margin-left: auto;
                margin-right: auto;
                background: linear-gradient(211.37deg, #DDC3DD -2.72%, #F1E5D9 49.89%, #E6B0B2 101.69%);
                display: flex;

                .main_img {
                    width: 278px;
                    height: 170px;
                    margin-left: auto;
                    margin-right: auto;
                }

            }


        }
    }
}
</style>