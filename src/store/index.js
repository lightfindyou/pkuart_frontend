import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
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
    galleryImages: [
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

      {
          title: '缂丝山水图',
          title_en: 'Kesi Landscape Painting',
          name: '作者：佚名',
          imgs: require('@/assets/list/1.png'),
          type: 1,
      },

    ]
  },
 
  mutations: {
    setRouterDomIndex(state, index) {
      console.log(index, 'index'  )  
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
    }
  },
  
  actions: {  
    setRouterDomIndex({ commit }, index) {
      console.log(index, 'index'  )  
      commit('setRouterDomIndex', index)
    },
    async search({ commit }, { selectedEra, searchText }){
      console.log('提交查询请求   ' + selectedEra + '  ' + searchText);
      const url = `http://47.122.63.229:5055/?format=json&era=${selectedEra}&search=${searchText}`
      const res = await axios.get(url)
      //// 处理返回结果
      const artworks = res.data.artworks.map(item => ({
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
      }))
      // 传递到 Vuex
      commit('setGalleryImages', artworks)
    }
  },
  modules: {
  },
})
