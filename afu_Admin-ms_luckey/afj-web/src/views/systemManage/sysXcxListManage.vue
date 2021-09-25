<template>
  <div class="app-container">
    <div class="handle-container">
      <el-button
        v-waves
        class="filter-item"
        size="mini"
        icon="el-icon-plus"
        style="float: right"
        @click="handleAdd"
        type="primary"
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
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column
        fixed
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="版本" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新日志" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.updateLog }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.status == 1 ? "审核中" : "已通过" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            size="mini"
            type="primary"
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
      :title="title"
      :before-close="closeModal"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" :rules="rules" :model="form">
        <el-form-item
          label="版本号"
          prop="version"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.version"
            :disabled="editVersion"
            placeholder="版本号"
            style="width: 450px"
          />
        </el-form-item>
        <el-form-item
          label="更新日志"
          prop="version"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.updateLog"
            :disabled="editVersion"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="请输入内容"
            style="width: 450px"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.key"
              :label="item.lab"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="isLoading" @click="onSubmit"
          >确 定</el-button
        >
        <el-button @click="closeModal">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { xcxList, xcxAdd, xcxEdit } from "@/api/systemManage";
import Sortable from "sortablejs";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
export default {
  name: "SysXcxListManage",
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
      title: "新增版本",
      formLabelWidth: "100px",
      isLoading: false,
      editVersion: false,
      statusOptions: [
        { key: 1, lab: "审核中", value: 1 },
        { key: 2, lab: "已审核", value: 2 },
      ],
      form: {
        version: "",
        status: "",
        updateLog:""
      },
      rules: {
        version: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      dialogFormVisible: false,
      handleBtnShow: [
        {
          btnName: "SysAppVersionQuery",
          isShow: false,
        },
        {
          btnName: "SysAppVersioAdd",
          isShow: false,
        },
        {
          btnName: "SysAppVersioModify",
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
      },
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
  mounted() {},
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await xcxList({
        ...this.listQuery,
      });
      if (res.rtn == 1) {
        console.log(res, "res");
        this.list = res.result.appVersionList;
        this.total = res.result.total;
        // Just to simulate the time of the request
        this.listLoading = false;
      }
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.title = "新增版本";
      console.log(this.form);
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.editVersion = true;
      this.title = "修改版本";
      this.form = {
        version: row.version,
        status: row.status,
        updateLog:row.updateLog
      };
      console.log(row);
    },
    closeModal() {
      this.editVersion = false;
      this.dialogFormVisible = false;
      this.$refs.dataForm.resetFields();
      this.form = {
        version: "",
        status: "",
        updateLog:""
      };
    },
    onSubmit() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          if (!this.editVersion) {
            let res = await xcxAdd({
              ...this.form,
            });
            if (res.rtn == 1) {
              this.dialogFormVisible = false;
              this.$message.success("创建成功!");
            }
          } else {
            let res = await xcxEdit({
              ...this.form,
            });
            if (res.rtn == 1) {
              this.dialogFormVisible = false;
              this.$message.success("修改成功!");
            }
          }
          this.isLoading = false;
          this.getList();
        }
      });
      console.log(this.form);
    },
  },
};
</script>
<style lang="scss">
.memberLogo {
  width: 40px;
  height: 40px;
}
.seqTable .el-form-item--small.el-form-item {
  margin-bottom: 0 !important;
}
.seqTable .el-dialog__body {
  margin: 0 !important;
  padding: 10px !important;
}

.el-form-item__error {
  padding-top: 4px !important;
}
</style>