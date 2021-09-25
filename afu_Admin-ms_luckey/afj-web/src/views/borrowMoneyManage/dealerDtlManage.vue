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
        <span class="headLab">车商详情</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="dealersDtl">
              <div class="dealersDtl__inner">
                <div class="dealersDtl__line__item">
                  <div class="dealersDtl__line__lab">车商姓名：</div>
                  <div class="dealersDtl__line__txt">
                    {{ dealersDtl.carDealersName || "--" }}
                  </div>
                </div>
                <div class="dealersDtl__line__item">
                  <div class="dealersDtl__line__lab">手机号码：</div>
                  <div class="dealersDtl__line__txt">
                    {{ dealersDtl.carDealersPhone || "--" }}
                  </div>
                </div>
                <div class="dealersDtl__line__item">
                  <div class="dealersDtl__line__lab">实名：</div>
                  <div class="dealersDtl__line__txt">
                    {{ dealersDtl.authUserName || "--" }}
                  </div>
                </div>
                <div class="dealersDtl__line__item">
                  <div class="dealersDtl__line__lab">身份证号：</div>
                  <div class="dealersDtl__line__txt">
                    {{ dealersDtl.authIdCard || "--" }}
                  </div>
                </div>
                <div class="dealersDtl__line__item">
                  <div class="dealersDtl__line__lab">认证状态：</div>
                  <div class="dealersDtl__line__txt">
                    {{
                      dealersDtl.authStatus == 0 ? "未认证" : "已认证" || "--"
                    }}
                  </div>
                </div>
                <div class="dealersDtl__line__item" v-if="dealersDtl.authAt">
                  <div class="dealersDtl__line__lab">认证时间：</div>
                  <div class="dealersDtl__line__txt">
                    {{ dealersDtl.authAt || "--" }}
                  </div>
                </div>
                <div
                  class="dealersDtl__line__item"
                  v-if="dealersDtl.authIdentifyType"
                >
                  <div class="dealersDtl__line__lab">认证类型：</div>
                  <div
                    class="dealersDtl__line__txt"
                    v-if="dealersDtl.authIdentifyType == 2"
                  >
                    {{ "手机号码认证" || "-－" }}
                  </div>
                  <div
                    class="dealersDtl__line__txt"
                    v-else-if="dealersDtl.authIdentifyType == 3"
                  >
                    {{ "银行卡认证" || "-－" }}
                  </div>
                </div>
                <div class="dealersDtl__line__item">
                  <div class="dealersDtl__line__lab">所属分公司：</div>
                  <div class="dealersDtl__line__txt">
                    {{ dealersDtl.companyName }}
                  </div>
                </div>
                <div class="dealersDtl__line__item">
                  <div class="dealersDtl__line__lab">所属客服：</div>
                  <div class="dealersDtl__line__txt">
                    {{ dealersDtl.custmagerName }}
                  </div>
                </div>
                <div class="dealersDtl__line__item">
                  <div class="dealersDtl__line__lab">状态：</div>
                  <div class="dealersDtl__line__txt">
                    {{ dealersDtl.status == 1 ? "启用" : "冻结" }}
                  </div>
                </div>
                <div
                  class="dealersDtl__line__item"
                  v-if="dealersDtl.frozenReason"
                >
                  <div class="dealersDtl__line__lab">冻结原因：</div>
                  <div class="dealersDtl__line__txt">
                    {{ dealersDtl.frozenReason || "--" }}
                  </div>
                </div>
                <div
                  class="dealersDtl__line__item"
                  v-if="dealersDtl.applyQuotaStatus == 0"
                >
                  <div class="dealersDtl__line__lab">申请额度状态：</div>
                  <div class="dealersDtl__line__txt">未申请</div>
                </div>
                <div
                  class="dealersDtl__line__item"
                  v-if="dealersDtl.applyQuotaStatus == 1"
                >
                  <div class="dealersDtl__line__lab">申请额度状态：</div>
                  <div class="dealersDtl__line__txt">申请中</div>
                </div>
                <div
                  class="dealersDtl__line__item"
                  v-if="dealersDtl.applyQuotaStatus == 2"
                >
                  <div class="dealersDtl__line__lab">申请额度状态：</div>
                  <div class="dealersDtl__line__txt">已申请</div>
                </div>
                <div
                  class="dealersDtl__line__item"
                  v-if="dealersDtl.addQuotaStatus == 0"
                >
                  <div class="dealersDtl__line__lab">申请提额状态：</div>
                  <div class="dealersDtl__line__txt">未申请</div>
                </div>
                <div
                  class="dealersDtl__line__item"
                  v-if="dealersDtl.addQuotaStatus == 1"
                >
                  <div class="dealersDtl__line__lab">申请提额状态：</div>
                  <div class="dealersDtl__line__txt">申请中</div>
                </div>
                <div class="dealersDtl__line__item">
                  <div class="dealersDtl__line__lab">创建时间：</div>
                  <div class="dealersDtl__line__txt">
                    {{ dealersDtl.createAt }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="header" style="display: flex; padding-top: 50px">
      <div
        class="headLab"
        style="width:50%;"
        v-if="handleBtnShow[0].isShow && loanRepaymentList.length > 0"
      >
        借钱还款记录
      </div>
      <div
        class="headLab"
        style="width:50%;"
        v-if="handleBtnShow[1].isShow && accountDetailList.length > 0"
      >
        额度变更记录
      </div>
    </div>
    <div class="tableContent" style="display: flex">
      <div
        style="padding-right: 30px; border-right: 1px solid #eee;width:50%;"
        v-if="handleBtnShow[0].isShow && loanRepaymentList.length > 0"
      >
        <el-table
          :data="loanRepaymentList"
          style="width: 100%"
          :show-header="showHeader"
        >
          <el-table-column
            prop="createAt"
            label="日期"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="operateTypeText"
            label="类型"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="quota"
            label="金额"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="carNo"
            label="车型号"
            align="center"
          ></el-table-column>
        </el-table>
        <pagination
          v-show="total1 > 0"
          :total="total1"
          :page.sync="listQuery1.pageNum"
          :limit.sync="listQuery1.pageSize"
          @pagination="_getBorrowRecards"
        />
      </div>
      <div
        style="padding-left: 30px;width:50%;"
        v-if="handleBtnShow[1].isShow && accountDetailList.length > 0"
      >
        <el-table
          :data="accountDetailList"
          style="width: 100%"
          :show-header="showHeader"
        >
          <el-table-column
            prop="createAt"
            label="日期"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="chgTypeText"
            label="类型"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="quota"
            label="金额"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="原因"
            align="center"
          ></el-table-column>
          <!-- <el-table-column prop="money" label="操作" align="right">
            <el-button
              v-waves
              class="filter-item"
              type="primary"
              size="mini"
              plain
              style="height: 20px; line-height: 20px; padding: 0 5px"
              >查看审批</el-button
            >
          </el-table-column> -->
        </el-table>
        <pagination
          v-show="total2 > 0"
          :total="total2"
          :page.sync="listQuery2.pageNum"
          :limit.sync="listQuery2.pageSize"
          @pagination="_getQuotaChangeRecards"
        />
      </div>
    </div>
  </div>
</template>
<script>
import {
  dealersDtl,
  borrowRecards,
  quotaChangeRecards,
} from "@/api/borrowMoneyManage";
import notify from "mixins/notify";

import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
export default {
  name: "DealerDtlManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      showHeader: false,
      carDealersId: "",
      dealersDtl: {},
      loanRepaymentList: [],
      accountDetailList: [],
      total1: 0,
      total2: 0,
      listQuery1: {
        pageNum: 1,
        pageSize: 20,
      },
      listQuery2: {
        pageNum: 1,
        pageSize: 20,
      },
      handleBtnFuncArr: [],
      handleBtnShow: [
        {
          btnName: "LoanCarDealersLoadRepaymentQuery",
          isShow: false,
        },
        {
          btnName: "LoanCarDealersLoadChgQuery",
          isShow: false,
        },
      ],
    };
  },
  created() {
    this.handleBtnFuncArr = JSON.parse(localStorage.getItem("functionList"));
    this.handleBtnFuncArr.forEach((item, index) => {
      this.handleBtnShow.forEach((val, idx) => {
        if (item == val.btnName) {
          val.isShow = true;
        }
      });
    });
  },
  mounted() {
    this.carDealersId = this.$route.query.carDealersId;
    console.log(this.carDealersId, "carDealersId=======");
    this.beforeRouter = this.$route.query.beforeRouter;
    this._getDealersDtl();
    this._getBorrowRecards();
    this._getQuotaChangeRecards();
  },
  computed: {},
  methods: {
    async _getDealersDtl() {
      let res = await dealersDtl({
        carDealersId: this.carDealersId,
      });
      if (res.rtn == 1) {
        this.dealersDtl = res.result;
      }
    },
    async _getBorrowRecards() {
      let res = await borrowRecards({
        pageNum: this.listQuery1.pageNum,
        pageSize: this.listQuery1.pageSize,
        carDealersId: this.carDealersId,
      });
      if (res.rtn == 1) {
        this.loanRepaymentList = res.result.loanRepaymentList;
        this.loanRepaymentList.forEach((item, index) => {
          if (item.operateType == 1) {
            item.operateTypeText = "借款";
          } else if (item.operateType == 2) {
            item.operateTypeText = "还款";
          } else if (item.operateType == 3) {
            item.operateTypeText = "补充保证金";
          } else if (item.operateType == 4) {
            item.operateTypeText = "还息";
          }
          if (item.quota || item.quota == 0) {
            item.quota = parseFloat(item.quota).toFixed(2);
          }
        });
        this.total1 = res.result.total;
      }
      console.log(res);
    },
    async _getQuotaChangeRecards() {
      let res = await quotaChangeRecards({
        pageNum: this.listQuery2.pageNum,
        pageSize: this.listQuery2.pageSize,
        carDealersId: this.carDealersId,
      });
      if (res.rtn == 1) {
        this.accountDetailList = res.result.accountDetailList;
        this.accountDetailList.forEach((item, index) => {
          if (item.chgType == 1) {
            item.chgTypeText = "新增额度";
          } else if (item.chgType == 2) {
            item.chgTypeText = "额度提升";
          } else if (item.chgType == 3) {
            item.chgTypeText = "额度降低";
          } else if (item.chgType == 4) {
            item.chgTypeText = "额度冻结";
          } else if (item.chgType == 5) {
            item.chgTypeText = "额度解禁";
          }
          if (item.quota || item.quota == 0) {
            item.quota = parseFloat(item.quota).toFixed(2);
          }
        });
        this.total2 = res.result.total;
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
.dealersDtl,
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
.dealersDtl__inner {
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
.dealersDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.userDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.dealersDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.dealersDtl__line__item {
  display: inline-block;
  width: 33.33%;
  padding-bottom: 20px;
  font-size: 14px;
}
.dealersDtl__line__lab,
.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.dealersDtl__line__txt,
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
.dealersDtl__header__orderInfo tr {
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