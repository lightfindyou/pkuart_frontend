<template>
  <div id="app">
    <div class="nav">
      <div class="nav_left">
        <img src="@/assets/logo/top.png" alt="">
      </div>
      <div class="xian"></div>
      <router-link to="/"></router-link>
      <div class="nav_right">
        <router-link :class="routerDomIndex === 'gallery' ? 'routerDom_active' : 'routerDom'"
          @click="handleSelect('gallery')" to="/gallery">画廊</router-link>
        <router-link :class="routerDomIndex === 'rankingList' ? 'routerDom_active' : 'routerDom'"
          @click="handleSelect('rankingList')" to="/rankingList">排行榜</router-link>
        <router-link :class="routerDomIndex === 'about' ? 'routerDom_active' : 'routerDom'"
          @click="handleSelect('about')" to="/about">关于我们</router-link>
        <router-link :class="routerDomIndex === 'reviewTeam' ? 'routerDom_active' : 'routerDom'"
          @click="handleSelect('reviewTeam')" to="/reviewTeam">评审专家团队</router-link>
      </div>
      <div class="select">
        <img src="@/assets/home/select.png" alt="">
        <el-input v-model="searchText" @keyup.native.enter="handleSearch" placeholder="请输入内容" />
      </div>
      <router-link v-if="login" class="logo" to="/user" @click="handleSelect('user')">
        <div class="imgs">
          <img src="@/assets/user/tx.png" alt="">
        </div>
      </router-link>
      <div class="login" v-else>
        <div class="btn1 fs" @click="handleLogin">登陆/注册</div>
        <div class="btn2 fs" @click="handleExpert">专家入口</div>
      </div>
    </div>
    <router-view />
    <div class="footer" v-if="showFooter">
      <div class="img1">
        <img src="@/assets/logo/1.png" alt=""></img>
      </div>
      <div class="img2">
        <img src="@/assets/logo/2.png" alt=""></img>
      </div>
      <div class="img3">
        <img src="@/assets/logo/3.png" alt=""></img>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['selectedEra']),
    routerDomIndex() {
      return this.$store.state.routerDomIndex
    },
    showFooter() {
      // 在这些路由时隐藏 footer
      const hideFooterRoutes = ['userLogin', 'register', 'login']
      return !hideFooterRoutes.includes(this.$route.name)
    }
  },
  data() {
    return {
      login: true,
      input: '',
      searchText: '',
    }
  },
  created() {
    // 根据当前路由设置激活状态
    this.updateActiveState();
    // 设置默认参数
    const defaultEra = this.selectedEra || '';
    const defaultSearch = this.searchText || '';
    this.$store.dispatch('search', { selectedEra: defaultEra, searchText: defaultSearch });
  },
  watch: {
    // 监听路由变化
    '$route'(_to) {
      console.log(_to, '===_to');
      this.updateActiveState()
      // 根据token判断是否登录
      this.login = localStorage.getItem('token') ? true : true
    }
  },
  methods: {
    handleLogin() {
      this.$router.push('/userLogin')
    },
    handleExpert() {
      this.$router.push('/login')
    },
    handleSelect(select) {
      this.$store.dispatch('setRouterDomIndex', select)
    },
    updateActiveState() {
      const routeName = this.$route.name
      if (routeName && ['home', 'gallery', 'rankingList', 'about', 'reviewTeam', 'user'].includes(routeName)) {
        this.$store.dispatch('setRouterDomIndex', routeName)
      }
    },
    async handleSearch() {
      this.$store.commit('setSearchText', this.searchText);
      this.$store.dispatch('search', { selectedEra: this.selectedEra, searchText: this.searchText });
    }
  }
}
</script>
<style lang="less" scoped>

  .nav {
    height: 5.63rem;
    display: flex;
    align-items: center;
    width: 100vw;
    min-width: 0;
    margin: 0;
    padding: 0 4rem;
    border-bottom: 1px solid #CECECE;
    z-index: 2;
    box-sizing: border-box;
    position: relative;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    .nav_left {
        max-width: 15vw; /* 使用vw单位自适应 */
      height: auto;
      border-radius: 0px;
      display: flex;
      align-items: center;

      img {
        max-width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
        object-position: center;
      }
  }

  .xian {
    width: 0.13rem;
    height: 2.5rem;
    background: #777E90;
    border-radius: 0.13rem 0.13rem 0.13rem 0.13rem;
    margin: 0 3rem;
  }

  .select {
    width: 40rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 2.69rem 2.69rem 2.69rem 2.69rem;
    border: 0.04rem solid #CECECE;
    margin: 0 10rem 0 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 21px;
    box-sizing: border-box;
    max-width: 20rem;
    margin-left: auto;

    img {
      width: 15px;
      height: 15px;
    }

    /deep/.el-input__inner {
      border: none;
      background: transparent;
    }
  }

  .logo {
    margin-right: 2rem;
    text-decoration: none;
  }

  .login {
    display: flex;

    .btn1 {
      width: 98px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 8px 8px 8px 8px;
      border: 1px solid #111111;
      font-weight: 400;
      font-size: 16px;
      color: #212121;
      cursor: pointer;
    }

    .btn2 {
      width: 98px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #B53334;
      font-weight: 400;
      font-size: 16px;
      color: #FFFFFF;
      border-radius: 8px 8px 8px 8px;
      margin-left: 30px;
      cursor: pointer;
    }
  }

  .imgs {
    width: 3.13rem;
    height: 3.13rem;
    border-radius: 2.41rem 2.41rem 2.41rem 2.41rem;
    background: #CECECE;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .nav_right {
    max-width: 65rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 1.25rem 1.25rem 1.25rem 1.25rem;
    border: 1px solid #CECECE;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0 2.5rem;
    box-sizing: border-box;
  }
}

.routerDom {
  text-decoration: none;
  font-weight: 300;
  font-size: .9rem;
  color: #777E90;
  white-space: nowrap;
  margin-left: .5rem;
  margin-right: .5rem;
}

.routerDom_active {
  text-decoration: none;
  font-weight: 400;
  font-size: 1.15rem;
  color: #B53334;
  white-space: nowrap;
  margin-left: .2rem;
  margin-right: .2rem;
}

#app {
  position: relative;
  min-height: 100vh;
}

.footer {
  // position: absolute;
  // bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: right;
  padding: 0 2rem;
  box-sizing: border-box;
  border-top: 1px solid #CECECE;
  box-sizing: border-box;

  .img1 {
    margin-top: 30px;
    width: 238px;
    height: 65px;
    border-radius: 0px 0px 0px 0px;
    margin-right: 27px;
  }

  .img2 {
    margin-top: 21px;
    width: 336px;
    height: 80px;
    border-radius: 0px 0px 0px 0px;
    margin-right: 27px;
  }

  .img3 {
    margin-top: 12px;
    width: 276px;
    height: 94px;
    border-radius: 0px 0px 0px 0px;
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
<style>
/*每个页面公共css */
@font-face {
  font-family: htFonts;
  src: url("/src/assets/fonts/ht.otf")
}
@font-face {
  font-family: fsFonts;
  src: url("/src/assets/fonts/fs.ttf")
}
.ht {
  font-family: htFonts;
}

.fs {
  font-family: fsFonts;
}

@font-face {
  font-family: TimesNewerRoman;
  src: url("/src/assets/fonts/ens.otf")
}

.ens {
  font-family: TimesNewerRoman;
}


</style>
