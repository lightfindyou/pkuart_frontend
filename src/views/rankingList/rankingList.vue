<template>
    <div class="rankingList">
        <div class="content">
            <div class="tabs_box">
                <div class="tab_item" :class="{ 'tab_item_active': activeName === 0 }" @click="handleTabClick(0)">模型性能
                </div>
                <div class="tab_item" :class="{ 'tab_item_active': activeName === 1 }" @click="handleTabClick(1)">
                    <img v-if="activeName === 1" src="@/assets/user/gj_active.png" alt="">
                    <img v-else src="@/assets/user/gj.png" alt="">
                </div>
                <div class="tab_item" :class="{ 'tab_item_active': activeName === 2 }" @click="handleTabClick(2)">其他
                </div>
                <div class="tab_item" :class="{ 'tab_item_active': activeName === 3 }" @click="handleTabClick(3)">其他
                </div>
                <div class="tab_item" :class="{ 'tab_item_active': activeName === 4 }" @click="handleTabClick(4)">其他
                </div>
                <div class="tab_item" :class="{ 'tab_item_active': activeName === 5 }" @click="handleTabClick(5)">其他
                </div>
                <div class="tab_item" :class="{ 'tab_item_active': activeName === 6 }" @click="handleTabClick(6)">其他
                </div>
            </div>
            <div class="echarts_box" v-if="activeName === 0">
                <div class="echarts_box" ref="echarts_box" id="echarts_box"></div>
            </div>
            <div class="pm_list" v-if="activeName === 1">
                <div class="item" v-for="(item, index) in 9" :key="index"
                    :class="index + 1 == 1 ? 'one' : index + 1 == 2 ? 'two' : index + 1 == 3 ? 'three' : ''">
                    <div class="item_top">
                        <div class="item_img">

                        </div>
                        <div class="item_right">
                            <div class="item_name">
                                模型名称
                            </div>
                            <div class="item_text">
                                机构｜得分
                            </div>
                        </div>
                    </div>
                    <div class="item_bottom">
                        <div class="text">
                            人气1000
                        </div>
                        <div class="text">
                            关键词：深度、语言
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'RankingListdiv',
    data() {
        return {
            activeName: 0,
        }
    },
    mounted() {
        if (this.activeName === 0) {
            this.initEcharts();
        }
    },
    methods: {
        initEcharts() {
            var chartDom = this.$refs.echarts_box;
            var myChart = echarts.init(chartDom);
            var option;
            var data = [70, 60, 50, 40, 30, 30, 20, 10, 10, 20];
            var className = ['Human Expert', 'DeepSeek-R1 0528', 'Doubao-Seed 1.6-Thinking', 'GPT-4.1', 'Gemini-2.0-Flash Thinking', 'Claude-4 Sonnet-Thinking', 'QwQ-32B', 'Doubao-Seed 1.6-Thinking', 'GPT-4.1'];
            var colorList = ['#E8C469', '#F4A362', '#E76E50', '#284754', '#299D90', '#299D90', '#299D90', '#F4A362', '#E76E50',];
            option = {
                grid: {
                    left: '5%',
                    right: '0%',
                    bottom: '5%',
                    top: '1%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    axisLine: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    },
                },
                yAxis: [{
                    type: 'category',
                    inverse: true,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#000'
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    data: className
                }],
                series: [{
                    name: '完成率',
                    type: 'bar',
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: [8, 8],
                            color: (params) => {
                                return colorList[params.dataIndex]
                            }
                        },
                    },
                    barWidth: 29,
                    data: data
                }
                ]
            };
            option && myChart.setOption(option);
        },
        handleTabClick(value) {
            this.activeName = value;
            if (value === 0) {
                this.$nextTick(() => {
                    this.initEcharts();
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
.rankingList {
    width: 100%;
    height: 100%;

    .content {
        width: 1200px;
        margin: 0 auto;
        min-height: 929px;

        .echarts_box {
            width: 100%;
            height: 929px;
        }

        .pm_list {
            width: 100%;
            // height: 929px;
            padding: 0 50px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;

            .item {
                width: 329px;
                height: 129px;
                background: #F1F1F1;
                border-radius: 22px 22px 22px 22px;
                margin: 0 auto;
                margin-top: 40px;
                overflow: hidden;

                .item_top {
                    display: flex;
                    align-items: center;
                    padding: 24px 0 17px 20px;
                    box-sizing: border-box;

                    .item_img {
                        width: 59px;
                        height: 59px;
                        border-radius: 50%;
                        border: 1px solid #000000;

                        image {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .item_right {
                        margin-left: 23px;

                        .item_name {
                            margin-top: 8px;
                            height: 15px;
                            font-weight: 400;
                            font-size: 16px;
                            color: #000000;
                            line-height: 15px;
                        }

                        .item_text {
                            margin-top: 10px;
                            height: 15px;
                            font-weight: 400;
                            font-size: 12px;
                            color: #666666;
                            line-height: 15px;
                        }
                    }

                }

                .item_bottom {
                    padding: 0 15px;
                    box-sizing: border-box;
                    width: 329px;
                    height: 29px;
                    line-height: 29px;
                    background: #D9D6D6;
                    border-radius: 0px 0px 0px 0px;
                    font-weight: 400;
                    font-size: 12px;
                    color: #666666;
                    display: flex;
                    justify-content: space-between;
                }
            }

            .one {
                background: url('@/assets/user/1.png') no-repeat 100% 100%;
                background-size: 100% 100%;
                .item_bottom {
                    background: #FFE600;
                }
            }

            .two {
                background: url('@/assets/user/2.png') no-repeat 100% 100%;
                background-size: 100% 100%;
                .item_bottom {
                    background: #BAB8B8;
                }
            }

            .three {
                background: url('@/assets/user/3.png') no-repeat 100% 100%;
                background-size: 100% 100%;
                .item_bottom {
                    background: #B2A28A;
                }
            }

        }

        .tabs_box {
            height: 48px;
            display: flex;
            justify-content: space-between;
            margin-top: 65px;

            .tab_item {
                height: 48px;
                line-height: 48px;
                width: 200px;
                text-align: center;
                font-weight: 300;
                font-size: 16px;
                color: #777E90;
                display: flex;
                justify-content: center;
                cursor: pointer;
                border-bottom: 2px solid #EEEEEE;

                .img {
                    width: 29px;
                    height: 40px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .tab_item_active {
                font-weight: 300;
                font-size: 16px;
                color: #000000;
                border-bottom: 2px solid #9D0000;

            }
        }
    }
}
</style>