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
        <span class="headLab">今日巡检详情</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="todayInspectionDtl">
              <div class="todayInspectionDtl__inner">
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">车辆：</div>
                  <div class="todayInspectionDtl__line__txt">
                    <span style="color: #3f7efc; margin-right: 10px">{{
                      todayInspectionDtl.carColor
                    }}</span>
                    {{ todayInspectionDtl.carBrand
                    }}{{ todayInspectionDtl.carModel }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">车架号：</div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.carNo }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">所属车商：</div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.carDealersName || "--" }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">车商手机号：</div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.carDealersPhone || "--" }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">所属分公司：</div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.companyName || "--" }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">客户经理：</div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.custmagerName || "--" }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">
                    客户经理手机号：
                  </div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.custmagerPhone || "--" }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">
                    巡检计划类型：
                  </div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-if="todayInspectionDtl.inspectionPlanType == 'everyDay'"
                  >
                    每天
                  </div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-else-if="
                      todayInspectionDtl.inspectionPlanType == 'everTwoDay'
                    "
                  >
                    每俩天
                  </div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-else-if="
                      todayInspectionDtl.inspectionPlanType == 'workDay'
                    "
                  >
                    工作日
                  </div>
                  <div class="todayInspectionDtl__line__txt" v-else>--</div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">
                    巡检开始时间：
                  </div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.startAt || "--" }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">
                    巡检结束时间：
                  </div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.endAt || "--" }}
                  </div>
                </div>

                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">巡检员：</div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.inspectionUserName || "--" }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">
                    巡检员手机号：
                  </div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.inspectionUserPhone || "--" }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">巡检类型：</div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-if="todayInspectionDtl.inspectionType == 'photo'"
                  >
                    照片
                  </div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-else-if="todayInspectionDtl.inspectionType == 'nfc'"
                  >
                    NFC
                  </div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-else-if="todayInspectionDtl.inspectionType == 'scanSode'"
                  >
                    扫码
                  </div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-else-if="todayInspectionDtl.inspectionType == 'ibeacon'"
                  >
                    ibeacon
                  </div>
                  <div class="todayInspectionDtl__line__txt" v-else>--</div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">驳回原因：</div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.rejectReason || "--" }}
                  </div>
                </div>
                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">
                    巡检上报时间：
                  </div>
                  <div class="todayInspectionDtl__line__txt">
                    {{ todayInspectionDtl.inspectionAt || "--" }}
                  </div>
                </div>

                <div class="todayInspectionDtl__line__item">
                  <div class="todayInspectionDtl__line__lab">状态：</div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-if="todayInspectionDtl.status == 0"
                  >
                    未巡检
                  </div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-else-if="todayInspectionDtl.status == 1"
                  >
                    已巡检
                  </div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-else-if="todayInspectionDtl.status == 2"
                  >
                    已超时
                  </div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-else-if="todayInspectionDtl.status == 3"
                  >
                    异常已说明
                  </div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-else-if="todayInspectionDtl.status == 4"
                  >
                    已驳回
                  </div>
                </div>
              </div>
              <div class="todayInspectionDtl__inner" style="padding-top: 0">
                <div
                  class="todayInspectionDtl__line__item"
                  style="display: flex; width: 100%; flex-wrap: wrap"
                  v-if="
                    todayInspectionDtl.dataPicList &&
                    todayInspectionDtl.dataPicList.length > 0
                  "
                >
                  <div class="todayInspectionDtl__line__lab">图片：</div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-for="(item, index) in todayInspectionDtl.dataPicList"
                    :key="index"
                  >
                    <el-image
                      class="todayInspectImg"
                      :src="item.dataUrl"
                      alt=""
                      :fit="fit"
                      :preview-src-list="[item.originalPicUrl]"
                    ></el-image>
                    <div class="fileName" v-if="item.fileName">
                      {{ item.fileName }}
                    </div>
                  </div>
                </div>
                <div
                  class="todayInspectionDtl__line__item"
                  style="display: flex; width: 100%; flex-wrap: wrap"
                  v-if="
                    todayInspectionDtl.dataPdfList &&
                    todayInspectionDtl.dataPdfList.length > 0
                  "
                >
                  <div class="todayInspectionDtl__line__lab">pdf：</div>
                  <div
                    class="todayInspectionDtl__line__txt"
                    v-for="(item, index) in todayInspectionDtl.dataPdfList"
                    :key="index"
                  >
                    <a
                      :href="item.dataUrl"
                      :key="index"
                      style="display: inline-block"
                      target="_blank"
                    >
                      <img
                        src="./../../assets/PDF.png"
                        style="
                          width: 168px;
                          height: 168px;
                          margin-right: 36px;
                          margin-bottom: 10px;
                        "
                        alt=""
                      />
                    </a>
                    <div class="fileName" v-if="item.fileName">
                      {{ item.fileName }}
                    </div>
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
import { todayInspectionDtl } from "@/api/riskManage.js";
import notify from "mixins/notify";

import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
export default {
  name: "TodayInspectDtlManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      showHeader: false,
      inspectionId: "",
      todayInspectionDtl: {},
      fit: "cover",
    };
  },
  created() {},
  mounted() {
    this.inspectionId = this.$route.query.inspectionId;
    this.beforeRouter = this.$route.query.beforeRouter;
    this._getTodayInspectManage();
  },
  computed: {},
  methods: {
    async _getTodayInspectManage() {
      let res = await todayInspectionDtl({
        inspectionId: this.inspectionId,
      });
      if (res.rtn == 1) {
        this.todayInspectionDtl = res.result;
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
.todayInspectionDtl,
.userDtl,
.goodsList,
.logisticsList {
  margin-top: 20px;
  // border-right: 1px solid #eee;
}
.userDtl,
.logisticsList {
  border: 0;
}
.todayInspectionDtl__inner {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 20px;
  // border-bottom: 1px solid #eee;
}
.userDtl__inner,
.logisticsItem {
  margin-left: 20px;
  padding: 10px 0 20px;
  border-bottom: 1px solid #eee;
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
.todayInspectionDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.userDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.todayInspectionDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.todayInspectionDtl__line__item {
  display: inline-block;
  width: 33.33%;
  padding-bottom: 20px;
  font-size: 14px;
}
.todayInspectionDtl__line__lab,
.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.todayInspectionDtl__line__txt,
.userDtl__line__txt {
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.userDtl__line__txt {
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
.todayInspectionDtl__header__orderInfo tr {
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
.fileName {
  width: 168px;
  margin-bottom: 10px;
  padding: 4px;
  border: 1px solid rgb(247, 2, 2);
  border-radius: 4px;
  font-size: 14px;
  color: rgb(247, 2, 2);
  text-align: center;
}
.todayInspectImg {
  margin-bottom: 10px;
  margin-right: 36px;
}
</style>

<style>
.todayInspectImg > img {
  width: 168px !important;
  height: 168px !important;
  border: 1px solid #eee !important;
  background: #fff !important;
}
</style>