<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="角色名称">
              <el-input
                v-model="listQuery.roleName"
                placeholder="角色名称"
                style="width: 200px"
                class="filter-item"
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
          <el-col :span="6">
            <el-form-item label="角色类型">
              <el-select
                v-model="listQuery.roleType"
                style="width: 200px"
                placeholder="角色类型"
              >
                <el-option
                  v-for="item in roleTypeOptions"
                  :key="item.key"
                  :label="item.lab"
                  :value="item.value"
                />
              </el-select>
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
      <!-- <el-button
        v-waves
        class="filter-item"
        type="danger"
        icon="el-icon-delete"
        @click="handleDelete"
      >批量删除</el-button>-->
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
      <el-table-column label="角色名称" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.roleName || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.description || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色类型" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.roleType == 1 ? "总公司" : "分公司" || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应用账号" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.users || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createAt || "--" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.updateAt || "--" }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="最后登录时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateAt || '--' }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="状态" align="center" width="50">
        <template slot-scope="{ row }">
          <span>{{ row.status === 1 ? "启用" : "冻结" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
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
            type="info"
            size="mini"
            plain
            @click="handleDelete(row)"
            v-if="handleBtnShow[3].isShow"
            >删除</el-button
          >
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            :type="row.status == 2 ? 'primary' : 'danger'"
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
  </div>
</template>

<script>
import { roleList, delRole, editRoleStatus } from "@/api/systemManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "SysRoleManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      btnLoading: false,
      formLabelWidth: "60px",
      statusOptions: [
        { key: 1, lab: "启用", value: 1 },
        { key: 2, lab: "冻结", value: 2 },
      ],
      roleTypeOptions: [
        {
          key: 1,
          lab: "总公司",
          value: 1,
        },
        {
          key: 2,
          lab: "分公司",
          value: 2,
        },
      ],
      handleBtnShow: [
        {
          btnName: "SysRoleQuery",
          isShow: false,
        },
        {
          btnName: "SysRoleAdd",
          isShow: false,
        },
        {
          btnName: "SysRoleModify",
          isShow: false,
        },
        {
          btnName: "SysRoleRemove",
          isShow: false,
        },
        {
          btnName: "SysRoleDetail",
          isShow: false,
        },
        {
          btnName: "SysRolePermissionTree",
          isShow: false,
        },
        {
          btnName: "SysRoleModifyStatus",
          isShow: false,
        },
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        roleName: undefined,
        status: undefined,
        roleType: undefined,
      }
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
      let res = await roleList(this.listQuery);
      if (res.rtn == 1) {
        this.list = res.result.roleList;
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
        roleName: undefined,
        status: undefined,
        roleType: undefined,
      };
      this.getList();
    },
    handleAdd() {
      this.$router.push({
        name: "SysRoleAddManage",
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "SysRoleAddManage",
        query: {
          roleId: row.roleId,
          beforeRouter: "SysRoleManage",
          canEdit: true,
        },
      });
    },
    async handleDelete(row) {
      console.log(row.roleId);
      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delRole({
            roleId: row.roleId.toString(),
          });
          if (res.rtn == 1) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          }
        })
        .catch(() => {});
    },
    toDtl(row) {
      this.$router.push({
        name: "SysRoleAddManage",
        query: {
          roleId: row.roleId,
          beforeRouter: "SystemRoleManage",
          isDtl: true,
        },
      });
    },
    async editStatus(row) {
      let res = await editRoleStatus({
        status: row.status == 1 ? 2 : 1,
        roleList: [{ roleId: row.roleId.toString() }],
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
