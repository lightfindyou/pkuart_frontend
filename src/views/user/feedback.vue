<template>
    <div class="voteHistory">
        <div class="vote_item" v-for="(item, index) in feedback" :key="index" :style="{ height: isExpanded ? 'auto' : '147px' }">
            <div class="vote_item_left">
                <div class="left_title">Name of Model</div>
                <div class="left_texter" :class="{ 'expanded': isExpanded }">
                    {{ item}}
                    <div class="gd" @click="toggleExpand">
                        {{ isExpanded ? '收起 ▲' : '……展开全文 ▼' }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'VoteHistoryView',
    data() {
        return {
            isExpanded: false,
            feedback: [],
        }
    },
    mounted() {
        console.log('VoteHistoryView mounted');
        this.fetchFeedback();
    },
    methods: {
        toggleExpand() {
            this.isExpanded = !this.isExpanded;
        },
        async fetchFeedback() {
            console.log("123123")
            const res = await axios.get('http://47.122.63.229:5055/api/getFeedback?num=10')
            console.log(res.data)
            this.feedback = res.data.latest_feedback;
            console.log(this.feedback, '===feedback');
        }
    }
}
</script>

<style lang="less" scoped>
.voteHistory {
    width: 100%;
    height: 100%;
    overflow-y: auto;   
    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE和Edge */
    scrollbar-width: none; /* Firefox */
    .vote_item {
        width: 861px;
        min-height: 147px;
        background: #FFFFFF;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 22px 22px 22px 22px;
        display: flex;
        justify-content: space-between;
        padding:0 20px 20px 20px;
        box-sizing: border-box;
        transition: height 0.3s ease;
        margin-bottom: 20px;

        .vote_item_left {
            // width: 634px;

            .left_title {
                margin-top: 8px;
                height: 39px;
                line-height: 39px;
                font-weight: 300;
                font-size: 20px;
                color: #000000;
            }

            .left_texter {
                position: relative;
                height: 80px;
                font-weight: 400;
                font-size: 12px;
                color: #666666;
                line-height: 16px;
                overflow: hidden;
                transition: height 0.3s ease;

                &.expanded {
                    height: auto;
                    overflow: visible;
                }

                .gd {
                    height: 16px;
                    font-weight: 400;
                    font-size: 12px;
                    color: #000000;
                    line-height: 16px;
                    background-color: #FFFFFF;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    cursor: pointer;
                    user-select: none;
                    padding: 0 5px;
                    border-radius: 3px;
                    transition: background-color 0.2s ease;

                    &:hover {
                        background-color: #f0f0f0;
                    }
                }
            }
        }

        .vote_item_right {
            width: 186px;
            height: 147px;
            border-radius: 22px 22px 22px 22px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>