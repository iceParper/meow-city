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
      id="crTable"
      :row-key="getRowKeys"
    >
      <el-table-column
        fixed
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="轮播图名称" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.bannerName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="banner图片" align="center">
        <template slot-scope="{ row }">
          <el-image
            fit="cover"
            :src="row.bannerPicture"
            alt=""
            style="width: 100px; height: 100px;"
            :preview-src-list="[row.bannerPicture]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.bannerType == 'IMG'">图片</div>
          <div v-else-if="row.bannerType == 'H5'">H5</div>
          <div v-else-if="row.bannerType == 'NOTICE'">通知</div>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.expiryStartAt }}</div>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.expiryEndAt }}</div>
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
            v-if="handleBtnShow[5].isShow"
            >{{ row.status == 1 ? "冻结" : "启用" }}</el-button
          >
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            plain
            size="mini"
            v-if="handleBtnShow[6].isShow"
            @click="toDtl(row)"
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

    <el-dialog title="创建轮播图" :visible.sync="dialogFormVisible" center>
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="轮播图名称" prop="bannerName">
          <el-input v-model="dialogForm.bannerName" placeholder="轮播图名称" />
        </el-form-item>
        <el-form-item label="上传图片" prop="bannerPicture">
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
              v-if="dialogForm.bannerPicture"
              :src="dialogForm.bannerPicture"
              class="el-upload-list__item-thumbnail"
              style="width: 100%; height: 100%"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="banner类型" prop="bannerType">
          <el-select
            v-model="dialogForm.bannerType"
            placeholder="类型"
            clearable
            style="width: 200px"
            class="filter-item"
          >
            <el-option
              v-for="item in bannerTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="URL地址"
          prop="targetObj"
          v-if="dialogForm.bannerType != 'NOTICE'"
        >
          <el-input v-model="dialogForm.targetObj" placeholder="填写Url" />
        </el-form-item>
        <el-form-item label="通知ID" prop="targetObj" v-else>
          <el-select
            v-model="dialogForm.targetObj"
            placeholder="通知ID"
            clearable
            style="width: 200px"
            class="filter-item"
          >
            <el-option
              v-for="item in noticeList"
              :key="item.noticeId"
              :label="item.msgTitle"
              :value="item.noticeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="expiryStartAt">
          <el-date-picker
            v-model="dialogForm.expiryStartAt"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间" prop="expiryEndAt">
          <el-date-picker
            v-model="dialogForm.expiryEndAt"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
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
        <!-- <el-form-item label="显示顺序" prop="seq">
          <el-input v-model="dialogForm.seq" placeholder="顺序" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleBanner">确定</el-button>
        <el-button @click="cancelBanner">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import Sortable from "sortablejs";
