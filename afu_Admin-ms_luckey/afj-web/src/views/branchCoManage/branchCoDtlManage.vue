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
        <span class="headLab">分公司详情</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="companyDtl">
              <div class="companyDtl__inner">
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">分公司名称：</div>
                  <div class="companyDtl__line__txt">
                    {{ companyDtl.companyName }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">负责人姓名：</div>
                  <div class="companyDtl__line__txt">
                    {{ companyDtl.contactName }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">手机号码：</div>
                  <div class="companyDtl__line__txt">
                    {{ companyDtl.contactPhone }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">角色名称：</div>
                  <div class="companyDtl__line__txt">
                    {{ companyDtl.companyRoleName }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">创建时间：</div>
                  <div class="companyDtl__line__txt">
                    {{ companyDtl.createAt || "－" }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">状态：</div>
                  <div
                    class="companyDtl__line__txt"
                    v-if="companyDtl.status == 1"
                  >
                    {{ "启用" || "－" }}
                  </div>
                  <div
                    class="companyDtl__line__txt"
                    v-else-if="companyDtl.status == 2"
                  >
                    {{ "冻结" || "－" }}
                  </div>
                  <div
                    class="companyDtl__line__txt"
                    v-else-if="companyDtl.status == 3"
                  >
                    {{ "未设置审批流程" || "－" }}
                  </div>
                </div>
                <div class="companyDtl__line__item" style="width: 100%">
                  <div class="companyDtl__line__lab">地址：</div>
                  <div class="companyDtl__line__txt">
                    {{ companyDtl.province }}{{ companyDtl.city
                    }}{{ companyDtl.county }}{{ companyDtl.detailAddress }}
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
        <span class="headLab">角色详情</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="companyDtl">
              <div class="companyDtl__inner">
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">角色名称：</div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.roleName }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">巡检类型：</div>
                  <div class="companyDtl__line__txt">
                    <span v-if="roleDtl.inspectionPhoto == 1">照片 </span>
                    <span v-if="roleDtl.inspectionNfc == 1">NFC </span>
                    <span v-if="roleDtl.inspectionScanCode == 1">扫码 </span>
                    <span v-if="roleDtl.inspectionIbeacon == 1">ibeacon</span>
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">借款服务费比例（%）：</div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.loanRate }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">最短计息周期（天）：</div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.minInterestPeriodDay }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">车商抵押比例（%）：</div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.mortgageRatioCarDealers }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">卖家抵押比例（%）：</div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.mortgageRatioSeller }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">按揭返点状态：</div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.mortgageRebateStatus == 1 ? "启用" : "停用" }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">
                    车商额度有效期（天数）：
                  </div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.carDealersQuotaValidityDay }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">
                    未巡检报警阈值（天数）：
                  </div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.inspectionThresholdDay }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">放款类型-联合资金：</div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.paymentJointFunds == 1 ? "是" : "否" }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">放款类型-自有资金：</div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.paymentOwnFunds == 1 ? "是" : "否" }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">创建时间：</div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.createAt }}
                  </div>
                </div>
                <div class="companyDtl__line__item">
                  <div class="companyDtl__line__lab">状态：</div>
                  <div class="companyDtl__line__txt">
                    {{ roleDtl.status == 1 ? "启用" : "冻结" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div
        class="header"
        v-if="companyDtl.workflowList && companyDtl.workflowList.length > 0"
      >
        <span class="headLab">审批节点</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section" style="padding: 30px 0">
            <div
              class="nodeList"
              v-for="(item, index) in companyDtl.workflowList"
              :key="index"
            >
              <div class="nodeListTitle" v-if="item.workflowType == 'car'">
                审批类型：车辆审批
              </div>
              <div
                class="nodeListTitle"
                v-else-if="item.workflowType == 'propertyOwner'"
              >
                审批类型：产权人审批
              </div>
              <div
                class="nodeListTitle"
                v-else-if="item.workflowType == 'carDealers'"
              >
                审批类型：车商审批
              </div>
              <div
                class="nodeListTitle"
                v-else-if="item.workflowType == 'carDealersQuota'"
              >
                审批类型：车商额度
              </div>
              <div
                class="nodeListTitle"
                v-else-if="item.workflowType == 'loan'"
              >
                审批类型：借款审批
              </div>
              <div
                class="nodeListTitle"
                v-else-if="item.workflowType == 'repayment'"
              >
                审批类型：线下还款审批
              </div>
              <div
                class="nodeListTitle"
                v-else-if="item.workflowType == 'inspectionPlan'"
              >
                审批类型：巡检计划
              </div>
              <div
                class="nodeListTitle"
                v-else-if="item.workflowType == 'exceptionDescription'"
              >
                审批类型：异常说明
              </div>
              <div
                class="nodeListTitle"
                v-else-if="item.workflowType == 'inspectionException'"
              >
                审批类型：巡检异常
              </div>
              <div
                class="nodeListTitle"
                v-else-if="item.workflowType == 'rebate'"
              >
                审批类型：车商积分
              </div>
              <div
                class="nodeListTitle"
                v-else-if="item.workflowType == 'rebateChg'"
              >
                审批类型：车商积分调整
              </div>
              <div
                class="nodeListItem"
                v-for="(val, idx) in item.nodeList"
                :key="idx"
              >
                <div class="nodeListItem__con">
                  <div class="nodeNum">节点{{ val.node }}：</div>
                  <div class="roleList" v-for="(v, i) in val.roleList" :key="i">
                    <div class="roleName">{{ v.roleName }}</div>
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
import { companyDtl, companyRoleList } from "@/api/branchCoManage";
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
export default {
  name: "BrandCoDtlManage",
  data() {
    return {
      companyId: "",
      companyDtl: {},
      list: [],
      roleDtl: {},
      listQuery: {
        pageNum: 1,
        pageSize: 100,
        roleName: undefined,
      },
    };
  },
  components: {
    collapse,
  },
  created() {},
  mounted() {
    this.companyId = this.$route.query.companyId;
    this.beforeRouter = this.$route.query.beforeRouter;

    this._getCompanyDtl();
  },
  computed: {},
  methods: {
    async _getCompanyDtl() {
      let res = await companyDtl({
        companyId: this.companyId,
      });
      if (res.rtn == 1) {
        this.companyDtl = res.result;
        this.listQuery.roleName = this.companyDtl.companyRoleName;
        this.getList();
      }
    },
    async getList() {
      this.listLoading = true;
      let res = await companyRoleList({
        ...this.listQuery,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.roleList;
        this.roleDtl = this.list[0];
        this.total = res.result.total;
      }
      // Just to simulate the time of the request
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
.orderHeader {
  // border-bottom: 1px solid #eee;
}
.companyDtl,
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
.companyDtl__inner {
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
.companyDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.userDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.companyDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.companyDtl__line__item {
  display: inline-block;
  width: 33.33%;
  padding-bottom: 20px;
  font-size: 14px;
}
.companyDtl__line__lab,
.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.companyDtl__line__txt,
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
.companyDtl__header__orderInfo tr {
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
.goodsInfo__arroleDtl {
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
.arroleDtlUp {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
  transform: rotate(-360deg);
  transition: all 1s;
}
.arroleDtlDown {
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
.nodeList {
  font-size: 14px;
  color: #999;
}
.nodeListTitle {
  padding: 20px 0 10px;
}
.nodeListItem__con {
  display: flex;
  align-items: center;
}
.nodeListItem {
  padding-top: 10px;
}
.nodeNum {
  margin-right: 10px;
}
.roleList {
  display: flex;
  align-items: center;
}
.roleName {
  padding: 0 10px;
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