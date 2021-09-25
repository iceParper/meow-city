<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="7">
            <el-form-item label="banner类型">
              <el-select
                v-model="listQuery.bannerType"
                style="width: 200px;"
                placeholder="banner类型"
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
          <el-col :span="7">
            <el-form-item label="上下架">
              <el-select v-model="listQuery.status" style="width: 200px;" placeholder="上下架">
                <el-option
                  v-for="item in statusOptions1"
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
                @click="handleFilter"
                v-if="handleBtnShow[0].isShow"
              >查询</el-button>
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-refresh"
                @click="handleReset"
              >重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="handle-container">
      <el-button-group>
        <el-button
          v-if="handleBtnShow[3].isShow"
          class="filter-item"
          size="mini"
          icon="el-icon-d-caret"
          type="primary"
          @click="handleEditbannerStatus"
          v-loading="isLoaded_1"
        >修改banner状态</el-button>
        <el-button
          icon="el-icon-delete"
          v-waves
          type="primary"
          v-loading="isLoaded_4"
          size="mini"
          @click="handleDel"
          v-if="handleBtnShow[5].isShow"
        >批量删除</el-button>
      </el-button-group>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        size="mini"
        icon="el-icon-plus"
        style="float: right;"
        @click="handleAdd"
        v-if="handleBtnShow[1].isShow"
      >新增</el-button>
    </div>

    <el-table
      ref="tableRef"
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      id="crTable"
      :row-key="getRowKeys"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>

      <el-table-column label="banner" align="center" width="140">
        <template slot-scope="{row}">
        <el-image
      style="width: 100px; height: 100px;border:1px solid #eee;"
       v-if="row.bannerPicture" :src="row.bannerPicture" 
      fit="contain"></el-image>
          <div class="brandLogo" v-else style="border:1px solid #eee;margin:0 auto;"></div>
        </template>
      </el-table-column>
      <el-table-column label="banner名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bannerName || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="banner类型" align="center">
        <template slot-scope="{row}">
          <span v-if="row.bannerType == 'IMG'">{{ '图片' || '--' }}</span>
          <span v-else-if="row.bannerType == 'H5'">{{ '网页地址' || '--' }}</span>
          <span v-else-if="row.bannerType == 'BRAND_HOME'">{{ '品牌首页' || '--' }}</span>
          <span v-else-if="row.bannerType == 'LIVE_LIST'">{{ '直播列表' || '--' }}</span>
          <span v-else-if="row.bannerType == 'LIVE_ROOM'">{{ '直播房间' || '--' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createAt || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上下架" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status == 1 ? '上架' : '下架' || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <!-- <el-button-group> -->

          <!-- <el-button
            v-waves
            style="width:60px;box-sizing:border-box;padding:7px 0;margin-bottom:10px;"
            class="filter-item"
            type="primary"
            size="mini"
            @click="handleEditStatus(row)"
            v-if="handleBtnShow[3].isShow && row.status == 2"
          >{{row.status == 1 ? '下架' : '上架'}}</el-button>
          <el-button
            v-waves
            style="width:60px;box-sizing:border-box;padding:7px 0;margin-bottom:10px;"
            class="fitter-item"
            type="danger"
            size="mini"
            @click="handleEditStatus(row)"
            v-if="handleBtnShow[3].isShow && row.status == 1"
          >{{row.status == 1 ? '下架' : '上架'}}</el-button>-->
          <el-button
            v-waves
            style="width:60px;box-sizing:border-box;padding:7px 0;margin-left:0;margin-bottom:10px;"
            class="filter-item"
            type="primary"
            plain
            size="mini"
            @click="handleEdit(row)"
            v-if="handleBtnShow[2].isShow"
          >修改</el-button>
          <!-- </el-button-group> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
    <el-dialog title="banner状态" :before-close="closeModal" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm1" :rules="rules1" :model="form1">
        <el-form-item label="banner状态" prop="bannerStatus" :label-width="formLabelWidth">
          <el-select v-model="form1.bannerStatus" placeholder="商品状态" style="width:90%;">
            <el-option
              v-for="item in statusOptions1"
              :key="item.key"
              :label="item.lab"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="handleEditbannerStatusSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="editVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dialogForm"
        label-position="right"
        label-width="80px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="名称" prop="bannerName">
          <el-input v-model="dialogForm.bannerName" :maxlength="16" />
        </el-form-item>
        <el-form-item label="banner类型" prop="bannerType">
          <el-select v-model="dialogForm.bannerType" style="width: 200px;" placeholder="banner类型">
            <el-option
              v-for="item in statusOptions"
              :key="item.key"
              :label="item.lab"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="bannerPicture">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="headers"
            :show-file-list="false"
            :on-success="headSuccess"
            :data="fileData"
            v-if="!dtlFlag"
          >
            <img v-if="dialogForm.bannerPicture" :src="dialogForm.bannerPicture" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-image
            v-else
            style="width:140px;height:140px;border-radius:8px;"
            :src="dialogForm.bannerPicture"
            :preview-src-list="avaterPreviewList"
          ></el-image>
        </el-form-item>
        <el-form-item label="目标对象">
          <el-select
            v-model="dialogForm.targetObj"
            style="width: 200px;"
            placeholder="品牌名称"
            v-if="dialogForm.bannerType == 'BRAND_HOME'"
          >
            <el-option
              v-for="item in brandSelList"
              :key="item.brandUuid"
              :label="item.brandName"
              :value="item.brandUuid"
            />
          </el-select>
          <el-input v-model="dialogForm.targetObj" v-else />
        </el-form-item>
        <el-form-item label="有效期自" prop="expiryStartAt">
          <el-date-picker
            v-model="dialogForm.expiryStartAt"
            type="datetime"
            placeholder="选择日期时间"
            style="width:100%;"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="有效期至" prop="expiryEndAt">
          <el-date-picker
            v-model="dialogForm.expiryEndAt"
            type="datetime"
            placeholder="选择日期时间"
            style="width:100%;"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上下架" prop="status">
          <el-select v-model="dialogForm.status" style="width: 200px;" placeholder="上下架">
            <el-option
              v-for="item in statusOptions1"
              :key="item.key"
              :label="item.lab"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="显示顺序" prop="seq">
          <el-input v-model="dialogForm.seq" />
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="isLoaded" @click="updateData()">确定</el-button>
        <el-button @click="closeModal">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  homeBannerList,
  homePageBannerStatus,
  homePageBannerDel,
  homePageEditSeq,
  homePageAdd,
  homePageEdit
} from "@/api/homePageManage";
import { brandSelList } from "@/api/brandManage";
import { uploadUrl } from "@/api/upload";
import Sortable from "sortablejs";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
import { getToken, getUserId } from "@/utils/auth";
export default {
  name: "BannerListManage",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      title: "",
      dtlFlag: false,
      formLabelWidth: "100px",
      isLoaded: false,
      isLoaded_1: false,
      isLoaded_2: false,
      isLoaded_3: false,
      isLoaded_4: false,
      tableData: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      editVisible: false,
      selectedData: [],
      uploadUrl,
      headers: {},
      statusOptions: [
        { key: 1, lab: "图片", value: "IMG" },
        { key: 2, lab: "网页地址", value: "H5" },
        { key: 3, lab: "品牌首页", value: "BRAND_HOME" },
        { key: 4, lab: "直播间列表", value: "LIVE_LIST" },
        { key: 5, lab: "直播间", value: "LIVE_ROOM" }
      ],
      statusOptions1: [
        { key: 0, lab: "下架", value: 2 },
        { key: 1, lab: "上架", value: 1 }
      ],
      handleBtnShow: [
        {
          btnName: "ClassifyQuery",
          isShow: false
        },
        {
          btnName: "ClassifyDetail",
          isShow: false
        },
        {
          btnName: "ClassifyModify",
          isShow: false
        },
        {
          btnName: "ClassifyModifyStatus",
          isShow: false
        },
        {
          btnName: "ClassifyModifySeq",
          isShow: false
        },
        {
          btnName: "ClassifyAdd",
          isShow: false
        },
        {
          btnName: "ClassifyNavigationAdd",
          isShow: false
        },
        {
          btnName: "ClassifyRemove",
          isShow: false
        }
      ],
      form1: {
        bannerStatus: ""
      },
      seqForms: {
        tableData: []
      },
      dialogForm: {
        bannerName: "",
        bannerType: "",
        bannerPicture: "",
        targetObj: "",
        expiryStartAt: "",
        expiryEndAt: "",
        status: "",
        seq: 1
      },
      rules: {
        bannerName: [{ required: true, message: "必填项", trigger: "blur" }],
        bannerType: [{ required: true, message: "必填项", trigger: "blur" }],
        bannerPicture: [{ required: true, message: "必填项", trigger: "blur" }],
        targetObj: [{ required: true, message: "必填项", trigger: "blur" }],
        expiryStartAt: [{ required: true, message: "必填项", trigger: "blur" }],
        expiryEndAt: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
        seq: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      rules1: {
        bannerStatus: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      selectedData: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        liveName: undefined,
        liveStatus: undefined,
        status: undefined
      },
      fileData: {
        fileType: 1
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "5天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 5);
              picker.$emit("pick", date);
            }
          },
          {
            text: "10天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 10);
              picker.$emit("pick", date);
            }
          },
          {
            text: "30天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", date);
            }
          },
          {
            text: "长期",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 36500);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      handleBtnShow: [
        {
          btnName: "HomePageBannerQuery",
          isShow: false
        },
        {
          btnName: "HomePageBannerAdd",
          isShow: false
        },
        {
          btnName: "HomePageBannerModify",
          isShow: false
        },
        {
          btnName: "HomePageBannerModifyStatus",
          isShow: false
        },
        {
          btnName: "HomePageBannerModifySeq",
          isShow: false
        },
        {
          btnName: "HomePageBannerRemove",
          isShow: false
        }
      ],
      brandSelList: []
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
    this.token = getToken();
    this.userId = getUserId();
    this.headers = {
      _t: this.token,
      _u: this.userId
    };
    this.getList();
    this.getBrandSelList();
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.selectedData = val;
    },

    async getList() {
      this.listLoading = true;
      let res = await homeBannerList({
        ...this.listQuery
      });
      if (res.rtn == 1) {
        console.log(res, "res");
        this.list = res.result.bannerList;
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
        liveName: undefined,
        liveStatus: undefined,
        status: undefined
      };
      this.getList();
    },
    async handleEditStatus(row) {
      let res = await homePageBannerStatus({
        status: row.status == 1 ? 2 : 1,
        bannerList: [{ bannerId: row.bannerId }]
      });
      if (res.rtn == 1) {
        if (row.status == 1) {
          this.$message.success("已下架");
        } else {
          this.$message.success("已下架");
        }
        this.getList();
      }
    },

    handleEditbannerStatus() {
      if (this.$refs["dataForm1"] !== undefined) {
        this.$refs.dataForm1.resetFields();
      }
      if (this.selectedData && this.selectedData.length > 0) {
        this.dialogFormVisible1 = true;
      } else {
        this.$message("请勾选要修改的商品");
      }
    },
    closeModal() {
      this.dialogFormVisible1 = false;
      this.dialogFormVisible2 = false;
      this.dialogFormVisible3 = false;
      this.editVisible = false;
      this.selectedData = [];
      this.$refs.tableRef.clearSelection();
    },
    handleDel() {
      if (this.selectedData && this.selectedData.length > 0) {
        this.$confirm("此次操作将删除该banner, 是否继续?", "删除banner", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            this.isLoaded_4 = true;
            const bannerListArr = [];
            this.selectedData.forEach((item, index) => {
              const bannerListJson = {};
              bannerListJson.bannerId = item.bannerId;
              bannerListArr.push(bannerListJson);
            });

            console.log(bannerListArr, "======");
            let res = await homePageBannerDel({
              bannerList: bannerListArr
            });

            console.log(res);
            if (res.rtn == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.getList();
            this.isLoaded_4 = false;
          })
          .catch(() => {
            this.selectedData = [];
            this.$refs.tableRef.clearSelection();
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        this.$message("请勾选要删除的商品");
      }
    },
    handleEditbannerStatusSubmit() {
      this.$refs.dataForm1.validate(async valid => {
        if (valid) {
          this.isLoaded_1 = true;
          const bannerListArr = [];
          this.selectedData.forEach((item, index) => {
            const bannerListJson = {};
            bannerListJson.bannerId = item.bannerId;
            bannerListArr.push(bannerListJson);
          });

          let res = await homePageBannerStatus({
            bannerList: bannerListArr,
            status: this.form1.bannerStatus
          });
          console.log(res);
          if (res.rtn == 1) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          }

          this.getList();
          this.isLoaded_1 = false;
          this.dialogFormVisible1 = false;
        }
      });
    },
    handleAdd() {
      this.editVisible = true;
      this.title = "新增轮播图";
      this.dialogForm = {
        bannerName: "",
        bannerType: "",
        bannerPicture: "",
        targetObj: "",
        expiryStartAt: "",
        expiryEndAt: "",
        status: "",
        seq: 1
      };
    },
    getRowKeys(row) {
      return row.bannerId; // 每条数据的唯一识别值
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
          console.log(_this, "--------");
          const currRow = _this.list.splice(oldIndex, 1)[0];
          _this.list.splice(newIndex, 0, currRow);
          console.log(_this.list, "11111");
          const bannerList = [];
          _this.list.forEach((item, index) => {
            const bannerListItem = {};
            bannerListItem.bannerId = item.bannerId;
            bannerListItem.seq = (index + 1) * 100;
            bannerList.push(bannerListItem);
          });
          let res = await homePageEditSeq({
            bannerList
          });
          if (res.rtn == 1) {
          }
        }
      });
    },
    // 头像上传
    headSuccess(res) {
      if (res.rtn == 1) {
        this.dialogForm.bannerPicture = res.url;
      }
    },
    updateData() {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          this.isLoaded = true;
          if (!this.editFlag) {
            const res = await homePageAdd(this.dialogForm);
            if (res.rtn == 1) {
              this.$message.success("创建成功!");
            }
          } else {
            const res = await homePageEdit(this.dialogForm);
            if (res.rtn == 1) {
              this.$message.success("修改成功!");
            }
            this.editFlag = false;
          }
          this.getList();
          this.editVisible = false;
          this.isLoaded = false;
        }
      });
    },
    handleEdit(row) {
      this.editVisible = true;
      this.editFlag = true;
      this.title = "修改轮播图";
      this.dialogForm = {
        bannerId: row.bannerId,
        bannerName: row.bannerName,
        bannerType: row.bannerType,
        bannerPicture: row.bannerPicture,
        targetObj: row.targetObj,
        expiryStartAt: row.expiryStartAt,
        expiryEndAt: row.expiryEndAt,
        status: row.status,
        seq: row.seq
      };
    },
    async getBrandSelList() {
      let res = await brandSelList({});
      console.log(res, "======");
      if (res.rtn == 1) {
        this.brandSelList = res.brandList;
      }
    }
  }
};
</script>
<style lang="scss">
.brandLogo {
  // width: 100px;
  height: 100px;
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
<style lang="scss" scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    vertical-align: middle;
  }
}
</style>