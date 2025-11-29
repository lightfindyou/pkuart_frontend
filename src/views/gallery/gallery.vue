<template>
    <div class="gallery">
        <div class="bg">
            <iframe height="100%" width="100%" src="/bg.html" frameborder="0"></iframe>
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
                    <swiper-slide>
                        <img src="@/assets/list/carusel1.png" alt="">
                    </swiper-slide>
                    <swiper-slide>
                        <img src="@/assets/list/carusel2.png" alt="">
                    </swiper-slide>
                    <swiper-slide>
                        <img src="@/assets/list/carusel3.png" alt="">
                    </swiper-slide>
                    <swiper-slide>
                        <img src="@/assets/list/carusel4.png" alt="">
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
                智镜画廊现收录18558件馆藏中国书画作品，精选高清图源，为AI模型的理解和分析提供高质量视觉依据，通过“随机对战”和“选择对战”机制，生成来自不同AI大模型对艺术的评价，清晰对比不同的大语言模型在艺术分析能力。
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

            <div class="tab_list" ref="waterfall" :style="{ height: waterfallHeight + 'px' }">
                <div class="item" v-for="(item, index) in list" :key="index" :style="itemStyles[index]"
                    @click="handleShow(item)">
                    <div class="img-wrapper" :class="{ 'item-bg': index < 3 }">
                        <img :src="item.imgs" alt="">
                    </div>

                    <div class="bottom">
                        <div class="titles">{{ item.title }}</div>
                        <div class="titles_en ens">{{ item.title_en }}</div>
                        <div class="name">作者：{{ item.name }}</div>
                        <div class="icon">
                            <img v-if="item.type === 1" src="@/assets/home/icon1.png" alt="">
                            <img v-if="item.type === 2" src="@/assets/home/icon2.png" alt="">
                        </div>
                    </div>
                </div>
            </div>

            <div class="loading-container" v-if="loading">
                <div class="loading-text">加载中...</div>
            </div>
        </div>
        <GalleryFrom :showGalleryFromItem="showGalleryFromItem" @handleDel="handleDel" v-if="showGalleryFrom">
        </GalleryFrom>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import GalleryFrom from './galleryFrom.vue'
