<template>
    <div class="tab_list">
        <div class="item" v-for="(item, index) in list" :key="index" @click="handleShow(item)">
            <img :src="item.imgs" alt="">
            <div class="bottom">
                <div class="titles">缂丝山水图</div>
                <div class="titles_en ens">Kesi Landscape Painting</div>
                <div class="name">作者：佚名</div>
                <div class="icon">
                    <img v-if="item.type === 1" src="@/assets/home/icon1.png" alt="">
                    <img v-if="item.type === 2" src="@/assets/home/icon2.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'CollectView',
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


            ]
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
        async fetchCollect() {
            console.log('请求收藏列表');
            const url = `http://47.122.63.229:5055/api/getFavorite`
            const res = await axios.get(url)
            //// 处理返回结果
            this.list = res.data.artworks.map(item => ({
              imgs: 'http://47.122.63.229:5055/' + item.path, // 图片地址
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
            console.log(this.list, '===收藏列表');
        },
    }
}
</script>
<style lang="less" scoped>
.tab_list {
    width: 100%;
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
</style>