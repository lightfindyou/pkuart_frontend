<template>
    <div class="reviewTeam" @click="handleOutsideClick">
        <div class="bg">
            <iframe height="100%" width="100%" src="http://art.zslyoo.top/bg.html" frameborder="0"></iframe>
        </div>
        <div class="content">
            <div class="content_top">
                <div class="title_top ht">评审专家团队</div>
                <div class="texter fs">
                    「智镜」项目首批评审专家团队由来自北京大学、清华大学、浙江大学、中央美术学院、中国美术学院、南京艺术学院、河北美术学院等国内顶尖高校艺术史专业学者和学生组成，深耕中国艺术史、传统美学领域，具备扎实的理论功底与专业的作品分析能力，为基础评测工作的专业性奠定核心支撑，并依据作品类型、风格流派、文化价值等关键维度，建立专业的评估指标。
                </div>
            </div>
            <div class="list">
                <div class="list_item" v-for="item in reviewerList" :key="item" @mouseenter.stop="handleItemIndex(item)" @mouseleave="handleOutsideClick">
                    <div class="item_img">
                        <img :src="item.imgs" alt="">
                    </div>
                    <div class="item_name">{{ item.name }}</div>
                    <div class="item_xq" v-if="itemIndex === item">
                        <div class="xq_title fs">{{ item.name }}</div>
                        <div class="list_info" v-for="info in item.info" :key="info">
                            <div class="xq_type fs">▪ {{ info }}</div>
                        </div>
                        <div class="xq_texter fs">
                            {{ item.stat }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ReviewTeamView',
    data() {
        return {
            itemIndex: 0,
            reviewerList: [],
        }
    },
    mounted() {
        this.fetchReviewers();
    },
    methods: {
        handleItemIndex(index) {
            this.itemIndex = index;
//            // 如果点击的是当前已显示的项，则隐藏；否则显示新项
//            if (this.itemIndex === index) {
//                this.itemIndex = 0;
//            } else {
//                this.itemIndex = index;
//            }
        },
        handleOutsideClick() {
            // 点击外部区域时隐藏详情
            this.itemIndex = 0;
        },
        async fetchReviewers() {
            console.log('请求评审专家列表');
            const url = `http://47.122.63.229:5055/api/getReviewers`
            const res = await axios.get(url);
            console.log(res.data, '===data');
            // 处理返回结果
                        const reviewers = res.data.reviewers;
                        this.reviewerList = reviewers.map(item => ({
                            imgs: 'http://47.122.63.229:5055/avatar/' + item.id + '.jpg', // 头像地址
                            name: item.name,
                            info: item.info,
                            stat: item.stat ? item.stat : ''
                        }));
        },
    }
}
</script>

<style lang="less" scoped>
.reviewTeam {
    width: 100%;
    min-height: 1100px;
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
        padding: 0 275px;
        box-sizing: border-box;

        .content_top {
            margin-top: 90px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title_top {
                padding-left: 19px;
                box-sizing: border-box;
                width: 233px;
                height: 91px;
                line-height: 81px;
                font-weight: 400;
                font-size: 30px;
                color: #000000;
                pointer-events: all;
            }

            .texter {
                flex: 1;
                font-weight: 400;
                font-size: 20px;
                color: rgba(0, 0, 0, 0.69);
                line-height: 25px;
                pointer-events: all;
            }
        }

        .list {
            margin-top: 30px;
            display: flex;
            flex-wrap: wrap;
            gap: 29px;

            .list_item {
                width: 108px;
                cursor: pointer;
                pointer-events: all;
                position: relative;

                .item_xq {
                    position: absolute;
                    left: -55%;
                    top: 100px;
                    width: 252px;
                    height: fit-content;
//                    height: 158px;
                    background: rgba(0, 0, 0, 0.8);
                    border-radius: 8px 8px 8px 8px;
                    z-index: 999;
                    padding: 0 10px 7px 20px;
                    box-sizing: border-box;

                    .xq_title {
                        margin-top: 10px;
                        font-weight: 400;
                        font-size: 24px;
                        color: #FFFFFF;
                        text-align: center;
                    }

                    .xq_type {
                        margin-top: 10px;
                        font-weight: 400;
                        font-size: 16px;
                        color: #FFFFFF;
                        line-height: 15px;
                    }

                    .xq_texter {
                        margin-top: 10px;
                        font-weight: 400;
                        font-size: 14px;
                        color: #FFFFFF;
                        line-height: 15px;
                    }

                }

                .item_img {
                    width: 108px;
                    height: 108px;
                    border-radius: 39px 39px 39px 39px;

                    img {
                        width: 100px; /* 根据实际调整 */
                        height: 100px;
                        object-fit: cover;
                        /* 波浪圆形裁剪 */
                        clip-path: path('M50,0 Q60,10 70,0 Q80,10 90,0 Q100,10 100,50 Q100,90 90,100 Q80,90 70,100 Q60,90 50,100 Q40,90 30,100 Q20,90 10,100 Q0,90 0,50 Q0,10 10,0 Q20,10 30,0 Q40,10 50,0 Z');
                        background: #fff;
                    }
                }

                .item_name {
                    margin-top: 14px;
                    height: 18px;
                    font-weight: 400;
                    font-size: 16px;
                    color: #000000;
                    line-height: 18px;
                    text-align: center;
                }
            }

        }

    }
}
</style>