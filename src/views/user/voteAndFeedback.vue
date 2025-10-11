<template>
    <div class="tab_list">
        <div class="item" v-for="(item, index) in rates" :key="index" @click="handleShow(item)">
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
                    <div class="date">2025.09.04</div>
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
            const res = await axios.get('http://47.122.63.229:5055/api/getVote?num=6&user_id=' + id)
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
                })
            );
            console.log(this.rates, '===rates');
        },
    }
}
</script>
<style lang="less" scoped>
.tab_list {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    //width: 1200px;
    height: 100%;
    columns: 3;

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
            margin: 1rem 1rem 1rem 1rem;
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

//        .model_box {
//            position: absolute;
//            bottom: 0;
//            left: 0;
//            width: 270px;
//            height: 142px;
////            background: rgba(0, 0, 0, 0.6);
////            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
//            border-radius: 22px 22px 22px 22px;
//            padding: 0 20px 0 15px;
//            box-sizing: border-box;
//
//
//            .titles {
//                margin-top: 15px;
//                height: 22px;
//                font-weight: 400;
//                font-size: 16px;
//                color: #FFFFFF;
//                line-height: 22px;
//            }
//
//            .titles_en {
//                height: 22px;
//                font-weight: 400;
//                font-size: 12px;
//                color: #B4B4B4;
//                line-height: 22px;
//                margin-top: 5px;
//            }
//
//            .name {
//                margin-top: 30px;
//                height: 22px;
//                font-weight: 400;
//                font-size: 12px;
//                color: #D9D9D9;
//                line-height: 22px;
//            }
//
//            .icon {
//                width: 38px;
//                height: 38px;
//                position: absolute;
//                right: 20px;
//                bottom: 20px;
//
//                img {
//                    width: 100%;
//                    height: 100%;
//                }
//            }
//        }
    }
}

</style>