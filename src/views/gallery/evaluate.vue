<template>
    <div class="galleryFrom">
        <div class="bg">
            <iframe height="100%" width="100%" src="http://art.zslyoo.top/bg.html" frameborder="0"></iframe>
        </div>
        <div class="content">
            <div class="header">
                <div class="select_box fs">
                    <span @click="showNotification = !showNotification">选择审美评估模型</span>
                    <img @click="showNotification = !showNotification" src="@/assets/home/bottom.png" alt="">
                    <notification v-if="showNotification"></notification>

                </div>
                <div class="del" @click="handleDel">
                    <img src="@/assets/home/gb.png" alt="">
                </div>
            </div>
            <div class="main">
                <div class="main_img">
                    <!-- <img src="@/assets/list/1.png" alt=""> -->
                    <img :src="this.$store.state.showItem.imgs" alt="">
                </div>
                <div class="mian_text">
                    <div class="main_title ht">
                        您认为哪个模型的评价更好？
                        <div class="icon" @click="handleClose">
                            <img src="@/assets/homeFrom/qx.png" alt="">
                        </div>
                    </div>
                    <div class="main_box">
                        <div class="AI_item" :class="getAIItemClass(1)">
                            <div class="AI_top ht">
                                <div class="AI_icon">
                                    <img src="@/assets/homeFrom/icon.png" alt="">
                                </div>
                                {{ modelA_name }}
                                <div class="copy" v-if="feedbackShow" @click="handleCopy(1)">
                                    <img src="@/assets/homeFrom/copy.png" alt="">
                                </div>
                                <div class="zk" v-if="feedbackShow">
                                    <img src="@/assets/homeFrom/zk.png" @click="handleZk(1)" alt="">
                                </div>
                            </div>
                            <div class="texter fs" v-html="renderMarkdown($store.state.assessA)"></div>
                        </div>
                        <div class="AI_item" :class="getAIItemClass(2)">
                            <div class="AI_top ht">
                                <div class="AI_icon">
                                    <img src="@/assets/homeFrom/icon.png" alt="">
                                </div>
                                {{ modelB_name }}
                                <div class="copy" v-if="feedbackShow" @click="handleCopy(2)">
                                    <img src="@/assets/homeFrom/copy.png" alt="">
                                </div>
                                <div class="zk" v-if="feedbackShow">
                                    <img src="@/assets/homeFrom/zk.png" @click="handleZk(2)" alt="">
                                </div>
                            </div>
                            <div class="texter fs" v-html="renderMarkdown($store.state.assessB)"></div>
                        </div>
                    </div>
                    <div class="select_box" v-if="feedbackShow">
                        <div class="select_A fs" :class="{ 'selected': selectedOption === 'A' }"
                            @click="selectOption('A')">
                            {{ selectedOption === 'A' ? '确认提交' : '模型A更好' }}
                        </div>
                        <div class="select_All" :class="{ 'selected': selectedOption === 'All' }"
                            @click="selectOption('All')">
                            <img src="@/assets/evaluate/all.png" alt="" v-if="selectedOption !== 'All'">
                            <img src="@/assets/evaluate/all_active.png" alt="" v-if="selectedOption === 'All'">

                        </div>
                        <div class="select_No" :class="{ 'selected': selectedOption === 'No' }"
                            @click="selectOption('No')">
                            <img src="@/assets/evaluate/no.png" alt="" v-if="selectedOption !== 'No'">
                            <img src="@/assets/evaluate/no_active.png" alt="" v-if="selectedOption === 'No'">
                        </div>
                        <div class="select_B fs" :class="{ 'selected': selectedOption === 'B' }"
                            @click="selectOption('B')">
                            {{ selectedOption === 'B' ? '确认提交' : '模型B更好' }}
                        </div>
                    </div>
                    <div class="vote_box" v-if="feedbackShow" @click="handleShowDialog" >投票是如何进行的?</div>
                </div>
            </div>

        </div>
        <el-dialog :visible.sync="dialogVisible" :show-close="false" :append-to-body="true">
            <div class="popup_content">
                <div class="del" @click="handleCloseDialog">
                    <img src="@/assets/evaluate/del.png" alt="">
                </div>
                <div class="pop_icon">
                    <img src="@/assets/evaluate/ts.png" mode="scaleToFill" />
                </div>
                <div class="pop_title ht">投票是如何进行的</div>
                <div class="pop_text">
                    点击生成评价，我们将为您生成两条随机的AI评价，请选择您认为最佳的评价。若两条难分高下或您都不喜欢，请点击对应按钮。
                </div>
                <div class="pop_main">
                    <div class="main_top">
                        <div class="pop_all">两者差不多
                            <div class="bott">▼</div>
                        </div>
                        <div class="pop_no">两者都不好
                            <div class="bott">▼</div>
                        </div>
                    </div>
                    <div class="main_bottom">
                        <div class="btnA">模型A更好</div>
                        <div class="btnAll">
                            <img src="@/assets/evaluate/all.png" mode="scaleToFill" />
                        </div>
                        <div class="btnNo">
                            <img src="@/assets/evaluate/no.png" mode="scaleToFill" />
                        </div>
                        <div class="btnB">模型B更好</div>
                    </div>
                </div>

            </div>
        </el-dialog>
        <div class="dy_box" v-if="dyShow">
            <div class="dy_title">
                📝调研
                <div class="icon" @click="handleGo">
                    <img src="@/assets/homeFrom/qx.png" alt="">
                </div>
            </div>
            <div class="dy_text">
                感谢您的投票！请留下您的宝贵反馈
            </div>
            <div class="dy_btn_box">
                <div class="dy_btn" v-for="item in 6" :key="item">预填选项</div>
            </div>
            <div class="dy_texter">
                <el-input type="textarea" class="textarea" placeholder="请输入内容" v-model="textarea" maxlength="50"
                    show-word-limit></el-input>
                <div class="dy_sbm" @click="handleSbm">提交反馈
                    <img src="@/assets/evaluate/sbm.png" alt="">
                </div>
            </div>
            <div class="go_btn" @click="handleGo">跳过并返回</div>
        </div>
    </div>
