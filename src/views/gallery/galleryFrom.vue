<template>
    <div class="galleryFrom">
        <div v-if="!show">
            <div class="header">
                <div class="select_box fs">
                    <span @click="showNotification = !showNotification">选择审美评估模型</span>
                    <img @click="showNotification = !showNotification" src="@/assets/home/bottom.png" alt="">
                    <notification :battleItem = "showGalleryFromItem" v-if="showNotification"></notification>

                </div>
                <div class="del" @click="handleDel">
                    <img src="@/assets/home/gb.png" alt="">
                </div>
            </div>
            <div class="main">
                <div class="main_img" @click="handleShow">
                    <img :src="showGalleryFromItem.imgs" alt="">
                </div>
                <div class="mian_text">
                    <div class="main_icon" @click="handleActive">
                        <img src="@/assets/home/ax.png" alt="" v-if="!active"></img>
                        <img src="@/assets/home/ax_active.png" alt="" v-if="active"></img>
                    </div>
                    <div class="mian_text_title fs">{{ showGalleryFromItem.名称 }}</div>
                    <div class="mian_text_title_en ens">{{ showGalleryFromItem.名称 }}</div>
                    <div class="mian_text_name fs">{{ showGalleryFromItem.name }}</div>
                    <div class="mian_type">
                        <div class="type_item">
                            <div class="type_item_title fs">朝代</div>
                            <div class="type_item_name fs">{{ showGalleryFromItem.era }}</div>
                            <!-- <div class="type_item_name fs">123</div> -->
                        </div>
                        <div class="type_item">
                            <div class="type_item_title fs">材质</div>
                            <div class="type_item_name fs">{{ showGalleryFromItem.texture }}</div>
                            <!-- <div class="type_item_name fs">123</div> -->
                        </div>
                        <div class="type_item">
                            <div class="type_item_title fs">形制</div>
                            <div class="type_item_name fs">{{ showGalleryFromItem.format }}</div>
                            <!-- <div class="type_item_name fs">123</div> -->
                        </div>
                        <div class="type_item">
                            <div class="type_item_title fs">材料</div>
                            <div class="type_item_name fs">{{ showGalleryFromItem.materials }}</div>
                            <!-- <div class="type_item_name fs">123</div> -->
                        </div>
                        <div class="type_item">
                            <div class="type_item_title fs">收藏地</div>
                            <div class="type_item_name fs">{{ showGalleryFromItem.location }}</div>
                            <!-- <div class="type_item_name fs">123</div> -->
                        </div>
                    </div>
                    <div class="main_title1 fs">作品简介</div>
                    <div class="main_texter fs">
                        画中有蜡梅一枝，自右下方向左上方挺生，枝细瘦，却用双线勾成，并略加晕染，勾出结节。蜡梅花用勾线填色法画成，疏朗地缀于枝头。一对白头翁安逸地栖于枝上，形态各异，用笔精炼准确，形象生动。
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="imgFrom">
            <div class="img">
                <div class="dels" @click="show = false">
                    <img src="@/assets/home/gb.png" alt="">
                </div>
                <!-- <img src="showGalleryFromItem.imgs" alt=""> -->
                <img :src="showGalleryFromItem.imgs" alt="">
                 <!-- <img src="@/assets/list/1.png" alt=""> -->
            </div>
        </div>
    </div>
</template>
<script>
import notification from '@/components/notification.vue'
import axios from 'axios'
export default {
    name: 'GalleryFrom',
    components: {
        notification,
    },
    props: {
      showGalleryFromItem: {
        type: Object,
        required: true
      }
    },
    data() {
        return {
            show: false,
            showNotification: false,
            active: false,
            battleItem: this.showGalleryFromItem,
        }
    },
    mounted() {
        this.checkFavorite();
    },
    methods: {
        handleDel() {
            this.$emit('handleDel')
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
            // 发送 POST 请求
            try {
                const url = `http://47.122.63.229:5055/api/addFavorite?artwork_id=${this.showGalleryFromItem.id}&user_id=1`
                await axios.get(url)
            } catch (error) {
                console.error('Error adding favorite:', error);
            }
        },
        async delFavorite() {
            // 发送 POST 请求
            try {
                const url = `http://47.122.63.229:5055/api/delFavorite?artwork_id=${this.showGalleryFromItem.id}&user_id=1`
                await axios.get(url)
            } catch (error) {
                console.error('Error deleting favorite:', error);
            }
        },
        async checkFavorite() {
            console.log('检查是否收藏');
            // 发送 POST 请求
            try {
                const url = `http://47.122.63.229:5055/api/inFavoriteList?artwork_id=${this.showGalleryFromItem.id}&user_id=1`
                const res = await axios.get(url)
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
.galleryFrom {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;

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
            font-size: 24px;
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
        height: calc(100vh - 90px);
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 440px 0 437px;
        box-sizing: border-box;

        .main_img {
            max-width: 554px;
            max-height: 862px;
            cursor: pointer;

            img {
                max-width: 554px;
                max-height: 862px;
                width: 100%;
                height: 100%;
            }
        }

        .mian_text {
            width: 430px;
            height: 630px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 20px 20px 20px 20px;
            border: 1px solid #F7E5E5;
            padding: 0 30px;
            box-sizing: border-box;
            position: relative;

            .main_icon {
                width: 28px;
                height: 28px;
                position: absolute;
                right: 30px;
                top: 46px;
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
                font-size: 20px;
                color: #212121;
                line-height: 16px;
                text-stroke: 0px #FFF5F5;
                text-align: center;
            }

            .mian_text_title_en {
                margin-top: 8px;
                height: 16px;
                font-weight: 400;
                font-size: 15px;
                color: #212121;
                line-height: 16px;
                text-align: center;
            }

            .mian_text_name {
                margin-top: 12px;
                height: 16px;
                font-weight: 400;
                font-size: 16px;
                color: #212121;
                line-height: 16px;
                text-align: center;
            }

            .mian_type {
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 0 55px;

                .type_item {
                    margin-bottom: 15px;

                    .type_item_title {
                        height: 16px;
                        font-weight: 400;
                        font-size: 14px;
                        color: #757575;
                        line-height: 16px;
                    }

                    .type_item_name {
                        margin-top: 4px;
                        height: 16px;
                        font-weight: 400;
                        font-size: 16px;
                        color: #212121;
                        line-height: 16px;
                    }
                }
            }

            .main_title1 {
                margin-top: 5px;
                height: 16px;
                font-weight: 400;
                font-size: 14px;
                color: #757575;
                line-height: 16px;
                margin-bottom: 12px;
            }

            .main_texter {
                font-weight: 400;
                font-size: 16px;
                color: #000000;
                line-height: 20px;
            }
        }
    }
}
</style>