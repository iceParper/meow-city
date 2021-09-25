<template>
  <div class="app-container">
    <!-- <div class="header">
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
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <div class="header">
      <span class="headLab">{{ title }}</span>
      <el-button
        style="font-size: 14px; float: right; padding: 3px 0"
        type="text"
        @click="onBack"
        >返回</el-button
      >
    </div>
    <el-form
      ref="dialogForm"
      :rules="rules"
      :model="dialogForm"
      :label-position="labelPosition"
      label-width="90px"
      style="width: 500px; margin: 40px 100px 60px 0"
    >
      <el-form-item
        label="资料收集（请提供真实有效的证明资料，如车商征信、资产、业务证明等））"
        prop="dataPicList"
      >
        <el-button size="small" type="primary" @click="addPic">
          新增
        </el-button>
        <template v-for="(item, index) in dialogForm.dataPicList">
          <div :key="index" style="display: flex; align-items: flex-end">
            <el-upload
              auto-upload
              class="avatar-uploader"
              :show-file-list="false"
              :headers="headers"
              :action="uploadUrl"
              :data="fileData"
              :on-success="
                (res, file) => {
                  return handleImageSuccess(res, file, index);
                }
              "
              :before-remove="beforePicRemove"
              :before-upload="
                (res, file) => {
                  return beforeImageUpload(res, file, index);
                }
              "
              accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
            >
              <i
                v-if="item.isUpload == 'isLoading'"
                class="el-icon-loading avatar-uploader-icon"
              ></i>
              <div v-else>
                <img v-if="item.dataUrl" :src="item.dataUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </el-upload>
            <el-input
              placeholder="图片名称"
              v-model="item.fileName"
              style="width: 200px; margin: 12px 10px"
              class="sku-block-formEle"
              :maxlength="16"
            ></el-input>
            <el-button
              size="small"
              type="primary"
              v-if="dialogForm.dataPicList.length > 1"
              @click="delPic(index)"
              style="margin: 12px 0"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-form-item>
      <el-form-item
        label="pdf文件（请提供真实有效的证明资料，如车商征信、资产、业务证明等）"
        prop="dataPdfList"
      >
        <el-button
          size="small"
          type="primary"
          @click="addPdf"
          style="margin-bottom: 8px"
        >
          新增
        </el-button>

        <template v-for="(item, index) in dialogForm.dataPdfList">
          <div :key="index">
            <div style="display: flex">
              <el-upload
                auto-upload
                :ref="`upload${index}`"
                :headers="headers"
                :action="uploadUrl"
                :data="fileData"
                :on-preview="handlePreview"
                :file-list="item.pdfFileList"
                :before-upload="
                  (res, file) => {
                    return beforePdfUpload(res, file, index);
                  }
                "
                :on-success="
                  (res, file) => {
                    return handlePdfSuccess(res, file, index);
                  }
                "
                accept=".pdf,.PDF"
                :before-remove="beforePdfRemove"
                :on-remove="
                  (res, file) => {
                    return pdfRemove(res, file, index);
                  }
                "
                :on-exceed="handleExceed"
              >
                <div
                  v-if="item.dataUrl"
                  style="display: flex; align-items: center"
                >
                  <el-button size="small" type="primary">
                    <span> 点击修改 </span>
                  </el-button>
                </div>
                <el-button size="small" type="primary" v-else
                  >点击上传</el-button
                >
              </el-upload>
            </div>

            <el-input
              placeholder="pdf名称"
              v-model="item.fileName"
              style="width: 200px; margin: 10px 0"
              class="sku-block-formEle"
              :maxlength="16"
            ></el-input>
            <el-button
              size="small"
              type="primary"
              v-if="dialogForm.dataPdfList.length > 1"
              @click="delPdf(index)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="借款申请" prop="remarks" style="width: 100%">
        <el-input
          v-model="dialogForm.remarks"
          type="textarea"
          :rows="3"
          placeholder="申请描述"
        />
      </el-form-item>
      <div style="display: flex">
        <el-form-item label="车架号" prop="carId" style="width: 100%; flex: 1">
          <el-select
            v-model="dialogForm.carId"
            placeholder="车架号"
            clearable
            style="width: 230px"
            class="filter-item"
          >
            <el-option
              v-for="item in carSelList"
              :key="item.carId"
              :label="item.carNo"
              :value="item.carId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="估价"
          prop="assessedPrice"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.assessedPrice"
            placeholder="车辆评估价格"
            style="width: 230px"
          />
        </el-form-item>
      </div>

      <div style="display: flex; align-items: center">
        <el-form-item
          label="审批额度"
          prop="loanMoney"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.loanMoney"
            placeholder="审批额度"
            style="width: 230px"
          />
        </el-form-item>
        <el-form-item
          label="放贷类型"
          prop="paymentFundsType"
          style="width: 100%; flex: 1"
        >
          <el-switch
            style="display: block"
            v-model="dialogForm.paymentFundsType"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#13ce66"
            active-text="联合资金"
            inactive-text="自有资金"
          >
          </el-switch>
        </el-form-item>
      </div>

      <div style="display: flex">
        <el-form-item
          label="借款账号名"
          prop="loanBankUserName"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.loanBankUserName"
            placeholder="借款账号名"
            style="width: 230px"
          />
        </el-form-item>
        <el-form-item
          label="借款类型"
          prop="loanType"
          style="width: 100%; flex: 1"
        >
          <el-radio v-model="dialogForm.loanType" label="1">卖方</el-radio>
          <el-radio v-model="dialogForm.loanType" label="2">车商</el-radio>
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item
          label="银行卡号"
          prop="loanBankCard"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.loanBankCard"
            placeholder="银行卡号"
            style="width: 230px"
          />
        </el-form-item>
        <el-form-item
          label="开户银行"
          prop="loanBankName"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.loanBankName"
            placeholder="开户银行"
            style="width: 230px"
          />
        </el-form-item>
      </div>

      <el-form-item
        label="期望打款时间"
        prop="hopePaymentAt"
        style="width: 100%; flex: 1"
      >
        <el-date-picker
          v-model="dialogForm.hopePaymentAt"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          :picker-options="pickerOptions"
          style="width: 230px"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div
      class="dialog-footer"
      style="display: flex; justify-content: center; width: 500px"
    >
      <el-button @click="onCancel" style="width: 150px; margin-right: 60px"
        >取消</el-button
      >
      <el-button type="primary" style="width: 150px" @click="onSubmit"
        >提交审批</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  carSelList,
  applyBorrowMoney,
  editApplyBorrowMoney,
  applyBorrowMoneyDtl,
} from "@/api/borrowMoneyManage";
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";

