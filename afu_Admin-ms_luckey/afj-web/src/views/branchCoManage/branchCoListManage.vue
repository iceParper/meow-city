<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="分公司名称">
              <el-input
                v-model="listQuery.companyName"
                placeholder="分公司名称"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="负责人姓名">
              <el-input
                v-model="listQuery.contactName"
                placeholder="负责人姓名"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分公司方案">
              <el-select
                v-model="listQuery.companyRoleId"
                style="width: 200px"
                placeholder="分公司方案"
              >
                <el-option
                  v-for="item in roleList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码">
              <el-input
                v-model="listQuery.contactPhone"
                placeholder="手机号码"
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
                style="width: 200px"
                placeholder="状态"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.key"
                  :label="item.lab"
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
              <el-button
                v-waves
                :loading="downloadLoading"
                type="primary"
                class="filter-item"
                icon="el-icon-download"
                @click="downloadExcleClick"
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
      <el-table-column label="基本信息" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.companyName }}</div>
          <div>{{ row.contactName }}</div>
          <div>{{ row.contactPhone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所属区域" align="center">
        <template slot-scope="{ row }">
          <div>
            {{ row.province }}{{ row.city }}{{ row.county
            }}{{ row.detailAddress }}
          </div>
          <div>{{ row.companyRoleName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="喵市王国信息" align="center">
        <template slot-scope="{ row }">
          <div>总额度：{{ row.totalQuotaCopy || "--" }}万元</div>
          <div>剩余额度：{{ row.surplusQuota || "--" }}万元</div>
          <div>累计使用额度：{{ row.cumulativeUseQuota || "--" }}万元</div>
        </template>
      </el-table-column>
      <el-table-column label="积分信息" align="center">
        <template slot-scope="{ row }">
          <div>总积分：{{ row.totalRebate || "--" }}</div>
          <div>已使用积分：{{ row.useRebate || "--" }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="风险信息" align="center">
        <template>
          <div></div>
        </template>
      </el-table-column> -->
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.createAt }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.status == 1">启用</div>
          <div v-else-if="row.status == 2">冻结</div>
          <div v-else-if="row.status == 3">未设置审批流程</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            :type="row.status == 1 ? 'danger' : 'primary'"
            size="mini"
            plain
            @click="editStatus(row)"
            >{{ row.status == 1 ? "冻结" : "启用" }}</el-button
          >
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            plain
            v-if="handleBtnShow[3].isShow"
            @click="toDtl(row)"
            >详情</el-button
          >
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            plain
            v-if="row.status == 3 && handleBtnShow[5].isShow"
            @click="toWorkflow(row)"
            >设置审批</el-button
          >
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            plain
            v-if="row.status == 1 && handleBtnShow[5].isShow"
            @click="toWorkflowEdit(row)"
            >修改审批</el-button
          >
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            v-if="row.status != 3 && handleBtnShow[2].isShow"
            @click="handleEdit(row)"
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
      :title="!isEdit == 1 ? '创建分公司' : '修改分公司'"
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
        <el-form-item label="分公司名称" prop="companyName">
          <el-input v-model="dialogForm.companyName" placeholder="输入名称" />
        </el-form-item>
        <el-form-item label="分公司负责人" prop="contactName">
          <el-input v-model="dialogForm.contactName" placeholder="输入姓名" />
        </el-form-item>
        <el-form-item label="负责人手机号" prop="contactPhone">
          <el-input
            v-model="dialogForm.contactPhone"
            placeholder="负责人手机号"
          />
        </el-form-item>
        <el-form-item label="分公司配额" prop="quota">
          <el-input v-model="dialogForm.quota" placeholder="输入分公司配额" />
        </el-form-item>
        <el-form-item label="省市区" prop="province">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAddress">
          <el-input v-model="dialogForm.detailAddress" placeholder="详细地址" />
        </el-form-item>
        <el-form-item label="分公司方案" prop="companyRoleId">
          <el-select
            v-model="dialogForm.companyRoleId"
            placeholder="分公司方案"
            clearable
            style="width: 200px"
            class="filter-item"
          >
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCompany">确定</el-button>
        <el-button @click="cancelCompany">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import notify from "mixins/notify";
import { downLoadFile } from "@/utils/index";
import { uploadUrl } from "@/api/upload";
import {
  companyList,
  roleList,
  createCompany,
  editCompany,
  editCompanyStatus,
  companyDownloadExcle,
} from "@/api/branchCoManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
let id = 0;
export default {
  name: "BrandCoListManage",
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
        callback(new Error("只能为数字"));
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
      downloadLoading:false,
      options: regionData,
      CodeToText,
      TextToCode,
      selectedOptions: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      roleList: [],
      statusOptions: [
        { key: 1, lab: "启用", value: 1 },
        { key: 2, lab: "冻结", value: 2 },
        { key: 3, lab: "未设置审批流程", value: 3 },
      ],
      labelPosition: "left",
      uploadUrl,
      headers: {},
      rules: {
        companyName: [{ required: true, message: "必填项", trigger: "blur" }],
        contactName: [{ required: true, message: "必填项", trigger: "blur" }],
        contactPhone: [{ required: true, message: "必填项", trigger: "blur" }],
        province: [{ required: true, message: "必填项", trigger: "blur" }],
        detailAddress: [{ required: true, message: "必填项", trigger: "blur" }],
        companyRoleId: [{ required: true, message: "必填项", trigger: "blur" }],
        quota: [{ required: true, validator: isNum1, trigger: "blur" }],
        // status: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        companyName: undefined,
        contactName: undefined,
        contactPhone: undefined,
        companyRoleId: undefined,
        status: undefined,
      },
      handleBtnShow: [
        {
          btnName: "CompanyQuery",
          isShow: false,
        },
        {
          btnName: "CompanyAdd",
          isShow: false,
        },
        {
          btnName: "CompanyModify",
          isShow: false,
        },
        {
          btnName: "CompanyModifyStatus",
          isShow: false,
        },
        {
          btnName: "CompanyDetail",
          isShow: false,
        },
        {
          btnName: "CompanyModifyWorkflow",
          isShow: false,
        },
      ],
      dialogFormVisible: false,
      dialogForm: {
        companyId: undefined,
        companyName: undefined,
        contactName: undefined,
        contactPhone: undefined,
        companyRoleId: undefined,
        quota: undefined,
        // status: 1,
        province: undefined,
        city: undefined,
        county: undefined,
        detailAddress: undefined,
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
    this.getRoleList();
  },
  methods: {
    async getList() {
      this.listLoading = true;

      let res = await companyList({
        ...this.listQuery,
      });
      if (res.rtn == 1) {
        this.list = res.result.companyList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {

          if (item.totalQuota || item.totalQuota == 0) {
            item.totalQuotaCopy = (parseFloat(item.totalQuota) / 10000).toFixed(2);
          }

          if(item.surplusQuota || item.surplusQuota == 0){
            item.surplusQuota = (parseFloat(item.surplusQuota) / 10000).toFixed(2);
          }

          if(item.cumulativeUseQuota || item.cumulativeUseQuota){
            item.cumulativeUseQuota = (parseFloat(item.cumulativeUseQuota) / 10000).toFixed(2);
          }

          if (item.useQuota || item.useQuota == 0) {
            item.useQuota = parseFloat(item.useQuota).toFixed(2);
          }

          if (item.totalRebate || item.totalRebate == 0) {
            item.totalRebate = parseFloat(item.totalRebate).toFixed(2);
          }

          if (item.useRebate || item.useRebate == 0) {
            item.useRebate = parseFloat(item.useRebate).toFixed(2);
          }
        });
      }
      // Just to simulate the time of the request
      this.listLoading = false;
    },
    async getRoleList() {
      this.listLoading = true;

      let res = await roleList({});
      console.log(res);
      if (res.rtn == 1) {
        this.roleList = res.roleList;
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
        // 订单号
        companyName: undefined,
        // 订单状态
        contactName: undefined,
        contactPhone: undefined,
        companyRoleId: undefined,
        status: undefined,
      };
      this.getList();
    },
    handleChange(value) {
      console.log(this.selectedOptions);
      this.dialogForm.province = CodeToText[value[0]];
      this.dialogForm.city = CodeToText[value[1]];
      this.dialogForm.county = CodeToText[value[2]];
    },
    // 备注
    handleAdd() {
      this.dialogFormVisible = true;
      this.isEdit = false;
      this.dialogForm = {
        companyName: undefined,
        contactName: undefined,
        contactPhone: undefined,
        companyRoleId: undefined,
        quota: undefined,
        // status: 1,
        province: undefined,
        city: undefined,
        county: undefined,
        detailAddress: undefined,
      };
      this.selectedOptions = [];
    },
    handleEdit(row) {
      this.selectedOptions = [
        this.TextToCode[row.province].code,
        this.TextToCode[row.province][row.city].code,
        this.TextToCode[row.province][row.city][row.county].code,
      ];
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.dialogForm = {
        companyName: row.companyName,
        contactName: row.contactName,
        contactPhone: row.contactPhone,
        companyRoleId: row.companyRoleId,
        status: row.status,
        quota: row.totalQuota,
        province: row.province,
        city: row.city,
        county: row.county,
        detailAddress: row.detailAddress,
        companyId: row.companyId,
      };
    },

    async handleCompany() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            const res = await createCompany(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "创建成功",
              });
            }
          } else {
            const res = await editCompany(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          }
          this.dialogFormVisible = false;
          this.dialogForm = {
            companyName: undefined,
            contactName: undefined,
            contactPhone: undefined,
            companyRoleId: undefined,
            // status: 1,
            province: undefined,
            city: undefined,
            county: undefined,
            detailAddress: undefined,
            companyId: undefined,
          };
          this.getList();
        }
      });
    },
    cancelCompany() {
      this.$refs.dialogForm.resetFields();
      this.dialogFormVisible = false;
    },
    async editStatus(row) {
      let res = await editCompanyStatus({
        status: row.status == 1 ? 2 : 1,
        companyList: [{ companyId: row.companyId.toString() }],
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
        name: "BranchCoDtlManage",
        query: { companyId: row.companyId, beforeRouter: "BranchCoListManage" },
      });
    },
    toWorkflow(row) {
      this.$router.push({
        name: "BranchCoWorkflowManage",
        query: { companyId: row.companyId, beforeRouter: "BranchCoListManage" },
      });
    },
    toWorkflowEdit(row) {
      this.$router.push({
        name: "BranchCoWorkflowEditManage",
        query: { companyId: row.companyId, beforeRouter: "BranchCoListManage" },
      });
    },
    async downloadExcleClick() {
      this.downloadLoading = true;
      let res = await companyDownloadExcle({
        ...this.listQuery,
      });

      downLoadFile(res, "分公司列表", this, () => {
        setTimeout(() => {
          this.downloadLoading = false;
        }, 1.5 * 1000);
        this.$message.success("下载成功");
      });
    },
  },
};
</script>
