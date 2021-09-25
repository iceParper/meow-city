<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="车商姓名">
              <el-input
                v-model="listQuery.carDealersName"
                placeholder="车商姓名"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">
              <el-input
                v-model="listQuery.carDealersPhone"
                placeholder="车商手机号"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分公司">
              <el-select
                v-model="listQuery.companyId"
                style="width: 200px"
                placeholder="分公司名称"
              >
                <el-option
                  v-for="item in companyIdOptions"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="车架号">
              <el-input
                v-model="listQuery.carNo"
                placeholder="车架号"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select
                v-model="listQuery.repaymentStatus"
                placeholder="状态"
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="18">
            <el-form-item>
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                @click="handleFilter"
                v-if="handleBtnShow[0].isShow"
                >查询</el-button
              >
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-refresh"
                @click="handleReset"
                >重置</el-button
              >
              <el-button
                v-waves
                :loading="downloadLoading"
                type="primary"
                class="filter-item"
                icon="el-icon-download"
                @click="downloadExcleClick"
                v-if="handleBtnShow[3].isShow"
                >导出</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      class="leftText-table"
      style="width: 100%"
    >
      <el-table-column
        fixed
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carDealersName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carDealersPhone }}</div>
        </template>
      </el-table-column>

      <el-table-column label="车架号" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carNo }}</div>
        </template>
      </el-table-column>

      <el-table-column label="所属分公司" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.companyName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所属客服" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.custmagerName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="借款金额" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.loanMoney || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="计划类型" align="center">
        <template slot-scope="{ row }">
          <!-- <div v-if="row.planType == 1">借款</div>
          <div v-else-if="row.planType == 2">还息</div>
          <div v-else-if="row.planType == 3">补充保证金</div>
          <div v-else-if="row.planType == 4">还本</div> -->
          <div>
            {{ row.planName || "--" }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="计划还款时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.planAt || "" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="应还本金" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.capital || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="应还服务费" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.interest || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="实还本金" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.actualCapital || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="实还服务费" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.actualInterest || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="积分抵扣" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.rebateDeduction || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="还款时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.rerepaymentAt || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="完成时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.completeAt || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="还款状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.repaymentStatus == 1">{{ "结息中" || "--" }}</div>
          <div v-else-if="row.repaymentStatus == 2">{{ "已逾期" || "--" }}</div>
          <div v-else-if="row.repaymentStatus == 3">{{ "已结清" || "--" }}</div>
          <div v-else>{{ "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.auditStatus == 0">{{ "未开始" || "--" }}</div>
          <div v-else-if="row.auditStatus == 1">{{ "审批中" || "--" }}</div>
          <div v-else-if="row.auditStatus == 2">{{ "审批通过" || "--" }}</div>
          <div v-else-if="row.auditStatus == 3">{{ "已驳回" || "--" }}</div>
          <div v-else-if="row.auditStatus == 4">{{ "已取消" || "--" }}</div>
          <div v-else>{{ "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="未通过原因" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.aduitReason || "--" }}</div>
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
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            plain
            v-if="handleBtnShow[2].isShow && row.auditStatus != 0"
            @click="toDtl(row)"
            >详情</el-button
          >
          <el-button
            style="padding: 7px 0"
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            :disabled="row.auditStatus == 1"
            v-if="
              handleBtnShow[1].isShow &&
              (row.auditStatus == 0 || row.auditStatus == 1)
            "
            @click="handlePayment(row)"
            >线下还款</el-button
          >

          <el-button
            style="padding: 7px 0"
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            v-if="handleBtnShow[4].isShow & (row.auditStatus == 3)"
            @click="handleEdit(row)"
            >重新还款</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog
      title="还款申请"
      :visible.sync="dialogFormVisible"
      center
      @close="cancelPayment"
    >
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
          <div v-if="planAt">(计划还款日期：{{ planAt }})</div>
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
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import { downLoadFile } from "@/utils/index";
import { companyListQuery } from "@/api/systemManage";
import {
  repaymentPlanList,
  repaymentPlanApply,
  repaymentPlanDownloadExcle,
  repaymentApplyDtl,
  editRepaymentApply,
} from "@/api/borrowMoneyManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
let id = 0;
export default {
  name: "InterestManage",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    const isNum1 = (rule, value, callback) => {
      const num = /^\d+(?:\.\d{1,4})?$/;
      console.log(typeof value, "=====");
      if (!value.toString()) {
        callback(new Error("必填项"));
      } else if (!num.test(value)) {
        callback(new Error("只能为数字"));
      } else {
        callback();
      }
    };
    return {
      // orderNum:'',
      canEdit: false,
      capital: "",
      planAt: "",
      interest: "",
      lastRebate: "",
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      fileData: {
        fileType: "repayment",
      },
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
      companyIdOptions: [],
      statusOptions: [
        { label: "未到期", value: 1 },
        { label: "已逾期", value: 2 },
        { label: "已还款", value: 3 },
      ],
      labelPosition: "top",
      uploadUrl,
      headers: {},
      isSubmitFlag: false,
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
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        repaymentStatus: undefined,
        carNo: undefined,
      },
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
          btnName: "RepaymentPlanQueryExport",
          isShow: false,
        },
        {
          btnName: "RepaymentApplyModify",
          isShow: false,
        },
      ],

      downloadLoading: false,
      dialogFormVisible: false,
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
      handleBtnFuncArr: [],
    };
  },
  computed: {},
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
    console.log(this.handleBtnShow);
    this.getCompanyList();
    this.getList();
    // ------------------------
    // this.head = JSON.parse({
    //   'managerUuid': localStorage.getItem('managerUuid'),
    //   'password': localStorage.getItem('password')
    // })
    console.log(this.head);
  },
  methods: {
    async getList() {
      this.listLoading = true;

      let res = await repaymentPlanList({
        ...this.listQuery,
      });
      console.log(res, "res");
      if (res.rtn == 1) {
        res.result.repaymentPlanList.forEach((item, index) => {
          if (item.repaymentStatus == 3) {
            res.result.repaymentPlanList.splice(index, 1);
          }
        });
        this.list = res.result.repaymentPlanList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {
          if (item.planAt) {
            const planAt = item.planAt.split(" ");
            item.planAt = planAt[0];
          }
          if (item.loanMoney || item.loanMoney == 0) {
            item.loanMoney = parseFloat(item.loanMoney).toFixed(2);
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
      }
      // Just to simulate the time of the request
      this.listLoading = false;
    },
    async getCompanyList() {
      const res = await companyListQuery({});
      if (res.rtn == 1) {
        this.companyIdOptions = res.companyList;
      }
    },
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 20,
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        loanStatus: undefined,
        carNo: undefined,
      };
      this.getList();
    },
    handleAdd() {
      this.$router.push({
        name: "AddBorrowMoneyManage",
        query: { beforeRouter: "ApplyMoneyManage" },
      });
    },
    beforeDetailRemove(file) {
      return this.$confirm(`确定移除${file.name || "该图片"}？`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePayment(row) {
      this.canEdit = false;
      this.dialogFormVisible = true;
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
      this.lastRebate = parseFloat(row.totalRebate - row.useRebate).toFixed(2);
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

          if (!this.isSubmitFlag) {
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

            console.log(res);
            if (res.rtn == 1) {
              this.$message.success("还款申请成功!");
              this.getList();
            }
            this.canEdit = false;
            this.dialogFormVisible = false;
            this.isSubmitFlag = false;
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
          }
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
    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "BorrowMoneyDtlManage",
        query: { carId: row.carId, beforeRouter: "InterestManage" },
      });
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
    async downloadExcleClick() {
      this.downloadLoading = true;
      let res = await repaymentPlanDownloadExcle({
        ...this.listQuery,
      });

      downLoadFile(res, "还款计划列表", this, () => {
        setTimeout(() => {
          this.downloadLoading = false;
        }, 1.5 * 1000);
        this.$message.success("下载成功");
      });
      // Just to simulate the time of the request
    },
  },
};
</script>
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
</style>
<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
</style>