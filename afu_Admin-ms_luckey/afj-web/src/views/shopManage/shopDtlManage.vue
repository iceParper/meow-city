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
        <span class="headLab">店铺信息</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="userDtl">
              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">店铺名称：</div>
                  <div class="userDtl__line__txt">
                    {{ storeInfo.storeName || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">开店时间：</div>
                  <div class="userDtl__line__txt">
                    {{ storeInfo.openingTime || "--" }}
                  </div>
                </div>
              </div>
              <div class="userDtl__inner">
                <div class="userDtl__line__item" style="width: 100%">
                  <div class="userDtl__line__lab">店铺地址：</div>
                  <div class="userDtl__line__txt" v-html="storeInfo.address">
                    <!-- {{ storeInfo.address || "--" }} -->
                  </div>
                </div>
              </div>
              <div class="userDtl__inner">
                <div
                  class="userDtl__line__item"
                  style="display: flex; width: 100%; flex-wrap: wrap"
                >
                  <div class="userDtl__line__lab">图片：</div>
                  <div style="flex: 1">
                    <div
                      class="userDtl__line__txt"
                      style="
                        display: inline-block;
                        width: 100px;
                        height: 100px;
                        margin-right: 16px;
                        margin-bottom: 10px;
                      "
                      v-for="(item, index) in storeInfo.picUrlArr"
                      :key="index"
                    >
                      <el-image
                        class="shopImg"
                        :src="item"
                        alt=""
                        :preview-src-list="[item]"
                        :fit="fit"
                      ></el-image>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="header">
        <span class="headLab">人员信息</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="userDtl">
              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">负责人姓名：</div>
                  <div class="userDtl__line__txt">
                    {{ storeInfo.responsiblePersonName || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">负责人电话：</div>
                  <div class="userDtl__line__txt">
                    {{ storeInfo.responsiblePersonPhone || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">负责人微信：</div>
                  <div class="userDtl__line__txt">
                    {{ storeInfo.responsiblePersonVx || "--" }}
                  </div>
                </div>
              </div>
              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">客服姓名：</div>
                  <div class="userDtl__line__txt">
                    {{ storeInfo.customerServiceName || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">客服电话：</div>
                  <div class="userDtl__line__txt">
                    {{ storeInfo.customerServicePhone || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">客服微信：</div>
                  <div class="userDtl__line__txt">
                    {{ storeInfo.customerServiceVx || "--" }}
                  </div>
                </div>
              </div>
              <div class="userDtl__inner">
                <div class="userDtl__line__item" style="width: 100%">
                  <div class="userDtl__line__lab">客服描述：</div>
                  <div class="userDtl__line__txt">
                    {{ storeInfo.description || "--" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="header">
        <span class="headLab">帮助中心</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="userDtl">
              <div class="userDtl__inner">
                <div class="userDtl__line__item" style="width: 100%">
                  <div class="userDtl__line__lab1">帮助中心文档：</div>
                  <div class="userDtl__line__txt1" v-html="storeInfo.remark">
                    {{ storeInfo.remark || "--" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="header">
        <span class="headLab">历史活动</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="userDtl">
              <!-- <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  店铺累计进入页面人数：100000000
                </div>
                <div class="userDtl__line__item">
                  店铺累计参与抽奖人数：8100000
                </div>
              </div> -->
              <div class="userDtl__inner">
                <el-table
                  :key="tableKey"
                  v-loading="listLoading"
                  :data="list"
                  fit
                  highlight-current-row
                  style="width: 100%"
                >
                  <el-table-column
                    fixed
                    label="序号"
                    type="index"
                    width="50"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="活动名称" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.lottertName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="活动时间" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.beginAt + ' - ' + row.endAt }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="活动状态" align="center">
                    <template slot-scope="{ row }">
                      <span>{{row.lotteryStatus}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="进入页面人数" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.openNum || '--' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="参与抽奖人数" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.participationNum || '--' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="总分享次数" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.shareNum || '--' }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { shopDtl } from "@/api/shopManage";
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
export default {
  name: "UserDtlMange",
  data() {
    return {
      tableKey: 0,
      beforeRouter: undefined,
      storeNo: undefined,
      listLoading: false,
      storeInfo: {},
      list: [],
    };
  },
  components: {
    collapse,
  },
  created() {},
  mounted() {
    this.storeNo = this.$route.query.storeNo;
    this.beforeRouter = this.$route.query.beforeRouter;
    this.getDtl();
  },
  computed: {},
  methods: {
    async getDtl() {
      this.listLoading = true;
      let res = await shopDtl({
        storeNo: this.storeNo,
      });
      this.storeInfo = res.storeInfo;
      if (this.storeInfo.openingTime) {
        this.storeInfo.openingTime = this.storeInfo.openingTime.split(" ")[0];
      }
      if (this.storeInfo.picUrl) {
        this.storeInfo.picUrlArr = this.storeInfo.picUrl.split(",");
      }
      this.list = res.historyLotteryList;
      this.listLoading = false;
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
.userDtl,
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
.userDtl__inner {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 0;
  color: #999;
  // border-bottom: 1px solid #eee;
}
.userDtl__inner,
.logisticsItem {
  margin-left: 20px;
  padding: 10px 0 0;
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
.userDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.userDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line__item {
  display: inline-block;
  width: 33.33%;
  padding-bottom: 20px;
  font-size: 14px;
}

.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}

.userDtl__line__lab1{
  display: inline-block;
  color: #999;
  vertical-align: top;
  line-height: 1.5;
}

.userDtl__line__txt {
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.userDtl__line__txt1 {
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  line-height: 1.5;
}
.userDtl__line__txt {
  width: calc(100% - 150px);
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
.userDtl__header__orderInfo tr {
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
  border: 1px solid rgba(242, 171, 11, 100);
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
  border-radius: 8px;
  background-color: rgba(242, 171, 11, 100);
  font-size: 20px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(255, 255, 255, 100);
}
// .wrap .header::after {
//   position: absolute;
//   top: 0;
//   left: 100%;
//   content: "";
//   width: 0;
//   height: 0;
//   background: transparent;
//   border-top: 18px solid transparent;
//   border-left: 50px solid #3f7efc;
//   border-bottom: 18px solid transparent;
// }
.wrap .header span {
  font-size: 16px;
  color: #fff;
  line-height: 36px;
}
.shopImg {
  width: 100px;
  height: 100px;
}
</style>