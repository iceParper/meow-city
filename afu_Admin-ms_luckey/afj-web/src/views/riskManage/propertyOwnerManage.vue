<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="产权人">
              <el-input
                v-model="listQuery.ownerName"
                placeholder="产权人姓名"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号码">
              <el-input
                v-model="listQuery.ownerCardId"
                placeholder="产权人证件号"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码">
              <el-input
                v-model="listQuery.ownerPhone"
                placeholder="产权人手机号"
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
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="审核状态">
              <el-select
                v-model="listQuery.auditStatus"
                placeholder="审核状态"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in auditStatusOptions"
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
      ></el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.ownerName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="身份证号码" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.ownerCardId }}</div>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.ownerPhone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所属分公司" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.companyName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="名下车辆" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.cars }}</div>
        </template>
      </el-table-column>
      <el-table-column label="借款金额" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.loanQuota }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.createAt }}</div>
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
          <div>{{ row.auditReason || '--'}}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.status == 1 ? "启用" : "冻结" }}</div>
        </template>
      </el-table-column>
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
            :disabled="row.auditStatus == 1"
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
import { propertyOwnerList, editPropertyOwnerStatus } from "@/api/riskManage";
import { companyListQuery } from "@/api/systemManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
let id = 0;
export default {
  name: "PropertyOwnerManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      companyIdOptions: [],
      auditStatusOptions: [
        {
          label: "审核中",
          value: 1,
        },
        {
          label: "审核通过",
          value: 2,
        },
        {
          label: "审核未通过",
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
      uploadUrl,
      headers: {},
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        ownerName: undefined,
        ownerCardId: undefined,
        ownerPhone: undefined,
        status: undefined,
        companyId: undefined,
        auditStatus: undefined,
      },
      handleBtnShow: [
        {
          btnName: "RiskPropeertyOwnerQuery",
          isShow: false,
        },
        {
          btnName: "RiskPropeertyOwnerAdd",
          isShow: false,
        },
        {
          btnName: "RiskPropeertyOwnerModify",
          isShow: false,
        },
        {
          btnName: "RiskPropeertyOwnerDetail",
          isShow: false,
        },
        {
          btnName: "RiskPropeertyOwnerStatus",
          isShow: false,
        },
      ],
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

      let res = await propertyOwnerList({
        ...this.listQuery,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.propertyOwnerList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {
          if (item.loanQuota || item.loanQuota == 0) {
            item.loanQuota = parseFloat(item.loanQuota).toFixed(2);
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
        ownerName: undefined,
        ownerCardId: undefined,
        ownerPhone: undefined,
        status: undefined,
        companyId: undefined,
        auditStatus: undefined,
      };
      this.getList();
    },

    handleAdd() {
      this.$router.push({
        name: "AddPropertyOwnerManage",
        query: { beforeRouter: "propertyOwnerManage" },
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "AddPropertyOwnerManage",
        query: {
          ownerId: row.ownerId,
          canEdit: true,
          beforeRouter: "propertyOwnerManage",
        },
      });
    },
    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "PropertyOwnerDtlManage",
        query: { ownerId: row.ownerId, beforeRouter: "PropertyOwnerManage" },
      });
    },
    async editStatus(row) {
      let res = await editPropertyOwnerStatus({
        status: row.status == 1 ? 2 : 1,
        propertyOwnerList: [{ ownerId: row.ownerId.toString() }],
      });
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getList();
      }
    },
  },
};
</script>

