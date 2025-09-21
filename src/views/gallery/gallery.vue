<template>
    <div class="gallery">
        <div class="bg">
            <iframe height="100%" width="100%" src="http://art.zslyoo.top/bg.html" frameborder="0"></iframe>
        </div>
        <div class="content" :class="{ 'content-blur': showGalleryFrom }">
            <div class="title ht">
                智镜：大语言模型审美评估平台
            </div>
            <div class="title_en ens">
                MIRROR INTELLIGENCE
            </div>
            <div class="swiper_box">
                <swiper ref="swiper" :options="swiperOption">
                    <swiper-slide >
                        <img src="@/assets/list/sw.png" alt="">
                    </swiper-slide>
                    <swiper-slide >
                        <img src="@/assets/list/sw1.png" alt="">
                    </swiper-slide>
                    <swiper-slide >
                        <img src="@/assets/list/sw2.png" alt="">
                    </swiper-slide>
                </swiper>
                <div class="swiper_navigation">
                    <div class="nav_btns prev_btn" @click="prevSlide">
                        <img src="@/assets/home/left1.png" alt="上一页">
                    </div>
                    <div class="nav_btns next_btn" @click="nextSlide">
                        <img src="@/assets/home/right2.png" alt="下一页">
                    </div>
                </div>
            </div>
            <div class="title_name ht">
                智镜画廊
            </div>
            <div class="texter fs">
                智镜画廊展示 18558 件中国博物馆书画藏品，含名称、年代等元数据及高质量图片。其用于 AI 模型评估，通过匿名对战机制呈现模型对作品的多维度评价，供用户投票。
            </div>
            <div class="tabs_box">
                <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="唐前" name="second"></el-tab-pane>
                    <el-tab-pane label="宋元" name="third"></el-tab-pane>
                    <el-tab-pane label="明" name="ming"></el-tab-pane>
                    <el-tab-pane label="清" name="qing"></el-tab-pane>
                    <el-tab-pane label="近现代" name="xiandai"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="tab_list">
                <div class="item" :class="{ 'item-bg': index < 3 }" v-for="(item, index) in list" :key="index" @click="handleShow(item)">
                    <img :src="item.imgs" alt="">
                    <div class="bottom">
                        <div class="titles">{{ item.title}}</div>
                        <div class="titles_en ens">{{ item.title_en }}</div>
                        <div class="name">作者：{{ item.name }}</div>
                        <div class="icon">
                            <img v-if="item.type === 1" src="@/assets/home/icon1.png" alt="">
                            <img v-if="item.type === 2" src="@/assets/home/icon2.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <GalleryFrom :showGalleryFromItem = "showGalleryFromItem" @handleDel="handleDel" v-if="showGalleryFrom"></GalleryFrom>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import GalleryFrom from './galleryFrom.vue'
import { mapState } from 'vuex'

export default {
    name: 'GalleryView',
    components: {
        GalleryFrom,
        Swiper,
        SwiperSlide,
    },
    computed: {
        ...mapState({
            list: state => state.galleryImages,
            selectedEra: state => state.selectedEra,
            searchText: state => state.searchText,
        }),
    },
    data() {
        return {
            swiperOption: {
                spaceBetween: 0,
                slidesPerView: 'auto', // 使用auto让slide根据内容自适应
                centeredSlides: true,// 居中的slide是否标记为active，默认是最左active,这样样式即可生效
                slideToClickedSlide: true,// 点击的slide会居中
                loop: true,
                // loop: true,// 循环播放, 可有无限滚动效果，初始加载即是滚动后的效果
                on: {
                    // 该方法中的this都指代swiper本身
                    tap: function () {
                        console.log('点击的位置', this.activeIndex);
                    }
                }
            },
            activeName: 'first',
            showGalleryFrom: false,
            showGalleryFromItem: {},
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
            this.$store.commit('setSelectedEra',  tab.label === '全部' ? '' : tab.label);
            this.$store.dispatch('search', { selectedEra: this.selectedEra, searchText: this.searchText });
        },
        handleDel() {
            this.showGalleryFrom = false;
        },
        handleShow(item) {
            this.showGalleryFrom = true;
            this.showGalleryFromItem = item;
        },
        prevSlide() {
            this.$refs.swiper.$swiper.slidePrev();
        },
        nextSlide() {
            this.$refs.swiper.$swiper.slideNext();
        }
    }
}
</script>
<style lang="less" scoped>
.swiper {
    width: 100%;
    height: 100%;
    position: relative;
}

