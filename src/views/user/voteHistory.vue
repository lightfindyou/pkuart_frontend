<template>
    <div class="voteHistory">
        <div class="vote_item" v-for="(item, index) in votes" :key="index" :style="{ height: expandedList[index] ? 'auto' : '147px' }">
            <div class="vote_item_left">
                <div class="left_title"> {{ item.winner_name}} </div>
                <div class="left_texter" :class="{ 'expanded': expandedList[index] }">
                    {{ item.selected_response }}
                    <div class="gd" @click="toggleExpand(index)">
                        {{ expandedList[index] ? '收起 ▲' : '……展开全文 ▼' }}
                    </div>
                </div>
            </div>
            <div class="vote_item_right">
                <img src="@/assets/list/1.png" alt="">
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
            votes: [],
            expandedList: [],
        }
    },
    mounted() {
        console.log('VoteHistoryView mounted');
        this.fetchRatings();
    },
    methods: {
            toggleExpand(index) {
                this.$set(this.expandedList, index, !this.expandedList[index]);
        },
        async fetchRatings() {
            const id = localStorage.getItem('user_id');
            if (id) {
                this.$store.commit('setUserId', id);
            }
            const res = await axios.get('http://47.122.63.229:5055/api/getVote?num=10&user_id=' + id)
            console.log(res.data)
            this.votes = res.data;
            console.log(this.votes, '===votes');
            this.expandedList = this.votes.map(() => false);
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
        padding-left: 20px;
        padding-bottom: 20px;
        box-sizing: border-box;
        transition: height 0.3s ease;
        margin-bottom: 20px;

        .vote_item_left {
            width: 634px;

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