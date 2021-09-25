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
        <span class="headLab">用户信息</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="userDtl">
              <div class="userDtl__inner">
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">电话号码：</div>
                  <div class="userDtl__line__txt">
                    {{ appUserInfo.phone || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">用户来源：</div>
                  <div class="userDtl__line__txt">
                    {{ appUserInfo.originDescription || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">初始店铺：</div>
                  <div class="userDtl__line__txt">
                    {{ appUserInfo.firstStoreName || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">当前店铺：</div>
                  <div class="userDtl__line__txt">
                    {{ appUserInfo.currentStoreName || "--" }}
                  </div>
                </div>

                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">总抽奖数/已抽/剩余：</div>
                  <div class="userDtl__line__txt">
                    {{
                      appUserInfo.totalTicketNum +
                      "/" +
                      appUserInfo.usedTicketNum +
                      "/" +
                      appUserInfo.surplusTicketNum
                    }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">中奖数/已兑奖：</div>
                  <div class="userDtl__line__txt">
                    {{ appUserInfo.winNum + "/" + appUserInfo.writeoffNum }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">贡献用户数：</div>
                  <div class="userDtl__line__txt">
                    {{ appUserInfo.devoteUserNum || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">最远链路数：</div>
                  <div class="userDtl__line__txt">
                    {{ appUserInfo.farthestLinkLength || "--" }}
                  </div>
                </div>
                <div class="userDtl__line__item">
                  <div class="userDtl__line__lab">状态：</div>
                  <div class="userDtl__line__txt">
                    {{ appUserInfo.status == 1 ? "启用" : "冻结" }}
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
        <span class="headLab">奖品信息</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="userDtl">
              <div class="userDtl__inner">
                <el-table
                  :key="tableKey"
                  v-loading="listLoading"
                  :data="appUserAwardList"
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
                  <el-table-column label="获得奖项" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.awardLevel }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="奖品名称" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.awardName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="中奖时间" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.winAt }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="活动名称" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.lotteryName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="抽奖店铺" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.storeName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="奖品条码" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.awardBarNo }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="奖品状态" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.status == 1 ? "启用" : "冻结" }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="header">
        <span class="headLab">分享信息</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="userDtl">
              <div class="userDtl__inner">
                <el-table
                  :key="tableKey"
                  v-loading="listLoading"
                  :data="shareInfoList"
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
                  <el-table-column label="被分享人电话" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.phone }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="被分享店铺" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.storeName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="被分享活动" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.lotteryName }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="该链路抽奖次数" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.linkWriteoffNum }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="对该链路贡献用户数" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.linkDevoteUserNum }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="对该链路最远链路数" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.farthestLinkLength }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="链路级别" align="center">
                    <template slot-scope="{ row }">
                      <span>{{ row.linkLelver }}</span>
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
import { userDtl } from "@/api/userManage";
import Pagination from "@/components/Pagination";
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
export default {
  name: "UserDtlMange",
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      userId: undefined,
      appUserInfo: {},
      appUserAwardList: [],
      shareInfoList: [],
    };
  },
  components: {
    collapse,
  },
  created() {},
  mounted() {
    this.userId = this.$route.query.userId;
    this.beforeRouter = this.$route.query.beforeRouter;

    this.getDtl();
  },
  computed: {},
  methods: {
    async getDtl() {
      let res = await userDtl({
        appUserId: this.userId,
      });

      this.appUserInfo = res.appUserInfo;
      this.appUserAwardList = res.appUserAwardList;
      this.shareInfoList = res.shareInfoList;

      console.log(res);
    },
    onBack() {
      this.$router.back(-1);
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
.userDtl__line__lab,
.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.userDtl__line__txt,
.userDtl__line__txt {
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
</style>