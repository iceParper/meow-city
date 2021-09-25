<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单编号">
              <el-input
                v-model="listQuery.orderNumber"
                placeholder="订单编号"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态">
              <el-select
                v-model="listQuery.orderStatus"
                placeholder="订单状态"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in orderStatusOptions_2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货号">
              <el-input
                v-model="listQuery.productItemNumber"
                placeholder="商品货号"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户经理">
              <el-input
                v-model="listQuery.cusManagerName"
                placeholder="客户经理名称"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商户名称">
              <el-input
                v-model="listQuery.marchantName"
                placeholder="商户名称"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="店铺名称">
              <el-input
                v-model="listQuery.shopName"
                placeholder="店铺名称"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商户编号">
              <el-input
                v-model="listQuery.merchantNumber"
                placeholder="商户编号"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发货状态">
              <el-select
                v-model="listQuery.ecpSyncStatus"
                placeholder="发货状态"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in ecpSyncStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手工单">
              <el-select
                v-model="listQuery.isManualOrder"
                placeholder="手工单状态"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in manualOrderStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="是否赊账">
              <el-select
                v-model="listQuery.isCredit"
                placeholder="是否赊账"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in isCreditOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="9">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="orderDate"
                style="width: 320px"
                type="datetimerange"
                class="filter-item"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="支付时间">
              <el-date-picker
                v-model="payDate"
                style="width: 320px"
                type="datetimerange"
                class="filter-item"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
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
              >查询</el-button>
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-refresh"
                @click="handleReset"
              >重置</el-button>
              <el-button
                v-waves
                :loading="downloadLoading"
                type="primary"
                class="filter-item"
                icon="el-icon-download"
                @click="downloadExcleClick"
                v-if="handleBtnShow[1].isShow"
              >导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>-->

    <!-- <div class="handle-container">
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        size="mini"
        icon="el-icon-plus"
        style="float: right;"
        @click="handleRemark"
      >新增</el-button>
    </div>-->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      class="leftText-table"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="图片">
        <template>
          <img src alt />
        </template>
      </el-table-column>
      <el-table-column label="车辆描述">
        <template>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column label="所属车商">
        <template>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column label="巡检员">
        <template>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column label="巡检时间">
        <template>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column label="CMS回复理由">
        <template>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="90" class-name="small-padding fixed-width">
        <template>
          <div style="margin-bottom:8px">
            <el-button
              v-waves
              style="width:60px;box-sizing:border-box;padding:7px 0;"
              class="filter-item"
              type="primary"
              size="mini"
              plain
            >详情</el-button>
          </div>
          <div>
            <el-button
              v-waves
              style="width:60px;box-sizing:border-box;padding:7px 0;"
              class="filter-item"
              type="primary"
              size="mini"
            >回复</el-button>
          </div>
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

    <el-dialog title="创建分公司" :visible.sync="dialogFormVisible" center>
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="分公司名称" prop="companyName">
          <el-input v-model="dialogForm.companyName" placeholder="输入名称" />
        </el-form-item>
        <el-form-item label="分公司负责人" prop="companyLeader">
          <el-input v-model="dialogForm.companyLeader" placeholder="输入姓名" />
        </el-form-item>
        <el-form-item label="负责人手机号" prop="leaderPhone">
          <el-input v-model="dialogForm.leaderPhone" placeholder="负责人手机号" />
        </el-form-item>
        <el-form-item label="分公司方案" prop="status">
          <el-select
            v-model="dialogForm.status"
            placeholder="类型"
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
        <el-form-item label="选择状态" prop="isUp">
          <el-switch
            v-model="dialogForm.isUp"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
          <span>{{dialogForm.isUp == 1 ? '启用' : '禁用'}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doRemark">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  orderStatusOptions,
  orderStatusArr,
  companyOptions,
  orderStatusOptions_2,
  ecpSyncStatusOptions,
  ecpSyncStatusArr,
  logisticsStatusArr
} from "@/models";
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import {
  orderList,
  orderRemark,
  orderSend,
  sendOrderAgain,
  downloadExcle,
  logisticsInfo,
  logisticsCompany,
  editManualOrder
} from "@/api/orderManage";
import { logisticsList } from "@/api/order";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
let id = 0;
export default {
  name: "TodayInspectManage",
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
      // orderNum:'',
      tableKey: 0,
      list: null,
      excleList: null,
      total: 0,
      excleTotal: 0,
      listLoading: false,
      sendAaginLoading: false,
      logisticsLoading: false,
      logisticsTraceListArr: [],
      fileData: {
        fileType: 1
      },
      statusOptions: [
        { label: "跳转Url", value: 1 },
        { label: "跳转实名认证页面", value: 2 }
      ],
      labelPosition: "left",
      uploadUrl,
      headers: {},
      manualOrderStatus: [
        {
          label: "是",
          value: 1
        },
        {
          label: "否",
          value: 0
        }
      ],
      rules: {
        picture: [{ required: true, message: "必填项", trigger: "blur" }],
        remark: [{ required: true, message: "必填项", trigger: "blur" }],
        status: [{ required: true, message: "必填项", trigger: "blur" }],
        isUp: [{ required: true, message: "必填项", trigger: "blur" }],
        url: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        // 订单号
        orderNumber: undefined,
        // 订单状态
        orderStatus: undefined,
        // 下单开始时间
        payStartAt: undefined,
        // 下单结束时间
        payEndAt: undefined,
        // 客户经理名称
        cusManagerName: undefined,
        // 货号
        productItemNumber: undefined,
        // 客户名称
        marchantName: undefined,
        // 商户id
        merchantNumber: undefined,
        // 商户名称
        shopName: undefined,
        // 创建开始时间
        createStartAt: undefined,
        // 创建结束时间
        createEndAt: undefined,
        ecpSyncStatus: undefined,
        isCredit: undefined
      },
      handleBtnShow: [
        {
          btnName: "OrderQuery",
          isShow: false
        },
        {
          btnName: "OrderExport",
          isShow: false
        },
        {
          btnName: "OrderDetail",
          isShow: false
        },
        {
          btnName: "OrderRemark",
          isShow: false
        },
        {
          btnName: "OrderAgainSend",
          isShow: false
        },
        {
          btnName: "OrderManualSend",
          isShow: false
        },
        {
          btnName: "OrderLogistis",
          isShow: false
        },
        {
          btnName: "OrderModifyManualOrder",
          isShow: false
        },
        {
          btnName: "OrderManualSend",
          isShow: false
        }
      ],
      orderStatusArr,
      logisticsStatusArr,
      orderStatusOptions,
      orderStatusOptions_2,
      ecpSyncStatusOptions,
      ecpSyncStatusArr,
      companyOptions,
      orderDate: [],
      payDate: [],
      isCreditOptions: [
        {
          label: "赊账",
          value: 1
        },
        {
          label: "现款",
          value: 0
        }
      ],
      downloadLoading: false,
      dialogFormVisible: false,
      manualFormVisible: false,
      dialogForm: {
        picture: "",
        remark: "",
        status: "",
        isUp: 1
      },
      manualForm: {
        remark: ""
      },
      // 物流公司列表
      logisticsList: [],
      sendFormVisible: false,
      sendForm: {
        orderNumber: "",
        logisticsCode: "",
        logisticsChannel: "",
        logisticsNumber: ""
      },
      handleBtnFuncArr: [],
      sendRules: {
        logisticsCode: [{ required: true, message: "必填项", trigger: "blur" }],
        logisticsNumber: [
          { required: true, message: "必填项", trigger: "blur" }
        ],
        logisticsChannel: [
          { required: true, message: "必填项", trigger: "blur" }
        ]
      },
      manualRules: {
        remark: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      cascaderProps: {
        // checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map(item => ({
              value: ++id,
              label: `选项${id}`,
              leaf: level >= 2
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }, 1000);
        }
      },
      cascaderOptions: [],

      // 新加复选框
      selectedData: [],
      orderArr: []
      // ------------
      // head:''
    };
  },
  computed: {},
  created() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    this.headers = {
      _t: token,
      _u: userId
    };
    this.handleBtnFuncArr = JSON.parse(localStorage.getItem("functionList"));
    this.handleBtnFuncArr.forEach((item, index) => {
      this.handleBtnShow.forEach((val, idx) => {
        if (item == val.btnName) {
          val.isShow = true;
        }
      });
    });
    console.log(this.handleBtnShow);
    // this.getList();
    // this.getLogisticsList();
    // ------------------------
    // this.head = JSON.parse({
    //   'managerUuid': localStorage.getItem('managerUuid'),
    //   'password': localStorage.getItem('password')
    // })
    console.log(this.head);
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedData = val;
      console.log(this.selectedData);
      for (let i = 0; i < this.selectedData.length; i++) {
        this.orderArr.push(this.selectedData[i].orderNumber);
      }
      console.log(this.orderArr);
    },

    async getList() {
      this.listLoading = true;

      if (this.orderDate[0]) {
        var createStartAt = formatDate(new Date(this.orderDate[0]));
        this.listQuery.createStartAt = createStartAt;
      }
      if (this.orderDate[1]) {
        var createEndAt = formatDate(new Date(this.orderDate[1]));
        this.listQuery.createEndAt = createEndAt;
      }

      if (this.payDate[0]) {
        var payStartAt = formatDate(new Date(this.payDate[0]));
        this.listQuery.payStartAt = payStartAt;
      }
      if (this.payDate[1]) {
        var payEndAt = formatDate(new Date(this.payDate[1]));
        this.listQuery.payEndAt = payEndAt;
      }

      let res = await orderList({
        ...this.listQuery
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.orderList;
        this.list.forEach((item, index) => {
          if (item.logistics) {
            item.logistics.traceList = this.isJsonString(
              item.logistics.traceList
            )
              ? JSON.parse(item.logistics.traceList)
              : [];
          }
        });
        this.total = res.result.total;
      }
      // Just to simulate the time of the request
      this.listLoading = false;
    },
    isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
    async downloadExcleClick() {
      this.downloadLoading = true;
      if (this.orderDate[0]) {
        var createStartAt = formatDate(new Date(this.orderDate[0]));
        this.listQuery.createStartAt = createStartAt;
      }
      if (this.orderDate[1]) {
        var createEndAt = formatDate(new Date(this.orderDate[1]));
        this.listQuery.createEndAt = createEndAt;
      }

      if (this.payDate[0]) {
        var payStartAt = formatDate(new Date(this.payDate[0]));
        this.listQuery.payStartAt = payStartAt;
      }
      if (this.payDate[1]) {
        var payEndAt = formatDate(new Date(this.payDate[1]));
        this.listQuery.payEndAt = payEndAt;
      }
      let res = await downloadExcle({
        ...this.listQuery
      });
      // Just to simulate the time of the request
      setTimeout(() => {
        this.downloadLoading = false;
      }, 1.5 * 1000);
    },
    // 获取物流公司列表
    async getLogisticsList() {
      const res = await logisticsCompany();
      if (res.rtn == 1) {
        this.logisticsList = res.logisticsCompanyList;
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
        // 订单号
        orderNumber: undefined,
        // 订单状态
        orderStatus: undefined,
        // 下单开始时间
        payStartAt: undefined,
        // 下单结束时间
        payEndAt: undefined,
        // 客户经理名称
        cusManagerName: undefined,
        // 货号
        productItemNumber: undefined,
        // 客户名称
        marchantName: undefined,
        // 商户id
        merchantNumber: undefined,
        // 商户名称
        shopName: undefined,
        // 创建开始时间
        createStartAt: undefined,
        // 创建结束时间
        createEndAt: undefined,
        ecpSyncStatus: undefined,
        isCredit: undefined
      };
      this.orderDate = [];
      this.payDate = [];
      this.getList();
    },
    // 计算商品sku展示
    skuSplice(mapList, showMore) {
      if (showMore) {
        return mapList;
      }
      let returnMapList = [];
      let total = 0;
    },
    // 计算订单sku总数
    skuTotal(mapList) {},
    // 备注
    handleRemark() {
      console.log("---");
      this.dialogFormVisible = true;
    },
    handleSendAgain(row) {
      this.$confirm("ecp同步", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.sendAaginLoading = true;
          const res = await sendOrderAgain({
            orderNumber: row.orderNumber
          });
          if (res.rtn == 1) {
            this.$message.success("发货成功!");
            this.getList();
          }
          this.sendAaginLoading = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 点击发货按钮
    handleSend(row) {
      this.sendForm = {
        orderNumber: row.orderNumber,
        logisticsCode: "",
        logisticsNumber: "",
        logisticsChannel: ""
      };
      this.sendFormVisible = true;
      this.$nextTick(() => {
        this.$refs["sendForm"].clearValidate();
      });
    },

    async doRemark() {
      const res = await orderRemark(this.dialogForm);
      if (res.rtn == 1) {
        this.$message({
          type: "success",
          message: "备注成功!"
        });
        this.dialogFormVisible = false;
        this.getList();
      }
    },
    // 批量发货
    handleBatchSend() {},
    // 发货
    doSend() {
      this.$refs.sendForm.validate(async valid => {
        if (valid) {
          this.logisticsList.some((item, index) => {
            if (item.logisticsCode == this.sendForm.logisticsCode) {
              this.sendForm.logisticsChannel = item.logisticsChannel;
            }
          });

          const res = await orderSend({
            ...this.sendForm
          });
          if (res.rtn == 1) {
            this.$message.success("发货成功!");
            this.sendFormVisible = false;
            this.getList();
          }
        }
      });
    },
    handleDownload() {
      // console.log(this.orderArr.length);
      if (this.orderArr.length != 0) {
        this.clickToExport(this.orderArr);
        // this.downloadLoading = true
        // import('@/vendor/Export2Excel').then(excel => {
        //   const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        //   const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        //   const data = this.formatJson(filterVal, this.list)
        //   excel.export_json_to_excel({
        //     header: tHeader,
        //     data,
        //     filename: 'table-list'
        //   })
        //   this.downloadLoading = false
        // })
      }
    },
    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "OrderDetail",
        query: { orderUuid: row.orderNumber, beforeRouter: "OrderList" }
      });
    },
    async getLogistics(row) {
      this.logisticsLoading = true;
      let res = await logisticsInfo({
        orderNumber: row.orderNumber
      });
      if (res.rtn == 1) {
        row.logistics = res.result;
        this.$message({
          message: "刷新成功",
          type: "success"
        });
      }
      this.logisticsLoading = false;
    },
    makeManualOrder(row) {
      this.manualForm = {
        orderNumber: row.orderNumber,
        remark: ""
      };
      this.manualFormVisible = true;
    },
    cancleManualOrder() {
      this.manualFormVisible = false;
      this.$nextTick(() => {
        this.$refs["manualForm"].clearValidate();
      });
    },
    sendManualOrder() {
      this.$refs.manualForm.validate(async valid => {
        if (valid) {
          let res = await editManualOrder({
            ...this.manualForm
          });
          if (res.rtn == 1) {
            this.$message({
              message: "制作成功",
              type: "success"
            });
            this.getList();
          }
          this.manualFormVisible = false;
          this.$nextTick(() => {
            this.$refs["manualForm"].clearValidate();
          });
        }
      });
    },
    picUploadSuccess(res) {
      if (res.rtn == 1) {
        this.form.picture = res.url;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.manualBtn {
  color: #1890ff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
