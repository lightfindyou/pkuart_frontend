<template>
  <div class="HomeFrom">
    <div class="top">
      <div class="bg">
        <iframe height="100%" width="100%" src="http://art.zslyoo.top/bg.html" frameborder="0"></iframe>
      </div>


      <div class="es">
        <img src="../assets/home/center_newRomea.png" alt="">
      </div>
      <div class="btn" @click="btnClick()">
      </div>
    </div>
    <div class="concent">
      <div class="logos">
        <img src="@/assets/home/main.png" alt="">
      </div>
      <div class="texter fs">
        北京大学计算艺术实验室「智镜」项目基于中国艺术风格对大语言模型进行审美评估，旨在构建一个从中国传统审美出发的多模态大模型(LLM)审美评测平台，设计一套兼具理论深度与实践效度的审美评测指标体系，用以量化评估现有主流AI大模型在理解、诠释及生成艺术作品方面的审美能力，研究成果将致力于为AI价值对齐、AIGC内容质量控制等领域提供实证依据与学术参考。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeFrom',
  components: {
  },
  methods: {
    btnClick() {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
.HomeFrom {
  // height: 100vh;
  overflow: hidden;

  .top {
    height: 100vh;
    position: relative;
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;

    height: 100vh;
    width: 100%;
    z-index: 1;
  }

  .bg_m {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 7;
    pointer-events: none;

    .top {
      height: 50%;
      background: url("../assets/home/top.png") no-repeat 100% 100%;
      background-size: 100% 100%;
    }

    .bottom {
      height: 50%;
      background: url("../assets/home/bottom.png") no-repeat 100% 100%;
      background-size: 100% 100%;
    }
  }


  .es {
    width: 646px;
    height: 42px;
    position: absolute;
    top: 389px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 9;
    pointer-events: none;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .btn {
    width: 186px;
    height: 36px;
    position: absolute;
    top: 486px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 18px;
    text-align: center;
    line-height: 36px;
    color: #FFF;
    cursor: pointer;
    transition: background-color 1s ease, width 0.5s ease;
  }

  .btn:hover {
    width: 186px;
    height: 36px;
    background-color: #b90707;
  }

  .btn:before {
    content: "进入智镜";
    display: block;
  }

  .btn::after {
    content: "ENTER";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    /* 默认隐藏 */
    transition: opacity 1s ease;
  }

  .btn:hover::before {
    opacity: 0;
  }

  .btn:hover::after {
    opacity: 1;
  }
}

.concent {
  .logos {
    width: 559px;
    height: 252px;
    border-radius: 0px 0px 0px 0px;
    margin: 0 auto;
    img {
      width: 100%;
      // height: 100%;
      height: auto;
    }
  }

  .texter {
    width: 759px;
    height: 280px;
    font-weight: 400;
    font-size: 24px;
    color: #424242;
    line-height: 40px;
    text-align: justify;
    font-style: normal;
    text-transform: none;
    margin: 0 auto;
    margin-top: 44px;
    margin-bottom: 116px;
  }
}
</style>
