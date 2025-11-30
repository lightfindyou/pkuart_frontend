<template>
    <div>
        <div class="tab_list">
            <div class="item" v-for="(item, index) in list" :key="index" @click="handleShow(item)">
                <img :src="item.imgs" alt="">
                <div class="bottom">
                    <div class="titles">{{ item.title }}</div>
                    <div class="titles_en ens">{{ item.title_en }}</div>
                    <div class="name">{{ item.name }}</div>
                    <div class="icon">
                        <img v-if="item.type === 1" src="@/assets/home/icon1.png" alt="">
                        <img v-if="item.type === 2" src="@/assets/home/icon2.png" alt="">
                    </div>
                </div>
            </div>
            <GalleryFrom :showGalleryFromItem="showGalleryFromItem" @handleDel="handleDel" v-if="showGalleryFrom">
            </GalleryFrom>
        </div>
        <div class="pagination-container" v-if="totalResults > 0">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalResults"
                :page-size="pageSize"
                :current-page.sync="currentPage"
                @current-change="handlePageChange"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import GalleryFrom from '@/views/gallery/galleryFrom.vue'
import { API_BASE } from '@/config'

export default {
    name: 'CollectView',
    components: {
        GalleryFrom
    },
    data() {
        return {
            list: [
                {
                    title: '缂丝山水图',
                    title_en: 'Kesi Landscape Painting',
                    name: '作者：佚名',
                    imgs: require('@/assets/list/2.png'),
                    type: 2,
                },
                {
                    title: '缂丝山水图',
                    title_en: 'Kesi Landscape Painting',
                    name: '作者：佚名',
                    imgs: require('@/assets/list/1.png'),
                    type: 1,
                },
                {
                    title: '缂丝山水图',
                    title_en: 'Kesi Landscape Painting',
                    name: '作者：佚名',
                    imgs: require('@/assets/list/2.png'),
                    type: 2,
                },
            ],
            showGalleryFrom: false,
            showGalleryFromItem: {},
            currentPage: 1,
            pageSize: 6,
            totalResults: 0,
        }
    },
    mounted() {
        this.fetchCollect();
    },
    methods: {
        handleShow(item) {
            this.showGalleryFrom = true;
            this.showGalleryFromItem = item;
        },
        handleDel() {
            this.showGalleryFrom = false;
        },
        handlePageChange(page) {
            this.currentPage = page;
            this.fetchCollect();
        },
        async fetchCollect() {
            const id = localStorage.getItem('user_id');
            if (id) {
                this.$store.commit('setUserId', id);
            }
            console.log('请求收藏列表, id:', id);
            try {
                const url = `${API_BASE}/getFavorite?user_id=${id}&page=${this.currentPage}&size=${this.pageSize}`
                const res = await axios.get(url, { withCredentials: true })
                //// 处理返回结果
                if (res.data && res.data.artworks) {
                    this.totalResults = res.data.total_results || 0;
                    this.list = res.data.artworks.map(item => ({
                        imgs: `${API_BASE}/${item.path}`, // 图片地址
                        type: 1,         // 可根据 item 或业务逻辑设置
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
                        // 可添加其他需要的字段
                    }));
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    return;
                }
                alert('网络异常或服务器错误，请稍后重试');
                console.error('请求收藏列表异常:', error);
            }
            //console.log(this.list, '===收藏列表');
        },
    }
}
</script>
<style lang="less" scoped>
.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-bottom: 20px;
}

.tab_list {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    //width: 1200px;
    height: 100%;
    columns: 3;

    .item {

        width: 270px;
        break-inside: avoid;
        margin-bottom: 40px;
        background-color: #ccc;
        border-radius: 22px 22px 22px 22px;
        position: relative;
        cursor: pointer;
        pointer-events: auto;
        object-fit: cover;
        /* 关键属性：保持图片纵横比，裁剪以填充容器 */
        object-position: center;
        /* 可选：将图片居中显示 */


        &:nth-child(n) {
            height: 296px;
            object-fit: cover;
            /* 关键属性：保持图片纵横比，裁剪以填充容器 */
            object-position: center;
            /* 可选：将图片居中显示 */
        }

        &:nth-child(2n) {
            //            height: 435px;
            height: 296px;
            object-fit: cover;
            /* 关键属性：保持图片纵横比，裁剪以填充容器 */
            object-position: center;
            /* 可选：将图片居中显示 */
        }

        &:nth-child(3n) {
            height: 296px;
            object-fit: cover;
            /* 关键属性：保持图片纵横比，裁剪以填充容器 */
            object-position: center;
            /* 可选：将图片居中显示 */
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
            border-radius: 22px 22px 22px 22px;
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
</style>