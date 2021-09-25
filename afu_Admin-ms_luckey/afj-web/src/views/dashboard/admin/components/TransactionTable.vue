<template>
  <div class="wrap">
    <div class="title">审批提醒</div>
    <el-table :data="list" height="350" style="width: 100%">
      <el-table-column
        fixed
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="审批类型">
        <template slot-scope="{ row }">
          {{ row.workflowType }}
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center">
        <template slot-scope="{ row }">
          {{ row.applySysUserName || "--" }}
        </template>
      </el-table-column>
      <el-table-column label="分公司" align="center">
        <template slot-scope="{ row }">
          {{ row.companyName }}
        </template>
      </el-table-column>
      <el-table-column label="审批时效" align="center">
        <template slot-scope="{ row }">
          {{ row.time }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" @click="toDtl(row)"> 详情 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { querydashboard } from "@/api/dashboard";
import { dashboardTypeArray } from "@/models";
export default {
  data() {
    return {
      workflowTypeList: [
        {
          workflowType: "propertyOwner",
          workflowTypeText: "产权人审批",
          title: "产权人",
        },
        {
          workflowType: "car",
          workflowTypeText: "车辆档案审批",
          title: "车辆",
        },
        {
          workflowType: "carDealersQuota",
          workflowTypeText: "车商额度审批",
          title: "车商额度",
        },
        {
          workflowType: "loan",
          workflowTypeText: "申请借款审批",
          title: "借款",
        },
        {
          workflowType: "quickLoan",
          workflowTypeText: "快速借款",
          title: "快速借款",
        },
        {
          workflowType: "repayment",
          workflowTypeText: "线下还款审批",
          title: "还款",
        },
        {
          workflowType: "inspectionPlan",
          workflowTypeText: "巡检计划审批",
          title: "巡检计划",
        },
        {
          workflowType: "exceptionDescription",
          workflowTypeText: "异常说明审批",
          title: "异常记录",
        },
        {
          workflowType: "inspectionException",
          workflowTypeText: "巡检异常审批",
          title: "巡检异常",
        },
        {
          workflowType: "rebate",
          workflowTypeText: "车商返利审批",
          title: "积分",
        },
        {
          workflowType: "rebateChg",
          workflowTypeText: "车商返利调整审批",
          title: "积分变动",
        },
      ],
      list: null,
      dashboardTypeArray,
      listQuery: {
        pageNum: 1,
        pageSize: 10000,
      },
    };
  },
  computed: {
    rolePoster() {
      return localStorage.getItem("rolePoster");
    },
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await querydashboard(this.listQuery);
      if (res.rtn == 1) {
        this.list = res.result.workflowList;
      }
    },
    toDtl(row) {
      var title = "";
      var workflowType = "";
      this.workflowTypeList.some((item, index) => {
        if (item.workflowTypeText == row.workflowType) {
          title = item.title;
          workflowType = item.workflowType;
        }
      });
      this.$router.push({
        name: "WorkflowDtlManage",
        query: {
          workflowId: row.workflowId,
          title,
          workflowType,
        },
      });
    },
  },
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 416px;
  background: #fff;
  padding: 0 20px;
}
.title {
  font-size: 14px;
  padding: 20px 0;
  color: #666;
}
</style>