import collapse from "@/utils/collapse";
import { uploadUrl } from "@/api/upload";
export default {
  name: "AddBorrowMoneyManage",
  data() {
    const isNum = (rule, value, callback) => {
      const num = /^[0-9]*$/;
      if (!!value && value == 0) {
        callback(new Error("不能为0"));
      } else if (!value.toString()) {
        callback(new Error("必填项"));
      } else if (!num.test(value)) {
        callback(new Error("只能为数字"));
      } else {
        callback();
      }
    };
    const isNum1 = (rule, value, callback) => {
      const num = /^\d+(?:\.\d{1,4})?$/;
      if (!!value && value == 0) {
        callback(new Error("不能为0"));
      } else if (!value.toString()) {
        callback(new Error("必填项"));
      } else if (!num.test(value)) {
        callback(new Error("只能为数字"));
      } else {
        callback();
      }
    };
    return {
      title: "新建借款",
      canEdit: false,
      companyId: "",
      companyDtl: {},
      headers: {},
      uploadUrl,
      labelPosition: "top",
      fileData: {
        fileType: "loan",
      },
      carSelList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      radio1: "半小时内",
      dialogForm: {
        dataPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        dataPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        paymentFundsType: 1,
        remarks: "",
        loanMoney: "",
        assessedPrice: "",
        loanBankUserName: "",
        loanBankCard: "",
        loanBankName: "",
        hopePaymentAt: "",
        loanType: "1",
        carId: "",
      },
      rules: {
        dataPicList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
        loanMoney: [{ required: true, validator: isNum1, trigger: "blur" }],
        remarks: [{ required: true, message: "必填项", trigger: "blur" }],
        assessedPrice: [{ required: true, validator: isNum1, trigger: "blur" }],
        loanBankUserName: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        paymentFundsType: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        loanBankCard: [{ required: true, validator: isNum, trigger: "blur" }],
        loanBankName: [{ required: true, message: "必填项", trigger: "blur" }],
        hopePaymentAt: [{ required: true, message: "必填项", trigger: "blur" }],
        loanType: [{ required: true, message: "必填项", trigger: "blur" }],
        carId: [{ required: true, message: "必填项", trigger: "blur" }],
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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.companyId = userInfo.companyId;

    this.beforeRouter = this.$route.query.beforeRouter;
    if (this.$route.query.canEdit) {
      this.canEdit = JSON.parse(this.$route.query.canEdit);
    }

    if (this.$route.query.workflowId) {
      this.workflowId = this.$route.query.workflowId;
    }

    if (this.canEdit) {
      this.type = "update";
      this.title = "修改借款";
      document.title = "修改借款";
      this.$route.meta.title = "修改借款";
    } else {
      this.type = "add";
      this.title = "新建借款";
      document.title = "新建借款";
      this.$route.meta.title = "新建借款";
    }
  },
  mounted() {
    this.beforeRouter = this.$route.query.beforeRouter;
    this.getCarSelList();
    if (this.canEdit) {
      this.getApplyBorrowMoneyDtl();
    }
  },
  computed: {},
  methods: {
    async getApplyBorrowMoneyDtl() {
      let res = await applyBorrowMoneyDtl({
        workflowId: this.workflowId,
      });

      if (res.rtn == 1) {
        const {
          dataPicList,
          dataPdfList,
          remarks,
          assessedPrice,
          loanMoney,
          loanBankUserName,
          loanType,
          loanBankCard,
          loanBankName,
          hopePaymentAt,
          carId,
          applyId,
          paymentFundsType
        } = res.result.auditObject.loanApplyInfo;

        console.log(applyId,'-------');

        if (dataPicList && dataPicList.length > 0) {
          dataPicList.forEach((item, index) => {
            item.isUpload = undefined;
          });
        }

        this.dialogForm = {
          dataPicList:
            dataPicList && dataPicList.length > 0
              ? dataPicList
              : [
                  {
                    dataUrl: undefined,
                    originalPicUrl: undefined,
                    fileName: undefined,
                    isUpload: undefined,
                  },
                ],
          dataPdfList:
            dataPdfList && dataPdfList.length > 0
              ? dataPdfList
              : [
                  {
                    dataUrl: undefined,
                    fileName: undefined,
                  },
                ],
          paymentFundsType,
          remarks,
          applyId,
          assessedPrice,
          loanMoney,
          loanBankUserName,
          loanType: loanType.toString(),
          loanBankCard,
          loanBankName,
          hopePaymentAt,
          carId,
        };

        console.log(this.dialogForm.applyId,'applyId');

        if (dataPdfList && dataPdfList.length > 0) {
          this.dialogForm.dataPdfList.forEach((item, index) => {
            var pdfJson = {};
            item.pdfFileList = [];
            pdfJson.name = "pdf" + item.fileName;
            pdfJson.url = item.dataUrl;
            item.pdfFileList.push(pdfJson);
          });
        }
      }
    },
    async getCarSelList() {
      let res = await carSelList({
        companyId: this.companyId,
        auditStatus: 2,
        loanStatus: 0,
      });
      if (res.rtn == 1) {
        this.carSelList = res.carList;
      }
    },
    beforeDetailRemove(file) {
      return this.$confirm(`确定移除${file.name || "该图片"}？`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onCancel() {
      if (!this.canEdit) {
        this.resetForm();
      }
    },
    onBack() {
      this.$router.back(-1);
    },
    onSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          const form = { ...this.dialogForm };
          const isNotPic = form.dataPicList.some((item, index) => {
            if (!item.dataUrl || !item.fileName || item.fileName.trim() == "") {
              return true;
            }
          });

          if (form.dataPdfList.length == 1) {
            if (!form.dataPdfList[0].dataUrl && !form.dataPdfList[0].fileName) {
              form.dataPdfList = undefined;
            }
          }

          if (form.dataPdfList && form.dataPdfList.length > 0) {
            if (form.dataPdfList.length == 1) {
              var isNotPdf = form.dataPdfList.some((item, index) => {
                if (
                  (!item.dataUrl && item.fileName) ||
                  ((!item.fileName || item.fileName.trim() == "") &&
                    item.dataUrl)
                ) {
                  return true;
                }
              });
            } else {
              var isNotPdf = form.dataPdfList.some((item, index) => {
                if (
                  !item.dataUrl ||
                  !item.fileName ||
                  item.fileName.trim() == ""
                ) {
                  return true;
                }
              });
            }
          }

          if (isNotPic) {
            this.$message.warning("图片数据缺少");
            return false;
          }

          if (isNotPdf) {
            this.$message.warning("pdf数据缺少");
            return false;
          }

          form.dataPicList.forEach((item, index) => {
            delete item.isUpload;
          });

          if (form.dataPdfList) {
            var dataPdfListCopy = JSON.parse(JSON.stringify(form.dataPdfList));

            dataPdfListCopy.forEach((item, index) => {
              if (item.pdfFileList) {
                delete item.pdfFileList;
              }
            });
          }

          this.listLoading = true;
          const paramsData = {
            dataPicList: form.dataPicList,
            dataPdfList: form.dataPdfList,
            remarks: form.remarks,
            loanMoney: form.loanMoney,
            assessedPrice: form.assessedPrice,
            loanBankUserName: form.loanBankUserName,
            loanBankCard: form.loanBankCard,
            loanBankName: form.loanBankName,
            paymentFundsType: form.paymentFundsType,
            hopePaymentAt: formatDate(new Date(form.hopePaymentAt)),
            loanType: form.loanType,
            carId: form.carId,
            applyId: form.applyId,
          };

          console.log(paramsData.applyId,'=====');

          if (!this.canEdit) {
            let res = await applyBorrowMoney(paramsData);
            if (res.rtn == 1) {
              this.$message.success("创建成功!");
              // this.resetForm();
              this.onBack();
            }
          } else {
            let res = await editApplyBorrowMoney(paramsData);
            if (res.rtn == 1) {
              this.$message.success("修改成功!");
              // this.resetForm();
              this.onBack();
            }
          }

          this.listLoading = false;
        }
      });
    },
    resetForm() {
      this.$refs["dialogForm"].clearValidate();
      this.dialogForm = {
        dataPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        dataPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        paymentFundsType: 1,
        remarks: "",
        loanMoney: "",
        assessedPrice: "",
        loanBankUserName: "",
        loanBankCard: "",
        loanBankName: "",
        hopePaymentAt: "",
        loanType: "1",
        carId: "",
      };
      this.$refs["upload0"][0].clearFiles();
    },
    handleImageSuccess(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm.dataPicList[index].dataUrl = res.thumbnailUrl;
        this.dialogForm.dataPicList[index].originalPicUrl = res.url;
        this.dialogForm.dataPicList[index].isUpload = "isLoaded";
      }
    },
    handlePdfSuccess(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm.dataPdfList[index].dataUrl = res.url;
        this.dialogForm.dataPdfList[index].pdfFileList = [
          {
            name: file.raw.name,
            url: this.dialogForm.dataPdfList[index].dataUrl,
          },
        ];
      }
    },
    beforeImageUpload(res, file, index) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      this.dialogForm.dataPicList[index].isUpload = "isLoading";
    },
    beforePdfUpload(res, file, index) {
      // this.$refs[`upload${index}`][0].clearFiles();
      delete this.dialogForm.dataPdfList[index].pdfFileList;
    },
    beforePicRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    addPic() {
      let dataPicList = this.dialogForm.dataPicList;
      // console.log(dataPicList)
      if (dataPicList.length > 0) {
        dataPicList.unshift({
          dataUrl: undefined,
          fileName: undefined,
          isUpload: undefined,
        });
        this.dialogForm.dataPicList = dataPicList;
      }
    },
    addPdf() {
      let dataPdfList = this.dialogForm.dataPdfList;
      // console.log(dataPicList)
      if (dataPdfList.length > 0) {
        dataPdfList.unshift({
          dataUrl: undefined,
          fileName: undefined,
        });
        this.dialogForm.dataPdfList = dataPdfList;
      }
    },
    delPic(index) {
      let dataPicList = this.dialogForm.dataPicList;
      if (dataPicList.length > 1) {
        dataPicList.splice(index, 1);
        this.dialogForm.dataPicList = dataPicList;
      }
    },
    delPdf(index) {
      let dataPdfList = this.dialogForm.dataPdfList;
      if (dataPdfList.length > 1) {
        dataPdfList.splice(index, 1);
        this.dialogForm.dataPdfList = dataPdfList;
      }
      this.$refs[`upload${index}`][0].clearFiles();
    },
    handlePreview(file) {
      window.open(file.response.url);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    beforePdfRemove(file) {
      return this.$confirm(`确定移除${file.name || "该pdf"}？`);
    },
    pdfRemove(res, file, index) {
      console.log(res, "=====");
      if (res.status == "success") {
        this.dialogForm.dataPdfList[index].dataUrl = undefined;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.jiedian .el-dialogForm-item__label {
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
  width: 230px;
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
  transdialogform: rotate(-360deg);
  transition: all 1s;
}
.arrowDown {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
  transdialogform: rotate(-180deg);
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
.avatar-uploader {
  margin-top: 8px;
  .avatar {
    width: 120px;
    height: 120px;
    vertical-align: middle;
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
.addPriceStyle.el-input-group--append /deep/ .el-input__inner {
  color: crimson;
}
</style>
<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
</style>