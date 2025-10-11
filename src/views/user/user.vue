<template>
    <div class="user">
        <div class="bg">
            <iframe height="100%" width="100%" src="http://art.zslyoo.top/bg.html" frameborder="0"></iframe>
        </div>
        <div class="user_left">
            <div class="user_name"> {{ userInfo.name }}</div>
            <div class="user_type"> 
                <img src="@/assets/user/star.png" alt="">
                {{ userInfo.type }}</div>
            <div class="user_img">
                <img :src="userInfo.img" alt="">
            </div>
            <div class="user_item" v-for="(item, index) in itemList" :key="index"
                :class="{ 'user_item_active': itemIndex === index }" @click="handleItemIndex(index)">
                <div class="item_name">{{ item.name }}</div>
                <div class="item_icon">
                    <img :src="item.icon" alt="">
                </div>
            </div>
            <div class="btn" @click="handleLogout">退出登录</div>
        </div>
        <div class="user_right">
            <div class="right_title">
                {{ itemList[itemIndex].title }}
            </div>
            <div class="content">
                <collect v-if="itemIndex === 0"></collect>
                <voteAndFeedback v-if="itemIndex === 1"></voteAndFeedback>
                <!--
                <voteHistory v-if="itemIndex === 2"></voteHistory>
                <feedback v-if="itemIndex === 3"></feedback>
                -->
            </div>
        </div>
    </div>
</template>
<script>
import collect from './collect.vue'
//import voteHistory from './voteHistory.vue'
//import feedback from './feedback.vue'
import voteAndFeedback from './voteAndFeedback.vue'

export default {
    name: 'UserView',
    data() {
        return {
            userInfo: {
                name: '用户名/USERNAME',
                type: '专家',
                img: require('@/assets/list/img.png'),
            },
            itemList: [
                {
                    name: '我的收藏',
                    title: '我的收藏',
                    icon: require('@/assets/user/icon.png'),
                },
                {
                    name: '历史投票与反馈',
                    title: '历史投票与反馈',
                    icon: require('@/assets/user/icon.png'),
                },
//                {
//                    name: '投票历史',
//                    title: '投票历史',
//                    icon: require('@/assets/user/icon.png'),
//                },
//                {
//                    name: '我的反馈/评论',  
//                    title: '反馈',
//                    icon: require('@/assets/user/icon.png'),
//                },
            ],
            itemIndex: 1,
        }
    },
    components: {
        collect,
//        voteHistory,
//        feedback,
        voteAndFeedback,
    },
    methods: {
        handleItemIndex(index) {
            this.itemIndex = index;
        },
        handleLogout() {
            this.$router.push('/');
        }
    }
}
</script>
<style lang="less" scoped>
.user {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
}

.bg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
}

.user_left {
    width: 199px;
    height: 725px;
    margin-top: 47px;
    /* margin-left: 385px; */
    position: relative;
    z-index: 2;

    .user_name {
        margin-top: 50px;
        text-align: center;
        font-weight: 300;
        font-size: 20px;
        color: #000000;
    }

    .user_type {
        margin-top: 15px;
        height: 16px;
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        line-height: 16px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 16px;
            height: 16px;
            margin-right: 3px;
        }
    }

    .user_img {
        width: 145px;
        height: 145px;
        border-radius: 39px 39px 39px 39px;
        // border: 2px solid #D9D9D9;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 30px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .user_item {
        width: 199px;
        height: 47px;
        // line-height: 47px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px 10px 10px 10px;
        padding: 0 15px;
        box-sizing: border-box;
        cursor: pointer;

        .item_name {
            font-weight: 300;
            font-size: 16px;
            color: #272727;
        }

        .item_icon {
            width: 24px;
            height: 24px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .user_item_active {
        background: #EEEEEE;
    }

    .btn {
        position: absolute;
        bottom: 66px;
        left: 0;
        width: 199px;
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        color: #9D0000;
        cursor: pointer;
    }
}

.user_right {
    margin-top: 47px;
    margin-left: 55px;
    width: 921px;
    //height: 725px;
    height: auto;
    max-height: 944px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 20px 20px 20px 20px;
    border: 1px solid #F7E5E5;
    padding: 0 30px;
    box-sizing: border-box;
    z-index: 2;

    .right_title {
        font-weight: 300;
        font-size: 20px;
        color: #000000;
        height: 75px;
        line-height: 75px;
    }

    .content {
        height: calc(100% - 75px);
    }
}
</style>