<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="角色名称">
              <el-input
                v-model="listQuery.roleName"
                placeholder="角色名称"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select
                v-model="listQuery.status"
                placeholder="状态"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
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
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="handle-container">
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        size="mini"
        icon="el-icon-plus"
        style="float: right"
        @click="handleAdd"
        v-if="handleBtnShow[1].isShow"
        >新增</el-button
      >
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
      <el-table-column label="名称" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.roleName }}</div>
          <div v-if="row.roleDescribe">描述：{{ row.roleDescribe }}。</div>
        </template>
      </el-table-column>
      <el-table-column label="巡检类型" align="center">
        <template slot-scope="{ row }">
          <span>巡检-照片：{{ row.inspectionPhoto == 1 ? "是" : "否" }},</span>
          <span>巡检-NFC：{{ row.inspectionNfc == 1 ? "是" : "否" }},</span>
          <span
            >巡检-扫码：{{ row.inspectionScanCode == 1 ? "是" : "否" }},</span
          >
          <span
            >巡检-ibeacon：{{ row.inspectionIbeacon == 1 ? "是" : "否" }},</span
          >
        </template>
      </el-table-column>
      <el-table-column label="借款信息" align="center">
        <template slot-scope="{ row }">
          <div>
            <span>借款服务费比例（%）：{{ row.loanRate }},</span
            ><span>最短计息周期(天)：{{ row.minInterestPeriodDay }}</span>
          </div>
          <div>
            <span>车商抵押比例（%）：{{ row.mortgageRatioCarDealers }},</span>
            <span
              >卖家抵押比例（%）：{{ row.mortgageRatioSeller
              }}{{ row.roleDescribe ? "," : "。" }}</span
            >
          </div>
          <div>
            <span
              >按揭返点状态：{{
                row.mortgageRebateStatus == 1 ? "启用" : "停用"
              }},</span
            >
            <span>按揭返点服务费比例（%）：{{ row.mortgageRebateRate }},</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="风控信息" align="center">
        <template slot-scope="{ row }">
          <div>
            车商额度有效期（天数）：{{ row.carDealersQuotaValidityDay }}
          </div>
          <div>未巡检报警阈值（天数）：{{ row.inspectionThresholdDay }}</div>
          <div>
            <span
              >放款类型-联合资金：{{
                row.paymentJointFunds == 1 ? "是" : "否"
              }},</span
            >
            <span
              >放款类型-自有资金：{{
                row.paymentOwnFunds == 1 ? "是" : "否"
              }},</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.createAt }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="50">
        <template slot-scope="{ row }">
          <div>{{ row.status == 1 ? "启用" : "冻结" }}</div>
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
          <!-- <div style="margin-bottom:8px">
            <el-button
              v-waves
              style="width:60px;box-sizing:border-box;padding:7px 0;"
              class="filter-item"
              type="primary"
              size="mini"
              plain
            >查看详情</el-button>
          </div>-->
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            :type="row.status == 2 ? 'primary' : 'danger'"
            size="mini"
            plain
            @click="editStatus(row)"
            v-if="handleBtnShow[3].isShow"
            >{{ row.status == 1 ? "冻结" : "启用" }}</el-button
          >
          <!-- <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            plain
            >分公司</el-button
          > -->
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            @click="handleEdit(row)"
            v-if="handleBtnShow[2].isShow"
            >修改</el-button
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

    <el-dialog title="创建分公司方案" :visible.sync="dialogFormVisible" center>
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 50px"
      >
        <el-form-item label="方案名称" prop="roleName">
          <el-input v-model="dialogForm.roleName" placeholder="输入名称" />
        </el-form-item>
        <el-form-item label="描述" prop="roleDescribe">
          <el-input
            v-model="dialogForm.roleDescribe"
            type="textarea"
            placeholder="输入描述"
            :autosize="{ minRows: 1, maxRows: 1 }"
          />
        </el-form-item>
        <el-form-item label="巡检类型（可多选）" prop="checkOptions">
          <el-checkbox-group v-model="dialogForm.checkOptions">
            <el-checkbox
              v-for="item in checkListArr"
              :label="item.id"
              :key="item.id"
              >{{ item.checkName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <div style="display: flex; justify-content: space-between">
          <el-form-item
            style="flex:1"
            label="车商额度有效期"
            prop="carDealersQuotaValidityDay"
          >
            <el-input
              v-model="dialogForm.carDealersQuotaValidityDay"
              placeholder="输入车商额度有效期"
              style="width: 120px"
            />
            &nbsp;天
          </el-form-item>
          <el-form-item style="flex:1" label="最短计息周期" prop="minInterestPeriodDay">
            <el-input
              v-model="dialogForm.minInterestPeriodDay"
              placeholder="输入最短计息周期"
              style="width: 120px"
            />
            &nbsp;天
          </el-form-item>
          <el-form-item style="flex:1" label="未巡检报警阀值" prop="inspectionThresholdDay">
            <el-input
              v-model="dialogForm.inspectionThresholdDay"
              placeholder="输入未巡检报警阀值"
              style="width: 120px"
            />
            &nbsp;天
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item style="flex:1;" label="车商抵押比例" prop="mortgageRatioCarDealers">
            <el-input
              v-model="dialogForm.mortgageRatioCarDealers"
              placeholder="输入车商抵押比例"
              style="width: 120px"
            />
            &nbsp;%
          </el-form-item>
          <el-form-item style="flex:2;" label="卖家抵押比例" prop="mortgageRatioSeller">
            <el-input
              v-model="dialogForm.mortgageRatioSeller"
              placeholder="输入卖家抵押比例"
              style="width: 120px"
            />
            &nbsp;%
          </el-form-item>
        </div>
        <!-- <div style="display: flex">
          <el-form-item style="flex: 1" label="放贷类型" prop="capitalOptions">
            <el-checkbox-group v-model="dialogForm.capitalOptions">
              <el-checkbox
                v-for="item in capitalListArr"
                :label="item.id"
                :key="item.id"
                >{{ item.capitalType }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div> -->
        <div style="display: flex">
          <el-form-item
            style="flex: 1"
            label="联合资金放贷"
            prop="mortgageRebateStatus"
          >
            <el-switch
              v-model="dialogForm.paymentJointFunds"
              :inactive-value="0"
              :active-value="1"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item
            style="flex: 2"
            label="借款服务费比例"
            prop="loanRate"
            v-if="dialogForm.paymentJointFunds == 1"
          >
            <el-input
              v-model="dialogForm.loanRate"
              placeholder="输入借款服务费比例"
              style="width: 120px"
            />
            &nbsp;%
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item
            style="flex: 1"
            label="自有资金放贷"
            prop="paymentOwnFunds"
          >
            <el-switch
              v-model="dialogForm.paymentOwnFunds"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item
            style="flex: 1"
            label="借款服务费比例"
            prop="ownFundsLoanRate"
            v-if="dialogForm.paymentOwnFunds == 1"
          >
            <el-input
              v-model="dialogForm.ownFundsLoanRate"
              placeholder="输入借款服务费比例"
              style="width: 120px"
            />
            &nbsp;%
          </el-form-item>
          <el-form-item
            style="flex: 1"
            label="平台服务费比例"
            prop="platformServiceFee"
            v-if="dialogForm.paymentOwnFunds == 1"
          >
            <el-input
              v-model="dialogForm.platformServiceFee"
              placeholder="输入平台服务费比例"
              style="width: 120px"
            />
            &nbsp;%
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item
            style="flex: 1"
            label="按揭返点"
            prop="mortgageRebateStatus"
          >
            <el-switch
              v-model="dialogForm.mortgageRebateStatus"
              :active-value="1"
              :inactive-value="2"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
            <span>{{
              dialogForm.mortgageRebateStatus == 1 ? "启用" : "禁用"
            }}</span>
          </el-form-item>
          <el-form-item
            style="flex: 2"
            label="按揭返点比例"
            prop="mortgageRebateRate"
            v-if="dialogForm.mortgageRebateStatus == 1"
          >
            <el-input
              v-model="dialogForm.mortgageRebateRate"
              placeholder="输入按揭返点比例"
              style="width: 120px"
            />
            &nbsp;%
          </el-form-item>
        </div>
        <el-form-item label="选择状态" prop="status">
          <el-switch
            v-model="dialogForm.status"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
          <span>{{ dialogForm.status == 1 ? "启用" : "禁用" }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleRole">确定</el-button>
        <el-button @click="cancelRole">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import {
  companyRoleList,
  createRole,
  editRole,
  editRoleStatus,
} from "@/api/branchCoManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
import { valueOf } from "screenfull";
let id = 0;
export default {
  name: "RoleListManage",
  components: { Pagination },
  directives: { waves },
  data() {
    const isNum = (rule, value, callback) => {
      const num = /^[0-9]*$/;
      if (!!value && value == 0) {
        callback(new Error("不能为0"));
      } else if (!value.toString()) {
        callback(new Error("必填项"));
      } else if (!num.test(value)) {
        callback(new Error("只能为数字且为整数"));
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
      // orderNum:'',
      isEdit: false,
      statusOptions: [
        { key: 1, label: "启用", value: 1 },
        { key: 2, label: "冻结", value: 2 },
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,

      checkListArr: [
        {
          id: 1,
          checkName: "纯照片",
        },
        {
          id: 2,
          checkName: "NFC",
        },
        {
          id: 3,
          checkName: "扫码",
        },
        {
          id: 4,
          checkName: "ibeacon",
        },
      ],
      capitalListArr: [
        {
          id: 1,
          capitalType: "联合资金",
        },
        {
          id: 2,
          capitalType: "自有资金",
        },
      ],
      checkOptions: [],
      capitalOptions: [],
      fileData: {
        fileType: 1,
      },
      labelPosition: "top",
      uploadUrl,
      headers: {},
      rules: {
        roleName: [{ required: true, message: "必填项", trigger: "blur" }],
        roleDescribe: [{ required: true, message: "必填项", trigger: "blur" }],
        checkOptions: [{ required: true, message: "必填项", trigger: "blur" }],
        carDealersQuotaValidityDay: [
          {
            required: true,
            trigger: "blur",
            validator: isNum,
          },
        ],
        loanRate: [{ required: true, validator: isNum1, trigger: "blur" }],
        ownFundsLoanRate: [
          { required: true, validator: isNum1, trigger: "blur" },
        ],
        platformServiceFee: [
          { required: true, validator: isNum1, trigger: "blur" },
        ],
        mortgageRebateRate: [
          {
            required: true,
            validator: isNum1,
            trigger: "blur",
          },
        ],
        minInterestPeriodDay: [
          { required: true, validator: isNum, trigger: "blur" },
        ],
        mortgageRatioCarDealers: [
          { required: true, validator: isNum1, trigger: "blur" },
        ],
        inspectionThresholdDay: [
          { required: true, validator: isNum, trigger: "blur" },
        ],
        mortgageRatioCarDealercapitalTypes: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        mortgageRatioSeller: [
          { required: true, validator: isNum1, trigger: "blur" },
        ],
        capitalOptions: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        mortgageRebateStatus: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        roleName: undefined,
        status: undefined,
      },
      handleBtnShow: [
        {
          btnName: "CompanyRoleQuery",
          isShow: false,
        },
        {
          btnName: "CompanyRoleAdd",
          isShow: false,
        },
        {
          btnName: "CompanyRoleModify",
          isShow: false,
        },
        {
          btnName: "CompanyRoleModifyStatus",
          isShow: false,
        },
        {
          btnName: "CompanyRoleDetail",
          isShow: false,
        },
      ],
      dialogFormVisible: false,
      dialogForm: {
        checkOptions: [],
        // capitalOptions: [],
        roleId: undefined,
        roleName: undefined,
        roleDescribe: undefined,
        carDealersQuotaValidityDay: undefined,
        inspectionIbeacon: 0,
        inspectionNfc: 0,
        inspectionPhoto: 0,
        inspectionScanCode: 0,
        inspectionThresholdDay: undefined,
        loanRate: undefined,
        ownFundsLoanRate: undefined,
        platformServiceFee: undefined,
        minInterestPeriodDay: undefined,
        mortgageRatioCarDealers: undefined,
        mortgageRatioSeller: undefined,
        mortgageRebateRate: undefined,
        mortgageRebateStatus: 1,
        paymentJointFunds: 1,
        paymentOwnFunds: 1,
        status: 1,
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
    // this.checkListArr.forEach((item, index) => {
    //   this.checkOptions.push(item.id);
    // });
    // this.capitalListArr.forEach((item, index) => {
    //   this.capitalOptions.push(item.id);
    // });
    console.log(this.handleBtnShow);
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
      let res = await companyRoleList({
        ...this.listQuery,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.roleList;
        this.total = res.result.total;
      }
      // Just to simulate the time of the request
      this.listLoading = false;
    },

    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 20,
        roleName: undefined,
        status: undefined,
      };

      this.getList();
    },

    handleAdd() {
      this.isEdit = false;
      this.dialogFormVisible = true;
      this.dialogForm = {
        checkOptions: [],
        // capitalOptions: [], 
        roleId: undefined,
        roleName: undefined,
        roleDescribe: undefined,
        carDealersQuotaValidityDay: undefined,
        inspectionIbeacon: 0,
        inspectionNfc: 0,
        inspectionPhoto: 0,
        inspectionScanCode: 0,
        inspectionThresholdDay: undefined,
        loanRate: undefined,
        ownFundsLoanRate: undefined,
        platformServiceFee: undefined,
        minInterestPeriodDay: undefined,
        mortgageRatioCarDealers: undefined,
        mortgageRatioSeller: undefined,
        mortgageRebateRate: undefined,
        mortgageRebateStatus: 1,
        paymentJointFunds: 1,
        paymentOwnFunds: 1,
        status: 1,
      };
    },
    handleEdit(row) {
      this.isEdit = true;
      this.dialogFormVisible = true;
      this.dialogForm = {
        checkOptions: [],
        // capitalOptions: [],
        roleId: row.roleId,
        roleName: row.roleName,
        roleDescribe: row.roleDescribe,
        carDealersQuotaValidityDay: row.carDealersQuotaValidityDay,
        inspectionIbeacon: row.inspectionIbeacon,
        inspectionNfc: row.inspectionNfc,
        inspectionPhoto: row.inspectionPhoto,
        inspectionScanCode: row.inspectionScanCode,
        inspectionThresholdDay: row.inspectionThresholdDay,
        loanRate: row.loanRate,
        ownFundsLoanRate: row.ownFundsLoanRate,
        platformServiceFee: row.platformServiceFee,
        minInterestPeriodDay: row.minInterestPeriodDay,
        mortgageRatioCarDealers: row.mortgageRatioCarDealers,
        mortgageRatioSeller: row.mortgageRatioSeller,
        mortgageRebateRate: row.mortgageRebateRate,
        mortgageRebateStatus: row.mortgageRebateStatus,
        paymentJointFunds: row.paymentJointFunds,
        paymentOwnFunds: row.paymentOwnFunds,
        status: row.status
      };

      if (row.inspectionPhoto == 1) {
        this.dialogForm.checkOptions.push(1);
      }

      if (row.inspectionNfc == 1) {
        this.dialogForm.checkOptions.push(2);
      }

      if (row.inspectionScanCode == 1) {
        this.dialogForm.checkOptions.push(3);
      }

      if (row.inspectionIbeacon == 1) {
        this.dialogForm.checkOptions.push(4);
      }

      // if (row.paymentJointFunds == 1) {
      //   this.dialogForm.capitalOptions.push(1);
      // }

      // if (row.paymentOwnFunds == 1) {
      //   this.dialogForm.capitalOptions.push(2);
      // }
    },

    async handleRole() {
      this.dialogForm.checkOptions.forEach((item, index) => {
        console.log(item, index);
        if (item == 1) {
          this.dialogForm.inspectionPhoto = 1;
        } else if (item == 2) {
          this.dialogForm.inspectionNfc = 1;
        } else if (item == 3) {
          this.dialogForm.inspectionScanCode = 1;
        } else if (item == 4) {
          this.dialogForm.inspectionIbeacon = 1;
        }
      });
      // this.dialogForm.capitalOptions.forEach((item, index) => {
      //   console.log(item, index);
      //   if (item == 1) {
      //     this.dialogForm.paymentJointFunds = 1;
      //   } else {
      //     this.dialogForm.paymentOwnFunds = 1;
      //   }
      // });
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          delete this.dialogForm.checkOptions;
          // delete this.dialogForm.capitalOptions;
          if (!this.isEdit) {
            const res = await createRole(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "创建成功",
              });
            }
          } else {
            const res = await editRole(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          }

          this.dialogForm = {
            checkOptions: [],
            // capitalOptions: [], 
            roleId: undefined,
            roleName: undefined,
            roleDescribe: undefined,
            carDealersQuotaValidityDay: undefined,
            inspectionIbeacon: 0,
            inspectionNfc: 0,
            inspectionPhoto: 0,
            inspectionScanCode: 0,
            inspectionThresholdDay: undefined,
            loanRate: undefined,
            ownFundsLoanRate: undefined,
            platformServiceFee: undefined,
            minInterestPeriodDay: undefined,
            mortgageRatioCarDealers: undefined,
            mortgageRatioSeller: undefined,
            mortgageRebateRate: undefined,
            mortgageRebateStatus: 1,
            paymentJointFunds: 1,
            paymentOwnFunds: 1,
            status: 1,
          };
          this.dialogFormVisible = false;
          this.getList();
        }
      });
    },

    cancelRole() {
      this.$refs.dialogForm.resetFields();
      this.dialogFormVisible = false;
    },
    async editStatus(row) {
      let res = await editRoleStatus({
        status: row.status == 1 ? 2 : 1,
        roleList: [{ roleId: row.roleId.toString() }],
      });
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getList();
      }
    },

    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "OrderDetail",
        query: { orderUuid: row.orderNumber, beforeRouter: "OrderList" },
      });
    },
  },
};
</script>
