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
            <el-form-item label="手机号码">
              <el-input
                v-model="listQuery.carDealersPhone"
                placeholder="手机号码"
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
        align="center"
        type="index"
        width="50"
      ></el-table-column>
      <el-table-column label="车商姓名" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carDealersName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="车商电话" align="center">
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
      <el-table-column label="计划还款日期" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.planAt || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="计划类型" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.planType == 1">借款</div>
          <div v-else-if="row.planType == 2">还息</div>
          <div v-else-if="row.planType == 3">补充保证金</div>
          <div v-else-if="row.planType == 4">还本</div>
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
      <el-table-column label="抵扣金额">
        <template slot-scope="{ row }">
          <div>{{ row.rebateDeduction || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="还款状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.repaymentStatus == 1">结息中</div>
          <div v-else-if="row.repaymentStatus == 2">已逾期</div>
          <div v-else-if="row.repaymentStatus == 3">已结清</div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.auditStatus == 0">未开始</div>
          <div v-else-if="row.auditStatus == 1">审批中</div>
          <div v-else-if="row.auditStatus == 2">审批通过</div>
          <div v-else-if="row.auditStatus == 3">审批未通过</div>
          <div v-else-if="row.auditStatus == 4">已取消</div>
        </template>
      </el-table-column>
      <el-table-column label="还款时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.repaymentAt || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="完成时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.completeAt || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            plain
            @click="toDtl(row)"
            v-if="handleBtnShow[1].isShow"
            >查看借款</el-button
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
import {
  repaymentRecordList,
  repaymentRecordDownloadExcle,
} from "@/api/borrowMoneyManage";
import { companyListQuery } from "@/api/systemManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { downLoadFile } from "@/utils/index";
let id = 0;
export default {
  name: "ReturnInterestManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // orderNum:'',
      tableKey: 0,
      list: null,
      total: 0,
      downloadLoading: false,
      listLoading: true,
      companyIdOptions: [],
      headers: {},
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
      },
      handleBtnShow: [
        {
          btnName: "RepaymentRecordQuery",
          isShow: false,
        },
        {
          btnName: "RepaymentApplyDetail",
          isShow: false,
        },
        {
          btnName: "LoanRepaymentRecordQueryExport",
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

      let res = await repaymentRecordList({
        ...this.listQuery,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.repaymentRecordList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {
          if(item.planAt){
            const planAt = item.planAt.split(' ');
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
      };
      this.getList();
    },
    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "BorrowMoneyDtlManage",
        query: { carId: row.carId, beforeRouter: "ReturnInterestManage" },
      });
    },
    async downloadExcleClick() {
      this.downloadLoading = true;
      let res = await repaymentRecordDownloadExcle({
        ...this.listQuery,
      });
      // Just to simulate the time of the request
      downLoadFile(res, "还款记录列表", this, () => {
        setTimeout(() => {
          this.downloadLoading = false;
        }, 1.5 * 1000);
        this.$message.success("下载成功");
      });
    },
  },
};
</script>