.swiper-container {
    width: 100%;
    height: 100%;
    overflow: visible;
}

.swiper-slide {
    width: 1200px !important;
    height: 418px !important;
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition: 300ms;
    transform: scale(0.8);
    border-radius: 22px 22px 22px 22px;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }
}

.swiper-slide-active,
.swiper-slide-duplicate-active {
    transform: scale(1);
    // background-color: aqua;
}

.gallery {
    width: 100%;
    min-height: 1714px;
    position: relative;

    .bg {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
    }

    .content {
        position: relative;
        z-index: 2;
        pointer-events: none;
        transition: filter 0.3s ease;

        &.content-blur {
            filter: grayscale(0.4) blur(5px);
        }
    }

    .title {
        margin-top: 70px;
        font-weight: 500;
        font-size: 40px;
        color: #000000;
        text-align: center;
    }

    .title_en {
        margin-top: 20px;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
        text-align: center;
    }

    .swiper_box {
        margin-top: 30px;
        width: 100%;
        height: 418px;
        pointer-events: all;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        .swiper_navigation {
            position: absolute;
            bottom: 20px;
            right: 380px;
            display: flex;
            gap: 50px;
            z-index: 10;

            .nav_btns {
                width: 72px;
                height: 72px;
                transition: all 0.3s ease;
                cursor: pointer;
                &:hover {
                    transform: scale(1.1);
                }

                &:active {
                    transform: scale(0.95);
                }

                img {
                   
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .title_name {
        width: 1200px;
        margin: 0 auto;
        margin-top: 65px;
        font-weight: 400;
        font-size: 26px;
        color: #000000;
        text-align: center;
        pointer-events: none;
    }

    .texter {
        width: 1200px;
        margin: 0 auto;
        margin-top: 20px;
        font-weight: 300;
        font-size: 20px;
        color: #000000;
        line-height: 25px;
        pointer-events: none;
    }

    .tabs_box {
        width: 1200px;
        height: 55px;
        margin: 0 auto;

        .tabs {
            width: 1200px;
            height: 100%;
            pointer-events: auto;

            /deep/.el-tabs__item {
                width: 200px;
                text-align: center;
                color: #777E90;
            }

            /deep/.el-tabs__active-bar {
                background-color: #9D0000;
            }

            /deep/.is-active {
                color: #9D0000;
            }
        }


    }

    .tab_list {
        width: 1200px;
        margin: 0 auto;
        columns: 4;
        column-gap: 8px;

        .item {
            width: 270px;
            break-inside: avoid;
            margin-bottom: 40px;
            background-color: #ccc;
            border-radius: 22px 22px 22px 22px;
            position: relative;
            cursor: pointer;
            pointer-events: auto;

            &.item-bg {
                background-image: url('@/assets/list/img.png');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }

            &:nth-child(n) {
                height: 296px;
            }

            &:nth-child(2n) {
                height: 435px;
            }

            &:nth-child(3n) {
                height: 296px;
            }

            img {
                width: 100%;
                height: 100%;
            }

            .bottom {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 270px;
                height: 142px;
                background: rgba(0, 0, 0, 0.6);
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                border-radius: 22px 22px 22px 22px;
                padding: 0 20px 0 15px;
                box-sizing: border-box;

                .titles {
                    margin-top: 15px;
                    height: 22px;
                    font-weight: 400;
                    font-size: 16px;
                    color: #FFFFFF;
                    line-height: 22px;
                }

                .titles_en {
                    height: 22px;
                    font-weight: 400;
                    font-size: 12px;
                    color: #B4B4B4;
                    line-height: 22px;
                    margin-top: 5px;
                }

                .name {
                    margin-top: 30px;
                    height: 22px;
                    font-weight: 400;
                    font-size: 12px;
                    color: #D9D9D9;
                    line-height: 22px;
                }

                .icon {
                    width: 38px;
                    height: 38px;
                    position: absolute;
                    right: 20px;
                    bottom: 20px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

    }
}
</style>