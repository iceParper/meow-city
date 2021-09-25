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
        <span class="headLab">积分信息</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="rebateDtl">
              <div class="rebateDtl__inner">
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">姓名：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.carDealersName || "--" }}
                  </div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">手机号码：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.carDealersPhone || "--" }}
                  </div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">身份证号：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.authIdCard || "--" }}
                  </div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">认证时间：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.authAt || "--" }}
                  </div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">认证类型：</div>
                  <div
                    class="rebateDtl__line__txt"
                    v-if="rebateDtl.authIdentifyType == 2"
                  >
                    手机号码认证
                  </div>
                  <div
                    class="rebateDtl__line__txt"
                    v-else-if="rebateDtl.authIdentifyType == 3"
                  >
                    银行卡认证
                  </div>
                  <div class="rebateDtl__line__txt" v-else>--</div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">所属分公司：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.companyName }}
                  </div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">所属客服：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.custmagerName }}
                  </div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">申请额度状态：</div>
                  <div
                    class="rebateDtl__line__txt"
                    v-if="rebateDtl.applyQuotaStatus == 0"
                  >
                    未申请
                  </div>
                  <div
                    class="rebateDtl__line__txt"
                    v-else-if="rebateDtl.applyQuotaStatus == 1"
                  >
                    申请中
                  </div>
                  <div
                    class="rebateDtl__line__txt"
                    v-else-if="rebateDtl.applyQuotaStatus == 2"
                  >
                    已申请
                  </div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">提额状态：</div>
                  <div
                    class="rebateDtl__line__txt"
                    v-if="rebateDtl.addQuotaStatus == 0"
                  >
                    未申请
                  </div>
                  <div
                    class="rebateDtl__line__txt"
                    v-else-if="rebateDtl.addQuotaStatus == 1"
                  >
                    申请中
                  </div>
                  <div
                    class="rebateDtl__line__txt"
                    v-else-if="rebateDtl.addQuotaStatus == 2"
                  >
                    已提额
                  </div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">认证状态：</div>
                  <div
                    class="rebateDtl__line__txt"
                    v-if="rebateDtl.authStatus == 0"
                  >
                    未认证
                  </div>
                  <div
                    class="rebateDtl__line__txt"
                    v-else-if="rebateDtl.authStatus == 1"
                  >
                    已认证
                  </div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">状态：</div>
                  <div
                    class="rebateDtl__line__txt"
                    v-if="rebateDtl.status == 1"
                  >
                    启用
                  </div>
                  <div
                    class="rebateDtl__line__txt"
                    v-if="rebateDtl.status == 2"
                  >
                    冻结
                  </div>
                </div>
                <div class="rebateDtl__line__item">
                  <div class="rebateDtl__line__lab">冻结原因：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.frozenReason || "--" }}
                  </div>
                </div>
                <div
                  class="rebateDtl__line__item"
                  v-if="rebateDtl.carDealersAccount"
                >
                  <div class="rebateDtl__line__lab">总额度：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.carDealersAccount.totalQuota || "--" }}
                  </div>
                </div>
                <div
                  class="rebateDtl__line__item"
                  v-if="rebateDtl.carDealersAccount"
                >
                  <div class="rebateDtl__line__lab">使用额度：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.carDealersAccount.useQuota }}
                  </div>
                </div>
                <div
                  class="rebateDtl__line__item"
                  v-if="rebateDtl.carDealersAccount"
                >
                  <div class="rebateDtl__line__lab">累计使用额度：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.carDealersAccount.cumulativeUseQuota }}
                  </div>
                </div>
                <div
                  class="rebateDtl__line__item"
                  v-if="rebateDtl.carDealersAccount"
                >
                  <div class="rebateDtl__line__lab">累计积分：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.carDealersAccount.totalRebate || "--" }}
                  </div>
                </div>
                <div
                  class="rebateDtl__line__item"
                  v-if="rebateDtl.carDealersAccount"
                >
                  <div class="rebateDtl__line__lab">使用积分：</div>
                  <div class="rebateDtl__line__txt">
                    {{ rebateDtl.carDealersAccount.useRebate }}
                  </div>
                </div>
                <div
                  class="rebateDtl__line__item"
                  v-if="rebateDtl.carDealersAccount"
                >
                  <div class="rebateDtl__line__lab">积分状态：</div>
                  <div
                    class="rebateDtl__line__txt"
                    v-if="rebateDtl.carDealersAccount.rebateStatus == 1"
                  >
                    启用
                  </div>
                  <div
                    class="rebateDtl__line__txt"
                    v-else-if="rebateDtl.carDealersAccount.rebateStatus == 2"
                  >
                    冻结
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="header"
      style="display: flex; padding-top: 50px"
      v-if="handleBtnShow[0].isShow"
    >
      <div class="headLab" style="flex: 1">积分变更列表</div>
    </div>
    <div
      class="tableContent"
      style="display: flex"
      v-if="handleBtnShow[0].isShow"
    >
      <div style="width: 100%">
        <el-table
          :data="accountDetailList"
          style="width: 100%"
          :show-header="showHeader"
        >
          <el-table-column prop="createAt" label="日期"></el-table-column>
          <el-table-column
            prop="chgTypeText"
            label="类型"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="quota"
            label="额度"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="变更原因"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { rebateDtl, rebateChg } from "@/api/rebateManage";
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
import { uploadUrl } from "@/api/upload";
export default {
  name: "RebateDtlManage",
  data() {
    return {
      showHeader: true,
      carDealersId: "",
      accountDetailList: [],
      total: 0,
      rebateDtl: {},
      headers: {},
      uploadUrl,
      labelPosition: "top",
      handleBtnFuncArr: [],
      handleBtnShow: [
        {
          btnName: "RebateChgQuery",
          isShow: false,
        },
      ],
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
      },
      tableData: [
        {
          date: "2016-05-02",
          type: "按揭积分",
          money: "￥999.00",
        },
        {
          date: "2016-05-04",
          type: "支付服务费抵扣",
          money: "￥999.00",
        },
        {
          date: "2016-05-01",
          type: "按揭积分",
          money: "￥999.00",
        },
      ],
      tableData1: [
        {
          date: "2016-05-02",
          type: "新增额度",
          money: "￥999.00",
        },
        {
          date: "2016-05-04",
          type: "额度提升",
          money: "￥999.00",
        },
        {
          date: "2016-05-01",
          type: "额度降低",
          money: "￥999.00",
        },
        {
          date: "2016-05-03",
          type: "额度降低",
          money: "￥999.00",
        },
      ],

      dialogForm: {
        headUrl: "",
        agreeOpinions: "",
        quota: "",
        status: 1,
        noAgreeOpinions: "",
      },
      rules: {
        headUrl: [{ required: true, message: "必填项", trigger: "blur" }],
        noAgreeOpinions: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        quota: [{ required: true, message: "必填项", trigger: "blur" }],
        agreeOpinions: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
      },
    };
  },
  components: {
    collapse,
  },
  created() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    this.headers = {
      _t: token,
      _u: userId,
    };
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
    this.beforeRouter = this.$route.query.beforeRouter;
    this._getRebateDtl();
    if (this.handleBtnShow[0].isShow) {
      this._getRebateChg();
    }
  },
  computed: {},
  methods: {
    async _getRebateDtl() {
      let res = await rebateDtl({
        carDealersId: this.carDealersId,
      });
      if (res.rtn == 1) {
        this.rebateDtl = res.result;
        if (this.rebateDtl.carDealersAccount) {
          if (
            this.rebateDtl.carDealersAccount.totalQuota ||
            this.rebateDtl.carDealersAccount.totalQuota == 0
          ) {
            this.rebateDtl.carDealersAccount.totalQuota = parseFloat(
              this.rebateDtl.carDealersAccount.totalQuota
            ).toFixed(2);
          }

          if (
            this.rebateDtl.carDealersAccount.useQuota ||
            this.rebateDtl.carDealersAccount.useQuota == 0
          ) {
            this.rebateDtl.carDealersAccount.useQuota = parseFloat(
              this.rebateDtl.carDealersAccount.useQuota
            ).toFixed(2);
          }

          if (
            this.rebateDtl.carDealersAccount.cumulativeUseQuota ||
            this.rebateDtl.carDealersAccount.cumulativeUseQuota == 0
          ) {
            this.rebateDtl.carDealersAccount.cumulativeUseQuota = parseFloat(
              this.rebateDtl.carDealersAccount.cumulativeUseQuota
            ).toFixed(2);
          }

          if (
            this.rebateDtl.carDealersAccount.totalRebate ||
            this.rebateDtl.carDealersAccount.totalRebate == 0
          ) {
            this.rebateDtl.carDealersAccount.totalRebate = parseFloat(
              this.rebateDtl.carDealersAccount.totalRebate
            ).toFixed(2);
          }

          if (
            this.rebateDtl.carDealersAccount.useRebate ||
            this.rebateDtl.carDealersAccount.useRebate == 0
          ) {
            this.rebateDtl.carDealersAccount.useRebate = parseFloat(
              this.rebateDtl.carDealersAccount.useRebate
            ).toFixed(2);
          }
        }
      }
    },
    picUploadSuccess(res) {
      if (res.rtn == 1) {
        this.form.picture = res.url;
      }
    },
    onBack() {
      this.$router.push({ name: this.beforeRouter });
    },
    async _getRebateChg() {
      let res = await rebateChg({
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        carDealersId: this.carDealersId,
      });
      if (res.rtn == 1) {
        res.result.accountDetailList.forEach((item, index) => {
          if (item.chgType == 11) {
            item.chgTypeText = "按揭积分";
          } else if (item.chgType == 12) {
            item.chgTypeText = "积分调整";
          } else if (item.chgType == 13) {
            item.chgTypeText = "还息抵扣";
          } else if (item.chgType == 14) {
            item.chgTypeText = "积分冻结";
          } else if (item.chgType == 15) {
            item.chgTypeText = "积分解禁";
          }
        });
        this.accountDetailList = res.result.accountDetailList;
        this.total = res.result.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.jiedian .el-form-item__label {
  color: #ee5808 !important;
}
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
.rebateDtl,
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
.rebateDtl__inner {
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
.rebateDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.userDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.rebateDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.rebateDtl__line__item {
  display: inline-block;
  width: 33.33%;
  padding-bottom: 20px;
  font-size: 14px;
}
.rebateDtl__line__lab,
.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.rebateDtl__line__txt,
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
.rebateDtl__header__orderInfo tr {
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