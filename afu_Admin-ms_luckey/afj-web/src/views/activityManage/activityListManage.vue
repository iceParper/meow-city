<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="店铺名称">
              <el-select
                v-model="listQuery.storeName"
                placeholder="店铺名称"
                clearable
                style="width: 200px"
                class="filter-item"
                filterable
              >
                <el-option
                  v-for="item in shopListOpt"
                  :key="item.storeId"
                  :label="item.storeName"
                  :value="item.storeName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动名称">
              <el-input
                placeholder="请填写活动名称"
                v-model="listQuery.lotteryName"
                style="width: 200px"
                class="filter-item"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="活动状态">
              <el-select
                v-model="listQuery.lotteryStatus"
                placeholder="活动状态"
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
    >
      <el-table-column
        fixed
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="店铺名称" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.storeName || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.lotteryName || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.beginAt || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.endAt || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="打开" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.openNum || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="参与" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.participationNum || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="中奖" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.winNum || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="绑定" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.bindPhoneNum || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="核销" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.writeoffNum || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="剩余奖品" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.surplusAwardNum || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="活动上架状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.publishStatus == 1">未上架</div>
          <div v-if="row.publishStatus == 2">上架中</div>
          <div v-if="row.publishStatus == 3">已下架</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.lotteryStatus == 1">活动未开始</div>
          <div v-else-if="row.lotteryStatus == 2">活动进行中</div>
          <div v-else>活动已结束</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="270"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
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
            plain
            @click="toDtl(row)"
            v-if="handleBtnShow[3].isShow"
            >详情</el-button
          >
          <el-button
            v-waves
            style="
              width: 60px;
              box-sizing: border-box;
              padding: 7px 0;
              margin-bottom: 10px;
            "
            class="filter-item"
            type="primary"
            size="mini"
            @click="handleEdit(row)"
            v-if="handleBtnShow[2].isShow"
            >修改</el-button
          >
          <el-button
            v-waves
            style="
              width: 60px;
              box-sizing: border-box;
              padding: 7px 0;
               margin-bottom: 10px;
            "
            class="filter-item"
            type="sj"
            :plain="row.publishStatus == 2 ? true : false"
            size="mini"
            @click="editStatus(row)"
            v-if="handleBtnShow[4].isShow"
            >{{ row.publishStatus == 2 ? "下架" : "上架" }}</el-button
          >
          <!-- <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="danger"
            size="mini"
            plain
            @click="handleEdit(row)"
            v-if="handleBtnShow[2].isShow"
            >删除</el-button
          > -->
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
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import { shopSelList } from "@/api/userManage";
import { activityList, activityEditStatus } from "@/api/activityManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
let id = 0;
export default {
  name: "ActivityListManage",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // orderNum:'',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      isEdit: false,
      isPlain: false,
      noticeList: [],
      statusOptions: [
        { label: "活动未开始", value: 1 },
        { label: "活动进行中", value: 2 },
        { label: "活动已结束", value: 3 },
      ],

      labelPosition: "left",
      uploadUrl,
      headers: {},
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        storeName: undefined,
        lotteryStatus: undefined,
        lotteryName: undefined,
      },
      fileData: {
        fileType: "banner",
      },
      handleBtnShow: [
        {
          btnName: "LotteryQuery",
          isShow: false,
        },
        {
          btnName: "LotteryAdd",
          isShow: false,
        },
        {
          btnName: "LotteryModify",
          isShow: false,
        },
        {
          btnName: "LotteryDetail",
          isShow: false,
        },
        {
          btnName: "LotteryModifyStatus",
          isShow: false,
        }
      ],
      shopListOpt: [],
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
    this.getShopSelList();
  },
  mounted() {},
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await activityList({
        ...this.listQuery,
      });

      if (res.rtn == 1) {
        this.list = res.lotteryList;
        this.total = res.total;
      }

      this.listLoading = false;
    },
    async getShopSelList() {
      let res = await shopSelList({});
      if (res.rtn == 1) {
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
        storeName: undefined,
        lotteryStatus: undefined,
        lotteryName: undefined,
      };
      this.getList();
    },
    // 备注
    handleAdd() {
      this.$router.push({
        name: "ActivityEditManage",
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "ActivityEditManage",
        query: {
          lotteryNo: row.lotteryNo,
          beforeRouter: "ActivityListManage",
          canEdit: true,
        },
      });
    },

    async editStatus(row) {
      let res = await activityEditStatus({
        publishStatus: row.publishStatus == 2 ? 3 : 2,
        lotteryNo: row.lotteryNo,
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
        name: "ActivityDtlManage",
        query: {
          lotteryNo: row.lotteryNo,
          beforeRouter: "ActivityListManage",
          isDtl: true,
        },
      });
    },
    picUploadSuccess(res) {
      if (res.rtn == 1) {
        this.dialogForm.bannerPicture = res.url;
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
