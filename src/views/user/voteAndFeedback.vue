<template>
    <div>
        <div class="tab_list" ref="waterfall" :style="{ height: waterfallHeight + 'px' }">
            <div 
                class="item" 
                v-for="(item, index) in rates" 
                :key="index" 
                :style="itemStyles[index]"
                @click="handleShow(item)"
            >
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
            <GalleryFrom :showGalleryFromItem="showGalleryFromItem" @handleDel="handleDel" v-if="showGalleryFrom">
            </GalleryFrom>
        </div>
        <div class="pagination-container" v-if="totalResults > 0">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalResults"
                :page-size="pageSize"
                :current-page.sync="currentPage"
                @current-change="handlePageChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import GalleryFrom from '@/views/gallery/galleryFrom.vue'
import { API_BASE } from '@/config'

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
            itemStyles: [],
            waterfallHeight: 0,
            itemHeights: [355, 495, 355, 495, 355, 495], // 高度循环：355, 495
            gap: 15,
            columns: 3,
            itemWidth: 267, // (860 - 15*2) / 3 = 276.67，这里使用固定宽度
            currentPage: 1,
            pageSize: 6,
            totalResults: 0,
            loading: false,
        }
    },
    mounted() {
        this.fetchRatings();
        window.addEventListener('resize', this.calculateLayout);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.calculateLayout);
    },
    watch: {
        rates() {
            this.$nextTick(() => {
                this.calculateLayout();
            });
        }
    },
    methods: {
        handleShow(item) {
            this.$store.commit('setShowItem', item);
            this.$store.commit('setAssessA', item.selected_response);
            this.$store.commit('setAssessB', item.loser_response);
            console.log('item:' + item);
            console.log('assessB:' + item.loser_response);
            this.$router.push('/evaluate');
            console.log('goto evaluate');
        },
        handleDel() {
            this.showGalleryFrom = false;
        },
        handlePageChange(val) {
            this.currentPage = val;
            this.fetchRatings();
        },
        async fetchRatings() {
            if (this.loading) return;
            this.loading = true;
            const id = localStorage.getItem('user_id');
            if (id) {
                this.$store.commit('setUserId', id);
            }
            try {
                const url = `${API_BASE}/getVote?num=${this.pageSize}&user_id=${id}&page=${this.currentPage}`;
                const res = await axios.get(url, { withCredentials: true })
                console.log(res.data)
                
                // 兼容后端返回格式：可能是直接数组，也可能是 { votes: [...] }
                const voteList = Array.isArray(res.data) ? res.data : (res.data.votes || []);
                
                // 更新分页信息
                if (res.data.total_results !== undefined) {
                    this.totalResults = res.data.total_results;
                }
                if (res.data.size !== undefined) {
                    this.pageSize = res.data.size;
                }

                this.rates = voteList.map(
                    item => ({
                        evaluation_id: item.evaluation_id,
                        artwork_id: item.artwork_id,
                        artwork_name: item.artwork_name,
                        winner: item.winner,
                        winner_name: item.winner_name,
                        selected_response: item.selected_response,
                        imgs: `${API_BASE}/${item.path}`,
                        feedback: item.feedback,
                        date: this.formatDate(item.timestamp),
                        loser_response: item.loser_response,
                        loser_name: item.loser_name,
                    })
                );
                
                console.log(this.rates, '===rates');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    return;
                }
                alert('网络异常或服务器错误，请稍后重试');
                console.error('获取评价异常:', error);
            } finally {
                this.loading = false;
            }
        },
        formatDate(ts) {
            const date = new Date(ts);
            return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
        },
        calculateLayout() {
            if (!this.rates.length) return;

            const waterfall = this.$refs.waterfall;
            if (!waterfall) return;

            // 计算列宽
            const containerWidth = 860; // 固定容器宽度
            const columnWidth = (containerWidth - this.gap * (this.columns - 1)) / this.columns;
            
            // 记录每列的当前高度
            const columnHeights = new Array(this.columns).fill(0);
            
            // 生成每个项目的样式
            const newItemStyles = [];
            
            for (let i = 0; i < this.rates.length; i++) {
                const itemHeight = this.itemHeights[i % 6];
                
                /*
                 // 找到最矮的列
                let minColumnIndex = 0;
                let minHeight = columnHeights[0];
                for (let j = 1; j < this.columns; j++) {
                    if (columnHeights[j] < minHeight) {
                        minHeight = columnHeights[j];
                        minColumnIndex = j;
                    }
                }
                
                // 计算位置
                const left = minColumnIndex * (columnWidth + this.gap);
                const top = columnHeights[minColumnIndex];
                */


                let columnIndex = i%this.columns;
                const left = columnIndex * (columnWidth + this.gap);
                const top = columnHeights[columnIndex];
                
                // 创建样式对象
                newItemStyles.push({
                    width: columnWidth + 'px',
                    height: itemHeight + 'px',
                    left: left + 'px',
                    top: top + 'px',
                    position: 'absolute'
                });
                
                // 更新列高度
                columnHeights[columnIndex] += itemHeight + this.gap;
            }
            
            this.itemStyles = newItemStyles;
            
            // 设置容器高度
            const maxHeight = Math.max(...columnHeights);
            this.waterfallHeight = maxHeight - this.gap;
        }
    }
}
</script>

