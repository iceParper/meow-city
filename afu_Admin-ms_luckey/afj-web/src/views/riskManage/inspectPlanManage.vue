<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="巡检计划">
              <el-input
                v-model="listQuery.inspectionPlanName"
                placeholder="巡检计划"
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
            <el-form-item label="类型">
              <el-select
                v-model="listQuery.inspectionPlanType"
                placeholder="类型"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in planTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核状态">
              <el-select
                v-model="listQuery.auditStatus"
                placeholder="类型"
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
      <el-table-column label="名称" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.inspectionPlanName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="车辆数量" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.cars }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所属分公司" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.companyName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.inspectionPlanType == 'everyDay'">每天</div>
          <div v-else-if="row.inspectionPlanType == 'everTwoDay'">每两天</div>
          <div v-else-if="row.inspectionPlanType == 'workDay'">工作日</div>
        </template>
      </el-table-column>
      <el-table-column label="完成情况" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.auditStatus == 1">审核中</div>
          <div v-else-if="row.auditStatus == 2">审核通过</div>
          <div v-else-if="row.auditStatus == 3">审核未通过</div>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.remarks }}</div>
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
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.status == 1">启用</div>
          <div v-else-if="row.status == 2">冻结</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="300"
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
            :disabled="row.auditStatus == 1"
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

    <el-dialog
      :title="isEdit ? '修改巡检计划' : '创建巡检计划'"
      :visible.sync="dialogFormVisible"
      center
    >
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="巡检计划名称" prop="inspectionPlanName">
          <el-input
            v-model="dialogForm.inspectionPlanName"
            placeholder="输入名称"
          />
        </el-form-item>
        <el-form-item label="所属分公司" prop="companyId">
          <el-select
            v-model="dialogForm.companyId"
            placeholder="分公司名称"
            clearable
            style="width: 200px"
            class="filter-item"
          >
            <el-option
              v-for="item in companyIdOptions"
              :key="item.companyId"
              :label="item.companyName"
              :value="item.companyId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="巡检类型" prop="inspectionPlanType">
          <el-select
            v-model="dialogForm.inspectionPlanType"
            placeholder="类型"
            clearable
            style="width: 200px"
            class="filter-item"
          >
            <el-option
              v-for="item in inspectionPlanTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dialogForm.remarks" placeholder="备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleInspectPlan">确定</el-button>
        <el-button @click="cancelInspectPlan">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import notify from "mixins/notify";
import {
  inspectionPlanList,
  addInspectionPlan,
  editInspectionPlan,
  inspectionPlanStatus,
} from "@/api/riskManage";
import { companyListQuery } from "@/api/systemManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
let id = 0;
export default {
  name: "InspectPlanManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // orderNum:'',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      companyIdOptions: [],
      isEdit: false,
      planTypeOptions: [
        {
          label: "每天",
          value: "everyDay",
        },
        {
          label: "每两天",
          value: "everTwoDay",
        },
        {
          label: "工作日",
          value: "workDay",
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
      inspectionPlanTypeOptions: [
        { label: "每天", value: "everyDay" },
        { label: "每两天", value: "everTwoDay" },
        { label: "工作日", value: "workDay" },
      ],
      labelPosition: "top",
      headers: {},
      rules: {
        inspectionPlanName: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        companyId: [{ required: true, message: "必填项", trigger: "blur" }],
        inspectionPlanType: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        inspectionPlanName: undefined,
        inspectionPlanType: undefined,
        auditStatus: undefined,
        status: undefined,
        companyId: undefined,
      },
      handleBtnShow: [
        {
          btnName: "RiskInspectionPlanQuery",
          isShow: false,
        },
        {
          btnName: "RiskInspectionPlanAdd",
          isShow: false,
        },
        {
          btnName: "RiskInspectionPlanModify",
          isShow: false,
        },
        {
          btnName: "RiskInspectionPlanDetail",
          isShow: false,
        },
        {
          btnName: "RiskInspectionPlanModifyStatus",
          isShow: false,
        },
      ],
      dialogFormVisible: false,
      dialogForm: {
        inspectionPlanName: undefined,
        companyId: undefined,
        inspectionPlanType: undefined,
        remarks: undefined,
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
    this.getList();
    this.getCompanyList();
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

      let res = await inspectionPlanList({
        ...this.listQuery,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.inspectionPlanList;
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
        pageNum: 1,
        pageSize: 20,
        inspectionPlanName: undefined,
        inspectionPlanType: undefined,
        auditStatus: undefined,
        status: undefined,
        companyId: undefined,
      };
      this.getList();
    },
    async getCompanyList() {
      const res = await companyListQuery({});
      if (res.rtn == 1) {
        this.companyIdOptions = res.companyList;
      }
    },
    async doRemark() {
      const res = await orderRemark(this.dialogForm);
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "备注成功!",
        });
        this.dialogFormVisible = false;
        this.getList();
      }
    },
    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "InspectPlanDtlManage",
        query: {
          inspectionPlanId: row.inspectionPlanId,
          beforeRouter: "InspectPlanManage",
        },
      });
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.isEdit = false;
      this.dialogForm = {
        inspectionPlanName: undefined,
        companyId: undefined,
        inspectionPlanType: undefined,
        remarks: undefined,
      };
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.dialogForm = {
        inspectionPlanId: row.inspectionPlanId,
        inspectionPlanName: row.inspectionPlanName,
        companyId: row.companyId,
        inspectionPlanType: row.inspectionPlanType,
        remarks: row.remarks,
      };
    },
    async editStatus(row) {
      let res = await inspectionPlanStatus({
        status: row.status == 1 ? 2 : 1,
        inspectionPlanList: [
          { inspectionPlanId: row.inspectionPlanId.toString() },
        ],
      });
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getList();
      }
    },
    async handleInspectPlan() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            const res = await addInspectionPlan(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "创建成功",
              });
            }
          } else {
            const res = await editInspectionPlan(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          }
          this.dialogFormVisible = false;
          this.dialogForm = {
            inspectionPlanName: undefined,
            companyId: undefined,
            inspectionPlanType: undefined,
            remarks: undefined,
          };
          this.getList();
        }
      });
    },
    cancelInspectPlan() {
      this.$refs.dialogForm.resetFields();
      this.dialogFormVisible = false;
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
