<template>
  <div class="app-container">
    <div class="header">
      <span class="headLab">基本信息</span>
      <el-button style="font-size:14px;float:right;padding:3px 0" type="text" @click="onBack">返回</el-button>
    </div>
    <div class="content">
      <div class="orderHeader">
        <div class="section">
          <div class="companyDtl">
            <div class="companyDtl__inner">
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">姓名：</div>
                <div class="companyDtl__line__txt">{{companyDtl.companyName}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">手机号码：</div>
                <div class="companyDtl__line__txt">{{companyDtl.contactName}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">身份证号：</div>
                <div class="companyDtl__line__txt">{{companyDtl.contactPhone}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">认证时间：</div>
                <div
                  class="companyDtl__line__txt col_red fontWei_700"
                >{{companyDtl.companyRoleName}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">认证类型：</div>
                <div class="companyDtl__line__txt">{{companyDtl.createAt || '－'}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">所属分公司：</div>
                <div
                  class="companyDtl__line__txt col_red fontWei_700"
                >{{companyDtl.province}}{{companyDtl.city}}{{companyDtl.county}}{{companyDtl.detailAddress}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">所属客服：</div>
                <div
                  class="companyDtl__line__txt col_red fontWei_700"
                >{{companyDtl.province}}{{companyDtl.city}}{{companyDtl.county}}{{companyDtl.detailAddress}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">额度：</div>
                <div
                  class="companyDtl__line__txt col_red fontWei_700"
                >{{companyDtl.province}}{{companyDtl.city}}{{companyDtl.county}}{{companyDtl.detailAddress}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">有效期：</div>
                <div
                  class="companyDtl__line__txt col_red fontWei_700"
                >{{companyDtl.province}}{{companyDtl.city}}{{companyDtl.county}}{{companyDtl.detailAddress}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">当前欠款：</div>
                <div
                  class="companyDtl__line__txt col_red fontWei_700"
                >{{companyDtl.province}}{{companyDtl.city}}{{companyDtl.county}}{{companyDtl.detailAddress}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header" style="display:flex;">
      <div class="headLab" style="flex:1;">借钱还款记录</div>
      <div class="headLab" style="flex:1;">额度变更记录</div>
    </div>
    <div class="tableContent" style="display:flex;">
      <div style="padding-right:30px;border-right:1px solid #eee;flex:1;">
        <el-table :data="tableData" style="width: 100%;" :show-header="showHeader">
          <el-table-column prop="date" label="日期" width="120"></el-table-column>
          <el-table-column prop="type" label="类型" width="120"></el-table-column>
          <el-table-column prop="money" label="金额" width="120"></el-table-column>
          <el-table-column prop="address" label="车型号"></el-table-column>
        </el-table>
      </div>
      <div style="padding-left:30px;flex:1;">
        <el-table :data="tableData1" style="width: 100%;" :show-header="showHeader">
          <el-table-column prop="date" label="日期" width="150"></el-table-column>
          <el-table-column prop="type" label="类型" width="150"></el-table-column>
          <el-table-column prop="money" label="金额" width="150"></el-table-column>
          <!-- <el-table-column label="操作" align="right">
            <el-button
              v-waves
              class="filter-item"
              type="primary"
              size="mini"
              plain
              style="height:20px;line-height:20px;padding:0 5px;"
            >查看审批</el-button>
          </el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { companyDtl } from "@/api/branchCoManage";
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
import { uploadUrl } from "@/api/upload";
export default {
  name: "QuotaDtlManage",
  data() {
    return {
      showHeader: false,
      companyId: "",
      companyDtl: {},
      headers: {},
      uploadUrl,
      labelPosition: "top",
      fileData: {
        fileType: 1
      },
      tableData: [
        {
          date: "2016-05-02",
          type: "借款",
          money: "￥999.00",
          address: "关联车辆车架号"
        },
        {
          date: "2016-05-04",
          type: "还息",
          money: "￥999.00",
          address: "关联车辆车架号"
        },
        {
          date: "2016-05-01",
          type: "还本",
          money: "￥999.00",
          address: "关联车辆车架号"
        },
        {
          date: "2016-05-03",
          type: "还本",
          money: "￥999.00",
          address: "关联车辆车架号"
        }
      ],
      tableData1: [
        {
          date: "2016-05-02",
          type: "新增额度",
          money: "￥999.00"
        },
        {
          date: "2016-05-04",
          type: "额度提升",
          money: "￥999.00"
        },
        {
          date: "2016-05-01",
          type: "额度降低",
          money: "￥999.00"
        },
        {
          date: "2016-05-03",
          type: "额度降低",
          money: "￥999.00"
        }
      ],

      dialogForm: {
        headUrl: "",
        agreeOpinions: "",
        quota: "",
        status: 1,
        noAgreeOpinions: ""
      },
      rules: {
        headUrl: [{ required: true, message: "必填项", trigger: "blur" }],
        noAgreeOpinions: [
          { required: true, message: "必填项", trigger: "blur" }
        ],
        quota: [{ required: true, message: "必填项", trigger: "blur" }],
        agreeOpinions: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }]
      }
    };
  },
  components: {
    collapse
  },
  created() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    this.headers = {
      _t: token,
      _u: userId
    };
  },
  mounted() {
    this.companyId = this.$route.query.companyId;
    console.log(this.companyId, "companyId=======");
    this.beforeRouter = this.$route.query.beforeRouter;
    // this._getCompanyDtl();
  },
  computed: {},
  methods: {
    async _getCompanyDtl() {
      let res = await companyDtl({
        companyId: this.companyId
      });
      console.log(res, "companyDtl=========");
      if (res.rtn == 1) {
        this.companyDtl = res.result;
        console.log(this.companyDtl, "--==--");
      }
    },
    picUploadSuccess(res) {
      if (res.rtn == 1) {
        this.form.picture = res.url;
      }
    },
    onBack() {
      this.$router.push({ name: this.beforeRouter });
    }
  }
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
</style>