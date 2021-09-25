<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column fixed label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column label="商户编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.merchantNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商户名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.merchantName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.shopName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="主营业务" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mainBusiness}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="{row}">
          <span>{{ row.address}}</span>
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
  </div>
</template>

<script>
import { merchantList } from "@/api/sysManage";
import Sortable from "sortablejs";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
export default {
  name: "SysMerchantListManage",
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
      formLabelWidth: "100px",
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20
      }
    };
  },
  created() {
    this.listQuery.memberUuid = this.$route.query.memberUuid;
    this.getList();
  },
  mounted() {},
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await merchantList({
        ...this.listQuery
      });
      if (res.rtn == 1) {
        console.log(res, "res");
        this.list = res.result.merchantList;
        this.total = res.result.total;
        // Just to simulate the time of the request
        this.listLoading = false;
      }
    }
  }
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