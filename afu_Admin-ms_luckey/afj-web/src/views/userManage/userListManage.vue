<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="电话号码">
              <el-input
                v-model="listQuery.phone"
                placeholder="电话号码"
                style="width: 200px"
                class="filter-item"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="初始店铺">
              <el-select
                v-model="listQuery.firstStoreNo"
                placeholder="初始店铺"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in shopListOpt"
                  :key="item.storeId"
                  :label="item.storeName"
                  :value="item.storeNo"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="当前店铺">
              <el-select
                v-model="listQuery.currentStoreNo"
                placeholder="当前店铺"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in shopListOpt"
                  :key="item.storeId"
                  :label="item.storeName"
                  :value="item.storeNo"
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

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      class="leftText-table"
      style="width: 100%"
      id="crTable"
    >
      <el-table-column
        fixed
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="电话号码" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.phone || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="用户来源" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.originDescription }}</div>
        </template>
      </el-table-column>
      <el-table-column label="初始店铺" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.firstStoreName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="当前店铺" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.currentStoreName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="总抽奖数/已抽/剩余" align="center">
        <template slot-scope="{ row }">
          <div>
            {{
              row.totalTicketNum +
              "/" +
              row.usedTicketNum +
              "/" +
              row.surplusTicketNum
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="中奖数/已兑奖" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.winNum + "/" + row.writeoffNum }}</div>
        </template>
      </el-table-column>
      <el-table-column label="贡献用户数" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.devoteUserNum }}</div>
        </template>
      </el-table-column>
      <el-table-column label="最远链路数" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.farthestLinkLength }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.status == 1 ? "启用" : "拉黑" }}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="180"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-waves
            style="
              width: 100px;
              box-sizing: border-box;
              padding: 7px 0;
              margin-bottom: 10px;
            "
            class="filter-item"
            type="primary"
            size="mini"
            plain
            @click="addTimes(row)"
            v-if="handleBtnShow[4].isShow"
            >增加抽奖次数</el-button
          >

          <el-button
            v-waves
            style="
              width: 60px;
              box-sizing: border-box;
              padding: 7px 0;
              margin: 0;
              margin-bottom: 10px;
            "
            class="filter-item"
            type="primary"
            size="mini"
            @click="toDtl(row)"
            v-if="handleBtnShow[1].isShow"
            >详情</el-button
          >

          <el-button
            v-waves
            style="
              width: 100px;
              box-sizing: border-box;
              padding: 7px 0;
              margin: 0;
              margin-bottom: 10px;
            "
            class="filter-item"
            type="primary"
            size="mini"
            plain
            @click="changeCurShop(row)"
            v-if="handleBtnShow[3].isShow"
            >切换当前店铺</el-button
          >

          <el-button
            v-waves
            style="
              width: 60px;
              box-sizing: border-box;
              padding: 7px 0;
              margin: 0;
            "
            class="filter-item"
            :type="row.status == 1 ? 'danger' : 'success'"
            size="mini"
            @click="editStatus(row)"
            v-if="handleBtnShow[2].isShow"
            >{{ row.status == 1 ? "拉黑" : "启用" }}</el-button
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
      title="增加抽奖次数"
      width="50%"
      :visible.sync="dialogFormVisible"
      center
      @close="cancelAddTimes"
    >
      <div style="text-align: center; margin-bottom: 20px">
        <span style="color: #101010">为用户 {{ curUser }} 增加抽奖次数 </span>
      </div>
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        style="width: 300px; margin: 0 auto"
        align="center"
      >
        <el-form-item prop="ticketNum">
          <el-input
            v-model="dialogForm.ticketNum"
            placeholder="请输入要增加的次数"
            clearable
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddTimes">确定</el-button>
        <el-button @click="cancelAddTimes">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="切换当前店铺"
      :visible.sync="dialogFormVisible1"
      width="50%"
      center
    >
      <div style="text-align: center; margin-bottom: 20px">
        <span style="color: #101010">为用户 {{ curUser }} 切换当前店铺 </span>
      </div>
      <el-form
        ref="dialogForm1"
        :rules="rules1"
        :model="dialogForm1"
        align="center"
        @close="cancelChangeShop"
      >
        <el-form-item prop="storeNo">
          <el-select
            v-model="dialogForm1.storeNo"
            placeholder="店铺"
            clearable
            style="width: 200px"
            class="filter-item"
          >
            <el-option
              v-for="item in shopListOpt"
              :key="item.storeId"
              :label="item.storeName"
              :value="item.storeNo"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitChangeShop">确 定</el-button>
        <el-button @click="cancelChangeShop">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import { downLoadFile } from "@/utils/index";