import { mapState } from 'vuex'
import axios from 'axios'
import { API_BASE } from '@/config'

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
                slidesPerView: 'auto',
                centeredSlides: true,
                slideToClickedSlide: true,
                loop: true,
                on: {
                    tap: function () {
                        console.log('点击的位置', this.activeIndex);
                    }
                }
            },
            activeName: 'first',
            showGalleryFrom: false,
            showGalleryFromItem: {},
            loading: false,
            maxItems: 120,
            itemsPerLoad: 12,

            // --- 瀑布流相关变量 ---
            itemStyles: [],
            waterfallHeight: 0,
            config: {
                containerWidth: 1200, // 总宽
                columns: 4,           // 列数
                itemWidth: 270,       // 单个卡片宽度 (来自原 CSS)
                gapX: 8,             // 横向间距 (来自原 CSS column-gap)
                gapY: 20,             // 纵向间距 (修改此处数值即可调整垂直间距)
                // 高度循环模式：对应原 CSS 8步循环 (S=295, L=435)
                // 顺序: 小, 大, 小, 大, 大, 小, 大, 小
                heightPattern: [295, 435, 295, 435, 435, 295, 435, 295]
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        // 监听窗口调整以重算布局（如果需要响应式，可开启）
        window.addEventListener('resize', this.calculateLayout);
        this.loadMoreData();
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.calculateLayout);
    },
    watch: {
        // 监听 Vuex 中的 list 变化，触发重排
        list: {
            handler() {
                this.$nextTick(() => {
                    this.calculateLayout();
                    // 数据更新并重排后，检查是否需要继续加载（解决初始内容不足无法触发滚动的问题）
                    this.handleScroll();
                });
            },
            deep: true
        }
    },
    methods: {
        // --- 瀑布流计算核心方法 ---
        calculateLayout() {
            if (!this.list || !this.list.length) return;

            const { containerWidth, columns, itemWidth, gapX, gapY, heightPattern } = this.config;

            // 计算左边距偏移量，保证整体居中
            // 总内容宽 = 4个卡片 + 3个间隙
            const totalContentWidth = (columns * itemWidth) + ((columns - 1) * gapX);
            const startOffset = (containerWidth - totalContentWidth) / 2;

            // 记录每一列当前的高度
            const columnHeights = new Array(columns).fill(0);
            
            const newStyles = [];

            this.list.forEach((item, i) => {
                // 1. 获取当前卡片高度 (循环取值)
                const itemHeight = heightPattern[i % heightPattern.length];

                // 2. 确定列索引 (顺序排列：0,1,2,3, 0,1,2,3...)
                const columnIndex = i % columns;

                // 3. 计算坐标
                const left = startOffset + columnIndex * (itemWidth + gapX);
                const top = columnHeights[columnIndex];

                // 4. 生成样式
                newStyles.push({
                    width: itemWidth + 'px',
                    height: itemHeight + 'px',
                    left: left + 'px',
                    top: top + 'px',
                    position: 'absolute'
                });

                // 5. 更新该列高度
                columnHeights[columnIndex] += itemHeight + gapY;
            });

            this.itemStyles = newStyles;
            // 容器高度 = 最高的一列 - 最后一个多余的 gapY
            this.waterfallHeight = Math.max(...columnHeights) - gapY;
        },

        async checklogin() {
            try {
                const url = `${API_BASE}/checkLogin`
                await axios.get(url, { withCredentials: true })
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('用户未登录，请先登录');
                    this.$store.commit('resetRouterDomIndex');
                    this.$router.push('/login');
                    return;
                }
                alert('网络异常或服务器错误，请稍后重试');
                console.error('请求收藏列表异常:', error);
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
            this.$store.commit('setSelectedEra', tab.label === '全部' ? '' : tab.label);
            this.$store.commit('setGalleryImages', []);
            this.$store.dispatch('search', { selectedEra: this.selectedEra, searchText: this.searchText });
        },
        handleDel() {
            this.showGalleryFrom = false;
        },
        handleShow(item) {
            this.checklogin();
            this.showGalleryFrom = true;
            this.showGalleryFromItem = item;
            this.$store.commit('setShowItem', item);
        },
        prevSlide() {
            this.$refs.swiper.$swiper.slidePrev();
        },
        nextSlide() {
            this.$refs.swiper.$swiper.slideNext();
        },
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollTop + windowHeight >= documentHeight - 200) {
                if (!this.loading) {
                    this.loadMoreData();
                }
            }
        },
        async loadMoreData() {
            if (this.loading) return;
            this.loading = true;
            try {
                const url = `${API_BASE}/?format=json&era=${this.selectedEra}&search=${this.searchText}`;
                const res = await axios.get(url, { withCredentials: true });
                const allArtworks = res.data.artworks.map(item => ({
                    imgs: `${API_BASE}/${item.path}`,
                    type: 1,
                    title: item.名称,
                    title_en: item.名称,
                    name: item.作者,
                    era: item.年代,
                    id: item.id,
                    era_group: item.era_group,
                    format: item.形制,
                    location: item.收藏地,
                    materials: item.材料,
                    texture: item.材质,
                    labels: item.标签
                }));
                const newArtworks = allArtworks.slice(0, this.itemsPerLoad);
                if (newArtworks.length > 0) {
                    let currentImages = this.$store.state.galleryImages;
                    currentImages = [...currentImages, ...newArtworks];
                    if (currentImages.length > this.maxItems) {
                        const removeCount = currentImages.length - this.maxItems;
                        currentImages = currentImages.slice(removeCount);
                    }
                    this.$store.commit('setGalleryImages', currentImages);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('用户未登录，请先登录');
                    this.$store.commit('resetRouterDomIndex');
                    this.$router.push('/login');
                    return;
                }
                console.error('加载更多数据异常:', error);
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style lang="less" scoped>
// 保留 swiper 相关样式
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
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 300ms;
    transform: scale(0.8);
    border-radius: 22px;
    cursor: pointer;
    img { width: 100%; height: 100%; }
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
    transform: scale(1);
}

.gallery {
    width: 100%;
    min-height: 1714px;
    position: relative;

    .bg {
        position: absolute;
        left: 0; top: 0; height: 100%; width: 100%; z-index: 1;
    }

    .content {
        position: relative;
        z-index: 2;
        pointer-events: none;
        transition: filter 0.3s ease;
        &.content-blur { filter: grayscale(0.4) blur(5px); }
    }

    .title {
        margin-top: 70px; font-weight: 500; font-size: 40px; color: #000; text-align: center;
    }
    .title_en {
        margin-top: 20px; font-weight: 400; font-size: 20px; color: #000; text-align: center;
        &.ens { font-family: TimesNewerRoman, 'Times New Roman', Times, serif; }
    }

    .swiper_box {
        margin-top: 30px; width: 100%; height: 418px; pointer-events: all;
        display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden;
        .swiper_navigation {
            position: absolute; bottom: 20px; right: 380px; display: flex; gap: 50px; z-index: 10;
            .nav_btns {
                width: 72px; height: 72px; transition: all 0.3s ease; cursor: pointer;
                &:hover { transform: scale(1.1); }
                &:active { transform: scale(0.95); }
                img { width: 100%; height: 100%; }
            }
        }
    }

    .title_name {
        width: 1200px; margin: 0 auto; margin-top: 65px; font-weight: 400; font-size: 26px; color: #000; text-align: center; pointer-events: none;
    }
    .texter {
        width: 1200px; margin: 0 auto; margin-top: 20px; font-weight: 300; font-size: 20px; color: #000; line-height: 25px; pointer-events: none;
    }
    .tabs_box {
        width: 1200px; height: 55px; margin: 0 auto;
        .tabs {
            width: 1200px; height: 100%; pointer-events: auto;
            /deep/.el-tabs__item { width: 200px; text-align: center; color: #777E90; }
            /deep/.el-tabs__active-bar { background-color: #9D0000; }
            /deep/.is-active { color: #9D0000; }
        }
    }

    // --- 重点修改区域：Tab List ---
    .tab_list {
        width: 1200px;
        margin: 0 auto;
        position: relative; // 必须 Relative
        // 删除了 grid 布局属性

        .item {
            // 删除了 width（由JS控制），删除了 grid-row 等属性
            position: absolute; // 必须 Absolute
            background-color: #ccc;
            border-radius: 22px;
            cursor: pointer;
            pointer-events: auto;
            overflow: hidden; // 防止图片溢出圆角
            transition: transform 0.3s, box-shadow 0.3s;

            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 20px rgba(0,0,0,0.1);
                z-index: 5;
            }

            .img-wrapper {
                width: 100%;
                height: 100%;
                
                &.item-bg {
                    background-image: url('@/assets/list/img.png');
                    background-size: cover;
                    background-position: center;
                }
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                display: block;
            }

            .bottom {
                position: absolute;
                bottom: 0; left: 0;
                width: 100%; // 占满卡片宽度
                height: 142px;
                background: rgba(0, 0, 0, 0.6);
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                border-radius: 0 0 22px 22px; // 底部圆角
                padding: 0 20px 0 15px;
                box-sizing: border-box;

                .titles {
                    margin-top: 15px; height: 22px; font-weight: 400; font-size: 16px; color: #FFF; line-height: 22px;
                }
                .titles_en {
                    height: 22px; font-weight: 400; font-size: 12px; color: #B4B4B4; line-height: 22px; margin-top: 5px;
                }
                .name {
                    margin-top: 30px; height: 22px; font-weight: 400; font-size: 12px; color: #D9D9D9; line-height: 22px;
                }
                .icon {
                    width: 38px; height: 38px; position: absolute; right: 20px; bottom: 20px;
                    img { width: 100%; height: 100%; }
                }
            }
        }
    }

    .loading-container {
        width: 1200px; margin: 20px auto; text-align: center; pointer-events: none;
        .loading-text { font-size: 16px; color: #777E90; padding: 20px 0; }
    }
}
</style>