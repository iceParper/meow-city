<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="车商姓名">
              <el-input
                v-model="listQuery.carDealersName"
                placeholder="车商姓名"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">
              <el-input
                v-model="listQuery.carDealersPhone"
                placeholder="车商手机号"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="分公司">
              <el-select
                v-model="listQuery.companyId"
                style="width: 200px"
                placeholder="分公司名称"
              >
                <el-option
                  v-for="item in companyIdOptions"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="积分状态">
              <el-select
                v-model="listQuery.rebateStatus"
                style="width: 200px"
                placeholder="积分状态"
              >
                <el-option
                  v-for="item in rebateStatusOptions"
                  :key="item.value"
                  :label="item.label"
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
                v-if="handleBtnShow[5].isShow"
                >导出</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

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
      style="width: 100%"
    >
      <el-table-column
        fixed
        align="center"
        label="序号"
        type="index"
        width="50"
      ></el-table-column>
      <el-table-column label="车商" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carDealersName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carDealersPhone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所属分公司" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.companyName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所属客服" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.custmagerName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="总额度" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.totalQuota }}</div>
        </template>
      </el-table-column>
      <el-table-column label="已使用额度" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.useQuota }}</div>
        </template>
      </el-table-column>
      <el-table-column label="累计使用额度" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.cumulativeUseQuota }}</div>
        </template>
      </el-table-column>
      <el-table-column label="累计积分" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.totalRebate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="已使用积分" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.useRebate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="剩余积分" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.lastRebate }}</div>
        </template>
      </el-table-column>
      <el-table-column label="积分状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.rebateStatus == 1">启用</div>
          <div v-else-if="row.rebateStatus == 2">冻结</div>
          <div v-else>--</div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-waves
            class="filter-item"
            :type="row.rebateStatus == 1 ? 'danger' : 'primary'"
            size="mini"
            @click="handleEditStatus(row)"
            style="padding: 7px 0"
            plain
            v-if="handleBtnShow[3].isShow"
          >
            {{ row.rebateStatus == 1 ? "冻结" : "启用" }}
          </el-button>
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            plain
            @click="handleApplyRebate(row)"
            :disabled="row.rebateStatus != 1"
            v-if="handleBtnShow[2].isShow"
          >
            积分申请
          </el-button>
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            plain
            @click="handleEditRebate(row)"
            :disabled="row.rebateStatus != 1"
            v-if="handleBtnShow[2].isShow"
          >
            调整金额
          </el-button>
          <el-button
            v-waves
            style="width: 60px; box-sizing: border-box; padding: 7px 0"
            class="filter-item"
            type="primary"
            size="mini"
            v-if="handleBtnShow[1].isShow"
            @click="toDtl(row)"
          >
            详情
          </el-button>
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

    <el-dialog title="冻结原因" :visible.sync="dialogFormVisible" center>
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 100px"
      >
        <el-form-item label="冻结原因" prop="frozenReason">
          <el-input
            v-model="dialogForm.frozenReason"
            placeholder="冻结原因"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFrozenStatus">确定</el-button>
        <el-button @click="cancelFrozenStatus">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="申请积分" :visible.sync="dialogFormVisible1" center>
      <el-form
        ref="dialogForm1"
        :rules="rules1"
        :model="dialogForm1"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 100px"
      >
        <el-form-item label="流水号" prop="mortgageNo">
          <el-input v-model="dialogForm1.mortgageNo" placeholder="流水号" />
        </el-form-item>
        <el-form-item label="金额" prop="mortgageMoney">
          <el-input v-model="dialogForm1.mortgageMoney" placeholder="金额" />
        </el-form-item>
        <el-form-item
          label="资料收集（请提供积分申请相关资料）"
          prop="dataPicList"
        >
          <el-button size="small" type="primary" @click="addPic1">
            新增
          </el-button>
          <template v-for="(item, index) in dialogForm1.dataPicList">
            <div :key="index" style="display: flex; align-items: flex-end">
              <el-upload
                auto-upload
                class="avatar-uploader"
                :show-file-list="false"
                :headers="headers"
                :action="uploadUrl"
                :data="fileData"
                :on-success="
                  (res, file) => {
                    return handleImageSuccess1(res, file, index);
                  }
                "
                :before-remove="beforePicRemove"
                :before-upload="
                  (res, file) => {
                    return beforeImageUpload1(res, file, index);
                  }
                "
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
              >
                <img v-if="item.dataUrl" :src="item.dataUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-input
                placeholder="图片名称"
                v-model="item.fileName"
                style="width: 200px; margin: 12px 10px"
                class="sku-block-formEle"
                :maxlength="16"
              ></el-input>
              <el-button
                size="small"
                type="primary"
                v-if="dialogForm1.dataPicList.length > 1"
                @click="delPic1(index)"
                style="margin: 12px 0"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="pdf文件（请提供积分相关资料）" prop="dataPdfList">
          <el-button
            size="small"
            type="primary"
            @click="addPdf1"
            style="margin-bottom: 8px"
          >
            新增
          </el-button>
          <template v-for="(item, index) in dialogForm1.dataPdfList">
            <div :key="index">
              <div style="display: flex">
                <el-upload
                  auto-upload
                  :ref="`upload1${index}`"
                  :headers="headers"
                  :action="uploadUrl"
                  :data="fileData"
                  :on-preview="handlePreview"
                  :file-list="item.pdfFileList"
                  :before-upload="
                    (res, file) => {
                      return beforePdfUpload1(res, file, index);
                    }
                  "
                  :on-success="
                    (res, file) => {
                      return handlePdfSuccess1(res, file, index);
                    }
                  "
                  accept=".pdf,.PDF"
                  :before-remove="beforePdfRemove"
                  :on-remove="
                    (res, file) => {
                      return pdfRemove1(res, file, index);
                    }
                  "
                  :on-exceed="handleExceed"
                >
                  <div
                    v-if="item.dataUrl"
                    style="display: flex; align-items: center"
                  >
                    <el-button size="small" type="primary">
                      <span> 点击修改 </span>
                    </el-button>
                  </div>
                  <el-button size="small" type="primary" v-else
                    >点击上传</el-button
                  >
                </el-upload>
              </div>
              <el-input
                placeholder="pdf名称"
                v-model="item.fileName"
                style="width: 200px; margin: 10px 0"
                class="sku-block-formEle"
                :maxlength="16"
              ></el-input>
              <el-button
                size="small"
                type="primary"
                v-if="dialogForm1.dataPdfList.length > 1"
                @click="delPdf1(index)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dialogForm1.remarks" placeholder="备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyRebate">确定</el-button>
        <el-button @click="cancelApplyRebate">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="调整金额" :visible.sync="dialogFormVisible2" center>
      <el-form
        ref="dialogForm2"
        :rules="rules2"
        :model="dialogForm2"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 100px"
      >
        <el-form-item label="金额" prop="rebateMoney">
          <el-input v-model="dialogForm2.rebateMoney" placeholder="金额" />
        </el-form-item>
        <el-form-item label="资料收集（请提供积分相关资料）" prop="dataPicList">
          <el-button size="small" type="primary" @click="addPic2">
            新增
          </el-button>
          <template v-for="(item, index) in dialogForm2.dataPicList">
            <div :key="index" style="display: flex; align-items: flex-end">
              <el-upload
                auto-upload
                class="avatar-uploader"
                :show-file-list="false"
                :headers="headers"
                :action="uploadUrl"
                :data="fileData"
                :on-success="
                  (res, file) => {
                    return handleImageSuccess2(res, file, index);
                  }
                "
                :before-remove="beforePicRemove"
                :before-upload="
                  (res, file) => {
                    return beforeImageUpload2(res, file, index);
                  }
                "
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
              >
                <i
                  v-if="item.isUpload == 'isLoading'"
                  class="el-icon-loading avatar-uploader-icon"
                ></i>
                <div v-else>
                  <img v-if="item.dataUrl" :src="item.dataUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
              <el-input
                placeholder="图片名称"
                v-model="item.fileName"
                style="width: 200px; margin: 12px 10px"
                class="sku-block-formEle"
                :maxlength="16"
              ></el-input>
              <el-button
                size="small"
                type="primary"
                v-if="dialogForm2.dataPicList.length > 1"
                @click="delPic2(index)"
                style="margin: 12px 0"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-form-item>
        <el-form-item
          label="pdf文件（请提供积分调整相关资料）"
          prop="dataPdfList"
        >
          <el-button
            size="small"
            type="primary"
            @click="addPdf2"
            style="margin-bottom: 8px"
          >
            新增
          </el-button>
          <template v-for="(item, index) in dialogForm2.dataPdfList">
            <div :key="index">
              <div style="display: flex">
                <el-upload
                  auto-upload
                  :ref="`upload2${index}`"
                  :headers="headers"
                  :action="uploadUrl"
                  :data="fileData"
                  :on-preview="handlePreview"
                  :file-list="item.pdfFileList"
                  :before-upload="
                    (res, file) => {
                      return beforePdfUpload2(res, file, index);
                    }
                  "
                  :on-success="
                    (res, file) => {
                      return handlePdfSuccess2(res, file, index);
                    }
                  "
                  accept=".pdf,.PDF"
                  :before-remove="beforePdfRemove"
                  :on-remove="
                    (res, file) => {
                      return pdfRemove2(res, file, index);
                    }
                  "
                  :on-exceed="handleExceed"
                >
                  <div
                    v-if="item.dataUrl"
                    style="display: flex; align-items: center"
                  >
                    <el-button size="small" type="primary">
                      <span> 点击修改 </span>
                    </el-button>
                  </div>
                  <el-button size="small" type="primary" v-else
                    >点击上传</el-button
                  >
                </el-upload>
              </div>
              <el-input
                placeholder="pdf名称"
                v-model="item.fileName"
                style="width: 200px; margin: 10px 0"
                class="sku-block-formEle"
                :maxlength="16"
              ></el-input>
              <el-button
                size="small"
                type="primary"
                v-if="dialogForm2.dataPdfList.length > 1"
                @click="delPdf2(index)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="dialogForm2.remarks" placeholder="备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editRebate">确定</el-button>
        <el-button @click="cancelEditRebate">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import {
  rebateList,
  editRebateStatus,
  applyRebate,
  editRebate,
  rebateDownloadExcle,
} from "@/api/rebateManage";
import { companyListQuery } from "@/api/systemManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { downLoadFile } from "@/utils/index";
let id = 0;
export default {
  name: "RebateListManage",
  components: { Pagination },
  directives: { waves },
  data() {
    const isNum1 = (rule, value, callback) => {
      const num = /^\d+(?:\.\d{1,4})?$/;
      if (!!value && value == 0) {
        callback(new Error("不能为0"));
      } else if (!value.toString()) {
        callback(new Error("必填项"));
      } else if (!num.test(value)) {
        callback(new Error("只能为数字"));
      } else {
        callback();
      }
    };
    return {
      // orderNum:'',
      tableKey: 0,
      downloadLoading: false,
      list: null,
      total: 0,
      listLoading: false,
      fileData: {
        fileType: "rebate",
      },
      companyIdOptions: [],
      statusOptions: [],
      rebateStatusOptions: [
        { label: "启用", value: 1 },
        { label: "冻结", value: 2 },
      ],
      labelPosition: "top",
      uploadUrl,
      headers: {},
      rules: {
        frozenReason: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      rules1: {
        mortgageNo: [{ required: true, message: "必填项", trigger: "blur" }],
        mortgageMoney: [{ required: true, validator: isNum1, trigger: "blur" }],
        dataPicList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
      },
      rules2: {
        rebateMoney: [{ required: true, validator: isNum1, trigger: "blur" }],
        dataPicList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        custmagerId: undefined,
        rebateStatus: undefined,
      },
      handleBtnShow: [
        {
          btnName: "RebateListQuery",
          isShow: false,
        },
        {
          btnName: "RebateDetail",
          isShow: false,
        },
        {
          btnName: "RebateApply",
          isShow: false,
        },
        {
          btnName: "RebateChgApply",
          isShow: false,
        },
        {
          btnName: "RebateModify",
          isShow: false,
        },
        {
          btnName: "RebateQueryExport",
          isShow: false,
        },
      ],
      downloadLoading: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogForm: {
        status: undefined,
        frozenReason: undefined,
        carDealersList: [],
      },
      dialogForm1: {
        carDealersId: undefined,
        mortgageNo: undefined,
        mortgageMoney: undefined,
        dataPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        dataPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        remarks: undefined,
      },

      dialogForm2: {
        carDealersId: undefined,
        rebateMoney: undefined,
        dataPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        dataPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        remarks: undefined,
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
    this.getCompanyList();
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;

      let res = await rebateList({
        ...this.listQuery,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.quotaList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {
          if (
            (item.totalRebate || item.totalRebate == 0) &&
            (item.useRebate || item.useRebate == 0)
          ) {
            console.log(item.totalRebate, item.useRebate, "==");
            item.lastRebate = parseFloat(
              item.totalRebate - item.useRebate
            ).toFixed(2);
          }

          if (item.totalQuota || item.totalQuota == 0) {
            item.totalQuota = parseFloat(item.totalQuota).toFixed(2);
          }

          if (item.useQuota || item.useQuota == 0) {
            item.useQuota = parseFloat(item.useQuota).toFixed(2);
          }

          if (item.cumulativeUseQuota || item.cumulativeUseQuota == 0) {
            item.cumulativeUseQuota = parseFloat(
              item.cumulativeUseQuota
            ).toFixed(2);
          }

          if (item.totalRebate || item.totalRebate == 0) {
            item.totalRebate = parseFloat(item.totalRebate).toFixed(2);
          }

          if (item.useRebate || item.useRebate == 0) {
            item.useRebate = parseFloat(item.useRebate).toFixed(2);
          }
        });
      }
      // Just to simulate the time of the request
      this.listLoading = false;
    },
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleReset() {
      this.listQuery = {
        pageNum: 1,
        pageSize: 20,
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        custmagerId: undefined,
        rebateStatus: undefined,
      };
      this.getList();
    },
    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "RebateDtlManage",
        query: {
          carDealersId: row.carDealersId,
          beforeRouter: "RebateListManage",
        },
      });
    },
    async getCompanyList() {
      const res = await companyListQuery({});
      if (res.rtn == 1) {
        this.companyIdOptions = res.companyList;
      }
    },
    handleEditStatus(row) {
      this.dialogForm = {
        status: undefined,
        frozenReason: undefined,
        carDealersList: [],
      };
      this.dialogForm.carDealersList = [{ carDealersId: row.carDealersId }];
      this.dialogForm.status = row.rebateStatus == 1 ? 2 : 1;

      if (row.rebateStatus == 1) {
        this.dialogFormVisible = true;
      } else {
        this.editStatus();
      }
    },
    handleApplyRebate(row) {
      this.dialogFormVisible1 = true;
      this.dialogForm1 = {
        carDealersId: row.carDealersId,
        mortgageNo: row.mortgageNo,
        mortgageMoney: row.mortgageMoney,
        dataPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        dataPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        remarks: row.remarks,
      };
    },
    handleEditRebate(row) {
      this.dialogFormVisible2 = true;
      this.dialogForm2 = {
        carDealersId: undefined,
        rebateMoney: undefined,
        dataPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        dataPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        remarks: undefined,
      };
      this.dialogForm2.carDealersId = row.carDealersId;
    },
    async editStatus() {
      const res = await editRebateStatus(this.dialogForm);
      if (res.rtn == 1) {
        this.$message.success("修改成功");
        this.getList();
      }
    },
    submitFrozenStatus() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          this.editStatus();
          this.dialogFormVisible = false;
          this.dialogForm = {
            status: undefined,
            frozenReason: undefined,
            carDealersList: [],
          };
        }
      });
    },
    cancelFrozenStatus() {
      this.dialogFormVisible = false;
      this.$refs.dialogForm.resetFields();
      this.dialogForm = {
        status: undefined,
        frozenReason: undefined,
        carDealersList: [],
      };
    },
    async applyRebate() {
      this.$refs.dialogForm1.validate(async (valid) => {
        if (valid) {
          const form = { ...this.dialogForm1 };
          const isNotPic = form.dataPicList.some((item, index) => {
            if (!item.dataUrl || !item.fileName || item.fileName.trim() == "") {
              return true;
            }
          });

          if (form.dataPdfList.length == 1) {
            if (!form.dataPdfList[0].dataUrl && !form.dataPdfList[0].fileName) {
              form.dataPdfList = undefined;
            }
          }

          if (form.dataPdfList && form.dataPdfList.length > 0) {
            if (form.dataPdfList.length == 1) {
              var isNotPdf = form.dataPdfList.some((item, index) => {
                if (
                  (!item.dataUrl && item.fileName) ||
                  ((!item.fileName || item.fileName.trim() == "") &&
                    item.dataUrl)
                ) {
                  return true;
                }
              });
            } else {
              var isNotPdf = form.dataPdfList.some((item, index) => {
                if (
                  !item.dataUrl ||
                  !item.fileName ||
                  item.fileName.trim() == ""
                ) {
                  return true;
                }
              });
            }
          }

          if (isNotPic) {
            this.$message.warning("图片数据缺少");
            return false;
          }

          if (isNotPdf) {
            this.$message.warning("pdf数据缺少");
            return false;
          }

          form.dataPicList.forEach((item, index) => {
            delete item.isUpload;
          });

          if (form.dataPdfList) {
            var dataPdfListCopy = JSON.parse(JSON.stringify(form.dataPdfList));

            dataPdfListCopy.forEach((item, index) => {
              if (item.pdfFileList) {
                delete item.pdfFileList;
              }
            });
          }

          const paramsData = {
            carDealersId: form.carDealersId,
            mortgageNo: form.mortgageNo,
            mortgageMoney: form.mortgageMoney,
            dataPicList: form.dataPicList,
            dataPdfList: form.dataPdfList,
            remarks: form.remarks,
          };
          const res = await applyRebate(paramsData);
          if (res.rtn == 1) {
            this.$message.success("申请成功");
            this.getList();
          }
          this.dialogFormVisible1 = false;
          this.dialogForm1 = {
            carDealersId: undefined,
            mortgageNo: undefined,
            mortgageMoney: undefined,
            dataPicList: [
              {
                dataUrl: undefined,
                originalPicUrl: undefined,
                fileName: undefined,
                isUpload: undefined,
              },
            ],
            dataPdfList: [
              {
                dataUrl: undefined,
                fileName: undefined,
              },
            ],
            remarks: undefined,
          };
        }
      });
    },
    async editRebate() {
      this.$refs.dialogForm2.validate(async (valid) => {
        if (valid) {
          const form = { ...this.dialogForm2 };
          const isNotPic = form.dataPicList.some((item, index) => {
            if (!item.dataUrl || !item.fileName || item.fileName.trim() == "") {
              return true;
            }
          });

          if (form.dataPdfList.length == 1) {
            if (!form.dataPdfList[0].dataUrl && !form.dataPdfList[0].fileName) {
              form.dataPdfList = undefined;
            }
          }

          if (form.dataPdfList && form.dataPdfList.length > 0) {
            if (form.dataPdfList.length == 1) {
              var isNotPdf = form.dataPdfList.some((item, index) => {
                if (
                  (!item.dataUrl && item.fileName) ||
                  ((!item.fileName || item.fileName.trim() == "") &&
                    item.dataUrl)
                ) {
                  return true;
                }
              });
            } else {
              var isNotPdf = form.dataPdfList.some((item, index) => {
                if (
                  !item.dataUrl ||
                  !item.fileName ||
                  item.fileName.trim() == ""
                ) {
                  return true;
                }
              });
            }
          }

          if (isNotPic) {
            this.$message.warning("图片数据缺少");
            return false;
          }

          if (isNotPdf) {
            this.$message.warning("pdf数据缺少");
            return false;
          }

          form.dataPicList.forEach((item, index) => {
            delete item.isUpload;
          });

          if (form.dataPdfList) {
            var dataPdfListCopy = JSON.parse(JSON.stringify(form.dataPdfList));

            dataPdfListCopy.forEach((item, index) => {
              if (item.pdfFileList) {
                delete item.pdfFileList;
              }
            });
          }

          const paramsData = {
            carDealersId: form.carDealersId,
            rebateMoney: form.rebateMoney,
            dataPicList: form.dataPicList,
            dataPdfList: form.dataPdfList,
            remarks: form.remarks,
          };
          const res = await editRebate(paramsData);
          if (res.rtn == 1) {
            this.$message.success("申请成功");
            this.getList();
          }
          this.dialogFormVisible2 = false;
          this.dialogForm2 = {
            carDealersId: undefined,
            rebateMoney: undefined,
            dataPicList: [
              {
                dataUrl: undefined,
                originalPicUrl: undefined,
                fileName: undefined,
                isUpload: undefined,
              },
            ],
            dataPdfList: [
              {
                dataUrl: undefined,
                fileName: undefined,
              },
            ],
            remarks: undefined,
          };
        }
      });
    },
    cancelApplyRebate() {
      this.dialogFormVisible1 = false;
      this.$refs.dialogForm1.resetFields();
      this.dialogForm1 = {
        carDealersId: undefined,
        mortgageNo: undefined,
        mortgageMoney: undefined,
        dataPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        dataPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        remarks: undefined,
      };
      this.$refs["upload10"][0].clearFiles();
    },
    cancelEditRebate() {
      this.dialogFormVisible2 = false;
      this.$refs.dialogForm2.resetFields();
      this.dialogForm2 = {
        carDealersId: undefined,
        rebateMoney: undefined,
        dataPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        dataPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        remarks: undefined,
      };
      this.$refs["upload20"][0].clearFiles();
    },

    beforeDetailRemove(file) {
      return this.$confirm(`确定移除${file.name || "该图片"}？`);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    beforeDetailRemove1(file) {
      return this.$confirm(`确定移除${file.name || "该图片"}？`);
    },

    handlePictureCardPreview1(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleImageSuccess1(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm1.dataPicList[index].dataUrl = res.thumbnailUrl;
        this.dialogForm1.dataPicList[index].originalPicUrl = res.url;
        this.dialogForm1.dataPicList[index].isUpload = "isLoaded";
      }
    },
    handleImageSuccess2(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm2.dataPicList[index].dataUrl = res.thumbnailUrl;
        this.dialogForm2.dataPicList[index].originalPicUrl = res.url;
        this.dialogForm2.dataPicList[index].isUpload = "isLoaded";
      }
    },
    handlePdfSuccess1(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm1.dataPdfList[index].dataUrl = res.url;
        this.dialogForm1.dataPdfList[index].pdfFileList = [
          {
            name: file.raw.name,
            url: this.dialogForm1.dataPdfList[index].dataUrl,
          },
        ];
      }
    },
    handlePdfSuccess2(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm2.dataPdfList[index].dataUrl = res.url;
        this.dialogForm2.dataPdfList[index].pdfFileList = [
          {
            name: file.raw.name,
            url: this.dialogForm2.dataPdfList[index].dataUrl,
          },
        ];
      }
    },
    beforeImageUpload1(res, file, index) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      this.dialogForm1.dataPicList[index].isUpload = "isLoading";
    },
    beforePdfUpload1(res, file, index) {
      // this.$refs[`upload${index}`][0].clearFiles();
      delete this.dialogForm1.dataPdfList[index].pdfFileList;
    },
    beforePdfUpload2(res, file, index) {
      // this.$refs[`upload${index}`][0].clearFiles();
      delete this.dialogForm2.dataPdfList[index].pdfFileList;
    },
    beforeImageUpload2(res, file, index) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      this.dialogForm2.dataPicList[index].isUpload = "isLoading";
    },
    beforePicRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    addPic1() {
      let dataPicList = this.dialogForm1.dataPicList;
      // console.log(dataPicList)
      if (dataPicList.length > 0) {
        dataPicList.unshift({
          dataUrl: undefined,
          fileName: undefined,
          isUpload: undefined,
          originalPicUrl: undefined,
        });
        this.dialogForm1.dataPicList = dataPicList;
      }
    },
    addPic2() {
      let dataPicList = this.dialogForm2.dataPicList;
      // console.log(dataPicList)
      if (dataPicList.length > 0) {
        dataPicList.unshift({
          dataUrl: undefined,
          fileName: undefined,
          isUpload: undefined,
          originalPicUrl: undefined,
        });
        this.dialogForm2.dataPicList = dataPicList;
      }
    },
    addPdf1() {
      let dataPdfList = this.dialogForm1.dataPdfList;
      // console.log(dataPicList)
      if (dataPdfList.length > 0) {
        dataPdfList.unshift({
          dataUrl: undefined,
          fileName: undefined,
        });
        this.dialogForm1.dataPdfList = dataPdfList;
      }
    },
    addPdf2() {
      let dataPdfList = this.dialogForm2.dataPdfList;
      // console.log(dataPicList)
      if (dataPdfList.length > 0) {
        dataPdfList.unshift({
          dataUrl: undefined,
          fileName: undefined,
        });
        this.dialogForm2.dataPdfList = dataPdfList;
      }
    },
    delPic1(index) {
      let dataPicList = this.dialogForm1.dataPicList;
      if (dataPicList.length > 1) {
        dataPicList.splice(index, 1);
        this.dialogForm1.dataPicList = dataPicList;
      }
    },
    delPic2(index) {
      let dataPicList = this.dialogForm2.dataPicList;
      if (dataPicList.length > 1) {
        dataPicList.splice(index, 1);
        this.dialogForm2.dataPicList = dataPicList;
      }
    },
    delPdf1(index) {
      let dataPdfList = this.dialogForm1.dataPdfList;
      if (dataPdfList.length > 1) {
        dataPdfList.splice(index, 1);
        this.dialogForm1.dataPdfList = dataPdfList;
      }
      this.$refs[`upload1${index}`][0].clearFiles();
    },
    delPdf2(index) {
      let dataPdfList = this.dialogForm2.dataPdfList;
      if (dataPdfList.length > 1) {
        dataPdfList.splice(index, 1);
        this.dialogForm2.dataPdfList = dataPdfList;
      }
      this.$refs[`upload2${index}`][0].clearFiles();
    },
    handlePreview(file) {
      window.open(file.response.url);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    beforePdfRemove(file) {
      return this.$confirm(`确定移除${file.name || "该pdf"}？`);
    },
    pdfRemove1(res, file, index) {
      if (res.status == "success") {
        this.dialogForm1.dataPdfList[index].dataUrl = undefined;
      }
    },
    pdfRemove2(res, file, index) {
      if (res.status == "success") {
        this.dialogForm2.dataPdfList[index].dataUrl = undefined;
      }
    },
    async downloadExcleClick() {
      this.downloadLoading = true;
      let res = await rebateDownloadExcle({
        ...this.listQuery,
      });
      // Just to simulate the time of the request
      downLoadFile(res, "积分列表", this, () => {
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
</style>

<style lang="scss" scoped>
.app-container {
  margin: 0 40px;
}
.header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 40px;
}
.headLab {
  font-size: 16px;
  font-weight: 500;
  color: #999;
}
.avatar-uploader {
  margin-top: 8px;
  .avatar {
    width: 120px;
    height: 120px;
    vertical-align: middle;
  }
}
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
}
.addPriceStyle.el-input-group--append /deep/ .el-input__inner {
  color: crimson;
}
</style>
<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
</style>
