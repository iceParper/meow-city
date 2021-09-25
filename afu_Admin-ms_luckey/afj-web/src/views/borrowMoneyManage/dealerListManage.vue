<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="车商名称">
              <el-input
                v-model="listQuery.carDealersName"
                placeholder="车商名称"
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
          <!-- <el-col :span="6">
            <el-form-item label="客服姓名">
              <el-select
                v-model="listQuery.custmagerId"
                style="width: 200px"
                placeholder="客服姓名"
              >
                <el-option
                  v-for="item in custmagerSelOptions"
                  :key="item.custmagerId"
                  :label="item.custmagerName"
                  :value="item.custmagerId"
                />
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="认证状态">
              <el-select
                v-model="listQuery.authStatus"
                style="width: 200px"
                placeholder="认证状态"
              >
                <el-option
                  v-for="item in authStatusOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="listQuery.status"
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
      <el-table-column label="车商名称" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carDealersName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="认证人" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.authUserName || "--" }}</div>
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
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.createAt }}</div>
        </template>
      </el-table-column>
      <el-table-column label="认证类型" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.authIdentifyType == 2">手机号码认证</div>
          <div v-else-if="row.authIdentifyType == 3">银行卡认证</div>
          <div v-else>--</div>
        </template>
      </el-table-column>

      <el-table-column label="认证状态" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.authStatus == 1 ? "已认证" : "未认证" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.status == 1 ? "启用" : "冻结" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="冻结原因" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.frozenReason || "--" }}</div>
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
            type="primary"
            size="mini"
            plain
            @click="handleAuth(row)"
            v-if="handleBtnShow[5].isShow"
            :disabled="row.authStatus == 1"
            >请求认证</el-button
          >
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            :type="row.status == 1 ? 'danger' : 'primary'"
            size="mini"
            plain
            @click="editStatus(row)"
            v-if="handleBtnShow[3].isShow"
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
            v-if="handleBtnShow[4].isShow"
            >详情</el-button
          >
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

    <el-dialog
      :title="!isEdit ? '新增车商' : '修改车商'"
      :visible.sync="dialogFormVisible"
      center
    >
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 100px"
      >
        <!-- <el-form-item label="所属分公司" prop="companyId" v-if="!isEdit">
          <el-select
            v-model="dialogForm.companyId"
            style="width: 100%"
            placeholder="分公司名称"
            @change="getCustmagerSelList"
          >
            <el-option
              v-for="item in companyIdOptions"
              :key="item.companyId"
              :label="item.companyName"
              :value="item.companyId"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item
          label="所属客服"
          prop="custmagerId"
          v-if="dialogForm.companyId"
        >
          <el-select
            v-model="dialogForm.custmagerId"
            style="width: 100%"
            placeholder="客服名称"
          >
            <el-option
              v-for="item in custmagerSelOptions"
              :key="item.custmagerId"
              :label="item.custmagerName"
              :value="item.custmagerId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车商名称" prop="carDealersName" v-if="!isDisabled">
          <el-input
            v-model="dialogForm.carDealersName"
            placeholder="车商名称"
          />
        </el-form-item>
        <el-form-item label="认证人" prop="authUserName" v-if="!isDisabled">
          <el-input v-model="dialogForm.authUserName" placeholder="认证人" />
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="carDealersPhone"
          v-if="!isDisabled"
        >
          <el-input
            v-model="dialogForm.carDealersPhone"
            placeholder="手机号码"
            :maxlength="11"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDealer">确定</el-button>
        <el-button @click="cancelDealer">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="请求认证" :visible.sync="dialogFormVisible1" center>
      <el-form
        ref="dialogForm1"
        :rules="rules1"
        :model="dialogForm1"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 100px"
      >
        <el-form-item label="手机号码" prop="carDealersPhone">
          <el-input
            v-model="dialogForm1.carDealersPhone"
            placeholder="手机号码"
          />
        </el-form-item>
        <div>
          实名认证链接将发送到该手机号码，如果更改系统会同时更改车商基本信息重的手机号码。
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAuth">确定</el-button>
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import { downLoadFile } from "@/utils/index";
import {
  dealersList,
  addDealers,
  custmagerSelList,
  editDealers,
  editDealersStatus,
  dealersAuth,
  dealersDownloadExcle,
} from "@/api/borrowMoneyManage";
import { roleList } from "@/api/branchCoManage";
import { companyListQuery } from "@/api/systemManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
let id = 0;
export default {
  name: "DealerListManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // orderNum:'',
      isDisabled: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      downloadLoading: false,
      dialogFormVisible1: false,
      isEdit: false,
      companyIdOptions: [],
      propertyOwnerOptions: [],
      custmagerSelOptions: [],
      roleList: [],
      companyId: undefined,
      statusOptions: [
        { key: 1, label: "启用", value: 1 },
        { key: 2, label: "冻结", value: 2 },
      ],
      authStatusOptions: [
        { key: 0, label: "未认证", value: 0 },
        { key: 1, label: "已认证", value: 1 },
      ],
      labelPosition: "top",
      uploadUrl,
      headers: {},
      rules: {
        companyId: [{ required: true, message: "必填项", trigger: "blur" }],
        carDealersName: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        carDealersPhone: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        authUserName: [{ required: true, message: "必填项", trigger: "blur" }],
        custmagerId: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      rules1: {
        carDealersPhone: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        custmagerId: undefined,
        authStatus: undefined,
        status: undefined,
      },
      handleBtnShow: [
        {
          btnName: "LoanCarDealersQuery",
          isShow: false,
        },
        {
          btnName: "LoanCarDealersAdd",
          isShow: false,
        },
        {
          btnName: "LoanCarDealersModify",
          isShow: false,
        },
        {
          btnName: "LoanCarDealersModifyStatus",
          isShow: false,
        },
        {
          btnName: "LoanCarDealersDetail",
          isShow: false,
        },
        {
          btnName: "LoanCarDealersAuthSms",
          isShow: false,
        },
        {
          btnName: "LoanCarDealersLoadRepaymentQuery",
          isShow: false,
        },
        {
          btnName: "LoanCarDealersLoadChgQuery",
          isShow: false,
        },
      ],
      dialogFormVisible: false,
      dialogForm: {
        carDealersPhone: undefined,
        carDealersName: undefined,
        authUserName: undefined,
        companyId: undefined,
        custmagerId: undefined,
      },
      dialogForm1: {
        carDealersPhone: undefined,
        status: undefined,
        carDealersId: undefined,
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
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.companyId = userInfo.companyId;
    this.getList();
    this.getCompanyList();
    this.getCustmagerSelList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await dealersList({
        ...this.listQuery,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.carDealersList;
        this.total = res.result.total;
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

    async getCustmagerSelList(row) {
      const res = await custmagerSelList({
        companyId: this.companyId || row.companyId || this.dialogForm.companyId,
      });
      if (res.rtn == 1) {
        this.custmagerSelOptions = res.custmagerList;
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
        companyId: this.companyId,
        custmagerId: undefined,
        authStatus: undefined,
        status: undefined,
      };
      this.getList();
    },
    // 备注
    handleAdd() {
      this.dialogFormVisible = true;
      this.isEdit = false;
      this.dialogForm = {
        companyId: this.companyId,
        custmagerId: undefined,
        carDealersName: undefined,
        carDealersPhone: undefined,
        authUserName: undefined,
      };
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.custmagerSelOptions = [];
      this.getCustmagerSelList(row);
      if (row.authStatus == 1) {
        this.isDisabled = true;
        this.dialogForm = {
          carDealersId: row.carDealersId,
          companyId: row.companyId,
          custmagerId: row.custmagerId,
          authUserName: row.authUserName,
        };
      } else {
        this.isDisabled = false;
        this.dialogForm = {
          carDealersId: row.carDealersId,
          companyId: row.companyId,
          custmagerId: row.custmagerId,
          carDealersName: row.carDealersName,
          carDealersPhone: row.carDealersPhone,
          authUserName: row.authUserName,
        };
      }
    },
    async handleDealer() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            const res = await addDealers(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "创建成功",
              });
            }
          } else {
            const res = await editDealers(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          }
          this.dialogFormVisible = false;
          this.isDisabled = false;
          this.dialogForm = {
            companyId: this.companyId,
            custmagerId: undefined,
            carDealersName: undefined,
            carDealersPhone: undefined,
            authUserName: undefined,
          };
          this.getList();
        }
      });
    },
    cancelDealer() {
      this.$refs.dialogForm.resetFields();
      this.dialogFormVisible = false;
      this.dialogForm = {
        companyId: this.companyId,
        custmagerId: undefined,
        carDealersName: undefined,
        carDealersPhone: undefined,
        authUserName: undefined,
      };
      this.isDisabled = false;
    },
    async editStatus(row) {
      var status;
      if (row.status == 1) {
        status = 2;
      } else {
        status = 1;
      }
      const res = await editDealersStatus({
        status,
        carDealersList: [{ carDealersId: row.carDealersId }],
      });
      if (res.rtn == 1) {
        this.$message.success("修改成功");
        this.getList();
      }
    },
    handleAuth(row) {
      this.dialogFormVisible1 = true;
      this.dialogForm1.status = row.status;
      this.dialogForm1.carDealersPhone = row.carDealersPhone;
      this.dialogForm1.carDealersId = row.carDealersId;
    },

    async submitAuth() {
      this.$refs.dialogForm1.validate(async (valid) => {
        if (valid) {
          const res = await dealersAuth(this.dialogForm1);
          if (res.rtn == 1) {
            this.$message.success("认证请求已发送");
            this.dialogFormVisible1 = false;
            this.dialogForm1 = {
              status: undefined,
              carDealersId: undefined,
              carDealersPhone: undefined,
            };
            this.getList();
          }
        }
      });
    },

    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "DealerDtlManage",
        query: {
          carDealersId: row.carDealersId,
          beforeRouter: "DealerListManage",
        },
      });
    },
    async downloadExcleClick() {
      this.downloadLoading = true;
      let res = await dealersDownloadExcle({
        ...this.listQuery,
      });

      downLoadFile(res, "车商列表", this, () => {
        setTimeout(() => {
          this.downloadLoading = false;
        }, 1.5 * 1000);
        this.$message.success("下载成功");
      });
    },
  },
};
</script>
