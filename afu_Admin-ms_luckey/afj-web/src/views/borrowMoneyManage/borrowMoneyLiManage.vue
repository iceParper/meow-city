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
                filterable
                clearable
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
            <el-form-item label="借款类型">
              <el-select
                v-model="listQuery.loanType"
                placeholder="借款类型"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in loanTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="放款类型">
              <el-select
                v-model="listQuery.paymentFundsType"
                placeholder="放款类型"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in paymentFundsTypeOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select
                v-model="listQuery.loanStatus"
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
          <el-col :span="9">
            <el-form-item label="签约时间">
              <el-date-picker
                v-model="paymentDate"
                style="width: 320px"
                type="datetimerange"
                class="filter-item"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
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
              <el-button
                v-waves
                :loading="downloadLoading"
                type="primary"
                class="filter-item"
                icon="el-icon-download"
                @click="downloadExcleClick"
                v-if="handleBtnShow[2].isShow"
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

      <el-table-column label="放贷类型" align="center">
        <template slot-scope="{ row }">
          <div>
            {{ row.paymentFundsType == 1 ? "联合资金" : "自有资金" || "--" }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="借款类型" align="center">
        <template slot-scope="{ row }">
          <div>
            {{ row.paymentFundsType == 1 ? "卖方" : "买方" || "--" }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="签约日期" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.signAt || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="打款时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.paymentAt || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="计划还款时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.lastRepaymentAt || "--" }}</div>
        </template>
      </el-table-column>

      <!-- <el-table-column label="下一结息日" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.nextRepaymentAt || "--" }}</div>
        </template>
      </el-table-column> -->

      <el-table-column label="还款状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.repaymentStatus == 1">结息中</div>
          <div v-else-if="row.repaymentStatus == 2">已逾期</div>
          <div v-else-if="row.repaymentStatus == 3">已结清</div>
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
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            v-if="handleBtnShow[1].isShow"
            @click="toDtl(row)"
            >查看</el-button
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
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import { downLoadFile } from "@/utils/index";
import { companyListQuery } from "@/api/systemManage";
import { borrowMoneyList, loanDownloadExcle } from "@/api/borrowMoneyManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
let id = 0;
export default {
  name: "BorrowMoneyLiManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // orderNum:'',
      downloadLoading: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      companyIdOptions: [],
      statusOptions: [
        { label: "借款中", value: 4 },
        { label: "已还清", value: 5 },
      ],
      loanTypeOptions: [
        { label: "卖方", value: 1 },
        { label: "车商", value: 2 },
      ],
      paymentFundsTypeOpt: [
        { label: "联合资金放款", value: 1 },
        { label: "私有资金放款", value: 2 },
      ],
      paymentDate: [],
      uploadUrl,
      headers: {},
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        loanStatus: undefined,
        loanType: undefined,
        paymentFundsType: undefined,
        beginTime: undefined,
        endTime: undefined,
      },
      handleBtnShow: [
        {
          btnName: "LoanLoanQuery",
          isShow: false,
        },
        {
          btnName: "LoanLoanDetail",
          isShow: false,
        },
        {
          btnName: "LoanLoanQueryExport",
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
    this.getList();
    this.getCompanyList();
  },
  methods: {
    async getList() {
      this.listLoading = true;

      if (this.paymentDate[0]) {
        var beginTime = formatDate(new Date(this.paymentDate[0]));
        this.listQuery.beginTime = beginTime;
      }
      if (this.paymentDate[1]) {
        var endTime = formatDate(new Date(this.paymentDate[1]));
        this.listQuery.endTime = endTime;
      }

      let res = await borrowMoneyList({
        ...this.listQuery,
      });
      console.log(res, "res");
      if (res.rtn == 1) {
        this.list = res.result.loanList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {
          if (item.lastRepaymentAt) {
            const lastRepaymentAt = item.lastRepaymentAt.split(" ");
            item.lastRepaymentAt = lastRepaymentAt[0];
          }
          if (item.loanMoney || item.loanMoney == 0) {
            item.loanMoney = parseFloat(item.loanMoney).toFixed(2);
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
        loanType: undefined,
        paymentFundsType: undefined,
        beginTime: undefined,
        endTime: undefined,
      };
      this.paymentDate = [];
      this.getList();
    },
    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "BorrowMoneyDtlManage",
        query: { carId: row.carId, beforeRouter: "BorrowMoneyLiManage" },
      });
    },
    async downloadExcleClick() {
      this.downloadLoading = true;
      let res = await loanDownloadExcle({
        ...this.listQuery,
      });

      downLoadFile(res, "借款申请列表", this, () => {
        setTimeout(() => {
          this.downloadLoading = false;
        }, 1.5 * 1000);
        this.$message.success("下载成功");
      });
    },
  },
};
</script>

