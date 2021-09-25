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
    <div class="wrap wrap1">
      <div class="header1">
        <span class="headLab">未巡检报警</span>
      </div>
      <div class="content">
        <div class="noInspectNum">
          <div class="noInspectNum__lab">未巡检次数：</div>
          <div class="noInspectNum__text">{{ beforeDaysNum }}次</div>
        </div>
        <div class="noInspectNum">
          <div class="noInspectNum__lab">未巡检日期：</div>
          <div class="noInspectNum__text">
            {{ carNoInspectionDays }}
          </div>
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="header">
        <span class="headLab">最近巡检</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="inspectionRecordDtl">
              <div class="inspectionRecordDtl__inner">
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">车辆：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    <span style="color: #3f7efc; margin-right: 10px">{{
                      carInspectionDto.carColor
                    }}</span>
                    {{ carInspectionDto.carBrand
                    }}{{ carInspectionDto.carModel }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">车架号：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.carNo }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">所属车商：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.carDealersName || "--" }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">车商手机号：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.carDealersPhone || "--" }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">所属分公司：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.companyName || "--" }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">客户经理：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.custmagerName || "--" }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">
                    客户经理手机号：
                  </div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.custmagerPhone || "--" }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">
                    巡检计划类型：
                  </div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-if="carInspectionDto.inspectionPlanType == 'everyDay'"
                  >
                    每天
                  </div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-else-if="
                      carInspectionDto.inspectionPlanType == 'everTwoDay'
                    "
                  >
                    每俩天
                  </div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-else-if="carInspectionDto.inspectionPlanType == 'workDay'"
                  >
                    工作日
                  </div>
                  <div class="inspectionRecordDtl__line__txt" v-else>--</div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">
                    巡检开始时间：
                  </div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.startAt || "--" }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">
                    巡检结束时间：
                  </div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.endAt || "--" }}
                  </div>
                </div>

                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">巡检员：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.inspectionUserName || "--" }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">
                    巡检员手机号：
                  </div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.inspectionUserPhone || "--" }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">巡检类型：</div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-if="carInspectionDto.inspectionType == 'photo'"
                  >
                    照片
                  </div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-else-if="carInspectionDto.inspectionType == 'nfc'"
                  >
                    NFC
                  </div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-else-if="carInspectionDto.inspectionType == 'scanSode'"
                  >
                    扫码
                  </div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-else-if="carInspectionDto.inspectionType == 'ibeacon'"
                  >
                    ibeacon
                  </div>
                  <div class="inspectionRecordDtl__line__txt" v-else>--</div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">汽车经纬度：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{
                      carInspectionDto.carLongitude
                        ? carInspectionDto.carLongitude +
                          "," +
                          carInspectionDto.carLatitude
                        : "--"
                    }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">巡检经纬度：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{
                      carInspectionDto.longitude
                        ? carInspectionDto.longitude +
                          "," +
                          carInspectionDto.latitude
                        : "--"
                    }}
                  </div>
                </div>
                <div
                  class="inspectionRecordDtl__line__item"
                  v-if="
                    carInspectionDto.status == 1 ||
                    carInspectionDto.status == 3 ||
                    carInspectionDto.status == 4
                  "
                >
                  <div class="inspectionRecordDtl__line__lab">
                    汽车与与巡检员距离：
                  </div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{
                      carInspectionDto.distance
                        ? carInspectionDto.distance + "m"
                        : "--"
                    }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">巡检详址：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.detailAddress || "--" }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">驳回原因：</div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.rejectReason || "--" }}
                  </div>
                </div>
                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">
                    巡检上报时间：
                  </div>
                  <div class="inspectionRecordDtl__line__txt">
                    {{ carInspectionDto.inspectionAt || "--" }}
                  </div>
                </div>

                <div class="inspectionRecordDtl__line__item">
                  <div class="inspectionRecordDtl__line__lab">状态：</div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-if="carInspectionDto.status == 0"
                  >
                    未巡检
                  </div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-else-if="carInspectionDto.status == 1"
                  >
                    已巡检
                  </div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-else-if="carInspectionDto.status == 2"
                  >
                    已超时
                  </div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-else-if="carInspectionDto.status == 3"
                  >
                    异常已说明
                  </div>
                  <div
                    class="inspectionRecordDtl__line__txt"
                    v-else-if="carInspectionDto.status == 4"
                  >
                    已驳回
                  </div>
                </div>
              </div>
              <div class="inspectionRecordDtl__inner">
                <div
                  class="inspectionRecordDtl__line__item"
                  style="display: flex; width: 100%; flex-wrap: wrap"
                  v-if="
                    carInspectionDto.dataPicList &&
                    carInspectionDto.dataPicList.length > 0
                  "
                >
                  <div class="inspectionRecordDtl__line__lab">巡检图片：</div>
                  <div style="flex: 1">
                    <div
                      class="inspectionRecordDtl__line__txt"
                      v-for="(item, index) in carInspectionDto.dataPicList"
                      :key="index"
                    >
                      <el-image
                        class="inspectionRecordImg"
                        :src="item.dataUrl"
                        alt=""
                        :preview-src-list="[item.originalPicUrl]"
                        :fit="fit"
                      ></el-image>
                      <div>
                        <div class="fileName" v-if="item.fileName">
                          {{ item.fileName }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="inspectionRecordDtl__inner">
                <div
                  class="inspectionRecordDtl__line__item"
                  style="display: flex; width: 100%;flex-wrap"
                  v-if="
                    carInspectionDto.dataPdfList &&
                    carInspectionDto.dataPdfList.length > 0
                  "
                >
                  <div class="inspectionRecordDtl__line__lab">巡检pdf：</div>
                  <div style="flex: 1">
                    <div
                      class="inspectionRecordDtl__line__txt"
                      v-for="(item, index) in carInspectionDto.dataPdfList"
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
  </div>
</template>
<script>
import { noInspectionDtl } from "@/api/riskManage.js";
import notify from "mixins/notify";

import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
export default {
  name: "NoInspectDtlManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      showHeader: false,
      carId: "",
      carInspectionDto: {},
      beforeDaysNum: "",
      carNoInspectionDays: "",
      fit: "cover",
      beforeRouter: undefined,
    };
  },
  created() {},
  mounted() {
    this.carId = this.$route.query.carId;
    this.beforeRouter = this.$route.query.beforeRouter;
    this._getNoInspectManage();
  },
  computed: {},
  methods: {
    async _getNoInspectManage() {
      let res = await noInspectionDtl({
        carId: this.carId,
      });
      if (res.rtn == 1) {
        this.beforeDaysNum = res.result.beforeDaysNum;
        this.carNoInspectionDays = res.result.carNoInspectionDays;
        this.carInspectionDto = res.result.carInspectionDto;
        this.carNoInspectionDays = this.carNoInspectionDays
          .replace(/\s+/g, "、")
          .substr(0, this.carNoInspectionDays.replace(/\s+/g, "、").length - 1);
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
.inspectionRecordDtl,
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
.inspectionRecordDtl__inner {
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
.inspectionRecordDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.userDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.inspectionRecordDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.inspectionRecordDtl__line__item {
  display: inline-block;
  width: 33.33%;
  padding-bottom: 20px;
  font-size: 14px;
}
.inspectionRecordDtl__line__lab,
.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.inspectionRecordDtl__line__txt,
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
.inspectionRecordDtl__header__orderInfo tr {
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
.wrap1 {
  border-color: #ff0000;
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

.wrap .header1 {
  top: -20px;
  left: 20px;
  padding: 0 20px;
  color: #fff;
  position: absolute;
  background: #ff0000;
  border: 0;
  border-radius: 10px 0 0 10px;
  box-shadow: 16px 5px 2px #bbb;
}
.wrap .header1::after {
  position: absolute;
  top: 0;
  left: 100%;
  content: "";
  width: 0;
  height: 0;
  background: transparent;
  border-top: 18px solid transparent;
  border-left: 50px solid #ff0000;
  border-bottom: 18px solid transparent;
}
.wrap .header span,
.wrap .header1 span {
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
.inspectionRecordImg {
  margin-bottom: 10px;
  margin-right: 36px;
}
.noInspectNum {
  display: flex;
  font-size: 14px;
  padding-bottom: 16px;
}
.noInspectNum:first-child {
  padding-top: 30px;
}
.noInspectNum__lab {
  width: 90px;
  color: #9f9b9b;
}
.noInspectNum__text {
  flex: 1;
  color: #000;
}
</style>

<style>
.inspectionRecordImg > img {
  width: 168px !important;
  height: 168px !important;
  border: 1px solid #eee !important;
  background: #fff !important;
}
</style>