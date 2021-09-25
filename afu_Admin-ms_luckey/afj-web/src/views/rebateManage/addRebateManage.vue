<template>
  <div class="app-container">
    <div class="header">
      <span class="headLab">积分申请</span>
    </div>
    <el-form
      ref="dialogForm"
      :rules="rules"
      :model="dialogForm"
      :label-position="labelPosition"
      label-width="90px"
      style="width:500px;margin:40px 100px 60px 0;"
    >
      <div style="display:flex;">
        <el-form-item label="当前审批节点" class="jiedian">
          <span>客服申请</span>
        </el-form-item>
      </div>
      <el-form-item label="按揭金额" prop="money" style="width:40%;">
        <el-input v-model="dialogForm.money" placeholder="按揭金额" />
      </el-form-item>
      <el-form-item label="按揭流水号" prop="serialNum" style="width:40%;">
        <el-input v-model="dialogForm.serialNum" placeholder="按揭流水号" />
      </el-form-item>

      <el-form-item label="资料收集（请提供真实有效的证明资料，如车商征信、资产、业务证明等））" prop="headUrl">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          list-type="picture-card"
          :show-file-list="false"
          :headers="headers"
          :data="fileData"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
          :on-success="picUploadSuccess"
        >
          <img
            v-if="dialogForm.headUrl"
            :src="dialogForm.headUrl"
            class="el-upload-list__item-thumbnail"
            style="width: 100%;height: 100%;"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="积分车商" prop="agreeOpinions" style="width:40%;">
        <el-input v-model="dialogForm.agreeOpinions" placeholder="积分车商" />
      </el-form-item>
      <el-form-item label="申请意见" prop="agreeOpinions" style="width:100%;">
        <el-input v-model="dialogForm.agreeOpinions" type="textarea" :rows="3" placeholder="积分车商" />
      </el-form-item>
    </el-form>
    <div class="dialog-footer" style="display:flex;justify-content: center;width:500px;">
      <el-button @click="dialogFormVisible = false" style="width:150px;margin-right:60px;">取消</el-button>
      <el-button type="primary" style="width:150px;">提交审批</el-button>
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
  name: "AddRebateManage",
  data() {
    return {
      companyId: "",
      companyDtl: {},
      headers: {},
      uploadUrl,
      labelPosition: "top",
      fileData: {
        fileType: 1
      },
      dialogForm: {
        money: undefined,
        serialNum: undefined,
        headUrl: undefined
      },
      rules: {
        money: [{ required: true, message: "必填项", trigger: "blur" }],
        serialNum: [{ required: true, message: "必填项", trigger: "blur" }],
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
  width: 20%;
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