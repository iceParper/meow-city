<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
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
        align="center"
      ></el-table-column>
      <el-table-column label="通知标题" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.msgTitle }}</div>
        </template>
      </el-table-column>
      <el-table-column label="通知副标题" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.msgSubtitle }}</div>
        </template>
      </el-table-column>
      <el-table-column label="通知图片" align="center">
        <template slot-scope="{ row }">
          <el-image
            fit="cover"
            :src="row.picUrl"
            alt=""
            style="width: 100px; height: 100px"
            :preview-src-list="[row.picUrl]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="阅读人数" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.views }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.createAt }}</div>
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
            type="info"
            size="mini"
            plain
            @click="handleDel(row)"
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
            v-if="handleBtnShow[4].isShow"
            >{{ row.status == 1 ? "冻结" : "启用" }}</el-button
          >
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            plain
            size="mini"
            @click="toDtl(row)"
            v-if="handleBtnShow[5].isShow"
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

    <el-dialog title="创建消息" :visible.sync="dialogFormVisible" center>
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="消息标题" prop="msgTitle">
          <el-input v-model="dialogForm.msgTitle" placeholder="消息标题" />
        </el-form-item>
        <el-form-item label="消息副标题" prop="msgSubtitle">
          <el-input v-model="dialogForm.msgSubtitle" placeholder="消息副标题" />
        </el-form-item>
        <el-form-item label="上传图片" prop="picUrl">
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
              v-if="dialogForm.picUrl"
              :src="dialogForm.picUrl"
              class="el-upload-list__item-thumbnail"
              style="width: 100%; height: 100%"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="通知内容" prop="msgContent">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6 }"
            v-model="dialogForm.msgContent"
            placeholder="通知内容"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
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
        <el-button type="primary" @click="handleNotice">确定</el-button>
        <el-button @click="cancelNotice">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import {
  noticeList,
  addNotice,
  editNotice,
  editNoticeStatus,
  delNotice,
  noticeDtl,
} from "@/api/operationManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
let id = 0;
export default {
  name: "MessageListManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // orderNum:'',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      isEdit: false,
      statusOptions: [
        { label: "启用", value: 1 },
        { label: "冻结", value: 2 },
      ],
      labelPosition: "left",
      uploadUrl,
      headers: {},
      rules: {
        msgTitle: [{ required: true, message: "必填项", trigger: "blur" }],
        msgSubtitle: [{ required: true, message: "必填项", trigger: "blur" }],
        picUrl: [{ required: true, message: "必填项", trigger: "blur" }],
        msgContent: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        status: undefined,
      },
      fileData: {
        fileType: "notice",
      },
      handleBtnShow: [
        {
          btnName: "NoticeQuery",
          isShow: false,
        },
        {
          btnName: "NoticeAdd",
          isShow: false,
        },
        {
          btnName: "NoticeModify",
          isShow: false,
        },
        {
          btnName: "NoticeRemove",
          isShow: false,
        },
        {
          btnName: "NoticeModifyStatus",
          isShow: false,
        },
        {
          btnName: "NoticeDetail",
          isShow: false,
        },
        {
          btnName: "OrderLogistis",
          isShow: false,
        },
        {
          btnName: "OrderModifyManualOrder",
          isShow: false,
        },
        {
          btnName: "OrderManualSend",
          isShow: false,
        },
      ],
      downloadLoading: false,
      dialogFormVisible: false,
      dialogForm: {
        msgTitle: undefined,
        msgSubtitle: undefined,
        picUrl: undefined,
        msgContent: undefined,
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
  },
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await noticeList({
        ...this.listQuery,
      });
      if (res.rtn == 1) {
        this.list = res.result.noticeList;
        this.total = res.result.total;
      }
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
        status: undefined,
      };
      this.getList();
    },
    // 备注
    handleAdd() {
      this.dialogFormVisible = true;
      this.isisEdit = false;
      this.dialogForm = {
        msgTitle: undefined,
        msgSubtitle: undefined,
        picUrl: undefined,
        msgContent: undefined,
        status: 1,
      };
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.isEdit = true;
      this._getBannerDtl(row);
    },
    async handleNotice() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          if (this.isEdit) {
            const res = await editNotice(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          } else {
            const res = await addNotice(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "创建成功",
              });
            }
          }
          this.dialogForm = {
            msgTitle: undefined,
            msgSubtitle: undefined,
            picUrl: undefined,
            msgContent: undefined,
            status: 1,
          };

          this.dialogFormVisible = false;
          this.getList();
        }
      });
    },
    cancelNotice() {
      this.$refs.dataForm.resetFields();
      this.dialogFormVisible = false;
    },
    async editStatus(row) {
      let res = await editNoticeStatus({
        status: row.status == 1 ? 2 : 1,
        noticeList: [{ noticeId: row.noticeId.toString() }],
      });
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getList();
      }
    },
    async handleDel(row) {
      const res = await delNotice({
        noticeId: row.noticeId,
      });
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getList();
      }
    },
    toDtl(row) {
      this.$router.push({
        name: "MessageDtlManage",
        query: { noticeId: row.noticeId, beforeRouter: "MessageListManage" },
      });
    },
    picUploadSuccess(res) {
      if (res.rtn == 1) {
        this.dialogForm.picUrl = res.url;
      }
    },
    async _getBannerDtl(row) {
      let res = await noticeDtl({
        noticeId: row.noticeId,
      });

      if (res.rtn == 1) {
        var noticeDtlJSON = res.result;
        this.dialogForm = {
          noticeId: noticeDtlJSON.noticeId,
          msgTitle: noticeDtlJSON.msgTitle,
          msgSubtitle: noticeDtlJSON.msgSubtitle,
          picUrl: noticeDtlJSON.picUrl,
          msgContent: noticeDtlJSON.msgContent,
          status: noticeDtlJSON.status,
        };
      }
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