import {
  bannerList,
  addBanner,
  editBanner,
  editBannerStatus,
  delBanner,
  editBannerSeq,
  noticeList,
} from "@/api/operationManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
let id = 0;
export default {
  name: "HomePageManage",
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
      noticeList: [],
      statusOptions: [
        { label: "启用", value: 1 },
        { label: "冻结", value: 2 },
      ],
      bannerTypeOptions: [
        {
          label: "图片",
          value: "IMG",
        },
        {
          label: "H5",
          value: "H5",
        },
        {
          label: "通知",
          value: "NOTICE",
        },
      ],
      labelPosition: "left",
      uploadUrl,
      headers: {},
      rules: {
        bannerName: [{ required: true, message: "必填项", trigger: "blur" }],
        bannerPicture: [{ required: true, message: "必填项", trigger: "blur" }],
        bannerType: [{ required: true, message: "必填项", trigger: "blur" }],
        targetObj: [{ required: true, message: "必填项", trigger: "blur" }],
        expiryStartAt: [{ required: true, message: "必填项", trigger: "blur" }],
        expiryEndAt: [{ required: true, message: "必填项", trigger: "blur" }],
        seq: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        status: undefined,
      },
      fileData: {
        fileType: "banner",
      },
      handleBtnShow: [
        {
          btnName: "BannerQuery",
          isShow: false,
        },
        {
          btnName: "BannerAdd",
          isShow: false,
        },
        {
          btnName: "BannerModify",
          isShow: false,
        },
        {
          btnName: "BannerRemove",
          isShow: false,
        },
        {
          btnName: "BannerModifySeq",
          isShow: false,
        },
        {
          btnName: "BannerModifyStatus",
          isShow: false,
        },
        {
          btnName: "BannerDetail",
          isShow: false,
        },
      ],
      dialogFormVisible: false,
      dialogForm: {
        bannerName: undefined,
        bannerType: undefined,
        bannerPicture: undefined,
        targetObj: undefined,
        expiryEndAt: undefined,
        expiryEndAt: undefined,
        status: 1,
        seq: 100,
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
    this.getNoticeList();
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await bannerList({
        ...this.listQuery,
      });
      if (res.rtn == 1) {
        this.list = res.result.bannerList;
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
        bannerName: undefined,
        bannerType: undefined,
        bannerPicture: undefined,
        targetObj: undefined,
        expiryEndAt: undefined,
        expiryEndAt: undefined,
        status: 1,
        seq: 100,
      };
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.dialogForm = {
        bannerId: row.bannerId,
        bannerName: row.bannerName,
        bannerType: row.bannerType,
        bannerPicture: row.bannerPicture,
        targetObj: row.targetObj,
        expiryStartAt: row.expiryStartAt,
        expiryEndAt: row.expiryEndAt,
        status: row.status,
        seq: row.seq,
      };
    },
    async handleBanner() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          if (this.isEdit) {
            const res = await editBanner(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          } else {
            const res = await addBanner(this.dialogForm);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "创建成功",
              });
            }
          }
          this.dialogForm = {
            bannerName: undefined,
            bannerType: undefined,
            bannerPicture: undefined,
            targetObj: undefined,
            expiryEndAt: undefined,
            expiryEndAt: undefined,
            status: 1,
            seq: 100,
          };

          this.dialogFormVisible = false;
          this.getList();
        }
      });
    },
    cancelBanner() {
      this.$refs.dataForm.resetFields();
      this.dialogFormVisible = false;
    },
    async editStatus(row) {
      let res = await editBannerStatus({
        status: row.status == 1 ? 2 : 1,
        bannerList: [{ bannerId: row.bannerId.toString() }],
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
      const res = await delBanner({
        bannerId: row.bannerId,
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
        name: "HomePageDtlManage",
        query: { bannerId: row.bannerId, beforeRouter: "HomePageManage" },
      });
    },
    picUploadSuccess(res) {
      if (res.rtn == 1) {
        this.dialogForm.bannerPicture = res.url;
      }
    },
    getRowKeys(row) {
      return row.id; // 每条数据的唯一识别值
    },
    async getNoticeList() {
      let res = await noticeList({
        pageNum: 1,
        pageSize: 100000,
      });
      if (res.rtn == 1) {
        this.noticeList = res.result.noticeList;
        this.total = res.result.total;
      }
    },
    rowDrop() {
      const tbody = document
        .getElementById("crTable")
        .querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      if (!this.handleBtnShow[4].isShow) {
        return false;
      }
      Sortable.create(tbody, {
        async onEnd({ newIndex, oldIndex }) {
          console.log(newIndex, oldIndex);
          const currRow = _this.list.splice(oldIndex, 1)[0];
          console.log(_this.tableData);
          _this.list.splice(newIndex, 0, currRow);
          const bannerList = [];
          _this.list.forEach((item, index) => {
            const bannerListItem = {};
            bannerListItem.bannerId = item.bannerId;
            bannerListItem.seq = (index + 1) * 100;
            bannerList.push(bannerListItem);
          });
          let res = await editBannerSeq({
            bannerList,
          });
          if (res.rtn == 1) {
            // _this.getList();
          }
        },
      });
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
