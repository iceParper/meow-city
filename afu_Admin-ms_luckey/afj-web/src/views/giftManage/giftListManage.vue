<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="手机号码">
              <el-input
                v-model="listQuery.phone"
                placeholder="手机号码"
                style="width: 200px"
                class="filter-item"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="奖品条码">
              <el-input
                v-model="listQuery.awardBarNo"
                placeholder="奖品条码"
                style="width: 200px"
                class="filter-item"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="奖品状态">
              <el-select
                v-model="listQuery.status"
                placeholder="奖品状态"
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
            <el-form-item label="轮播状态">
              <el-select
                v-model="listQuery.rotationStatus"
                placeholder="轮播状态"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in rotationStatusOpt"
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
          <div>{{ row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="奖品级别" align="center">
        <template slot-scope="{ row }">
          {{ awardLevelOpt[row.awardLevel].lab || "--" }}
        </template>
      </el-table-column>
      <el-table-column label="奖品名称" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.awardName || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="奖品描述" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.awardDescription || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="中奖时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.winAt || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="活动名称" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.lotteryName || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="抽奖店铺" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.storeName || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="奖品条码" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.awardBarNo || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.status == 1">{{ "未核销" }}</div>
          <div v-else-if="row.status == 2">{{ "已核销" }}</div>
          <div v-else-if="row.rotationStatus == 3">{{ "已过期" }}</div>
          <div v-else>{{ "锁定" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="核销时间" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.writeoffAt || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="轮播状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.rotationStatus == 1">{{ "参与" }}</div>
          <div v-else-if="row.rotationStatus == 2">{{ "不参与" }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        width="80"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-waves
            style="
              width: 64px;
              box-sizing: border-box;
              padding: 7px 0;
              margin: 0 0 10px;
            "
            class="filter-item"
            type="primary"
            :plain="row.status == 2"
            size="mini"
            v-if="
              handleBtnShow[2].isShow && row.status != 0 && row.status != 3
            "
            @click="switchWriteOff(row)"
            >{{ row.status == 1 ? "确认核销" : "取消核销" }}</el-button
          >
          <el-button
            v-waves
            style="
              width: 64px;
              box-sizing: border-box;
              padding: 7px 0;
              margin: 0 0 10px;
            "
            class="filter-item"
            type="sj"
            size="mini"
            :plain="row.rotationStatus == 2 ? true : false"
            @click="switchCarousel(row)"
            v-if="handleBtnShow[3].isShow && row.status == 0"
            >{{ row.rotationStatus == 1 ? "取消轮播" : "确认轮播" }}</el-button
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
      title="新增轮播"
      :visible.sync="dialogFormVisible"
      center
      @close="onCancel"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="活动名称" prop="lotteryNo">
          <el-select
            v-model="dialogForm.lotteryNo"
            placeholder="活动名称"
            clearable
            style="width: 200px"
            class="filter-item"
            @change="lotteryChange"
          >
            <el-option
              v-for="item in selectiveLotteryList"
              :key="item.lotteryId"
              :label="item.lotteryName"
              :value="item.lotteryNo"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="具体奖品"
          prop="awardId"
          v-if="dialogForm.lotteryNo"
        >
          <el-select
            v-model="dialogForm.awardId"
            placeholder="具体奖品"
            clearable
            style="width: 200px"
            class="filter-item"
          >
            <el-option
              v-for="item in giftSelList"
              :key="item.awardId"
              :label="item.awardName"
              :value="item.awardId"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="中奖时间" prop="winAt">
          <el-date-picker
            v-model="dialogForm.winAt"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="dialogForm.phone" placeholder="请输入电话号码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="确认核销"
      :visible.sync="dialogFormVisible1"
      width="50%"
      center
    >
      <div style="text-align: center">
        <span style="color: #101010">该奖品已过期： </span>
        <span style="color: #f26161">1天</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible1 = false"
          >确 定</el-button
        >
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import {
  giftList,
  writeOffStatus,
  selectiveSelList,
  createFakeData,
  rotationStatus,
} from "@/api/giftManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
let id = 0;
export default {
  name: "GiftListMange",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // orderNum:'',
      tableKey: 0,
      list: null,
      selectiveLotteryList: [],
      giftSelList: [],
      total: 0,
      awardLevelOpt: [
        {
          key: 0,
          lab: "谢谢惠顾",
          value: 0,
        },
        {
          key: 1,
          lab: "一等奖",
          value: 1,
        },
        {
          key: 2,
          lab: "二等奖",
          value: 2,
        },
        {
          key: 3,
          lab: "三等奖",
          value: 3,
        },
        {
          key: 4,
          lab: "四等奖",
          value: 4,
        },
        {
          key: 5,
          lab: "五等奖",
          value: 5,
        },
        {
          key: 6,
          lab: "六等奖",
          value: 6,
        },
        {
          key: 7,
          lab: "七等奖",
          value: 7,
        },
        {
          key: 8,
          lab: "八等奖",
          value: 8,
        },
        {
          key: 9,
          lab: "九等奖",
          value: 9,
        },
      ],
      listLoading: false,
      isEdit: false,
      isPlain: false,
      noticeList: [],
      statusOptions: [
        { label: "未核销", value: 1 },
        { label: "已核销", value: 2 },
        { label: "已过期", value: 3 },
        { label: "锁定", value: 0 },
      ],
      rotationStatusOpt: [
        { label: "参与", value: 1 },
        { label: "不参与", value: 2 },
      ],

      labelPosition: "left",
      uploadUrl,
      headers: {},
      rules: {
        awardId: [{ required: true, message: "必填项", trigger: "blur" }],
        lotteryNo: [{ required: true, message: "必填项", trigger: "blur" }],
        phone: [{ required: true, message: "必填项", trigger: "blur" }],
        winAt: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        status: undefined,
        rotationStatus: undefined,
        awardBarNo: undefined,
        phone: undefined,
      },
      fileData: {
        fileType: "banner",
      },
      handleBtnShow: [
        {
          btnName: "AppUserAwardQuery",
          isShow: false,
        },
        {
          btnName: "AppUserAwardFakeDataAdd",
          isShow: false,
        },
        {
          btnName: "AppUserAwardModifyWriteoffStatus",
          isShow: false,
        },
        {
          btnName: "AppUserAwardModifyRotationStatus",
          isShow: false,
        }
      ],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogForm: {
        awardId: undefined,
        phone: undefined,
        lotteryNo: undefined,
        lotteryId: undefined,
        winAt: undefined,
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
    this.getSelectiveSelList();
  },
  mounted() {},
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await giftList({
        ...this.listQuery,
      });
      if (res.rtn == 1) {
        this.list = res.appUserAwardList;
        this.total = res.total;
      }
      this.listLoading = false;
    },
    async getSelectiveSelList() {
      let res = await selectiveSelList({});
      if (res.rtn == 1) {
        this.selectiveLotteryList = res.selectiveLotteryList;
      }
    },
    lotteryChange() {
      this.selectiveLotteryList.some((item, index) => {
        if (this.dialogForm.lotteryNo == item.lotteryNo) {
          this.dialogForm.lotteryId = item.lotteryId;
          this.giftSelList = item.awardList;
        }
      });
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
        rotationStatus: undefined,
        awardBarNo: undefined,
        phone: undefined,
      };
      this.getList();
    },
    // 备注
    handleAdd() {
      this.dialogFormVisible = true;
      this.isisEdit = false;
      this.dialogForm = {
        awardId: undefined,
        phone: undefined,
        lotteryNo: undefined,
        lotteryId: undefined,
        winAt: undefined,
      };
    },

    async switchWriteOff(row) {
      let res = await writeOffStatus({
        status: row.status == 1 ? 2 : 1,
        userAwardId: row.userAwardId,
      });
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getList();
      }
    },

    async switchCarousel(row) {
      let res = await rotationStatus({
        rotationStatus: row.rotationStatus == 1 ? 2 : 1,
        userAwardId: row.userAwardId,
      });
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getList();
      }
    },

    async onSubmit() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          const res = await createFakeData({
            ...this.dialogForm,
          });
          if (res.rtn == 1) {
            this.$message({
              type: "success",
              message: "创建成功",
            });
          }

          this.dialogForm = {
            awardId: undefined,
            phone: undefined,
            lotteryNo: undefined,
            lotteryId: undefined,
            winAt: undefined,
          };

          this.dialogFormVisible = false;
          this.getList();
        }
      });
    },
    onCancel() {
      this.$refs.dataForm.resetFields();
      this.dialogFormVisible = false;
    },
    toDtl(row) {
      this.$router.push({
        name: "HomePageDtlManage",
        query: { bannerId: row.bannerId, beforeRouter: "HomePageManage" },
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
