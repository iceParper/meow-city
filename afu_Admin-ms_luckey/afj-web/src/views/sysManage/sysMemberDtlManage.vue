<template>
  <div class="app-container">
    <div class="header">
      <div class="clearfix headLab">
        <span style="font-size:16px;">{{title}}</span>
        <el-button
          style="float: right; padding: 3px 0;font-size:14px;"
          type="text"
          @click="onBack"
        >返回</el-button>
      </div>
    </div>
    <el-form
      ref="dataForm"
      :model="form"
      label-position="right"
      label-width="120px"
      v-loading="listLoading"
      style="width: calc(100% - 600px); margin-left:240px;"
    >
      <el-form-item label="会员级别">
        <div>{{form.lever}}</div>
      </el-form-item>
      <el-form-item label="会员描述">
        <div>{{form.memberDesc}}</div>
      </el-form-item>
      <el-form-item label="折扣规则" v-if="!form.globalDiscount">
        <div v-for="(rule, index) in form.memberBrandList" :key="index">
          <el-form-item>
            <div>折扣：{{rule.discount}}</div>
          </el-form-item>
          <el-form-item>
            <div>品牌：{{rule.brandName}}</div>
          </el-form-item>
          <el-form-item v-if="rule.priceType == 3">
            <div>价格类型：全部</div>
          </el-form-item>
          <el-form-item v-else-if="rule.priceType == 2">
            <div>价格类型：特价</div>
          </el-form-item>
          <el-form-item v-else-if="rule.priceType == 1">
            <div>价格类型：正价</div>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="折扣规则" v-else>
        <div>{{form.globalDiscount}}</div>
      </el-form-item>
      <el-form-item label="状态">
        <div>{{form.isActive == 0 ? '启用' : '冻结'}}</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { memberDtl } from "@/api/sysManage";

export default {
  name: "SysMemberDtlManage",
  data() {
    return {
      listLoading: false,
      title: "会员详情",
      memberUuid: "",
      form: {
        lever: "",
        memberDesc: "",
        globalDiscount: undefined,
        applyAll: false,
        isActive: false,
        ruleList: [
          {
            discount: "",
            brandUuid: "",
            priceType: ""
          }
        ]
      }
    };
  },
  created() {
    this.memberUuid = this.$route.query.memberUuid;
  },
  mounted() {
    this.getDtl();
  },
  methods: {
    async getDtl() {
      let res = await memberDtl({
        memberUuid: this.memberUuid
      });
      this.form = res.result;
    },
    onBack() {
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  margin: 0 40px;
}
.header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 40px;
}
.headLab {
  font-size: 16px;
  font-weight: 500;
  color: #999;
}
.sku-block {
  margin-bottom: 8px;
  .sku-block-formEle {
    margin-right: 8px;
  }
  .sku-block-inputs {
    display: flex;
    flex-wrap: wrap;
    .sku-block-formEle {
      margin-top: 8px;
    }
  }
  .avatar-uploader {
    margin-top: 8px;
    .avatar {
      width: 120px;
      height: 120px;
    }
  }
  .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
  }
}
.addPriceStyle.el-input-group--append /deep/ .el-input__inner {
  color: crimson;
}
</style>

<style>
