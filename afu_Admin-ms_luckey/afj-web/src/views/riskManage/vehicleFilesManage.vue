<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
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
            <el-form-item label="车商名称">
              <el-select
                v-model="listQuery.carDealersId"
                style="width: 200px"
                placeholder="车商名称"
              >
                <el-option
                  v-for="item in dealersIdOptions"
                  :key="item.carDealersId"
                  :label="item.carDealersName"
                  :value="item.carDealersId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产权人名称">
              <el-select
                v-model="listQuery.propertyOwnerId"
                style="width: 200px"
                placeholder="产权人名称"
              >
                <el-option
                  v-for="item in propertyOwnerOptions"
                  :key="item.ownerId"
                  :label="item.ownerName"
                  :value="item.ownerId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="借款状态">
              <el-select
                v-model="listQuery.loanStatus"
                placeholder="借款状态"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in loanStatusOptions"
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
          <el-col :span="12">
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
                v-if="handleBtnShow[5].isShow"
                >导出</el-button
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
      <el-table-column label="车架号" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carNo }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所属车商" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carDealersName }}</div>
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
      <!-- <el-table-column label="借款金额" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.loanQuota || "--" }}</div>
        </template>
      </el-table-column> -->
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.createAt }}</div>
        </template>
      </el-table-column>
      <el-table-column label="借款状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.loanStatus == 0">未借款</div>
          <div v-else-if="row.loanStatus == 1">借款审核中</div>
          <div v-else-if="row.loanStatus == 2">待签约</div>
          <div v-else-if="row.loanStatus == 3">待打款</div>
          <div v-else-if="row.loanStatus == 4">借款中</div>
          <div v-else-if="row.loanStatus == 5">已还清</div>
        </template>
      </el-table-column>

      <el-table-column label="审核状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.auditStatus == 1">审核中</div>
          <div v-else-if="row.auditStatus == 2">审核通过</div>
          <div v-else-if="row.auditStatus == 3">审核未通过</div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column label="未通过原因" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.aduitReason || '--'}}</div>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.status == 1 ? "启用" : "冻结" }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="冻结原因" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.frozenReason || "--" }}</div>
        </template>
      </el-table-column> -->
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="240"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            :type="row.status == 2 ? 'primary' : 'danger'"
            size="mini"
            plain
            @click="editStatus(row)"
            v-if="handleBtnShow[4].isShow"
            >{{ row.status == 1 ? "冻结" : "启用" }}</el-button
          >
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            plain
            @click="toDtl(row)"
            v-if="handleBtnShow[3].isShow"
            >详情</el-button
          >
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            @click="handleEdit(row)"
            :disabled='row.auditStatus == 1'
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
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import { companyListQuery } from "@/api/systemManage";
import {
  vehicleList,
  editVehicleStatus,
  dealersSelList,
  propertyOwnerSelList,
  inspectionPlanSelList,
  vehicleDownloadExcle,
} from "@/api/riskManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { downLoadFile } from "@/utils/index";
let id = 0;
export default {
  name: "VehicleFilesManage",
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
      tableKey: 0,
      list: null,
      total: 0,
      downloadLoading: false,
      companyIdOptions: [],
      propertyOwnerOptions: [],
      loanStatusOptions: [
        {
          label: "未借款",
          value: 0,
        },
        {
          label: "借款审核中",
          value: 1,
        },
        {
          label: "借款中",
          value: 2,
        },
        {
          label: "已还清",
          value: 3,
        },
      ],
      statusOptions: [
        {
          label: "启用",
          value: 1,
        },
        {
          label: "冻结",
          value: 2,
        },
      ],
      labelPosition: "left",
      uploadUrl,
      dealersIdOptions: [],
      custmagerName: undefined,
      headers: {},
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        carNo: undefined,
        loanStatus: undefined,
        status: undefined,
        carDealersId: undefined,
        propertyOwnerId: undefined,
      },
      handleBtnShow: [
        {
          btnName: "RiskCarQuery",
          isShow: false,
        },
        {
          btnName: "RiskCarAdd",
          isShow: false,
        },
        {
          btnName: "RiskCarModify",
          isShow: false,
        },
        {
          btnName: "RiskCarDetail",
          isShow: false,
        },
        {
          btnName: "RiskCarStatus",
          isShow: false,
        },
        {
          btnName: "RiskCarQueryExport",
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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.custmagerName = userInfo.custmagerName;

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
    this.getDealersList();
    this.getpRopertyOwnerList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await vehicleList({
        ...this.listQuery,
      });
      if (res.rtn == 1) {
        this.list = res.result.carList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {
          if (item.loanQuota || item.loanQuota == 0) {
            item.loanQuota == parseFloat(item.loanQuota).toFixed(2);
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
    async getDealersList() {
      const res = await dealersSelList({});
      if (res.rtn == 1) {
        this.dealersIdOptions = res.carDealersList;
      }
    },
    async getpRopertyOwnerList() {
      const res = await propertyOwnerSelList({});
      if (res.rtn == 1) {
        this.propertyOwnerOptions = res.propertyOwnerList;
      }
    },
    async getInspectionPlanList() {},
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 20,
        carNo: undefined,
        loanStatus: undefined,
        status: undefined,
        carDealersId: undefined,
        propertyOwnerId: undefined,
      };
      this.getList();
    },

    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "VehicleFilesDtlManage",
        query: { carId: row.carId, beforeRouter: "VehicleFilesManage" },
      });
    },
    handleAdd() {
      this.$router.push({
        name: "AddVehicleManage",
        query: { beforeRouter: "vehicleFilesManage" },
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "AddVehicleManage",
        query: {
          carId: row.carId,
          canEdit: true,
          beforeRouter: "vehicleFilesManage",
        },
      });
    },
    async editStatus(row) {
      let res = await editVehicleStatus({
        status: row.status == 1 ? 2 : 1,
        carList: [{ carId: row.carId.toString() }],
      });
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getList();
      }
    },
    async downloadExcleClick() {
      this.downloadLoading = true;
      let res = await vehicleDownloadExcle({
        ...this.listQuery,
      });
      // Just to simulate the time of the request
      downLoadFile(res, "车辆列表", this, () => {
        setTimeout(() => {
          this.downloadLoading = false;
        }, 1.5 * 1000);
        this.$message.success("下载成功");
      });
    },
  },
};
</script>
