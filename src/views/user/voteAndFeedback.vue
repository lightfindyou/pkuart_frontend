<template>
    <div class="tab_list">
        <div class="item" v-for="(item, index) in rates" :key="index" @click="handleShow(item)" :style="{ height: ((index % 6 === 0 || index % 6 === 3 || index % 6 === 4) ? 355 : 495) + 'px' }">
            <img :src="item.imgs" alt="">
            <div class="titles">{{ item.artwork_name }}</div>
                <div class="model_title">
                    <img src="@/assets/user/cup.png" alt="">
                    <div class="fixed_title">胜出大模型评估</div>
                </div>
                <div class="model_context">
                    <div class="model_name">{{ item.winner_name }}</div>
                    <div class="model_output">{{ item.selected_response }} </div>
                </div>
                <div class="feedback_box">
                    <div class="feedback">
                        {{ item.feedback }}
                    </div>
                    <div class="date">{{ item.date }}</div>
                </div>
        </div>
        <GalleryFrom :showGalleryFromItem="showGalleryFromItem" @handleDel="handleDel" v-if="showGalleryFrom"></GalleryFrom>
    </div>
</template>
<script>
import axios from 'axios'
import GalleryFrom from '@/views/gallery/galleryFrom.vue'

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
            rates: [],
        }
    },
    mounted() {
        this.fetchRatings();
    },
    methods: {
        handleShow(item) {
            this.showGalleryFrom = true;
            this.showGalleryFromItem = item;
        },
        handleDel() {
            this.showGalleryFrom = false;
        },
        async fetchRatings() {
            const id = localStorage.getItem('user_id');
            if (id) {
                this.$store.commit('setUserId', id);
            }
            try {
                const url = 'http://47.122.63.229:5055/api/getVote?num=6&user_id=' + id;
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
                        imgs: 'http://47.122.63.229:5055/' + item.path, // 图片地址
                        feedback: item.feedback,
                        date: this.formatDate(item.timestamp),
                    })
                );
                console.log(this.rates, '===rates');
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
.tab_list {
    width: 100%;
    height: 100%;
    margin: 0px auto;
    column-count: 3;

    .item {
        width: 265px;
        height: 355px;
        break-inside: avoid;
        background-color: #fff;
        border-radius: 22px 22px 22px 22px;
        opacity: 1;
        position: relative;
        cursor: pointer;
        pointer-events: auto;
        object-fit: cover; /* 关键属性：保持图片纵横比，裁剪以填充容器 */
        object-position: center; /* 可选：将图片居中显示 */
        margin-bottom: 15px;


//        &:nth-child(n) {
//            height: 355px;
//        }
//
//        &:nth-child(2n) {
//            height: 495px;
//        }

        img {
            margin: 0rem 1rem 1rem 1rem;
            padding-top: 1rem;
            width: 237px;
            height: 170px;
            object-fit: cover;
            object-position: center;
            display: block;
            border-radius: 22px 22px 22px 22px;
        }

        .titles {
            font-family: 'STFangsong', SimSun, sans-serif;
            margin-top: 15px;
            height: 22px;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            margin-left: 16px;
        }

        .model_title {
            display: flex;
            align-items: center;
            margin-top: 6px;
            height: 10px;
            img {
                width: 18px;
                height: 18px;
                margin-right: 8px;
            }
            .fixed_title {
                font-family: "STHeiti", "Hiragino Sans GB", "Arial", sans-serif;
                font-size: 10px;
                font-weight: 500;
                margin-top: 2px;
                height: 15px;
                font-size: 10px;
            }
        }

        .model_context {
            display: flex;
            align-items: center;
            margin: 15px auto 0 auto; // 居中
            margin-top: 15px;
            background-color: #f1f1f1;
            width: 235px;
            height: 46px;
            border-radius: 4px;
            .model_name{
                width: 45px;
                height: 13px;
                border-radius: 6.5px;
                margin-right: 8px;
                margin-left: 8px;
                font-size: 8px;
                background-color: #22c55e;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 14px;
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
                width:153px
            }
        }

        .feedback_box {
            display: flex;
            align-items: center;
            margin-top: 9px;
            .feedback{
                width: 195px;
                height: 34px;
                font-size: 8px;
                font-family: "FangSong", "仿宋", serif;
                margin-left: 17px;
                margin-right: 15px;
                display: -webkit-box;
                -webkit-line-clamp: 3; /* 最多显示3行 */
                line-clamp: 3; /* 标准属性，增强兼容性 */
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .date{
                font-family: "FangSong", "仿宋", serif;
                font-size: 8px;
                font-weight: 500;
                margin-right: 12px;
                margin-bottom: 13px;
            }
        }

    }
}

</style>