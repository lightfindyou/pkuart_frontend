import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { API_BASE } from '@/config'
// import { set } from 'core-js/core/dict'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        routerDomIndex: 'home',
        searchText: '', // 搜索文本
        selectedEra: '', // 当前选中的按钮
        modelA_name: '模型A',
        modelB_name: '模型B',
        assessA: '', // 评价文本A
        assessB: '', // 评价文本B
        evaluationId: '', // 评价ID
        showItem: {}, // 当前查看的艺术品详情
        user_id: '', // 用户ID
        evalId: '',
        artworkId: '',
        evalArtworkName: '',
        userAvatar: require('@/assets/avatar/default.png'),
        randomSeed: null,
        totalResults: 0, // 总结果数
        galleryImages: [],
        modelOptions: [
            { id: 0, name: 'doubao', image: require('@/assets/AIAvatar/doubao.png') },
            { id: 1, name: 'GPT5', image: require('@/assets/AIAvatar/openai.png') },
            { id: 2, name: 'tencent-hunyuan', image: require('@/assets/AIAvatar/hunyuan.png') },
            { id: 3, name: 'stepfun-ai', image: require('@/assets/AIAvatar/stepfun.png') },
            { id: 4, name: 'google/gemini-2.5-pro', image: require('@/assets/AIAvatar/gemini.png') },
            { id: 5, name: 'z-ai/glm-4.5v', image: require('@/assets/AIAvatar/z-ai.jpeg') },
        ]
    },

    mutations: {
        setRouterDomIndex(state, index) {
            console.log(index, 'index')
            state.routerDomIndex = index
        },
        setSelectedEra(state, era) {
            state.selectedEra = era
        },
        setGalleryImages(state, images) {
            state.galleryImages = images
        },
        setSearchText(state, text) {
            state.searchText = text
        },
        setModelAName(state, value) {
            state.modelA_name = value;
        },
        setModelBName(state, value) {
            state.modelB_name = value;
        },
        setAssessA(state, value) {
            state.assessA = value;
        },
        setAssessB(state, value) {
            state.assessB = value;
        },
        setShowItem(state, item) {
            state.showItem = item
        },
        setUserId(state, id) {
            state.user_id = id
        },
        setEvaluationId(state, id) {
            state.evalId = id
        },
        setArtworkId(state, id) {
            state.artworkId = id
        },
        setEvalArtworkName(state, name) {
            state.evalArtworkName = name
        },
        setRandomSeed(state, seed) {
            state.randomSeed = seed
        },
        setTotalResults(state, total) {
            state.totalResults = total
        },
        setUserAvatar(state, url) {
            state.userAvatar = url;
        },
        resetUserAvatar(state) {
            state.userAvatar = require('@/assets/avatar/default.png');
        },
        resetRouterDomIndex(state) {
            state.routerDomIndex = 'home';
        },
        setModelOptions(state, options) {
            console.log('Vuex mutation setModelOptions in index.js:', options); // 添加这行
            state.modelOptions = options;
        }
    },

    actions: {
        setRouterDomIndex({ commit }, index) {
            console.log(index, 'index')
            commit('setRouterDomIndex', index)
        },
        async search({ commit }, { selectedEra, searchText }) {
            console.log('提交查询请求   ' + selectedEra + '  ' + searchText);
            const url = `${API_BASE}/?format=json&era=${selectedEra}&search=${searchText}&page=1`
            try {
                const res = await axios.get(url, { withCredentials: true })

                // 保存后端返回的随机种子
                if (res.data.seed) {
                    commit('setRandomSeed', res.data.seed)
                }
                // 保存总结果数
                if (res.data.total_results !== undefined) {
                    commit('setTotalResults', res.data.total_results)
                }

                //// 处理返回结果
                const artworks = res.data.artworks.map(item => ({
                    imgs: `${API_BASE}/${item.path}`, // 图片地址
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
                }))
                // 传递到 Vuex
                commit('setGalleryImages', artworks)
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    alert('用户未登录，请先登录');
                    this.$router.push('/login');
                    return;
                }
                alert('网络异常或服务器错误，请稍后重试');
                console.error('查询图片异常:', error);
            }
        },
        async fetchModelOptions({ commit }) {
            try {
                const url = `${API_BASE}/getModels`;
                const res = await axios.get(url, { withCredentials: true });
                console.log('获取模型列表响应:', res.data); // 添加日志
                
                // 后端直接返回数组，而不是 { models: [...] }
                const modelList = Array.isArray(res.data) ? res.data : (res.data.models || []);

                if (modelList.length > 0) {
                    // 如果后端返回的图片路径是相对路径，需要处理
                    const models = modelList.map((model, index) => ({
                        id: model.id !== undefined ? model.id : index,
                        name: model.name,
                        // 如果后端返回完整url则直接用，否则拼接 API_BASE 或使用默认图
                        // 这里假设后端可能不返回图片，或者返回相对路径
                        image: model.image ? (model.image.startsWith('http') ? model.image : `${API_BASE}/ai_avatar/${model.image}.png`) : require('@/assets/AIAvatar/default.png')
                    }));
                    commit('setModelOptions', models);
                } else {
                    console.warn('模型列表为空或格式不正确:', res.data); // 添加日志
                }
            } catch (error) {
                console.error('获取模型列表失败:', error);
                // 失败时保持默认值或做其他处理
            }
        }
    },
},
)
