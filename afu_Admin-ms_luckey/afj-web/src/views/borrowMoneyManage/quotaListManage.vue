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
                placeholder="手机号"
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
            <el-form-item label="审核状态" prop="authStatus">
              <el-select
                v-model="listQuery.authStatus"
                placeholder="审核状态"
                style="width: 200px"
                class="filter-item"
              >
                <el-option
                  v-for="item in authStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
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
    >
      <el-table-column
        fixed
        label="序号"
        type="index"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="姓名" align="center">
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
          <div>{{ row.totalQuota || "--" }}万元</div>
        </template>
      </el-table-column>

      <el-table-column label="使用额度" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.useQuota }}万元</div>
        </template>
      </el-table-column>
      <el-table-column label="累计使用额度" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.cumulativeUseQuota }}万元</div>
        </template>
      </el-table-column>
      <el-table-column label="申请额度状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.applyQuotaStatus == 0">未申请</div>
          <div v-else-if="row.applyQuotaStatus == 1">申请中</div>
          <div v-else-if="row.applyQuotaStatus == 2">已申请</div>
        </template>
      </el-table-column>
      <el-table-column label="提额状态" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.addQuotaStatus == 0">未申请</div>
          <div v-else-if="row.addQuotaStatus == 1">申请中</div>
          <div v-else-if="row.addQuotaStatus == 2">已提额</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.status == 1 ? "启用" : "冻结" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="冻结原因" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.frozenReason || "--" }}</div>
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
            class="filter-item"
            :type="row.status == 1 ? 'danger' : 'primary'"
            size="mini"
            @click="handleEditStatus(row)"
            style="padding: 7px 0"
            plain
            v-if="handleBtnShow[2].isShow"
            >{{ row.status == 1 ? "冻结" : "启用" }}</el-button
          >
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            @click="handleApply(row)"
            style="padding: 7px 0"
            v-if="
              row.applyQuotaStatus == 2 &&
              handleBtnShow[3].isShow &&
              row.recentlyApply &&
              row.recentlyApply.auditStatus == 3
            "
          >
            重新申请
          </el-button>
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            @click="handleApply(row)"
            style="padding: 7px 0"
            v-else-if="handleBtnShow[1].isShow"
            :disabled="
              row.applyQuotaStatus == 1 ||
              (row.applyQuotaStatus == 2 && row.addQuotaStatus == 1)
            "
          >
            <span v-if="row.applyQuotaStatus == 2">提额</span>
            <span
              v-else-if="row.applyQuotaStatus == 0 || row.applyQuotaStatus == 1"
              >申请额度</span
            >
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
    <el-dialog
      :title="dialogForm.applyType == 1 ? '申请额度' : '提升额度'"
      :visible.sync="dialogFormVisible"
      center
    >
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 90px"
      >
        <el-form-item label="额度" prop="quota">
          <el-input v-model="dialogForm.quota" placeholder="额度" />
        </el-form-item>
        <el-form-item
          label="资料收集（请提供申请额度相关资料）"
          prop="dataPicList"
          v-if="dialogForm.applyType == 1"
        >
          <el-button size="small" type="primary" @click="addPic">
            新增
          </el-button>
          <template v-for="(item, index) in dialogForm.dataPicList">
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
                    return handleImageSuccess(res, file, index);
                  }
                "
                :before-remove="beforePicRemove"
                :before-upload="
                  (res, file) => {
                    return beforeImageUpload(res, file, index);
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
                v-if="dialogForm.dataPicList.length > 1"
                @click="delPic(index)"
                style="margin: 12px 0"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-form-item>
        <el-form-item
          label="资料收集（请提供提升额度相关资料）"
          prop="dataPicList"
          v-else
        >
          <el-button size="small" type="primary" @click="addPic">
            新增
          </el-button>
          <template v-for="(item, index) in dialogForm.dataPicList">
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
                    return handleImageSuccess(res, file, index);
                  }
                "
                :before-remove="beforePicRemove"
                :before-upload="
                  (res, file) => {
                    return beforeImageUpload(res, file, index);
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
                v-if="dialogForm.dataPicList.length > 1"
                @click="delPic(index)"
                style="margin: 12px 0"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-form-item>
        <el-form-item
          label="pdf文件（请提供申请额度相关资料）"
          prop="dataPdfList"
          v-if="dialogForm.applyType == 1"
        >
          <el-button
            size="small"
            type="primary"
            @click="addPdf"
            style="margin-bottom: 8px"
          >
            新增
          </el-button>
          <template v-for="(item, index) in dialogForm.dataPdfList">
            <div :key="index">
              <div style="display: flex">
                <el-upload
                  auto-upload
                  :ref="`upload${index}`"
                  :headers="headers"
                  :action="uploadUrl"
                  :data="fileData"
                  :on-preview="handlePreview"
                  :file-list="item.pdfFileList"
                  :before-upload="
                    (res, file) => {
                      return beforePdfUpload(res, file, index);
                    }
                  "
                  :on-success="
                    (res, file) => {
                      return handlePdfSuccess(res, file, index);
                    }
                  "
                  accept=".pdf,.PDF"
                  :before-remove="beforePdfRemove"
                  :on-remove="
                    (res, file) => {
                      return pdfRemove(res, file, index);
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
                v-if="dialogForm.dataPdfList.length > 1"
                @click="delPdf(index)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-form-item>
        <el-form-item
          label="pdf文件（请提供提升额度相关资料）"
          prop="dataPdfList"
          v-else
        >
          <el-button
            size="small"
            type="primary"
            @click="addPdf"
            style="margin-bottom: 8px"
          >
            新增
          </el-button>
          <template v-for="(item, index) in dialogForm.dataPdfList">
            <div :key="index">
              <div style="display: flex">
                <el-upload
                  auto-upload
                  :ref="`upload${index}`"
                  :headers="headers"
                  :action="uploadUrl"
                  :data="fileData"
                  :on-preview="handlePreview"
                  :file-list="item.pdfFileList"
                  :before-upload="
                    (res, file) => {
                      return beforePdfUpload(res, file, index);
                    }
                  "
                  :on-success="
                    (res, file) => {
                      return handlePdfSuccess(res, file, index);
                    }
                  "
                  accept=".pdf,.PDF"
                  :before-remove="beforePdfRemove"
                  :on-remove="
                    (res, file) => {
                      return pdfRemove(res, file, index);
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
                v-if="dialogForm.dataPdfList.length > 1"
                @click="delPdf(index)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitApplyType">确定</el-button>
        <el-button @click="cancelApplyType">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="冻结原因" :visible.sync="dialogFormVisible1" center>
      <el-form
        ref="dialogForm1"
        :rules="rules1"
        :model="dialogForm1"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 100px"
      >
        <el-form-item label="冻结原因" prop="frozenReason">
          <el-input
            v-model="dialogForm1.frozenReason"
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
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import {
  applyQuotaList,
  applyQuota,
  editQuotaStatus,
  quotaApplyDtl,
  editQuotaApply,
} from "@/api/borrowMoneyManage";
import { roleList } from "@/api/branchCoManage";
import { companyListQuery } from "@/api/systemManage";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { formatDate } from "@/utils/index";
let id = 0;
export default {
  name: "ApplyQuotaManage",
  components: { Pagination },
  directives: { waves },
  data() {
    const isNum1 = (rule, value, callback) => {
      const num = /^[-]?\d+(?:\.\d{1,4})?$/;
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
      canEdit: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      isEdit: false,
      fileData: {
        fileType: "carDealersQuota",
      },
      companyIdOptions: [],
      roleList: [],
      statusOptions: [
        { key: 1, label: "启用", value: 1 },
        { key: 2, label: "冻结", value: 2 },
      ],
      applyTypeOptions: [
        {
          key: 1,
          lab: "额度申请",
          value: 1,
        },
        {
          key: 2,
          lab: "提额",
          value: 2,
        },
      ],
      authStatusOptions: [
        {
          key: 1,
          label: "未认证",
          value: 1,
        },
        {
          key: 2,
          label: "已认证",
          value: 2,
        },
      ],
      labelPosition: "top",
      uploadUrl,
      headers: {},
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        companyId: undefined,
        custmagerId: undefined,
        carDealersName: undefined,
        carDealersPhone: undefined,
        authStatus: undefined,
        status: undefined,
      },
      handleBtnShow: [
        {
          btnName: "LoanQuotaQuery",
          isShow: false,
        },
        {
          btnName: "LoanQuotaApplyQuota",
          isShow: false,
        },
        {
          btnName: "LoanQuotaModifyStatus",
          isShow: false,
        },
        {
          btnName: "LoanQuotaApplyModify",
          isShow: false,
        },
      ],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogForm: {
        carDealersId: "",
        quota: "",
        applyType: "",
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
      },
      dialogForm1: {
        status: undefined,
        frozenReason: undefined,
        carDealersList: [],
      },
      rules: {
        quota: [{ required: true, validator: isNum1, trigger: "blur" }],
        dataPicList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
      },
      rules1: {
        frozenReason: [{ required: true, message: "必填项", trigger: "blur" }],
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
    this.getCompanyList();
    this.getRoleList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      let res = await applyQuotaList({
        ...this.listQuery,
      });
      console.log(res);
      if (res.rtn == 1) {
        this.list = res.result.quotaList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {
          if (item.totalQuota || item.totalQuota == 0) {
            item.totalQuota = (parseFloat(item.totalQuota) / 10000).toFixed(2);
          }

          if (item.useQuota || item.useQuota == 0) {
            item.useQuota = (parseFloat(item.useQuota) / 10000).toFixed(2);
          }

          if (item.cumulativeUseQuota || item.cumulativeUseQuota == 0) {
            item.cumulativeUseQuota = (
              parseFloat(item.cumulativeUseQuota) / 10000
            ).toFixed(2);
          }
        });
      }
      // Just to simulate the time of the request
      this.listLoading = false;
    },
    async getRoleList() {
      this.listLoading = true;

      let res = await roleList({});
      console.log(res);
      if (res.rtn == 1) {
        this.roleList = res.roleList;
      }
      // Just to simulate the time of the request
      this.listLoading = false;
    },
    async getCompanyList() {
      const res = await companyListQuery({});
      if (res.rtn == 1) {
        this.companyIdOptions = res.companyList;
      }
    },
    handleApply(row) {
      this.dialogFormVisible = true;
      if (row.recentlyApply && row.recentlyApply.auditStatus == 3) {
        this.canEdit = true;
        this.handleEdit(row);
      } else {
        this.canEdit = false;
        this.dialogForm = {
          carDealersId: "",
          quota: "",
          applyType: "",
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
        };
      }

      this.dialogForm.carDealersId = row.carDealersId;
      if (row.applyQuotaStatus == 0) {
        this.dialogForm.applyType = 1;
      } else if (row.applyQuotaStatus == 2 && row.addQuotaStatus != 1) {
        this.dialogForm.applyType = 2;
      }
    },
    async handleEdit(row) {
      let res = await quotaApplyDtl({
        workflowId: row.recentlyApply.workflowId,
      });
      let {
        applyId,
        applyType,
        carDealersId,
        quota,
        dataPicList,
        dataPdfList,
      } = res.result.auditObject.quotaApplyInfo;

      if (dataPicList && dataPicList.length > 0) {
        dataPicList.forEach((item, index) => {
          item.isUpload = undefined;
        });
      }

      this.dialogForm = {
        applyId,
        carDealersId,
        quota,
        applyType,
        dataPicList:
          dataPicList && dataPicList.length > 0
            ? dataPicList
            : [
                {
                  dataUrl: undefined,
                  originalPicUrl: undefined,
                  fileName: undefined,
                  isUpload: undefined,
                },
              ],
        dataPdfList:
          dataPdfList && dataPdfList.length > 0
            ? dataPdfList
            : [
                {
                  dataUrl: undefined,
                  fileName: undefined,
                },
              ],
      };
      if (dataPdfList && dataPdfList.length > 0) {
        this.dialogForm.dataPdfList.forEach((item, index) => {
          var pdfJson = {};
          item.pdfFileList = [];
          pdfJson.name = "pdf" + item.fileName;
          pdfJson.url = item.dataUrl;
          item.pdfFileList.push(pdfJson);
        });
      }
    },
    handleEditStatus(row) {
      this.dialogForm1 = {
        status: undefined,
        frozenReason: undefined,
        carDealersList: [],
      };
      this.dialogForm1.carDealersList = [{ carDealersId: row.carDealersId }];
      this.dialogForm1.status = row.status == 1 ? 2 : 1;
      if (row.status == 1) {
        this.dialogFormVisible1 = true;
      } else {
        this.editStatus();
      }
    },
    async submitApplyType() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          this.listLoading = true;
          const form = { ...this.dialogForm };
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
            applyId: form.applyId ? form.applyId : undefined,
            carDealersId: form.carDealersId,
            applyType: form.applyType,
            quota: form.quota,
            dataPicList: form.dataPicList,
            dataPdfList: form.dataPdfList,
          };

          if (this.canEdit) {
            var res = await editQuotaApply(paramsData);
          } else {
            var res = await applyQuota(paramsData);
          }

          if (res.rtn == 1) {
            this.$message.success("申请成功");
          }
          this.canEdit = false;
          this.dialogFormVisible = false;
          this.dialogForm = {
            carDealersId: "",
            quota: "",
            applyType: "",
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
          };
          this.getList();
        }
      });
    },
    cancelApplyType() {
      this.dialogFormVisible = false;
      this.$refs.dialogForm.resetFields();
      this.dialogForm = {
        carDealersId: "",
        quota: "",
        applyType: "",
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
      };
      this.$refs["upload0"][0].clearFiles();
    },
    submitFrozenStatus() {
      this.$refs.dialogForm1.validate(async (valid) => {
        if (valid) {
          this.editStatus();
          this.dialogFormVisible1 = false;
          this.dialogForm1 = {
            status: undefined,
            frozenReason: undefined,
            carDealersList: [],
          };
        }
      });
    },
    cancelFrozenStatus() {
      this.dialogFormVisible1 = false;
      this.$refs.dialogForm1.resetFields();
      this.dialogForm1 = {
        status: undefined,
        frozenReason: undefined,
        carDealersList: [],
      };
    },
    async editStatus() {
      const res = await editQuotaStatus(this.dialogForm1);
      if (res.rtn == 1) {
        this.$message.success("修改成功");
        this.getList();
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
        companyName: undefined,
        custmagerId: undefined,
        carDealersName: undefined,
        carDealersPhone: undefined,
        authStatus: undefined,
        status: undefined,
      };
      this.getList();
    },
    toDtl(row) {
      // this.$refs['dataForm'].clearValidate()
      this.$router.push({
        name: "dealerDtlManage",
        query: { orderUuid: row.orderNumber, beforeRouter: "DealerListManage" },
      });
    },

    beforeDetailRemove(file) {
      return this.$confirm(`确定移除${file.name || "该图片"}？`);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleImageSuccess(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm.dataPicList[index].dataUrl = res.thumbnailUrl;
        this.dialogForm.dataPicList[index].originalPicUrl = res.url;
        this.dialogForm.dataPicList[index].isUpload = "isLoaded";
      }
    },
    handlePdfSuccess(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm.dataPdfList[index].dataUrl = res.url;
        this.dialogForm.dataPdfList[index].pdfFileList = [
          {
            name: file.raw.name,
            url: this.dialogForm.dataPdfList[index].dataUrl,
          },
        ];
      }
    },
    beforeImageUpload(res, file, index) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      this.dialogForm.dataPicList[index].isUpload = "isLoading";
    },
    beforePdfUpload(res, file, index) {
      // this.$refs[`upload${index}`][0].clearFiles();
      delete this.dialogForm.dataPdfList[index].pdfFileList;
    },
    beforePicRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    addPic() {
      let dataPicList = this.dialogForm.dataPicList;
      // console.log(dataPicList)
      if (dataPicList.length > 0) {
        dataPicList.unshift({
          dataUrl: undefined,
          fileName: undefined,
          isUpload: undefined,
          originalPicUrl: undefined,
        });
        this.dialogForm.dataPicList = dataPicList;
      }
    },
    addPdf() {
      let dataPdfList = this.dialogForm.dataPdfList;
      // console.log(dataPicList)
      if (dataPdfList.length > 0) {
        dataPdfList.unshift({
          dataUrl: undefined,
          fileName: undefined,
        });
        this.dialogForm.dataPdfList = dataPdfList;
      }
    },
    delPic(index) {
      let dataPicList = this.dialogForm.dataPicList;
      if (dataPicList.length > 1) {
        dataPicList.splice(index, 1);
        this.dialogForm.dataPicList = dataPicList;
      }
    },
    delPdf(index) {
      let dataPdfList = this.dialogForm.dataPdfList;
      if (dataPdfList.length > 1) {
        dataPdfList.splice(index, 1);
        this.dialogForm.dataPdfList = dataPdfList;
      }
      this.$refs[`upload${index}`][0].clearFiles();
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
    pdfRemove(res, file, index) {
      console.log(res, "=====");
      if (res.status == "success") {
        this.dialogForm.dataPdfList[index].dataUrl = undefined;
      }
    },
  },
};
</script>

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
