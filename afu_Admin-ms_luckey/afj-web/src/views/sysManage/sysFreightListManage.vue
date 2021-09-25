<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="省份">
              <el-select
                v-model="listQuery.province"
                placeholder="省份"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.provinceId"
                  :label="item.name"
                  :value="item.provinceId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规则类型">
              <el-select
                v-model="listQuery.dataType"
                placeholder="规则类型"
                clearable
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in appletType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规则状态">
              <el-select
                v-model="listQuery.dataStatus"
                placeholder="规则状态"
                clearable
                style="width: 200px"
                class="filter-item"
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
          <el-col :span="24">
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
          class="filter-item"
          size="mini"
          icon="el-icon-d-caret"
          type="primary"
          @click="handleEditfreightStatus"
          v-loading="isLoaded_1"
          v-if="handleBtnShow[2].isShow"
        >修改运费状态</el-button>
        <el-button
          icon="el-icon-delete"
          v-waves
          type="primary"
          v-loading="isLoaded_4"
          size="mini"
          v-if="handleBtnShow[3].isShow"
          @click="handleDel"
        >批量删除</el-button>
      </el-button-group>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        size="mini"
        icon="el-icon-plus"
        style="float: right;"
        v-if="handleBtnShow[1].isShow"
        @click="handleAdd"
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
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column label="省份信息" width="280px">
        <template slot-scope="{row}">
          <span
            v-for="item in row.provinceNameList"
            :key="item"
            style="margin-right: 8px;"
          >{{ item }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center">
        <template slot-scope="{row}">
          <span>￥{{ row.money }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="限制条件" align="center">
        <template slot-scope="{row}">
          <span v-if="row.dataType == 6">{{'满' + row.numberFree + '双免运费'}}</span>
          <span  v-else-if="row.dataType == 7">{{'满' + row.moneyFree + '元免运费'}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="规则类型" align="center">
        <template slot-scope="{row}">
          <span>{{ appletTypeArray[row.dataType - 1] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dataStatus === 1 ? '上架' : '下架' }}</span>
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

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dialogForm"
        label-position="right"
        label-width="140px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="规则类型" prop="dataType">
          <el-select
            v-model="dialogForm.dataType"
            placeholder="规则类型"
            clearable
            @change="_getAppletType"
          >
            <el-option
              v-for="item in appletType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @change="_getAppletType"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否选择全部省份" prop="selectAll">
          <el-switch
            v-model="dialogForm.selectAll"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="selectAllChange"
          ></el-switch>
        </el-form-item>
        <el-form-item label="省份" prop="provinceList">
          <el-select v-model="dialogForm.provinceList" multiple placeholder="省份" clearable>
            <el-option
              v-for="item in provinceList"
              :key="''+item.provinceId"
              :label="item.name"
              :value="''+item.provinceId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="运费单价" prop="money">
          <el-input
            v-model="dialogForm.money"
            :disabled="dialogForm.dataType == 6 || dialogForm.dataType == 7"
            :maxlength="16"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="多少双" prop="numberFree" v-if="dialogForm.dataType == 6">
          <el-input v-model="dialogForm.numberFree" :maxlength="16">
            <template slot="append">双</template>
          </el-input>
        </el-form-item>
        <el-form-item label="多少金额" prop="moneyFree" v-if="dialogForm.dataType == 7">
          <el-input v-model="dialogForm.moneyFree" :maxlength="16">
            <template slot="append">双</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="dataStatus">
          <el-switch
            v-model="dialogForm.dataStatus"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="isLoaded" @click="createData()">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择运费状态" :before-close="closeModal" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm1" :rules="rules1" :model="form1">
        <el-form-item label="运费状态" prop="freightStatus" :label-width="formLabelWidth">
          <el-select v-model="form1.freightStatus" placeholder="运费状态" style="width:90%;">
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
        <el-button type="primary" @click="handleEditfreightStatusSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { statusOptions, textMap, appletType, appletTypeArray } from "@/models";
import notify from "mixins/notify";
import {
  freightSelList,
  freightList,
  freightAdd,
  freightStatusEdit,
  freightDel,
  provinceList
} from "@/api/sysManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "AppletList",
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
      isLoaded: false,
      tableKey: 0,
      selectList: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        dataStatus: "",
        dataType: "",
        province: ""
      },
      isLoaded_1: false,
      isLoaded_2: false,
      isLoaded_3: false,
      isLoaded_4: false,
      appletType,
      appletTypeArray,
      statusOptions,
      textMap,
      downloadLoading: false,
      provinceList: [],
      selectedData: [],
      dialogFormVisible1: false,
      dialogForm: {
        dataType: "",
        dataStatus: 1,
        selectAll: 2,
        money: "",
        numberFree: "",
        moneyFree: "",
        provinceList: []
      },
      statusOptions: [
        { key: 1, lab: "上架", value: 1 },
        { key: 2, lab: "下架", value: 2 }
      ],
      dialogFormVisible: false,
      dialogStatus: "",
      form1: {
        freightStatus: ""
      },
      handleBtnShow: [
        {
          btnName: "FreightQuery",
          isShow: false
        },
        {
          btnName: "FreightAdd",
          isShow: false
        },
        {
          btnName: "FreightModifyStatus",
          isShow: false
        },
        {
          btnName: "FreightRemove",
          isShow: false
        }
      ],
      rules1: {
        freightStatus: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      rules: {
        dataType: [{ required: true, message: "必填项", trigger: "blur" }],
        dataStatus: [{ required: true, message: "必填项", trigger: "blur" }],
        selectAll: [{ required: true, message: "必填项", trigger: "blur" }],
        money: [{ required: true, message: "必填项", trigger: "blur" }],
        moneyFree: [{ required: true, message: "必填项", trigger: "blur" }],
        numberFree: [{ required: true, message: "必填项", trigger: "blur" }],
        provinceList: [
          { required: true, type: "array", message: "必填项", trigger: "blur" }
        ]
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
    this.getProvinceList();
  },
  methods: {
    // 多选
    async getList() {
      this.listLoading = true;
      const res = await freightList(this.listQuery);
      if (res.rtn == 1) {
        this.list = res.result.freightRuleList;
        this.total = res.result.total;
      }
      // Just to simulate the time of the request
      this.listLoading = false;
    },
    async getProvinceList() {
      const res = await provinceList({});
      if (res.rtn == 1) {
        this.provinceList = res.provinceList;
      }
    },
    // 是否选择全部省份
    selectAllChange(val) {
      if (val === 1) {
        this.dialogForm.provinceList = this.provinceList.map(item => {
          return item.provinceId + "";
        });
      } else {
        this.dialogForm.provinceList = [];
        console.log(this.dialogForm.provinceList, "=====");
      }
    },
    // 新增规则
    handleAdd() {
      this.dialogFormVisible = true;
      this.dialogForm = {
        dataType: "",
        dataStatus: 1,
        money: "",
        selectAll: 2,
        provinceList: []
      };
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 新增规则
    createData() {
      this.$refs["dataForm"].validate(async valid => {
        if (valid) {
          this.isLoaded = true;
          const res = await freightAdd({
            ...this.dialogForm
          });
          if (res.rtn == 1) {
            this.$message.success("新建成功!");
            this.dialogFormVisible = false;
            this.getList();
          }
          this.isLoaded = false;
        }
      });
    },
    handleSelectionChange(val) {
      this.selectedData = val;
    },
    handleFilter() {
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 20,
        dataStatus: "",
        dataType: "",
        province: ""
      };
      this.getList();
    },
    handleEdit(row) {
      this.$router.push({
        name: "SpecialEdit",
        query: { specialUuid: row.specialUuid }
      });
    },
    filterType(val) {
      const type = this.specialTypeOptions.filter(item => {
        return item.value === val;
      });
      if (type.length > 0) {
        return type[0].label || "--";
      } else {
        return "--";
      }
    },
    handleDelete() {
      if (!(this.selectList && this.selectList.length)) {
        return this.$message("请选择规则");
      }
      this.$confirm("此操作将删除该规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const ruleUuidList = this.selectList.map(item => {
            return item.ruleUuid;
          });
          const res = await appletBatchDel({
            ruleUuidList: ruleUuidList
          });
          if (res.result === "0") {
            this.$message.success(res.description);
            this.getList();
          }
        })
        .catch(() => {});
    },
    async handleDeleteOne(row) {
      this.$confirm("此操作将删除该规则, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await appletDelete({
            ruleUuid: row.ruleUuid
          });
          if (res.result === "0") {
            this.$message.success(res.description);
            this.getList();
          }
        })
        .catch(() => {});
    },
    handleAllStand(type) {
      if (!(this.selectList && this.selectList.length)) {
        return this.$message("请选择规则");
      }
      if (type === "down") {
        this.$confirm("此操作将下架选择规则, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            this.questAllStand(type);
          })
          .catch(() => {});
      } else {
        this.questAllStand(type);
      }
    },
    handleStand(type, row) {
      if (type === "down") {
        this.$confirm("此操作将下架该规则, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            this.questStand(type, row);
          })
          .catch(() => {});
      } else {
        this.questStand(type, row);
      }
    },
    async questAllStand(type) {
      const ruleUuidList = this.selectList.map(item => {
        return item.ruleUuid;
      });
      const res = await appletBatchUpOrDown({
        ruleUuidList: ruleUuidList,
        dataStatus: type === "up" ? "1" : "2"
      });
      if (res.result === "0") {
        this.$message.success(res.description);
        this.getList();
      }
    },
    async questStand(type, row) {
      const res = await appletUpdatestatus({
        ruleUuid: row.ruleUuid,
        dataStatus: type === "up" ? "1" : "2"
      });
      if (res.result === "0") {
        this.$message.success(res.description);
        this.getList();
      }
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    handleEditfreightStatus() {
      if (this.$refs["dataForm1"] !== undefined) {
        this.$refs.dataForm1.resetFields();
      }
      if (this.selectedData && this.selectedData.length > 0) {
        this.dialogFormVisible1 = true;
      } else {
        this.$message("请勾选要修改的运费");
      }
    },
    closeModal() {
      this.dialogFormVisible1 = false;
      this.dialogFormVisible2 = false;
      this.dialogFormVisible3 = false;
      this.selectedData = [];
      this.$refs.tableRef.clearSelection();
    },
    handleDel() {
      if (this.selectedData && this.selectedData.length > 0) {
        this.$confirm("此次操作将删除该运费, 是否继续?", "删除运费", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            this.isLoaded_4 = true;
            const freightUuidArr = [];
            this.selectedData.forEach((item, index) => {
              const freightUuidJson = {};
              freightUuidJson.ruleUuid = item.ruleUuid;
              freightUuidArr.push(freightUuidJson);
            });

            console.log(freightUuidArr, "======");
            let res = await freightDel({
              freightRuleList: freightUuidArr
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
        this.$message("请勾选要删除的运费");
      }
    },
    handleEditfreightStatusSubmit() {
      this.$refs.dataForm1.validate(async valid => {
        if (valid) {
          this.isLoaded_1 = true;
          const freightUuidArr = [];
          this.selectedData.forEach((item, index) => {
            const freightUuidJson = {};
            freightUuidJson.ruleUuid = item.ruleUuid;
            freightUuidArr.push(freightUuidJson);
          });

          let res = await freightStatusEdit({
            freightRuleList: freightUuidArr,
            dataStatus: this.form1.freightStatus
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
    _getAppletType(val) {
      this.dialogForm.money = 0;
    }
  }
};
</script>