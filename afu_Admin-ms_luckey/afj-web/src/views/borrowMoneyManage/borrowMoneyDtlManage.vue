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
        <span class="headLab">借款详情</span>
      </div>
      <div class="content">
        <div class="orderHeader">
          <div class="section">
            <div class="borrowMoneyDtl">
              <div class="borrowMoneyDtl__inner">
                <div class="borrowMoneyDtl__line__item">
                  <div class="borrowMoneyDtl__line__lab">姓名：</div>
                  <div
                    class="borrowMoneyDtl__line__txt"
                    v-if="borrowMoneyDtl.carDealersInfo"
                  >
                    {{ borrowMoneyDtl.carDealersInfo.carDealersName }}
                  </div>
                </div>
                <div class="borrowMoneyDtl__line__item">
                  <div class="borrowMoneyDtl__line__lab">手机号码：</div>
                  <div
                    class="borrowMoneyDtl__line__txt"
                    v-if="borrowMoneyDtl.carDealersInfo"
                  >
                    {{ borrowMoneyDtl.carDealersInfo.carDealersPhone }}
                  </div>
                </div>
                <div class="borrowMoneyDtl__line__item">
                  <div class="borrowMoneyDtl__line__lab">身份证号：</div>
                  <div
                    class="borrowMoneyDtl__line__txt"
                    v-if="borrowMoneyDtl.carDealersInfo"
                  >
                    {{ borrowMoneyDtl.carDealersInfo.authIdCard }}
                  </div>
                </div>
                <div class="borrowMoneyDtl__line__item">
                  <div class="borrowMoneyDtl__line__lab">认证时间：</div>
                  <div
                    class="borrowMoneyDtl__line__txt"
                    v-if="borrowMoneyDtl.carDealersInfo"
                  >
                    {{ borrowMoneyDtl.carDealersInfo.authAt }}
                  </div>
                </div>
                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.carDealersInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">认证类型：</div>
                  <div
                    class="borrowMoneyDtl__line__txt"
                    v-if="borrowMoneyDtl.carDealersInfo.authIdentifyType == 2"
                  >
                    手机号
                  </div>
                  <div
                    class="borrowMoneyDtl__line__txt"
                    v-else-if="
                      borrowMoneyDtl.carDealersInfo.authIdentifyType == 3
                    "
                  >
                    银行卡
                  </div>
                  <div v-else class="borrowMoneyDtl__line__txt">--</div>
                </div>

                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.companyInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">所属分公司：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.companyInfo.companyName }}
                  </div>
                </div>
                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.custmageInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">所属客服：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.custmageInfo.custmagerName }}
                  </div>
                </div>
                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.carDealersAccountInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">总额度：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.carDealersAccountInfo.totalQuota }}
                  </div>
                </div>
                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.carDealersAccountInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">已用额度：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.carDealersAccountInfo.useQuota }}
                  </div>
                </div>

                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.loanAppylInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">借款金额：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.loanAppylInfo.loanMoney }}
                  </div>
                </div>
                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.loanAppylInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">借款服务费比例：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.loanAppylInfo.loanRate }}
                  </div>
                </div>

                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.loanAppylInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">抵押比例：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.loanAppylInfo.mortgage_ratio }}
                  </div>
                </div>

                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.loanAppylInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">最短计息周期：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.loanAppylInfo.minInterestPeriodDay }}
                  </div>
                </div>

                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.loanAppylInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">累计还本金额：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.loanAppylInfo.cumulativeCapital }}
                  </div>
                </div>

                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.loanAppylInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">累计还息金额：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.loanAppylInfo.cumulativeInterest }}
                  </div>
                </div>

                <div
                  class="borrowMoneyDtl__line__item"
                  v-if="borrowMoneyDtl.carInfo"
                >
                  <div class="borrowMoneyDtl__line__lab">财务打款时间：</div>
                  <div class="borrowMoneyDtl__line__txt">
                    {{ borrowMoneyDtl.carInfo.paymentAt }}
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
        <span class="headLab">本单还款计划及实际还款</span>
      </div>
      <div class="tableContent" style="display: flex; width: 100%">
        <div style="border-right: 1px solid #fff; flex: 1">
          <el-table
            :data="borrowMoneyDtl.repaymentPlanList"
            style="width: 85%"
            :show-header="showHeader"
            :row-class-name="tableRowClassName"
            fit
            highlight-current-row
            class="leftText-table"
          >
            <el-table-column label="计划还款名称" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.planName || "--" }}</div>
              </template>
            </el-table-column>
            <el-table-column label="计划还款时间" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.planAt || "--" }}</div>
              </template>
            </el-table-column>
            <el-table-column label="类型" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.planTypeText || "--" }}</div>
              </template>
            </el-table-column>
            <el-table-column label="应还本金" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.capital || "--" }}</div>
              </template>
            </el-table-column>
            <el-table-column label="实还本金" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.actualCapital || "--" }}</div>
              </template>
            </el-table-column>

            <el-table-column label="应还服务费" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.interest || "--" }}</div>
              </template>
            </el-table-column>
            <el-table-column label="实还服务费" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.actualInterest || "--" }}</div>
              </template>
            </el-table-column>

            <el-table-column label="平台服务费" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.platformFee || "--" }}</div>
              </template>
            </el-table-column>

            <el-table-column label="积分抵扣" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.rebateDeduction || "--" }}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column label="最后还款时间" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.lastRepaymentAt || "--" }}</div>
              </template>
            </el-table-column> -->
            <el-table-column label="实际还款时间" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.repaymentAt || "--" }}</div>
              </template>
            </el-table-column>
            <el-table-column label="审核状态" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.auditStatusText || "--" }}</div>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
              <template slot-scope="{ row }">
                <div>{{ row.remarks || "--" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              align="center"
              width="180"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="{ row }">
                <el-button
                  style="padding: 7px 0"
                  class="filter-item"
                  type="primary"
                  size="mini"
                  v-if="
                    handleBtnShow[1].isShow &&
                    row.planType != 1 &&
                    row.auditStatus == 0
                  "
                  @click="handlePayment(row)"
                  >线下还款</el-button
                >
                <el-button
                  style="padding: 7px 0"
                  class="filter-item"
                  type="primary"
                  size="mini"
                  v-if="
                    handleBtnShow[3].isShow &&
                    row.planType != 1 &&
                    row.auditStatus == 3
                  "
                  @click="handleEdit(row)"
                  >重新还款</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="font-size: 14px; color: #666; padding-top: 20px">
        {{ borrowMoneyDtl.loanDescription }}
      </div>
    </div>

    <el-dialog title="还款申请" :visible.sync="dialogFormVisible" center>
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 90px"
      >
        <el-form-item label="还款时间" prop="repaymentAt">
          <el-date-picker
            v-model="dialogForm.repaymentAt"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <div v-if="planAt">(计划还款时间：{{ planAt }})</div>
        </el-form-item>
        <el-form-item label="实际还款本金" prop="actualCapital">
          <el-input
            v-model="dialogForm.actualCapital"
            placeholder="实际还款本金"
          />
          <div>(应还款金额：{{ capital || "0.00" }})</div>
        </el-form-item>
        <el-form-item label="实际还款服务费" prop="actualInterest">
          <el-input
            v-model="dialogForm.actualInterest"
            placeholder="实际还款服务费"
          />
          <div>(应还服务费：{{ interest || "0.00" }})</div>
        </el-form-item>
        <el-form-item label="抵扣金额" prop="rebateDeduction">
          <el-input
            v-model="dialogForm.rebateDeduction"
            placeholder="抵扣金额"
          />
          <div>(剩余积分：{{ lastRebate || "0.00" }})</div>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            v-model="dialogForm.remarks"
            type="textarea"
            placeholder="备注"
          />
        </el-form-item>
        <el-form-item label="资料收集（请提供还款截图信息）" prop="dataPicList">
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
        <el-form-item label="pdf文件（请提供还款截图信息）" prop="dataPdfList">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitPayment">确定</el-button>
        <el-button @click="cancelPayment">取消</el-button>
      </div>
    </el-dialog>
    <div style="height: 1000px; padding-top: 50px">
      <iframe
        :src="signUrl"
        scrolling="no"
        style="width: 100%; height: 100%"
      ></iframe>
    </div>
  </div>
</template>
<script>
import { borrowMoneyDtl } from "@/api/borrowMoneyManage";
import {
  repaymentPlanApply,
  repaymentApplyDtl,
  editRepaymentApply,
} from "@/api/borrowMoneyManage";
import { uploadUrl } from "@/api/upload";
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils/index";
import collapse from "@/utils/collapse";
export default {
  name: "BorrowMoneyDtlManage",
  data() {
    const isNum1 = (rule, value, callback) => {
      const num = /^\d+(?:\.\d{1,4})?$/;
      if (!value.toString()) {
        callback(new Error("必填项"));
      } else if (!num.test(value)) {
        callback(new Error("只能为数字"));
      } else {
        callback();
      }
    };

    return {
      canEdit: false,
      capital: "",
      planAt: "",
      interest: "",
      lastRebate: "",
      signUrl: undefined,
      showHeader: true,
      directives: { waves },
      carId: "",
      borrowMoneyDtl: {},
      headers: {},
      handleBtnFuncArr: [],
      labelPosition: "top",
      uploadUrl,
      headers: {},
      fileData: {
        fileType: "repayment",
      },
      rules: {
        remarks: [{ required: true, message: "必填项", trigger: "blur" }],
        dataPicList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
        repaymentAt: [{ required: true, message: "必填项", trigger: "blur" }],
        actualCapital: [{ required: true, validator: isNum1, trigger: "blur" }],
        actualInterest: [
          { required: true, validator: isNum1, trigger: "blur" },
        ],
        rebateDeduction: [
          { required: true, validator: isNum1, trigger: "blur" },
        ],
      },
      downloadLoading: false,
      dialogFormVisible: false,
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
      dialogForm: {
        planId: "",
        remarks: "",
        repaymentAt: "",
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
        actualCapital: "",
        actualInterest: "",
        rebateDeduction: "",
      },
      labelPosition: "top",
      handleBtnShow: [
        {
          btnName: "RepaymentPlanQuery",
          isShow: false,
        },
        {
          btnName: "RepaymentApply",
          isShow: false,
        },
        {
          btnName: "RepaymentApplyDetail",
          isShow: false,
        },
        {
          btnName: "RepaymentApplyModify",
          isShow: false,
        },
      ],
    };
  },
  components: {
    collapse,
  },
  created() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    this.handleBtnFuncArr = JSON.parse(localStorage.getItem("functionList"));
    this.handleBtnFuncArr.forEach((item, index) => {
      this.handleBtnShow.forEach((val, idx) => {
        if (item == val.btnName) {
          val.isShow = true;
        }
      });
    });
    console.log(this.handleBtnShow);
    this.headers = {
      _t: token,
      _u: userId,
    };
  },
  mounted() {
    this.carId = this.$route.query.carId;
    this.beforeRouter = this.$route.query.beforeRouter;
    this._getBorrowMoneyDtl();
  },
  computed: {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.repaymentType != 1 && row.auditStatus == 4) {
        return "warning-row";
      }
      // if (rowIndex === 1) {
      //   return "warning-row";
      // } else if (rowIndex === 3) {
      //   return "success-row";
      // }

      return "";
    },
    async _getBorrowMoneyDtl() {
      let res = await borrowMoneyDtl({
        carId: this.carId,
      });
      if (res.rtn == 1) {
        this.borrowMoneyDtl = res.result;
        this.signUrl = this.borrowMoneyDtl.carInfo.signUrl;
        if (this.borrowMoneyDtl.carDealersAccountInfo) {
          this.borrowMoneyDtl.carDealersAccountInfo.totalQuota = parseFloat(
            this.borrowMoneyDtl.carDealersAccountInfo.totalQuota
          ).toFixed(2);
          this.borrowMoneyDtl.carDealersAccountInfo.useQuota = parseFloat(
            this.borrowMoneyDtl.carDealersAccountInfo.useQuota
          ).toFixed(2);
        }

        this.borrowMoneyDtl.repaymentPlanList.forEach((item, index) => {
          if (item.planAt) {
            const planAt = item.planAt.split(" ");
            item.planAt = planAt[0];
          }
          if (item.capital || item.capital == 0) {
            item.capital = parseFloat(item.capital).toFixed(2);
          }

          if (item.interest || item.interest == 0) {
            item.interest = parseFloat(item.interest).toFixed(2);
          }

          if (item.actualCapital || item.actualCapital == 0) {
            item.actualCapital = parseFloat(item.actualCapital).toFixed(2);
          }

          if (item.actualInterest || item.actualInterest == 0) {
            item.actualInterest = parseFloat(item.actualInterest).toFixed(2);
          }

          if (item.rebateDeduction || item.rebateDeduction == 0) {
            item.rebateDeduction = parseFloat(item.rebateDeduction).toFixed(2);
          }
        });
        if (
          this.borrowMoneyDtl.repaymentPlanList &&
          this.borrowMoneyDtl.repaymentPlanList.length > 0
        ) {
          this.borrowMoneyDtl.repaymentPlanList.forEach((item, index) => {
            if (item.planType == 1) {
              item.planTypeText = "借款";
            } else if (item.planType == 2) {
              item.planTypeText = "还息";
            } else if (item.planType == 3) {
              item.planTypeText = "补充保证金";
            } else if (item.planType == 4) {
              item.planTypeText = "还本";
            }

            if (item.auditStatus == 0) {
              item.auditStatusText = "未开始";
            } else if (item.auditStatus == 1) {
              item.auditStatusText = "审批中";
            } else if (item.auditStatus == 2) {
              item.auditStatusText = "审批通过";
            } else if (item.auditStatus == 3) {
              item.auditStatusText = "审批未通过";
            } else if (item.auditStatus == 4) {
              item.auditStatusText = "已还清";
            }
          });
        }
      }
    },
    beforeDetailRemove(file) {
      return this.$confirm(`确定移除${file.name || "该图片"}？`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePayment(row) {
      this.dialogFormVisible = true;
      this.canEdit = false;
      this.dialogForm = {
        planId: "",
        remarks: "",
        repaymentAt: "",
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
        actualCapital: "",
        actualInterest: "",
        rebateDeduction: "",
      };
      this.dialogForm.planId = row.planId;
      this.planAt = row.planAt;
      this.capital = row.capital;
      this.interest = row.interest;
      this.lastRebate = parseFloat(
        this.borrowMoneyDtl.carDealersAccountInfo.totalRebate -
          this.borrowMoneyDtl.carDealersAccountInfo.useRebate
      ).toFixed(2);
    },
    async handleEdit(row) {
      this.dialogFormVisible = true;
      this.canEdit = true;
      let res = await repaymentApplyDtl({
        workflowId: row.workflowId,
      });

      const {
        actualCapital,
        actualInterest,
        rebateDeduction,
        repaymentApplyId,
        remarks,
        repaymentAt,
        dataPicList,
        dataPdfList,
        planId,
      } = res.result.auditObject.repaymentApplyInfo;

      if (dataPicList && dataPicList.length > 0) {
        dataPicList.forEach((item, index) => {
          item.isUpload = undefined;
        });
      }

      this.dialogForm = {
        repaymentApplyId: repaymentApplyId,
        planId: planId,
        remarks: remarks,
        repaymentAt: repaymentAt,
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
        actualCapital: actualCapital,
        actualInterest: actualInterest,
        rebateDeduction: rebateDeduction,
      };
      if (dataPdfList && dataPdfList.length > 0) {
        this.dialogForm.dataPdfList.forEach((item, index) => {
          var pdfJson = {};
          item.pdfFileList = [];
          pdfJson.name = "pdf" + item.fileName;
          pdfJson.url = item.dataUrl;
          item.pdfFileList.push(pdfJson);
        });
      }
      this.planAt = row.planAt;
      this.capital = row.capital;
      this.interest = row.interest;
      this.lastRebate = parseFloat(row.totalRebate - row.useRebate).toFixed(2);
    },
    async submitPayment() {
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

          const paramsData = {
            repaymentApplyId: form.repaymentApplyId
              ? form.repaymentApplyId
              : undefined,
            planId: form.planId,
            remarks: form.remarks,
            repaymentAt: form.repaymentAt,
            dataPicList: form.dataPicList,
            dataPdfList: form.dataPdfList,
            actualCapital: form.actualCapital,
            actualInterest: form.actualInterest,
            rebateDeduction: form.rebateDeduction,
          };

          if (this.canEdit) {
            var res = await editRepaymentApply(paramsData);
          } else {
            var res = await repaymentPlanApply(paramsData);
          }

          if (res.rtn == 1) {
            this.canEdit = false;
            this.$message.success("还款申请成功!");
          }
          this.dialogForm = {
            planId: "",
            remarks: "",
            repaymentAt: "",
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
            actualCapital: "",
            actualInterest: "",
            rebateDeduction: "",
          };
          this._getBorrowMoneyDtl();
          this.dialogFormVisible = false;
        }
      });
    },
    cancelPayment() {
      this.dialogFormVisible = false;
      this.$refs.dialogForm.resetFields();
      this.dialogForm = {
        planId: "",
        remarks: "",
        repaymentAt: "",
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
        actualCapital: "",
        actualInterest: "",
        rebateDeduction: "",
      };
      this.$refs["upload0"][0].clearFiles();
    },
    _show() {
      this.isShow = true;
    },
    onBack() {
      this.$router.push({ name: this.beforeRouter });
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
          originalPicUrl: undefined,
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
.borrowMoneyDtl,
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
.borrowMoneyDtl__inner {
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
.borrowMoneyDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.userDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.borrowMoneyDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.borrowMoneyDtl__line__item {
  display: inline-block;
  width: 33.33%;
  line-height: 20px;
  padding-bottom: 20px;
  font-size: 14px;
}
.borrowMoneyDtl__line__lab,
.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.borrowMoneyDtl__line__txt,
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
.borrowMoneyDtl__header__orderInfo tr {
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

<style lang="scss" scoped>
.manualBtn {
  color: #1890ff;
  text-decoration: underline;
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

.tableRowClassName {
}
</style>
<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}

.el-table .warning-row {
  text-decoration: line-through;
  color: #ccc;
}
</style>