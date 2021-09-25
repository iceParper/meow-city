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
                v-model="listQuery.status"
                placeholder="状态"
                clearable
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

          <el-col :span="8">
            <el-form-item>
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                v-if="handleBtnShow[0].isShow"
                @click="handleFilter"
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
      <el-table-column label="所属产权人" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.propertyOwnerName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="借款金额" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.loanMoney }}</div>
        </template>
      </el-table-column>
      <el-table-column label="抵押车架号" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carNo }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.createAt }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.status == 1">审批中</div>
          <div v-if="row.status == 2">审批通过</div>
          <div v-if="row.status == 3">审批未通过</div>
        </template>
      </el-table-column>
      <el-table-column label="未通过原因" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.auditReason || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="90"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <div>
            <el-button
              v-waves
              class="filter-item"
              type="primary"
              size="mini"
              style="padding: 7px 0"
              v-if="handleBtnShow[2].isShow && row.status == 3"
              @click="handleEdit(row)"
              >重新申请</el-button
            >
          </div>
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
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import { applyBorrowQuickLoanList } from "@/api/borrowMoneyManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
let id = 0;
export default {
  name: "ApplyQuickLoanManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // orderNum:'',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      statusOptions: [
        { label: "审批中", value: 1 },
        { label: "审批通过", value: 2 },
        { label: "审批未通过", value: 3 },
      ],
      uploadUrl,
      headers: {},
      rules: {
        picture: [{ required: true, message: "必填项", trigger: "blur" }],
        remark: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
        isUp: [{ required: true, message: "必填项", trigger: "blur" }],
        url: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        status: undefined,
        carNo: undefined,
      },
      handleBtnShow: [
        {
          btnName: "LoanLoanApplyQuickLoanQuery",
          isShow: false,
        },
        {
          btnName: "LoanLoanApplyQuickLoan",
          isShow: false,
        },
        {
          btnName: "LoanLoanApplyQuickLoanModify",
          isShow: false,
        },
      ],
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
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;

      let res = await applyBorrowQuickLoanList({
        ...this.listQuery,
      });
      console.log(res, "res");
      if (res.rtn == 1) {
        this.list = res.result.loanApplyList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {
          if (item.loanMoney || item.loanMoney == 0) {
            item.loanMoney = parseFloat(item.loanMoney).toFixed(2);
          }
        });
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
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        status: undefined,
        carNo: undefined,
      };
      this.getList();
    },
    handleAdd() {
      this.$router.push({
        name: "AddQuickLoanManage",
        query: { beforeRouter: "ApplyQuickLoanMoneyManage" },
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "AddQuickLoanManage",
        query: {
          workflowId: row.workflowId,
          beforeRouter: "ApplyQuickLoanMoneyManage",
          canEdit: true,
        },
      });
    },
    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "",
        query: { orderUuid: row.orderNumber, beforeRouter: "ApplyMoneyManage" },
      });
    },
  },
};
</script>