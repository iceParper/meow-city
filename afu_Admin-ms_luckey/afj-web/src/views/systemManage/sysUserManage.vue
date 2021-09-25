<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="职员姓名">
              <el-input
                v-model="listQuery.userName"
                placeholder="职员姓名"
                style="width: 200px"
                class="filter-item"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话号码">
              <el-input
                v-model="listQuery.userPhone"
                placeholder="手机号码"
                style="width: 200px"
                class="filter-item"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户类型">
              <el-select
                v-model="listQuery.userType"
                style="width: 200px"
                placeholder="用户类型"
                clearable
              >
                <el-option
                  v-for="item in userTypeOptions"
                  :key="item.key"
                  :label="item.lab"
                  :value="item.value"
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
                clearable
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
          <el-col :span="24">
            <el-form-item label="时间">
              <el-date-picker
                v-model="queryDate"
                style="width: 360px"
                type="datetimerange"
                class="filter-item"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item>
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                :loading="btnLoading"
                @click="handleFilter"
                v-if="handleBtnShow[0].isShow"
                >查询</el-button
              >
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-refresh"
                :loading="btnLoading"
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
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="职员姓名" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.userName || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.userType == 1 ? "总公司" : "分公司" || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.roleName || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码/账号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.userPhone || "--" }}</span>
        </template>
      </el-table-column>
<!-- 
      <el-table-column label="所属店铺" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.companyName || "--" }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createAt || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登录时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.lastLoginAt || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="50">
        <template slot-scope="{ row }">
          <span>{{ row.status === 1 ? "启用" : "冻结" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="400"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <!-- <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="info"
            size="mini"
            plain
            @click="handleDelete(row)"
            v-if="handleBtnShow[5].isShow"
            >删除</el-button
          > -->
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="info"
            size="mini"
            plain
            @click="handleEditPsd(row)"
            v-if="handleBtnShow[3].isShow"
            >密码重置</el-button
          >
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            :type="row.status == 2 ? 'success' : 'danger'"
            size="mini"
            plain
            @click="editStatus(row)"
            v-if="handleBtnShow[6].isShow"
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
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
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

    <el-dialog title="密码重置" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="psdForm">
        <el-form-item
          label="密码"
          prop="userPassword"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入您要重置的密码"
            v-model="psdForm.userPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPsd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="密码确认" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm" :rules="rules" :model="psdForm">
        <el-form-item
          label="密码"
          prop="userPassword"
          :label-width="formLabelWidth"
        >
          <el-input
            placeholder="请输入密码"
            v-model="psdForm.userPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="delUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  userList,
  userUpdatestatus,
  editPsd,
  delUser,
  editUserStatus,
} from "@/api/systemManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
export default {
  name: "SysUserManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      btnLoading: false,
      formLabelWidth: "60px",
      psdForm: {
        userPassword: "",
        userId: "",
      },
      statusOptions: [
        { key: 1, lab: "启用", value: 1 },
        { key: 2, lab: "冻结", value: 2 },
      ],
      userTypeOptions: [
        { key: 1, lab: "总公司", value: 1 },
        { key: 2, lab: "分公司", value: 2 },
      ],
      handleBtnShow: [
        {
          btnName: "SysUserQuery",
          isShow: false,
        },
        {
          btnName: "SysUserAdd",
          isShow: false,
        },
        {
          btnName: "SysUserModify",
          isShow: false,
        },
        {
          btnName: "SysUserRestPassword",
          isShow: false,
        },
        {
          btnName: "SysUserDetail",
          isShow: false,
        },
        {
          btnName: "SysUserRemove",
          isShow: false,
        },
        {
          btnName: "SysUserModifyStatus",
          isShow: false,
        },
      ],
      rules: {
        userPassword: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        userName: undefined,
        userType: undefined,
        userPhone: undefined,
        status: undefined,
        startAt: undefined,
        endAt: undefined,
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      // 新增查询
      queryDate: [],
    };
  },
  created() {
    this.handleBtnFuncArr = JSON.parse(localStorage.getItem("functionList"));
    this.handleBtnFuncArr.forEach((item, index) => {
      this.handleBtnShow.forEach((val, idx) => {
        if (item == val.btnName) {
          val.isShow = true;
        }
      });
    });
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      if (this.queryDate[0]) {
        var startAt = formatDate(new Date(this.queryDate[0]));
        this.listQuery.startAt = startAt;
      }
      if (this.queryDate[1]) {
        var endAt = formatDate(new Date(this.queryDate[1]));
        this.listQuery.endAt = endAt;
      }
      let res = await userList({
        ...this.listQuery,
      });
      if (res.rtn == 1) {
        this.list = res.result.userList;
        this.total = res.result.total;
        // Just to simulate the time of the request
        this.listLoading = false;
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
        userName: undefined,
        userPhone: undefined,
        userType: undefined,
        status: undefined,
        startAt: undefined,
        endAt: undefined,
      };
      this.queryDate = [];
      this.getList();
    },
    handleAdd() {
      this.$router.push({
        name: "SysAddUserManage",
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "SysAddUserManage",
        query: {
          userId: row.userId,
          beforeRouter: "SysUserManage",
          canEdit: true,
        },
      });
    },
    handleEditPsd(row) {
      this.dialogFormVisible = true;
      this.psdForm.userId = row.userId;
    },
    editPsd() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          this.isLoaded = true;
          const res = await editPsd({
            ...this.psdForm,
          });
          if (res.rtn == 1) {
            this.psdForm = {
              userPassword: undefined,
              userId: undefined,
            };
            this.$message.success("修改成功");
            this.dialogFormVisible = false;
          }
        }
      });
    },
    async handleDelete(row) {
      console.log(row.roleId);
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.dialogFormVisible1 = true;
          this.psdForm.userId = row.userId;
        })
        .catch(() => {});
    },
    async delUser() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          this.isLoaded = true;
          const res = await delUser({
            ...this.psdForm,
          });
          if (res.rtn == 1) {
            this.psdForm = {
              userPassword: undefined,
              userId: undefined,
            };
            this.getList();
            this.$message.success("删除成功");
            this.dialogFormVisible1 = false;
          }
        }
      });
    },
    async editStatus(row) {
      let res = await editUserStatus({
        status: row.status == 1 ? 2 : 1,
        userList: [{ userId: row.userId.toString() }],
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
      this.$router.push({
        name: "SysUserDtlManage",
        query: {
          userId: row.userId,
          beforeRouter: "SysUserManage",
          isDtl: true,
        },
      });
    },
  },
};
</script>
