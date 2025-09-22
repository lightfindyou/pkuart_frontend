<template>
  <div class="about">
    <div class="title ht">关于我们</div>
    <div class="texter fs">
      北京大学计算艺术实验室「智镜」项目基于中国古代审美立场对大语言模型进行审美评估。本项目旨在构建一个从中国传统审美出发的多模态大模型（LLM）审美评测基准（Bench-mark），项目核心任务是设计一套兼具理论深度与实践效度的审美评测框架，用以量化评估现有主流
      AI 大模型在理解、诠释及生成中式艺术作品方面的审美能力。研究成果将致力于为 AI 价值对齐、AIGC 内容质量控制等领域提供实证依据与学术参考。
    </div>
    <div class="item">
      <div class="item_img">
        <img src="@/assets/about/sm.png" alt="">
      </div>
      <div class="item_right">
        <div class="item_title ht">我们的使命</div>
        <div class="item_texter fs">基于中国传统审美构建 AI 大模型审美评测体系，同时打造开放平台联结公众与 AI，推动技术透明化与价值对齐。（李老师请改）</div>
      </div>
    </div>
    <div class="item item2">
      <div class="item_img">
        <img src="@/assets/about/yj.png" alt="">
      </div>
      <div class="item_right">
        <div class="item_title ht">我们的愿景</div>
        <div class="item_texter fs">让 AI 深度理解中式审美，且其发展始终与公众需求和文化价值紧密相融，实现技术进步与人文关怀的共生。（李老师请改）</div>
      </div>
    </div>
    <div class="title ht">我们的团队</div>
    <div class="title_box">
      <div class="type_item">
        <div class="type_title ht">研究开发团队</div>
        <div class="type_name ht">李洋</div>
        <div class="type_zw fs">北京大学艺术学院教授</div>
        <div class="type_name ht">张航宇</div>
        <div class="type_zw fs">北京大学博士、 福建农林大学副教授</div>
      </div>
      <div class="type_item">
        <div class="type_title ht">管理团队</div>
        <div class="type_name ht">彭锋</div>
        <div class="type_zw fs">北京大学计算艺术实验室主任、教授</div>
        <div class="type_name ht">李洋</div>
        <div class="type_zw fs">北京大学艺术学院教授</div>
        <div class="type_name ht">陈佳苗</div>
        <div class="type_zw fs">北京大学艺术学院硕士研究生</div>
      </div>
      <div class="type_item">
        <div class="type_title ht">设计团队</div>
        <div class="type_name ht">李响</div>
        <div class="type_zw fs">北京大学艺术学院博士研究生</div>
        <div class="type_name ht">刘域</div>
        <div class="type_zw fs">北京大学艺术学院本科生</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
}
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  min-height: 1100px;
  position: relative;

  .title {
    width: 1042px;
    margin: 0 auto;
    margin-top: 63px;
    height: 35px;
    font-weight: 500;
    font-size: 32px;
    color: #000000;
    line-height: 35px;
  }

  .texter {
    margin: 0 auto;
    margin-top: 29px;
    width: 1042px;
    height: 175px;
    font-weight: 400;
    font-size: 24px;
    color: #000000;
    line-height: 35px;
  }

  .item {
    margin: 0 auto;
    margin-top: 29px;
    width: 1042px;
    height: 185px;
    background: rgba(157, 0, 0, 0.1);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 22px 22px 22px 22px;
    display: flex;
    // align-items: center;

    .item_img {
      width: 112px;
      height: 112px;
      margin-top: 35px;
      background-color: #D9D9D9;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 65px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .item_right {
      margin-left: 51px;
      width: 737px;

      .item_title {
        margin-top: 43px;
        height: 25px;
        font-weight: 300;
        font-size: 24px;
        color: #000000;
        line-height: 25px;
      }

      .item_texter {
        margin-top: 19px;
        height: 50px;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
        line-height: 25px;
      }
    }
  }

  .item2 {
    background-color: #F0FDF4;
    margin-bottom: 19px;
  }


  .title_box {
    margin: 0 auto;
    margin-top: 29px;
    width: 1042px;
    display: flex;
    justify-content: space-between;

    .type_item {


      .type_title {
        height: 35px;
        font-weight: 300;
        font-size: 20px;
        color: #363636;
        line-height: 35px;
        margin: 34px 0 33px 0;
      }

      .type_name {
        height: 35px;
        font-weight: 300;
        font-size: 16px;
        color: #000000;
        line-height: 35px;
      }

      .type_zw {
        font-weight: 300;
        font-size: 16px;
        color: #757575;
        line-height: 35px;
      }
    }
  }
}
</style>