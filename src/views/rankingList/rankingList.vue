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
    async mounted() {
        if (this.activeName === 0) {
            this.initEcharts();
        }
    },
    methods: {
        initEcharts() {
            var chartDom = this.$refs.echarts_box;
            var option;
            // 每一行（一个 category）期望的高度（px），可根据需要调整
            var rowHeight = 60; // 例如 40px 每行
            // 最小/最大高度保护，避免过小或过大
            var minHeight = 200;
            var maxHeight = 1600;
            //var data = [70, 60, 50, 40, 30, 30, 20, 10, 10, 20];
            //var className = ['Human Expert', 'DeepSeek-R1 0528', 'Doubao-Seed 1.6-Thinking', 'GPT-4.1', 'Gemini-2.0-Flash Thinking', 'Claude-4 Sonnet-Thinking', 'QwQ-32B', 'Doubao-Seed 1.6-Thinking', 'GPT-4.1'];
            
            var className = [ 'doubao-seed-1-6-thinking-250615', 'tencent hunyuan-t1-vision-20250619', 'google gemini-2.5-flash', 'step-1o-vision-32k',
                'google gemini-2.5-pro', 'openai o3', 'openai o4-mini-high', 'Doubao-1.5-vision-pro-32k', 'claude-3.7-sonnet:thinking',
                'claude-opus-4', 'claude-sonnet-4', 'claude-opus-4-20250514-thinking', 'qvq-max-2025-03-25', 'claude-sonnet-4-20250514-thinking',
                'gpt-4.1', 'glm-4.1v-9b-thinking', 'qwen2.5-vl-72b-instruct', 'x-ai grok-4', 'llama-4-maverick'];

            var data = [ 80.05, 77.49, 76.27, 74.93, 74.3, 72.69, 64.14, 62.94,
                    62.79, 60.35, 60.34, 58.83, 58.69, 57.34, 57.03, 56.94,
                    53.68, 51.07, 36.07];

            var colorList = ['#E8C469', '#F4A362', '#E76E50', '#284754', '#299D90', '#299D90', '#299D90', '#F4A362', '#E76E50',
            '#E8C469', '#F4A362', '#E76E50', '#284754', '#299D90', '#299D90', '#299D90', '#F4A362', '#E76E50', '#E8C469',];

            // 根据类别数量动态计算容器高度：每行 rowHeight，高度还预留一点上下 padding
            var calcHeight = className.length * rowHeight + 60; // 60px 额外间距
            if (calcHeight < minHeight) calcHeight = minHeight;
            if (calcHeight > maxHeight) calcHeight = maxHeight;
            // 设置容器高度（如果使用了固定高度的 CSS，这里会覆盖）
            if (chartDom && chartDom.style) {
                chartDom.style.height = calcHeight + 'px';
            }

            // 初始化图表（在设置高度之后初始化以确保尺寸正确）
            var myChart = echarts.init(chartDom);

            // 将 barWidth 设置为行高的一部分，使得每行看起来像期望的高度
            var barW = Math.max(6, Math.round(rowHeight * 0.6));

            option = {
                // 全局动画配置，确保初次渲染有增长动画
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicOut',
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
                    // 单条 series 的动画控制
                    animationDuration: 1000,
                    animationEasing: 'cubicOut',
                    // stagger 动画：每个柱子延迟一点，制造逐个增长的效果
                    animationDelay: function (idx) {
                        return idx * 80;
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: [8, 8],
                            color: (params) => {
                                return colorList[params.dataIndex]
                            }
                        },
                    },
                    // 使用动态计算的 barWidth
                    barWidth: barW,
                    // 控制类目间距（可用百分比或像素）
                    // barCategoryGap: '20%',
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
    height: 1220px;

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