import {
  userList,
  shopSelList,
  changeCurShop,
  editStatus,
  addTimes,
  userDownloadExcle
} from "@/api/userManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
let id = 0;
export default {
  name: "UserListMange",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // orderNum:'',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
        downloadLoading: false,
      isEdit: false,
      isPlain: false,
      noticeList: [],
      statusOptions: [
        { label: "启用", value: 1 },
        { label: "拉黑", value: 2 },
      ],
      labelPosition: "left",
      uploadUrl,
      headers: {},
      rules: {
        ticketNum: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      rules1: {
        storeNo: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        phone: undefined,
        status: undefined,
        currentStoreNo: undefined,
        firstStoreNo: undefined,
      },
      fileData: {
        fileType: "banner",
      },
      handleBtnShow: [
        {
          btnName: "AppUserQuery",
          isShow: false,
        },
        {
          btnName: "AppUserDetail",
          isShow: false,
        },
        {
          btnName: "AppUserModifyStatus",
          isShow: false,
        },
        {
          btnName: "AppUserModifyCurrentStore",
          isShow: false,
        },
        {
          btnName: "AppUserTicketAdd",
          isShow: false,
        },
      ],
      shopListOpt: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogForm: {
        ticketNum: undefined,
        appUserId: undefined,
      },
      dialogForm1: {
        storeNo: undefined,
        appUserId: undefined,
      },
      handleBtnFuncArr: [],
      curUser: "123 4567 8910",
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
    this.getShopSelList();
  },
  mounted() {},
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await userList({
        ...this.listQuery,
      });
      if (res.rtn == 1) {
        this.list = res.appUserList;
        this.total = res.total;
      }
      this.listLoading = false;
    },
    async getShopSelList() {
      let res = await shopSelList({});
      if (res.rtn == 1) {
        console.log(res, "-------");
        this.shopListOpt = res.SelectiveStoreList;
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
        phone: undefined,
        status: undefined,
        currentStoreNo: undefined,
        firstStoreNo: undefined,
      };
      this.getList();
    },

    addTimes(row) {
      this.dialogFormVisible = true;
      this.curUser = row.phone;
      this.dialogForm.appUserId = row.appUserId;
    },
    changeCurShop(row) {
      this.dialogFormVisible1 = true;
      this.curUser = row.phone;
      this.dialogForm1.appUserId = row.appUserId;
    },
    async submitAddTimes() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let res = await addTimes({
            ...this.dialogForm,
          });

          if (res.rtn == 1) {
            this.$message.success("增加成功!");
          }

          this.dialogForm = {
            appUserId: undefined,
            ticketNum: undefined,
          };

          this.dialogFormVisible = false;
          this.getList();
        }
      });
    },

    submitChangeShop() {
      this.$refs.dialogForm1.validate(async (valid) => {
        if (valid) {
          let res = await changeCurShop({
            ...this.dialogForm1,
          });

          if (res.rtn == 1) {
            this.$message.success("切换成功!");
          }

          this.dialogForm1 = {
            storeNo: undefined,
            appUserId: undefined,
          };

          this.dialogFormVisible1 = false;
          this.getList();
        }
      });
    },
    cancelAddTimes() {
      this.$refs.dialogForm.resetFields();
      this.dialogFormVisible = false;
      this.dialogForm = {
        appUserId: undefined,
        ticketNum: undefined,
      };
    },
    cancelChangeShop() {
      this.$refs.dialogForm1.resetFields();
      this.dialogFormVisible1 = false;
      this.dialogForm1 = {
        storeNo: undefined,
        appUserId: undefined,
      };
    },
    async editStatus(row) {
      let res = await editStatus({
        status: row.status == 1 ? 2 : 1,
        appUserId: row.appUserId,
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
        name: "UserDtlManage",
        query: { userId: row.appUserId, beforeRouter: "UserListManage" },
      });
    },
    async downloadExcleClick() {
      this.downloadLoading = true;
      let res = await userDownloadExcle({
        ...this.listQuery,
      });
      // Just to simulate the time of the request
      downLoadFile(res, "用户列表", this, () => {
        setTimeout(() => {
          this.downloadLoading = false;
        }, 1.5 * 1000);
        this.$message.success("下载成功");
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

.el-button--sj.is-active,
.el-button--sj:active {
  background: #7ac756;
  border-color: #7ac756;
  color: #fff;
}

.el-button--sj:focus,
.el-button--sj:hover {
  background: rgba(122, 199, 86, 0.8);
  border-color: #7ac756;
  color: #fff;
}

.el-button--sj {
  color: #fff;
  background-color: #7ac756;
  border-color: #7ac756;
}

.el-button--sj.is-plain {
  color: rgba(122, 199, 86, 1);
  background-color: rgba(122, 199, 86, 0.2);
  border-color: rgba(122, 199, 86, 0.5);
}

.el-button--sj.is-plain:focus,
.el-button--sj.is-plain:hover {
  background: #7ac756;
  border-color: #7ac756;
  color: #fff;
}
</style>
