<template>
  <div class="app-container">
    <div class="header" style="text-align: right">
      <!-- <span class="headLab">{{ title }}</span> -->
      <el-button
        style="font-size: 14px; padding: 3px 0; line-height: 30px"
        type="text"
        @click="onBack"
        >返回</el-button
      >
    </div>
    <div class="wrap">
      <div class="header">
        <span class="headLab">通知详情</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="noticeDtl">
              <div class="bannerDtl__inner">
                <div class="bannerDtl__line__item" style="width: 100%">
                  <div class="bannerDtl__line__lab">通知标题：</div>
                  <div class="bannerDtl__line__txt">
                    {{ noticeDtl.msgTitle || "--" }}
                  </div>
                </div>
              </div>
              <div class="bannerDtl__inner">
                <div class="bannerDtl__line__item" style="width: 100%">
                  <div class="bannerDtl__line__lab">通知副标题：</div>
                  <div class="bannerDtl__line__txt">
                    {{ noticeDtl.msgSubtitle || "--" }}
                  </div>
                </div>
              </div>
              <div class="bannerDtl__inner">
                <div class="bannerDtl__line__item">
                  <div class="bannerDtl__line__lab">阅读人数：</div>
                  <div class="bannerDtl__line__txt">
                    {{ noticeDtl.views }}
                  </div>
                </div>
                <div class="bannerDtl__line__item">
                  <div class="bannerDtl__line__lab">状态：</div>
                  <div class="bannerDtl__line__txt">
                    {{ noticeDtl.status == 1 ? "启用" : "冻结" || "--" }}
                  </div>
                </div>
                <div class="bannerDtl__line__item">
                  <div class="bannerDtl__line__lab">创建时间：</div>
                  <div class="bannerDtl__line__txt">
                    {{ noticeDtl.createAt || "--" }}
                  </div>
                </div>
              </div>
              <div class="bannerDtl__inner">
                <div class="bannerDtl__line__item">
                  <div class="bannerDtl__line__lab">通知图片：</div>
                  <el-image
                    fit="cover"
                    :src="noticeDtl.picUrl"
                    alt=""
                    style="
                      display: inline-block;
                      width: 100px;
                      height: 100px;
                      vertical-align: middle;
                    "
                    :preview-src-list="[noticeDtl.picUrl]"
                  ></el-image>
                </div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="noticeDtl">
              <div class="bannerDtl__inner">
                <div class="bannerDtl__line__item" style="width: 100%">
                  <div class="bannerDtl__line__lab1">通知内容：</div>
                  <div class="bannerDtl__line__txt1">
                    {{ noticeDtl.msgContent || "--" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { noticeDtl } from "@/api/operationManage";
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
export default {
  name: "MessageDtlManage",
  data() {
    return {
      noticeId: "",
      noticeDtl: {},
    };
  },
  components: {
    collapse,
  },
  created() {},
  mounted() {
    this.noticeId = this.$route.query.noticeId;
    this.beforeRouter = this.$route.query.beforeRouter;
    this._getBannerDtl();
  },
  computed: {},
  methods: {
    async _getBannerDtl() {
      let res = await noticeDtl({
        noticeId: this.noticeId,
      });
      if (res.rtn == 1) {
        this.noticeDtl = res.result;
      }
    },
    onBack() {
      this.$router.push({ name: this.beforeRouter });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  margin: 0 40px;
}
.header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.headLab {
  font-size: 16px;
  font-weight: 500;
  color: #999;
}
.noticeDtl,
.noticeDtl,
.goodsList,
.logisticsList {
  margin-top: 20px;
  // border-right: 1px solid #eee;
}
.noticeDtl,
.logisticsList {
  border: 0;
}
.bannerDtl__inner {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  // border-bottom: 1px solid #eee;
}
.bannerDtl__inner,
.logisticsItem {
  margin-left: 20px;
  padding: 10px 0 20px;
  // border-bottom: 1px solid #eee;
}
.logisticsItem {
  border: 0;
  font-size: 14px;
}
.logisticsItem__time {
  display: inline-block;
  width: 180px;
  margin-right: 10px;
  color: #999;
  vertical-align: top;
  line-height: 25px;
}
.logisticsItem__txt {
  width: calc(100% - 200px);
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  line-height: 25px;
}
.bannerDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.bannerDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.bannerDtl__line:last-child {
  padding-bottom: 10px;
}
.bannerDtl__line:last-child {
  padding-bottom: 10px;
}
.bannerDtl__line__item {
  display: inline-block;
  width: 33.33%;
  font-size: 14px;
}
.bannerDtl__line__lab,
.bannerDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.bannerDtl__line__lab1 {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.bannerDtl__line__txt,
.bannerDtl__line__txt {
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bannerDtl__line__txt1 {
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
}
.bannerDtl__line__txt {
  width: calc(100% - 100px);
}

.box-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 70px 20px 0 20px;
  overflow: auto;
}
.content {
  overflow: auto;
  font-size: 0;
}
.section {
  display: inline-block;
  width: 100%;
  vertical-align: top;
}
.orderStatus {
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.75);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5715;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.bannerDtl__header__orderInfo tr {
  height: 40px;
  line-height: 40px;
}
.line {
  width: 100%;
  height: 1px;
  margin: 30px 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;

  list-style: none;
  font-feature-settings: "tnum", "tnum";
  background: #f0f0f0;
}
table tr td {
  width: 33.333333%;
}
.head_pic {
  width: 100px;
  height: 100px;
}
.logisticsStatus {
  font-size: 13px;
  padding: 0 20px;
}
.logisticsStatusWrap {
  padding: 20px 0;
}
.goodsList,
.logisticsList {
  padding-top: 30px;
  margin-top: 0;
}
.goodsItem {
  margin-bottom: 30px;
  position: relative;
}
.goodsItem:last-child {
  margin-bottom: 0;
}
.goodsItem__header {
  font-size: 0;
  padding-bottom: 30px;
}
.goodsImg {
  width: 98px;
  height: 98px;
  vertical-align: bottom;
  background: #eee;
  border: 1px solid #efefef;
}
.goodsInfo {
  width: calc(100% - 190px);
  margin-left: 20px;
  font-size: 14px;
  color: rgba($color: #000, $alpha: 1);
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}
.goodsInfo__arrow {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
}
.goodsInfo__item {
  padding-bottom: 5px;
}
.goodsInfo__item:last-child {
  padding: 0;
}
.goodsName {
  color: #000 !important;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.goodsItemNum,
.goodsNum {
  color: #999;
}
.goodsSkuList {
  font-size: 14px;
  color: #999;
}
.goodsSkuItem {
  padding-bottom: 12px;
}
.goodsSkuItem:last-child {
  padding: 0;
}
.goodsSkuItem__left {
  display: inline-block;
  width: 200px;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
}
.goodsSkuItem__right {
  display: inline-block;
  vertical-align: top;
}
.arrowUp {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
  transform: rotate(-360deg);
  transition: all 1s;
}
.arrowDown {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
  transform: rotate(-180deg);
  transition: all 1s;
}
.col_red {
  color: red;
}
.fontWei_700 {
  font-weight: 700;
}
.addrAll {
  cursor: pointer;
}
.wrap {
  position: relative;
  border: 1px solid #3f7efc;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 50px;
}
.wrap .header {
  top: -20px;
  left: 20px;
  padding: 0 20px;
  color: #fff;
  position: absolute;
  background: #3f7efc;
  border: 0;
  border-radius: 10px 0 0 10px;
  box-shadow: 16px 5px 2px #bbb;
}
.wrap .header::after {
  position: absolute;
  top: 0;
  left: 100%;
  content: "";
  width: 0;
  height: 0;
  background: transparent;
  border-top: 18px solid transparent;
  border-left: 50px solid #3f7efc;
  border-bottom: 18px solid transparent;
}
.wrap .header span {
  font-size: 16px;
  color: #fff;
  line-height: 36px;
}
</style>