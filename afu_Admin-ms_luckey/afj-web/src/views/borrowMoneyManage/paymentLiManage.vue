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
            <el-form-item label="车架号">
              <el-input
                v-model="listQuery.carNo"
                placeholder="车架号"
                style="width: 200px"
                class="filter-item"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否打款">
              <el-select
                v-model="listQuery.isPayment"
                placeholder="是否已打款"
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
          <el-col :span="10">
            <el-form-item label="打款时间">
              <el-date-picker
                v-model="queryDate"
                style="width: 360px"
                type="datetimerange"
                class="filter-item"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
          <div>{{ row.companycontactPhone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所属客服" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.custmagerName }}</div>
          <div>{{ row.custmagerPhone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所属产权人" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.propertyOwnerName }}</div>
          <div>{{ row.propertyOwnerPhone }}</div>
        </template>
      </el-table-column>
      <el-table-column label="借款金额" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.loanMoney || "--" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="抵押车架号" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.carNo }}</div>
        </template>
      </el-table-column>
      <el-table-column label="签约日期" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.signAt || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="期望打款日期" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.hopePaymentAt || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="打款日期" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.paymentAt || "--" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="打款状态" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.paymentAt ? "已打款" : "待打款" || "--" }}</div>
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
            class="filter-item"
            type="primary"
            plain
            size="mini"
            v-if="handleBtnShow[2].isShow"
            @click="toDtl(row)"
            >查看</el-button
          >
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            :disabled="!row.signAt"
            v-if="handleBtnShow[1].isShow && !row.paymentAt"
            @click="handlePayment(row)"
            >打款</el-button
          >
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            size="mini"
            :disabled="!row.signAt"
            style="padding: 7px 0"
            v-if="handleBtnShow[1].isShow && !row.paymentAt"
            @click="handleCancelPayment(row)"
            >取消打款</el-button
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

    <el-dialog title="打款申请" :visible.sync="dialogFormVisible" center>
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 90px"
      >
        <el-form-item label="打款日期" prop="paymentAt">
          <el-date-picker
            v-model="dialogForm.paymentAt"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="paymentRemarks">
          <el-input
            v-model="dialogForm.paymentRemarks"
            type="textarea"
            placeholder="打款备注"
          />
        </el-form-item>
        <el-form-item
          label="资料收集（请提供打款相关资料，如：打款凭证）"
          prop="dataPicList"
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
          label="pdf文件（请提供打款相关资料，如：打款凭证）"
          prop="dataPdfList"
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
        <el-button type="primary" @click="submitPayment">确定</el-button>
        <el-button @click="cancelPayment">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="取消打款申请" :visible.sync="dialogFormVisible1" center>
      <el-form
        ref="dialogForm1"
        :rules="rules1"
        :model="dialogForm1"
        :label-position="labelPosition"
        label-width="120px"
        style="margin: 0 90px"
      >
        <el-form-item label="取消打款原因" prop="rejectReason">
          <el-input
            v-model="dialogForm1.rejectReason"
            placeholder="取消打款原因"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelPaymentHandle">确定</el-button>
        <el-button @click="cancelPayment1">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import notify from "mixins/notify";
import { uploadUrl } from "@/api/upload";
import { paymentList, payment, cancelPayment } from "@/api/borrowMoneyManage";
import { formatDate } from "@/utils/index";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
let id = 0;
export default {
  name: "PaymentLiManage",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      // orderNum:'',
      downloadLoading: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      fileData: {
        fileType: "loan",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      statusOptions: [
        { label: "是", value: 1 },
        { label: "否", value: 0 },
      ],
      queryDate: [],
      labelPosition: "top",
      uploadUrl,
      headers: {},
      rules: {
        paymentRemarks: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        dataPicList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
        paymentAt: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      rules1: {
        rejectReason: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        status: undefined,
        carNo: undefined,
        paymentBeginAt: undefined,
        paymentEndAt: undefined,
      },
      handleBtnShow: [
        {
          btnName: "LoanPaymentQuery",
          isShow: false,
        },
        {
          btnName: "LoanPaymentApply",
          isShow: false,
        },
        {
          btnName: "LoanPaymentDetail",
          isShow: false,
        },
      ],

      downloadLoading: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogForm1: {
        rejectReason: undefined,
      },
      dialogForm: {
        carId: "",
        paymentRemarks: "",
        paymentAt: "",
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
      handleBtnFuncArr: [],
      // 新加复选框
      selectedData: [],
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
    console.log(this.handleBtnShow);
    this.getList();

    console.log(this.head);
  },
  methods: {
    async getList() {
      this.listLoading = true;
      if (this.queryDate[0]) {
        var paymentBeginAt = formatDate(new Date(this.queryDate[0]));
        this.listQuery.paymentBeginAt = paymentBeginAt;
      }
      if (this.queryDate[1]) {
        var paymentEndAt = formatDate(new Date(this.queryDate[1]));
        this.listQuery.paymentEndAt = paymentEndAt;
      }

      let res = await paymentList({
        ...this.listQuery,
      });
      if (res.rtn == 1) {
        this.list = res.result.paymentList;
        this.total = res.result.total;
        this.list.forEach((item, index) => {
          if (item.loanMoney || item.loanMoney == 0) {
            item.loanMoney = parseFloat(item.loanMoney).toFixed(2);
          }
        });
      }
      // Just to simulate the time of the request
      this.listLoading = false;
    },
    async cancelPaymentHandle() {
      this.$refs.dialogForm1.validate(async (valid) => {
        if (valid) {
          let res = await cancelPayment(this.dialogForm1);
          if (res.rtn == 1) {
            this.$message.success("取消打款成功!");
          }
          this.dialogForm1 = {
            rejectReason: undefined,
          };
          this.getList();
          this.dialogFormVisible1 = false;
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
        carDealersName: undefined,
        carDealersPhone: undefined,
        companyId: undefined,
        isPayment: undefined,
        carNo: undefined,
        paymentBeginAt: undefined,
        paymentEndAt: undefined,
      };
      this.queryDate = [];
      this.getList();
    },
    toDtl(row) {
      this.$router.push({
        name: "PaymentDtlManage",
        query: { carId: row.carId, beforeRouter: "PaymentLiManage" },
      });
    },
    handlePayment(row) {
      this.dialogFormVisible = true;
      this.dialogForm = {
        carId: "",
        paymentAt: "",
        paymentRemarks: "",
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
      this.dialogForm.carId = row.carId;
    },
    handleCancelPayment(row) {
      this.dialogFormVisible1 = true;
      this.dialogForm1 = {
        rejectReason: undefined,
      };
      this.dialogForm1.carId = row.carId;
    },
    async submitPayment() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
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
            carId: form.carId,
            paymentAt: form.paymentAt,
            paymentRemarks: form.paymentRemarks,
            dataPicList: form.dataPicList,
            dataPdfList: form.dataPdfList,
          };

          let res = await payment(paramsData);

          if (res.rtn == 1) {
            this.$message.success("打款成功!");
          }
          this.dialogForm = {
            carId: "",
            paymentAt: "",
            paymentRemarks: "",
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
          this.dialogFormVisible = false;
        }
      });
    },
    cancelPayment() {
      this.dialogFormVisible = false;
      this.$refs.dialogForm.resetFields();
      this.dialogForm = {
        carId: "",
        paymentAt: "",
        paymentRemarks: "",
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

    cancelPayment1() {
      this.dialogFormVisible1 = false;
      this.$refs.dialogForm1.resetFields();
      this.dialogForm1 = {
        rejectReason: undefined,
      };
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