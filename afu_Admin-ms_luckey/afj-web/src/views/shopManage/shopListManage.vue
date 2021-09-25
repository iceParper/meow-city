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
            <el-form-item label="负责人">
              <el-input
                v-model="listQuery.responsiblePersonName"
                placeholder="负责人名称"
                style="width: 200px"
                class="filter-item"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="店铺地址">
              <el-input
                v-model="listQuery.address"
                placeholder="店铺地址"
                style="width: 200px"
                class="filter-item"
              />
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
      <el-button
        v-waves
        :loading="downloadLoading"
        type="primary"
        class="filter-item"
        icon="el-icon-download"
        @click="downloadExcleClick"
        >导出</el-button
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
          <div>{{ row.storeName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="店铺地址" align="center">
        <template slot-scope="{ row }">
          <div v-html="row.address">
            {{ row.address }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="开店时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.openingTime }}</div>
        </template>
      </el-table-column>
      <el-table-column label="当前活动" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.currentLotteryName || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="店铺累计抽奖人数" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.accumulativeLuckDrawNum }}</div>
        </template>
      </el-table-column>
      <el-table-column label="负责人信息" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.responsiblePersonName }}</div>
          <div>{{ row.responsiblePersonPhone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="客服信息" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.customerServiceName }}</div>
          <div>{{ row.customerServicePhone }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="240"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            :type="row.status == 2 ? 'success' : 'danger'"
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
            size="mini"
            plain
            @click="toDtl(row)"
            v-if="handleBtnShow[3].isShow"
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
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import { shopSelList } from "@/api/userManage";
import { shopList, editShopStatus } from "@/api/shopManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
let id = 0;
export default {
  name: "ShopListMange",
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
        storeName: undefined,
        responsiblePersonName: undefined,
        address: undefined,
        status: undefined,
      },
      fileData: {
        fileType: "banner",
      },
      handleBtnShow: [
        {
          btnName: "StoreQuery",
          isShow: false,
        },
        {
          btnName: "StoreAdd",
          isShow: false,
        },
        {
          btnName: "StoreModify",
          isShow: false,
        },
        {
          btnName: "StoreDetail",
          isShow: false,
        },
        {
          btnName: "StoreModifyStatus",
          isShow: false,
        },
      ],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogForm: {
        bannerName: undefined,
        bannerType: undefined,
        bannerPicture: undefined,
        targetObj: undefined,
        expiryEndAt: undefined,
        expiryEndAt: undefined,
        status: 1,
        seq: undefined,
      },
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
      let res = await shopList({
        ...this.listQuery,
      });
      if (res.rtn == 1) {
        this.list = res.storeList;
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
        storeName: undefined,
        responsiblePersonName: undefined,
        address: undefined,
        status: undefined,
      };
      this.getList();
    },
    // 备注
    handleAdd() {
      this.$router.push({
        name: "ShopEditManage",
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "ShopEditManage",
        query: {
          storeNo: row.storeNo,
          beforeRouter: "ShopListManage",
          canEdit: true,
        },
      });
    },
    async editStatus(row) {
      let res = await editShopStatus({
        status: row.status == 1 ? 2 : 1,
        storeNo: row.storeNo,
      });
      if (res.rtn == 1) {
        if (row.status == 1) {
          this.$message({
            type: "error",
            message: "冻结成功",
          });
        } else {
          this.$message({
            type: "success",
            message: "启用成功",
          });
        }
        this.getList();
      }
    },
    toDtl(row) {
      this.$router.push({
        name: "ShopDtlManage",
        query: {
          storeNo: row.storeNo,
          beforeRouter: "ShopListManage",
          isDtl: true,
        },
      });
    }
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