<style lang="less" scoped>
.pagination-container {
    width: 860px;
    margin: 20px auto;
    text-align: center;
}

.tab_list {
    width: 860px;
    position: relative;
    margin-bottom: 4px;

    .item {
        background-color: #fff;
        border-radius: 22px 22px 22px 22px;
        opacity: 1;
        cursor: pointer;
        pointer-events: auto;
        padding: 15px;
        box-sizing: border-box;
        transition: transform 0.3s, box-shadow 0.3s;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }

        img {
            margin: 0 auto 1rem auto;
            padding-top: 0;
            width: 237px;
            object-fit: cover;
            object-position: center;
            display: block;
            border-radius: 22px 22px 22px 22px;
        }

        // 根据高度调整图片高度
        &:nth-child(6n+1),
        &:nth-child(6n+3),
        &:nth-child(6n+5) {
            img {
                height: 170px;
            }
        }

        &:nth-child(6n+2),
        &:nth-child(6n+4),
        &:nth-child(6n+6) {
            img {
                height: 310px;
            }
        }

        .titles {
            font-family: 'STFangsong', SimSun, sans-serif;
            margin-top: 5px;
            height: 22px;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            margin-left: 16px;
        }

        .model_title {
            display: flex;
            align-items: center;
            margin-top: 13px;
            height: 10px;

            img {
                width: 18px;
                height: 18px;
                margin: 0 8px 4px 3px;
            }

            .fixed_title {
                align-self: flex-start;
                font-family: "STHeiti", "Hiragino Sans GB", "Arial", sans-serif;
                font-size: 10px;
                font-weight: 500;
                height: 15px;
                font-size: 10px;
                text-align: left;
            }
        }

        .model_context {
            display: flex;
            align-items: center;
            margin: 15px auto 0 auto;
            margin-top: 15px;
            background-color: #f1f1f1;
            width: 235px;
            height: 46px;
            border-radius: 4px;

            .model_name {
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

            .model_output {
                font-family: "STHeiti", "Hiragino Sans GB", "Arial", sans-serif;
                font-size: 8px;
                font-weight: 500;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 153px
            }
        }

        .feedback_box {
            display: flex;
            align-items: center;
            margin-top: 9px;

            .feedback {
                width: 195px;
                height: 34px;
                font-size: 8px;
                font-family: "FangSong", "仿宋", "宋体", serif;
                margin-left: 17px;
                margin-right: 15px;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .date {
                font-family: "FangSong", "仿宋", "宋体", serif;
                font-size: 8px;
                font-weight: 500;
                margin-right: 12px;
                margin-bottom: 13px;
            }
        }
    }
}
</style>