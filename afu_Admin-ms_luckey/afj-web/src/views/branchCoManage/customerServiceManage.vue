<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户经理">
              <el-input
                v-model="listQuery.custmagerName"
                placeholder="客户经理名称"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码">
              <el-input
                v-model="listQuery.phone"
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
                filterable
                clearable
                style="width: 200px"
                placeholder="分公司"
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
            <el-form-item label="状态">
              <el-select
                v-model="listQuery.status"
                style="width: 200px"
                placeholder="状态"
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
          <el-col :span="24">
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
      <el-table-column label="头像" align="center" width="110">
        <template slot-scope="{ row }">
          <el-image
            fit="cover"
            :src="row.headUrl"
            alt=""
            style="width: 100px; height: 100px; margin-rihgt: 10px"
            :preview-src-list="[row.headUrl]"
          ></el-image>
          <!-- <img :src="row.headUrl" alt style="width: 100px; height: 100px" /> -->
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.custmagerName || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.phone || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="微信号" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.wechat || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所属分公司" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.companyName || "--" }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="关联后台用户ID" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.sysUserId || "--" }}</div>
        </template>
      </el-table-column> -->
      <el-table-column label="绑定openID" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.openId || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.serviceDeclaration || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.createAt || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.status == 1 ? "启用" : "冻结" }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="180"
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
            v-if="handleBtnShow[3].isShow"
            >{{ row.status == 1 ? "冻结" : "启用" }}</el-button
          >

          <!-- <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            size="mini"
            plain
            >删除</el-button
          > -->

          <!-- <el-button
              v-waves
              style="width:60px;box-sizing:border-box;padding:7px 0;"
              class="filter-item"
              type="primary"
              size="mini"
              plain
          >详情</el-button>-->

          <!-- <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            plain
            >用户</el-button
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

    <el-dialog
      :title="!isEdit == 1 ? '创建客服' : '修改客服'"
      :visible.sync="dialogFormVisible"
      center
    >
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 50px"
      >
        <el-form-item label="上传头像" prop="headUrl">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            list-type="picture-card"
            :show-file-list="false"
            :headers="headers"
            :data="fileData"
            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
            :on-success="picUploadSuccess"
          >
            <img
              v-if="dialogForm.headUrl"
              :src="dialogForm.headUrl"
              class="el-upload-list__item-thumbnail"
              style="width: 100%; height: 100%"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="客服姓名"
          prop="custmagerName"
          style="width: 300px"
        >
          <el-input v-model="dialogForm.custmagerName" />
        </el-form-item>
        <div style="display: flex; justify-content: space-between">
          <el-form-item label="电话" prop="phone" style="width: 200px">
            <el-input v-model="dialogForm.phone" />
          </el-form-item>
          <el-form-item label="微信号" prop="wechat" style="width: 200px">
            <el-input v-model="dialogForm.wechat" />
          </el-form-item>
        </div>
        <div style="display: flex" v-if="!isEdit">
          <el-form-item
            label="所属分公司"
            prop="companyId"
            style="width: 200px"
          >
            <el-select
              v-model="dialogForm.companyId"
              placeholder="所属分公司"
              filterable
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
        </div>
        <el-form-item label="服务宣言" prop="serviceDeclaration">
          <el-input v-model="dialogForm.serviceDeclaration" />
        </el-form-item>
        <el-form-item label="选择状态" prop="status">
          <el-switch
            v-model="dialogForm.status"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
          <span>{{ dialogForm.status == 1 ? "启用" : "冻结" }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCustomer">确定</el-button>
        <el-button @click="cancelCustomer">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import {
  custmagerList,
  createCustmager,
  editCustmager,
  editCustmagerStatus,
} from "@/api/branchCoManage";
import { companyListQuery } from "@/api/systemManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
let id = 0;
export default {
  name: "RoleListManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // orderNum:'',
      isEdit: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      companyIdOptions: [],
      fileData: {
        fileType: "custmager",
      },
      statusOptions: [
        { key: 1, label: "启用", value: 1 },
        { key: 2, label: "冻结", value: 2 },
      ],
      labelPosition: "top",
      uploadUrl,
      headers: {},
      rules: {
        custmagerName: [{ required: true, message: "必填项", trigger: "blur" }],
        phone: [{ required: true, message: "必填项", trigger: "blur" }],
        headUrl: [{ required: true, message: "必填项", trigger: "blur" }],
        wechat: [{ required: true, message: "必填项", trigger: "blur" }],
        serviceDeclaration: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        companyId: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        custmagerName: undefined,
        phone: undefined,
        companyId: undefined,
        status: undefined,
      },
      handleBtnShow: [
        {
          btnName: "CustMagerQuery",
          isShow: false,
        },
        {
          btnName: "CustMagerAdd",
          isShow: false,
        },
        {
          btnName: "CustMagerModify",
          isShow: false,
        },
        {
          btnName: "CustMagerModifyStatus",
          isShow: false,
        },
        {
          btnName: "CustMagerDetail",
          isShow: false,
        },
      ],
      dialogFormVisible: false,
      dialogForm: {
        custmagerName: undefined,
        phone: undefined,
        headUrl: undefined,
        wechat: undefined,
        serviceDeclaration: undefined,
        companyId: undefined,
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
    this.getList();
    this.getCompanyList();
  },
  methods: {
    async getList() {
      this.listLoading = true;

      let res = await custmagerList({
        ...this.listQuery,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.custmangerList;
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
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 20,
        custmagerName: undefined,
        phone: undefined,
        companyId: undefined,
        status: undefined,
      };
      this.getList();
    },

    handleAdd() {
      this.dialogFormVisible = true;
      this.isEdit = false;
      this.dialogForm = {
        custmagerName: undefined,
        phone: undefined,
        headUrl: undefined,
        wechat: undefined,
        serviceDeclaration: undefined,
        companyId: undefined,
        status: 1,
      };
    },

    handleEdit(row) {
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.dialogForm = {
        custmagerId: row.custmagerId,
        custmagerName: row.custmagerName,
        phone: row.phone,
        headUrl: row.headUrl,
        wechat: row.wechat,
        serviceDeclaration: row.serviceDeclaration,
        // companyId: row.companyId,
        status: row.status,
      };
    },
    async handleCustomer() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            const res = await createCustmager(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "新建成功",
              });
            }
          } else {
            const res = await editCustmager(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          }
          this.dialogFormVisible = false;
          this.getList();
        }
      });
    },
    cancelCustomer() {
      this.$refs.dialogForm.resetFields();
      this.dialogFormVisible = false;
    },
    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "OrderDetail",
        query: { orderUuid: row.orderNumber, beforeRouter: "OrderList" },
      });
    },
    async editStatus(row) {
      let res = await editCustmagerStatus({
        status: row.status == 1 ? 2 : 1,
        custmagerList: [{ custmagerId: row.custmagerId.toString() }],
      });
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getList();
      }
    },

    picUploadSuccess(res) {
      if (res.rtn == 1) {
        this.dialogForm.headUrl = res.url;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
