<template>
  <div class="app-container">
    <div class="handle-container">
      <el-button-group>
        <el-button
          class="filter-item"
          size="mini"
          icon="el-icon-d-caret"
          type="primary"
          @click="handleEditMemberStatus"
          v-loading="isLoaded_1"
        >修改会员状态</el-button>
        <!-- <el-button
          icon="el-icon-delete"
          v-waves
          type="primary"
          v-loading="isLoaded_4"
          size="mini"
          @click="handleDel"
        >批量删除</el-button>-->
      </el-button-group>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        size="mini"
        icon="el-icon-plus"
        style="float: right;"
        @click="handleAdd"
        v-if="handleBtnShow[2].isShow"
      >新增</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      id="crTable"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column label="会员级别" align="center">
        <template slot-scope="{row}">
          <span>{{ row.lever }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="{row}">
          <span>{{ row.memberDesc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" align="center">
        <template slot-scope="{row}">
          <span>{{ $dayjs(row.createTime.time).format('YYYY-MM-DD hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应用商户" align="center">
        <template slot-scope="{row}">
          <el-button type="text">{{row.merchantNumber}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.isActive === '0' ? '启用' : '冻结' }}</span>
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
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            style="width:60px;box-sizing:border-box;padding:7px 0;margin-bottom:10px;"
            v-if="handleBtnShow[4].isShow"
            @click="handleDel(row)"
          >删除</el-button>
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            plain
            size="mini"
            style="width:60px;box-sizing:border-box;padding:7px 0;margin-left:0;margin-bottom:10px;"
            v-if="handleBtnShow[3].isShow"
            @click="toMerchantList(row)"
          >查看商户</el-button>
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            plain
            size="mini"
            style="width:60px;box-sizing:border-box;padding:7px 0;margin-left:0;"
            @click="checkDtl(row)"
            :loading="isLoaded_2"
          >折扣信息</el-button>
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
    <el-dialog title="选择会员状态" :before-close="closeModal" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm1" :rules="rules1" :model="form1">
        <el-form-item label="会员状态" prop="memberStatus" :label-width="formLabelWidth">
          <el-select v-model="form1.memberStatus" placeholder="会员状态" style="width:90%;">
            <el-option
              v-for="item in statusOptions"
              :key="item.key"
              :label="item.lab"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="handleEditMemberStatusSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="会员折扣" :before-close="closeModal1" :visible.sync="dialogFormVisible2">
      <p>折扣类型：{{memberInfo.globalDiscount ? '全部品牌' : '仅限于某品牌'}}</p>
      <p
        v-if="memberInfo.globalDiscount"
      >折&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;扣：{{memberInfo.globalDiscount}}</p>
      <el-table
        :key="tableKey"
        :data="memberInfo.memberBrandList"
        fit
        highlight-current-row
        style="width: 100%;"
        v-show="!memberInfo.globalDiscount"
        v-loading="discountLoading"
      >
        <el-table-column fixed label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column label="折扣" align="center">
          <template slot-scope="{row}">
            <span>{{ row.discount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌名称" align="center">
          <template slot-scope="{row}">
            <span>{{ row.brandName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格类型" align="center">
          <template slot-scope="{row}">
            <span v-if="row.priceType == 1">正价</span>
            <span v-else-if="row.priceType == 2">特价</span>
            <span v-else>全部</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal1">确定</el-button>
        <!-- <el-button type="primary" @click="handleEditMemberStatusSubmit">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  memberList,
  memberSelList,
  memberStatusEdit,
  memberDel,
  memberDtl
} from "@/api/sysManage";
import Sortable from "sortablejs";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
export default {
  name: "SysMemberListManage",
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
      isLoaded_1: false,
      isLoaded_2: false,
      isLoaded_3: false,
      isLoaded_4: false,
      tableData: [],
      memberInfo: {
        globalDiscount: ""
      },
      dialogFormVisible2: false,
      statusOptions: [
        { key: 1, lab: "启用", value: 0 },
        { key: 2, lab: "冻结", value: 1 }
      ],
      form1: {
        memberStatus: ""
      },
      seqForms: {
        tableData: []
      },
      rules1: {
        memberStatus: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      rules3: {
        seq: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      dialogFormVisible1: false,
      dialogFormVisible3: false,
      handleBtnShow: [
        {
          btnName: "MemberQuery",
          isShow: false
        },
        {
          btnName: "MemberModify",
          isShow: false
        },
        {
          btnName: "MemberAdd",
          isShow: false
        },
        {
          btnName: "MemberMerchantQuery",
          isShow: false
        },
        {
          btnName: "MemberRemove",
          isShow: false
        }
      ],

      selectedData: [],
      memberSelList: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      discountLoading: false,
      listQuery: {
        pageNum: 1,
        pageSize: 20
      }
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
    this.getList();
  },
  mounted() {},
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.selectedData = val;
    },

    async getList() {
      this.listLoading = true;
      let res = await memberList({
        ...this.listQuery
      });
      if (res.rtn == 1) {
        console.log(res, "res");
        this.list = res.result.memberList;
        this.total = res.result.total;
        // Just to simulate the time of the request
        this.listLoading = false;
      }
    },
    handleAdd() {
      console.log(this.$router.options.routes, "router");
      this.$router.push({
        name: "SysMemberAddManage",
        query: {
          beforeRouter: "SysMemberListManage"
        }
      });
    },
    handleEditMemberStatus() {
      if (this.$refs["dataForm1"] !== undefined) {
        this.$refs.dataForm1.resetFields();
      }
      if (this.selectedData && this.selectedData.length > 0) {
        this.dialogFormVisible1 = true;
      } else {
        this.$message("请勾选要修改的会员");
      }
    },
    closeModal() {
      this.dialogFormVisible1 = false;
      this.dialogFormVisible3 = false;
      this.selectedData = [];
      this.$refs.tableRef.clearSelection();
    },
    closeModal1() {
      this.dialogFormVisible2 = false;
      this.memberInfo = {
        globalDiscount: ""
      };
    },
    handleDel(row) {
      // if (this.selectedData && this.selectedData.length > 0) {
      this.$confirm("此次操作将删除该会员, 是否继续?", "删除会员", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.isLoaded_4 = true;
          let res = await memberDel({
            memberUuid: row.memberUuid
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
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
      // } else {
      //   this.$message("请勾选要删除的会员");
      // }
    },
    toMerchantList(row) {
      this.$router.push({
        name: "SysMerchantListManage",
        query: {
          beforeRouter: "SysMemberListManage",
          memberUuid: row.memberUuid
        }
      });
    },
    handleEditMemberStatusSubmit() {
      this.$refs.dataForm1.validate(async valid => {
        if (valid) {
          this.isLoaded_1 = true;
          const memberUuidArr = [];
          this.selectedData.forEach((item, index) => {
            const memberUuidJson = {};
            memberUuidJson.memberUuid = item.memberUuid;
            memberUuidArr.push(memberUuidJson);
          });

          let res = await memberStatusEdit({
            memberList: memberUuidArr,
            isActive: this.form1.memberStatus
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
    toMemberDtl(row) {
      this.$router.push({
        name: "SysMemberDtlManage",
        query: {
          beforeRouter: "SysMemberListManage",
          memberUuid: row.memberUuid
        }
      });
    },
    checkDtl(row) {
      this.getMemberDtl(row);
    },
    async getMemberDtl(row) {
      this.discountLoading = true;
      this.isLoaded_2 = true;
      let res = await memberDtl({
        memberUuid: row.memberUuid
      });
      if (res.rtn == 1) {
        this.memberInfo = res.result;
        this.dialogFormVisible2 = true;
      }
      this.discountLoading = false;
      this.isLoaded_2 = false;
      console.log(this.memberInfo, "-------");
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