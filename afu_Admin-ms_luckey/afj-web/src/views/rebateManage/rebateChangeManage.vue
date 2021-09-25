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
            <el-form-item label="积分状态">
              <el-select
                v-model="listQuery.chgType"
                style="width: 200px"
                placeholder="积分类型"
              >
                <el-option
                  v-for="item in rebateStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-search"
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
        align="center"
        label="序号"
        type="index"
        width="50"
      ></el-table-column>
      <el-table-column label="车商" align="center">
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
      <el-table-column label="累计积分" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.totalRebate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="已使用积分" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.useRebate }}</div>
        </template>
      </el-table-column>
       <el-table-column label="剩余积分" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.lastRebate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="额度" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.quota }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.createAt }}</div>
        </template>
      </el-table-column>
      <el-table-column label="变更原因" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.reason || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.chgType == 11">按揭积分</div>
          <div v-else-if="row.chgType == 12">积分调整</div>
          <div v-else-if="row.chgType == 13">还息抵扣</div>
          <div v-else-if="row.chgType == 14">积分冻结</div>
          <div v-else-if="row.chgType == 15">积分解禁</div>
          <div v-else>--</div>
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
import { rebateChgDtl } from "@/api/rebateManage";
import { companyListQuery } from "@/api/systemManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
let id = 0;
export default {
  name: "RebateListManage",
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
    return {
      // orderNum:'',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      companyIdOptions: [],
      statusOptions: [],
      rebateStatusOptions: [
        { label: "按揭积分", value: 11 },
        { label: "积分调整", value: 12 },
        { label: "还息抵扣", value: 13 },
        { label: "积分冻结", value: 14 },
        { label: "积分解禁", value: 15 },
      ],
      labelPosition: "top",
      uploadUrl,
      headers: {},
      rules: {
        frozenReason: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        custmagerId: undefined,
        chgType: undefined,
      },
      dialogFormVisible: false,
      dialogForm: {
        status: undefined,
        frozenReason: undefined,
        carDealersList: [],
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
    this.getCompanyList();
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await rebateChgDtl({
        ...this.listQuery,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.accountDetailList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {
          if (item.quota || item.quota == 0) {
            item.quota = parseFloat(item.quota).toFixed(2);
          }

          if (item.totalRebate || item.totalRebate == 0) {
            item.totalRebate = parseFloat(item.totalRebate).toFixed(2);
          }

          if (item.useRebate || item.useRebate == 0) {
            item.useRebate = parseFloat(item.useRebate).toFixed(2);
          }
          if (
            (item.totalRebate || item.totalRebate == 0) &&
            (item.useRebate || item.useRebate == 0)
          ) {
            item.lastRebate = parseFloat(
              item.totalRebate - item.useRebate
            ).toFixed(2);
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
        custmagerId: undefined,
        rebateStatus: undefined,
      };
      this.getList();
    },

    toDtl(row) {
      this.$router.push({
        name: "RebateDtlManage",
        query: {
          carDealersId: row.carDealersId,
          beforeRouter: "RebateListManage",
        },
      });
    },
    async getCompanyList() {
      const res = await companyListQuery({});
      if (res.rtn == 1) {
        this.companyIdOptions = res.companyList;
      }
    },
  },
};
</script>