</template>

<script>

import notification from '@/components/notification.vue'
import axios from 'axios'
import { mapState } from 'vuex'
import { marked } from 'marked'

export default {
    name: 'GalleryFrom',
    components: {
        notification,
    },
    computed: {
        ...mapState(['modelA_name']),
        ...mapState(['modelB_name']),
        ...mapState(['showItem']),
    },
    data() {
        return {
            showNotification: false,//是否显示通知  
            feedbackShow: false,//是否显示反馈
            selectedOption: '', // 当前选中的选项
            dialogVisible: false,//是否显示投票
            textarea: '',//调研内容
            dyShow: false,//是否显示调研
            expandedItem: null, // 当前展开的item，null表示没有展开
        }
    },
    mounted() {
        console.log(this.$store.state.showItem, 'showItem-----');
        setTimeout(() => {
            this.feedbackShow = true;
        }, 100);
    },
    methods: {
        renderMarkdown(text) {
            return marked(text || '');
        },
        //删除
        handleDel() {
            this.$router.back()
        },
        //关闭
        handleClose() {
            this.$router.go(-1)
        },
        //选择选项
        selectOption(option) {
            console.log(this.selectedOption, option, '-----');
            if (this.selectedOption === option) {
                // this.selectedOption = '';
                this.dyShow = true;
            }
            this.selectedOption = option;

        },

        //获取选项类名
        getAIItemClass(itemIndex) {
            let classes = [];

            // 原有的选择状态类名
            if (this.selectedOption === 'A' && itemIndex === 1) {
                classes.push('ai-selected');
            } else if (this.selectedOption === 'B' && itemIndex === 2) {
                classes.push('ai-selected');
            } else if (this.selectedOption === 'No') {
                classes.push('ai-no');
            } else if (this.selectedOption === 'All') {
                classes.push('ai-all');
            }

            // 展开状态类名
            if (this.expandedItem === itemIndex) {
                classes.push('ai-expanded');
            } else if (this.expandedItem !== null && this.expandedItem !== itemIndex) {
                classes.push('ai-hidden');
            }

            return classes.join(' ');
        },

        handleShowDialog() {
            this.dialogVisible = true;
        },

        handleCloseDialog() {
            this.dialogVisible = false;
        },
        handleGo() {
            this.$router.back();
        },
        handleSbm() {
            //get user_id from localStorage
            const id = localStorage.getItem('user_id');
            if (id) {
                this.$store.commit('setUserId', id);
            }
            this.$router.back();
            console.log(this.textarea, '-----');
            const url = `http://47.122.63.229:5055/api/feedback`
            const payload = {
                evaluation_id: "12345",
                feedback: this.textarea,
                id: id,
            };
            axios.post(url, payload, {headers: { 'Content-Type': 'application/json' } });
            console.log('commit feedback over', this.textarea);
        },
        handleZk(index) {
            // 如果当前点击的是已展开的item，则还原
            if (this.expandedItem === index) {
                this.expandedItem = null;
            } else {
                // 否则展开当前item
                this.expandedItem = index;
            }
        },
        handleCopy(index) {
            console.log(index, '-----');

            this.textarea = this.textA;
            // this.$copyText(this.textarea);
          
            this.$message({
                message: '复制成功',
                type: 'success'
            });
        }

    }
}
</script>

