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
      :rules="rules"
      style="width: calc(100% - 600px); margin-left:240px;"
    >
      <el-form-item label="会员级别" prop="lever">
        <el-input placeholder="会员名称" v-model="form.lever" :maxlength="16" />
      </el-form-item>
      <el-form-item label="会员描述" prop="memberDesc">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="会员描述"
          v-model="form.memberDesc"
          :maxlength="16"
        />
      </el-form-item>
      <el-form-item label="全局应用" prop="applyAll">
        <el-switch v-model="form.applyAll" @change="_getAllpyAllVal"></el-switch>
      </el-form-item>
      <el-form-item label="折扣规则" :required="true" v-if="!form.applyAll">
        <div v-for="(rule, index) in form.ruleList" :key="index">
          <el-form-item>
            <el-input style="width:200px;" v-model="rule.discount" placeholder="折扣"></el-input>
            <el-button
              type="primary"
              @click="deleteRuleClick(index)"
              v-if="form.ruleList.length > 1"
            >删除规则</el-button>
            <br />
          </el-form-item>
          <el-form-item>
            <el-select v-model="rule.brandUuid" style="width: 200px" placeholder="品牌">
              <el-option
                v-for="item in brandSelList"
                :key="item.brandUuid"
                :label="item.brandName"
                :value="item.brandUuid"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="rule.priceType" style="width: 200px" placeholder="价格类型">
              <el-option
                v-for="item in dataOptions"
                :key="item.id"
                :label="item.lab"
                :value="item.val"
              />
            </el-select>
          </el-form-item>
        </div>
        <el-button type="primary" @click="addRuleClick">新增规则</el-button>
      </el-form-item>
      <el-form-item label="折扣规则" :required="true" v-else>
        <el-input style="width:200px;" v-model="form.globalDiscount" placeholder="折扣"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="isActive">
        <el-switch v-model="form.isActive"></el-switch>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="onSubmit" style="margin-right:20px;">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { memberAdd } from "@/api/sysManage";
import { brandSelList } from "@/api/brandManage";
import { Select } from "element-ui";

export default {
  name: "SysMemberAddManage",
  data() {
    return {
      listLoading: false,
      title: "新建会员",
      brandSelList: [],
      dataOptions: [
        { id: 0, lab: "全部", val: 3 },
        { id: 1, lab: "正价", val: 1 },
        { id: 2, lab: "特价", val: 2 }
      ],
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
      },
      rules: {
        lever: [{ required: true, message: "必填项", trigger: "blur" }],
        memberDesc: [{ required: true, message: "必填项", trigger: "blur" }],
        globalDiscount: [
          { required: true, message: "必填项", trigger: "blur" }
        ],
        applyAll: [{ required: true, message: "必填项", trigger: "blur" }],
        isActive: [{ required: true, message: "必填项", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getBrandList();
  },
  methods: {
    async getBrandList(index) {
      let res = await brandSelList({});
      if (res.rtn == 1) {
        this.brandSelList = res.brandList;
      }
    },
    onCancel() {
      this.resetForm();
    },
    onBack() {
      this.$router.back(-1);
    },
    onSubmit() {
      const form = { ...this.form };
      form.applyAll = this.form.applyAll ? 0 : 1;
      form.isActive = this.form.isActive ? 0 : 1;
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          let ruleList = this.form.ruleList;
          if (this.applyAll == 1) {
            let a = ruleList.every(item => {
              return item.discount != "";
            });
            let b = ruleList.every(item => {
              return item.brandUuid != "";
            });
            let c = ruleList.every(item => {
              return item.priceType != "";
            });

            if (!a) {
              this.$message.error("折扣不能为空");
              return false;
            } else if (!b) {
              this.$message.error("品牌不能为空");
              return false;
            } else if (!c) {
              this.$message.error("价格类型不能为空");
              return false;
            }
          } else {
            var findSame = false;
            this.form.globalDiscount = undefined;
            for (var i = 0; i < ruleList.length; i++) {
              for (var j = i + 1; j < ruleList.length; j++) {
                if (
                  ruleList[i].brandUuid == ruleList[j].brandUuid &&
                  ruleList[i].priceType == ruleList[j].priceType
                ) {
                  findSame = true;
                  this.$message.warning("同一品牌,价格类型相同");
                  break;
                }
              }
              if (findSame) break;
            }
            if (findSame) {
              return false;
            }
          }

          this.listLoading = true;
          let res = await memberAdd({
            ...form
          });
          if (res.rtn == 1) {
            this.$message.success("创建成功!");
            this.resetForm();
          }
          this.listLoading = false;
        }
      });
    },
    resetForm() {
      this.$refs["dataForm"].clearValidate();
      this.form = {
        lever: "",
        memberDesc: "",
        globalDiscount: "",
        applyAll: false,
        isActive: false,
        ruleList: [
          {
            discount: "",
            brandUuid: "",
            priceType: ""
          }
        ]
      };
    },
    addRuleClick() {
      this.form.ruleList.push({
        // 折扣规则
        discount: "",
        priceType: "",
        brandUuid: ""
      });
    },
    deleteRuleClick(index) {
      if (this.form.ruleList.length <= 1) {
        return;
      }
      this.form.ruleList.splice(index, 1);
    },
    _getAllpyAllVal(val) {
      if (val) {
        this.form.ruleList = undefined;
        this.form.globalDiscount = "";
      } else {
        this.form.globalDiscount = undefined;
        this.form.ruleList = [{ discount: "", priceType: "", brandUuid: "" }];
      }
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