<style lang="less" scoped>
.galleryFrom {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;

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
        z-index: 99;
    }

    .header {
        width: 100%;
        height: 90px;
        line-height: 90px;
        background: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 440px 0 437px;
        box-sizing: border-box;
        position: relative;

        .select_box {
            height: 24px;
            line-height: 24px;
            font-weight: 400;
            font-size: 24px;
            color: #000000;
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 0 4vw;

            img {
                width: 24px;
                height: 24px;
            }
        }



        .del {
            position: absolute;
            width: 50px;
            height: 50px;
            cursor: pointer;
            right: 35px;
            top: 20px;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .main {
        width: 100%;
        height: calc(100vh - 90px);
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 6vw;
        box-sizing: border-box;
        gap: 3vw;

        .main_img {
            max-width: 28vw;
            max-height: 70vh;
            cursor: pointer;

            img {
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
                display: block;
                object-fit: contain;
            }
        }

        .mian_text {
            width: 50vw;
            max-width: 900px;
            height: 70vh;
            max-height: 849px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 20px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            padding: 0 2vw;
            box-sizing: border-box;

            .main_title {
                height: 89px;
                line-height: 89px;
                display: flex;
                align-items: center;
                position: relative;
                border-bottom: 1px solid #D9D9D9;
                font-weight: 300;
                font-size: 26px;
                color: #212121;

                .icon {
                    position: absolute;
                    right: 7px;
                    top: 26px;
                    width: 39px;
                    height: 39px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .main_box {
                padding: 0 30px 0 4px;
                box-sizing: border-box;
                display: flex;
                gap: 1vw;
                justify-content: center;
                margin-top: 35px;

                .AI_item {
                    width: 490px;
                    min-height: 104px;
                    max-height: 519px;
                    background: #FFFFFF;
                    border-radius: 12px 12px 12px 12px;
                    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
                    padding-bottom: 25px;
                    box-sizing: border-box;
                    transition: all 0.3s ease;

                    &.ai-selected {
                        background: #F0FDF4;
                        box-shadow: 0px 4px 4px 0px rgba(34, 197, 94, 0.5);
                    }

                    &.ai-no {
                        background: rgba(235, 67, 53, 0.11);
                    }

                    &.ai-all {
                        background: #E6EBF1;
                    }

                    &.ai-expanded {
                        width: 100%;
                        max-height: none;
                        z-index: 10;
                        position: relative;
                    }

                    &.ai-hidden {
                        opacity: 0;
                        transform: scale(0);
                        pointer-events: none;
                    }

                    .AI_top {
                        margin-top: 11px;
                        margin-left: 12px;
                        height: 41px;
                        line-height: 41px;
                        display: flex;
                        align-items: center;
                        font-weight: 400;
                        font-size: 20px;
                        color: #000000;
                        position: relative;

                        .AI_icon {
                            width: 39px;
                            height: 41px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .copy {
                            position: absolute;
                            right: 53px;
                            top: 12px;
                            width: 18px;
                            height: 18px;
                            cursor: pointer;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .zk {
                            position: absolute;
                            right: 24px;
                            top: 12px;
                            width: 18px;
                            height: 18px;
                            cursor: pointer;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }

                    .texter {
                        padding: 0 24px;
                        box-sizing: border-box;
                        margin-top: 10px;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 22px;
                        max-height: 432px;
                        overflow-y: auto;
                        line-height: 1.6;
                        word-break: break-all;
                        overflow-wrap: break-word;
//                        white-space: pre-line;

                        &::-webkit-scrollbar {
                            width: 3px;
                            height: 0;
                            color: #757575;
                        }

                        &::-webkit-scrollbar-thumb {
                            background: #757575;
                        }
                    }
                }
            }

            .vote_box {
                margin-top: 22px;
                height: 16px;
                line-height: 16px;
                font-weight: 300;
                font-size: 16px;
                color: #007AFF;
                line-height: 16px;
                text-align: center;
                cursor: pointer;
                text-decoration: underline;
            }

            .select_box {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.5vw;
                padding: 0 2vw;
                box-sizing: border-box;
                margin-top: 82px;

                .select_A,
                .select_B {
                    min-width: 150px;
                    height: 38px;
                    line-height: 38px;
                    padding: 0 18px;
                    text-align: center;
                    background: #FFFFFF;
                    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                    border-radius: 18px;
                    font-weight: 400;
                    font-size: 20px;
                    color: #000000;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &.selected {
                        background: #22C55E;
                        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                        color: #FFF;
                    }
                }

                .select_All {
                    min-width: 48px;
                    height: 38px;
                    background: #FFFFFF;
                    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &.selected {
                        background: #007AFF;
                        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                    }

                    img {
                        width: 18px;
                        height: 14px;
                    }
                }

                .select_No {
                    min-width: 48px;
                    height: 38px;
                    background: #FFFFFF;
                    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &.selected {
                        background: #EB4335;
                        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                    }

                    img {
                        width: 15px;
                        height: 15px;
                    }
                }
            }
        }
    }



}

/deep/.el-dialog__header {
    display: none;
}

/deep/.el-dialog {
    width: 529px;
    height: 433px;
    background: none;
}

/deep/.el-dialog__body {
    padding: 0;

}

/deep/.popup_content {
    width: 529px;
    height: 433px;
    background: #FFFFFF;
    border-radius: 20px 20px 20px 20px;
    padding-top: 27px 54px 0 74px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;

    .pop_icon {
        width: 51px;
        height: 51px;
        margin: 0 auto;
        margin-top: 27px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .del {
        position: absolute;
        right: 30px;
        top: 30px;
        width: 20px;
        height: 20px;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .pop_title {
        margin-top: 14px;
        text-align: center;
        height: 20px;
        font-weight: 300;
        font-size: 20px;
        color: #000000;
        line-height: 20px;
    }

    .pop_text {
        margin: 0 auto;
        margin-top: 29px;
        width: 401px;
        height: auto;
        font-weight: 400;
        font-size: 16px;
        color: #000000;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        text-transform: none;
    }

    .pop_main {
        width: 401px;
        height: 127px;
        background: rgba(157, 0, 0, 0.8);
        border-radius: 12px 12px 12px 12px;
        margin: 0 auto;
        margin-top: 18px;
        padding-top: 26px;
        box-sizing: border-box;

        .main_top {
            height: 28px;
            display: flex;
            justify-content: center;
            gap: 28px;

            .pop_all {
                width: 100px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                font-weight: 300;
                font-size: 14px;
                color: #FFFFFF;
                background: #003773;
                border-radius: 4px 4px 4px 4px;
                position: relative;

                .bott {
                    position: absolute;
                    right: 10px;
                    bottom: -15px;
                    color: #003773;
                }
            }

            .pop_no {
                width: 100px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                font-weight: 300;
                font-size: 14px;
                color: #FFFFFF;
                background: #9D0000;
                border-radius: 4px 4px 4px 4px;
                position: relative;

                .bott {
                    position: absolute;
                    left: 10px;
                    bottom: -15px;
                    color: #9D0000;
                }
            }

        }

        .main_bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px 0 16px;
            box-sizing: border-box;
            background: #D9D9D9;
            width: 359px;
            height: 49px;
            border-radius: 21px 21px 21px 21px;
            margin: 0 auto;
            margin-top: 4px;

            .btnA {
                width: 96px;
                height: 29px;
                background: #FFFFFF;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                border-radius: 18px 18px 18px 18px;
                line-height: 29px;
                text-align: center;
                font-weight: 400;
                font-size: 14px;
                color: #000000;
            }

            .btnAll {
                width: 42px;
                height: 29px;
                background: #FFFFFF;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                border-radius: 18px 18px 18px 18px;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 14px;
                    height: 14px;
                }
            }

            .btnNo {
                width: 42px;
                height: 29px;
                background: #FFFFFF;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                border-radius: 18px 18px 18px 18px;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 14px;
                    height: 14px;
                }
            }

            .btnB {
                width: 96px;
                height: 29px;
                background: #FFFFFF;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                border-radius: 18px 18px 18px 18px;
                line-height: 29px;
                text-align: center;
                font-weight: 400;
                font-size: 14px;
                color: #000000;
            }
        }
    }


}

.dy_box {
    width: 582px;
    height: 612px;
    background: linear-gradient(180deg, #EBA6A6 0%, #FCDFDF 50%, #FFFFFF 100%);
    border-radius: 23px 23px 23px 23px;
    padding: 0 24px;
    position: absolute;
    left: 45px;
    top: 53px;
    z-index: 9999;
    box-sizing: border-box;

    .dy_title {
        height: 77px;
        line-height: 77px;
        font-weight: 400;
        font-size: 24px;
        color: #000000;
        border-bottom: 1px solid rgba(180, 180, 180, 0.63);

        .icon {
            position: absolute;
            right: 26px;
            top: 12px;
            width: 37px;
            height: 37px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .dy_text {
        height: 16px;
        font-weight: 300;
        font-size: 16px;
        color: #000000;
        line-height: 16px;
        margin: 21px 0;
    }

    .dy_btn_box {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;

        .dy_btn {
            width: 133px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            background: #FFFFFF;
            border-radius: 8px 8px 8px 8px;
            border: 1px solid #D9D9D9;
            font-weight: 300;
            font-size: 14px;
            color: #000000;
        }
    }

    .dy_texter {
        width: 533px;
        height: 302px;
        background: #FFFFFF;
        border-radius: 8px 8px 8px 8px;
        border: 1px solid #D9D9D9;
        position: relative;
        margin-top: 22px;

        .textarea {
            padding: 12px 21px;
            box-sizing: border-box;
            height: 275px;

            /deep/.el-textarea__inner {
                border: none;
            }

            /deep/.el-input__count {
                display: none;
            }
        }

        .dy_sbm {
            position: absolute;
            right: 9px;
            bottom: 9px;
            width: 112px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            background: #9D0000;
            border-radius: 32px 32px 32px 32px;
            font-weight: 400;
            font-size: 14px;
            color: #FFFFFF;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 12px;
                height: 12px;
            }
        }
    }

    .go_btn {
        margin-top: 12px;
        width: 72px;
        height: 16px;
        font-weight: 400;
        font-size: 14px;
        color: #4C95DE;
        line-height: 16px;
        border-bottom: 1px solid #4C95DE;
        cursor: pointer;
    }
}
</style>