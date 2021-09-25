<template>
  <div class="app-container">
    <!-- <div class="header">
      <span class="headLab">基本信息</span>
      <el-button style="font-size:14px;float:right;padding:3px 0" type="text" @click="onBack">返回</el-button>
    </div>
    <div class="content">
      <div class="orderHeader">
        <div class="section">
          <div class="companyDtl">
            <div class="companyDtl__inner">
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">姓名：</div>
                <div class="companyDtl__line__txt">{{companyDtl.companyName}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">手机号码：</div>
                <div class="companyDtl__line__txt">{{companyDtl.contactName}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">身份证号：</div>
                <div class="companyDtl__line__txt">{{companyDtl.contactPhone}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">认证时间：</div>
                <div
                  class="companyDtl__line__txt col_red fontWei_700"
                >{{companyDtl.companyRoleName}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">认证类型：</div>
                <div class="companyDtl__line__txt">{{companyDtl.createAt || '－'}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">所属分公司：</div>
                <div
                  class="companyDtl__line__txt col_red fontWei_700"
                >{{companyDtl.province}}{{companyDtl.city}}{{companyDtl.county}}{{companyDtl.detailAddress}}</div>
              </div>
              <div class="companyDtl__line__item">
                <div class="companyDtl__line__lab">所属客服：</div>
                <div
                  class="companyDtl__line__txt col_red fontWei_700"
                >{{companyDtl.province}}{{companyDtl.city}}{{companyDtl.county}}{{companyDtl.detailAddress}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <div class="header">
      <span class="headLab">{{ title }}</span>
      <el-button
        style="font-size: 14px; float: right; padding: 3px 0"
        type="text"
        @click="onBack"
        >返回</el-button
      >
    </div>
    <el-form
      ref="dialogForm"
      :rules="rules"
      :model="dialogForm"
      :label-position="labelPosition"
      label-width="90px"
      style="width: 520px; margin: 40px 100px 60px 0"
    >
      <el-form-item label="车辆头像" prop="carPicUrl">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="headers"
          :show-file-list="false"
          :on-success="headSuccess"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
          :data="fileData"
        >
          <img
            v-if="dialogForm.carPicUrl"
            :src="dialogForm.carPicUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <div style="display: flex">
        <el-form-item label="车架号" prop="carNo" style="width: 100%; flex: 1">
          <el-input
            style="width: 230px"
            v-model="dialogForm.carNo"
            placeholder="车架号"
          />
        </el-form-item>
        <el-form-item
          label="车辆颜色"
          prop="carColor"
          style="width: 100%; flex: 1"
        >
          <el-input
            style="width: 230px"
            v-model="dialogForm.carColor"
            placeholder="车辆颜色"
          />
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item
          label="巡检计划ID"
          prop="inspectionPlanId"
          style="width: 100%; flex: 1"
        >
          <el-select
            v-model="dialogForm.inspectionPlanId"
            placeholder="巡检计划ID"
            clearable
            style="width: 230px"
          >
            <el-option
              v-for="item in inspectionPlanOptions"
              :key="item.inspectionPlanId"
              :label="item.inspectionPlanName"
              :value="item.inspectionPlanId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="车商ID"
          prop="carDealersId"
          style="width: 100%; flex: 1"
        >
          <el-select
            v-model="dialogForm.carDealersId"
            placeholder="车商ID"
            clearable
            style="width: 230px"
          >
            <el-option
              v-for="item in carDealersOptions"
              :key="item.carDealersId"
              :label="item.carDealersName"
              :value="item.carDealersId"
            />
          </el-select>
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item
          label="产权人ID"
          prop="propertyOwnerId"
          style="width: 100%; flex: 1"
        >
          <el-select
            v-model="dialogForm.propertyOwnerId"
            placeholder="产权人ID"
            clearable
            style="width: 230px"
          >
            <el-option
              v-for="item in propertyOwnerOptions"
              :key="item.ownerId"
              :label="item.ownerName"
              :value="item.ownerId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="客服ID"
          prop="custmagerId"
          style="width: 100%; flex: 1"
        >
          <el-select
            v-model="dialogForm.custmagerId"
            placeholder="客户经理ID"
            clearable
            style="width: 230px"
          >
            <el-option
              v-for="item in custmagerSelOptions"
              :key="item.custmagerId"
              :label="item.custmagerName"
              :value="item.custmagerId"
            />
          </el-select>
        </el-form-item>
      </div>

      <div style="display: flex">
        <el-form-item label="品牌" prop="carBrand" style="width: 100%; flex: 1">
          <el-input
            style="width: 160px"
            v-model="dialogForm.carBrand"
            placeholder="车辆品牌"
          />
        </el-form-item>
        <el-form-item label="车型" prop="carModel" style="width: 100%; flex: 1">
          <el-input
            style="width: 160px"
            v-model="dialogForm.carModel"
            placeholder="车辆型号"
          />
        </el-form-item>
        <el-form-item
          label="年份"
          prop="carProductionYear"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.carProductionYear"
            placeholder="生产年份"
            style="width: 160px"
          />
        </el-form-item>
      </div>

      <el-form-item label="描述" prop="carRemarks">
        <el-input v-model="dialogForm.carRemarks" placeholder="车辆描述信息" />
      </el-form-item>
      <el-form-item label="省市区" prop="province">
        <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="detailAddress">
        <el-input v-model="dialogForm.detailAddress" placeholder="详细地址" />
      </el-form-item>

      <el-form-item label="车辆相关图片资料" prop="carPicList">
        <el-button size="small" type="primary" @click="addPic">
          新增
        </el-button>
        <template v-for="(item, index) in dialogForm.carPicList">
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
              v-if="dialogForm.carPicList.length > 1"
              @click="delPic(index)"
              style="margin: 12px 0"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="车辆相关pdf资料" prop="carPdfList">
        <el-button
          size="small"
          type="primary"
          @click="addPdf"
          style="margin-bottom: 8px"
        >
          新增
        </el-button>
        <template v-for="(item, index) in dialogForm.carPdfList">
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
              v-if="dialogForm.carPdfList.length > 1"
              @click="delPdf(index)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-form-item>
      <div style="flex">
        <el-form-item
          label="经度"
          prop="longitude"
          style="width: 100%; flex: 1"
        >
          <el-input
            disabled
            class="lineinput"
            style="width: 230px"
            size="mini"
            v-model.number="dialogForm.longitude"
          ></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude" style="width: 100%; flex: 1">
          <el-input
            disabled
            class="lineinput"
            style="width: 230px"
            size="mini"
            v-model.number="dialogForm.latitude"
          ></el-input>
        </el-form-item>
      </div>

      <el-form-item label="地图">
        <baidu-map
          class="map"
          :center="center"
          :zoom="zoom"
          @ready="handler"
          :scroll-wheel-zoom="true"
          @click="clickEvent"
          ak="33B192o1jPaqOHASGGAIkoMuwi8W76j3"
        >
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
          <bm-geolocation
            anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
            @locationSuccess="getLoctionSuccess"
          ></bm-geolocation>
          <bm-view
            :style="{
              width: '100%',
              height: this.clientHeight + 'px',
              flex: 1,
              marginBottom: '30px',
            }"
          ></bm-view>
        </baidu-map>
      </el-form-item>

      <el-form-item
        label="申请借款资料收集（请提供真实有效的证明资料，如车商征信、资产、业务证明等））"
        prop="applyPicList"
      >
        <el-button size="small" type="primary" @click="addPic1">
          新增
        </el-button>
        <template v-for="(item, index) in dialogForm.applyPicList">
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
              v-if="dialogForm.applyPicList.length > 1"
              @click="delPic1(index)"
              style="margin: 12px 0"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-form-item>
      <el-form-item
        label="申请借款pdf文件（请提供真实有效的证明资料，如车商征信、资产、业务证明等）"
        prop="applyPdfList"
      >
        <el-button
          size="small"
          type="primary"
          @click="addPdf1"
          style="margin-bottom: 8px"
        >
          新增
        </el-button>

        <template v-for="(item, index) in dialogForm.applyPdfList">
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
              v-if="dialogForm.applyPdfList.length > 1"
              @click="delPdf1(index)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="借款申请" prop="applyRemarks" style="width: 100%">
        <el-input
          v-model="dialogForm.applyRemarks"
          type="textarea"
          :rows="3"
          placeholder="申请描述"
        />
      </el-form-item>
      <div style="display: flex">
        <el-form-item
          label="估价"
          prop="assessedPrice"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.assessedPrice"
            placeholder="车辆评估价格"
            style="width: 230px"
          />
        </el-form-item>

        <el-form-item
          label="审批额度"
          prop="loanMoney"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.loanMoney"
            placeholder="审批额度"
            style="width: 230px"
          />
        </el-form-item>
      </div>

      <div style="display: flex">
        <el-form-item
          label="借款账号名"
          prop="loanBankUserName"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.loanBankUserName"
            placeholder="借款账号名"
            style="width: 230px"
          />
        </el-form-item>
        <el-form-item
          label="银行卡号"
          prop="loanBankCard"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.loanBankCard"
            placeholder="银行卡号"
            style="width: 230px"
          />
        </el-form-item>
      </div>
      <div style="display: flex; align-items: center">
        <el-form-item
          label="放贷类型"
          prop="paymentFundsType"
          style="width: 100%; flex: 1"
        >
          <el-switch
            style="display: block"
            v-model="dialogForm.paymentFundsType"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#13ce66"
            active-text="联合资金"
            inactive-text="自有资金"
          >
          </el-switch>
        </el-form-item>
        <el-form-item
          label="借款类型"
          prop="loanType"
          style="width: 100%; flex: 1"
        >
          <el-radio v-model="dialogForm.loanType" label="1">卖方</el-radio>
          <el-radio v-model="dialogForm.loanType" label="2">车商</el-radio>
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item
          label="开户银行"
          prop="loanBankName"
          style="width: 100%; flex: 1"
        >
          <el-input
            v-model="dialogForm.loanBankName"
            placeholder="开户银行"
            style="width: 230px"
          />
        </el-form-item>
        <el-form-item
          label="期望打款时间"
          prop="hopePaymentAt"
          style="width: 100%; flex: 1"
        >
          <el-date-picker
            v-model="dialogForm.hopePaymentAt"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            style="width: 230px"
          ></el-date-picker>
        </el-form-item>
      </div>
    </el-form>
    <div
      class="dialog-footer"
      style="display: flex; justify-content: center; width: 500px"
    >
      <el-button @click="onCancel" style="width: 150px; margin-right: 60px"
        >取消</el-button
      >
      <el-button type="primary" style="width: 150px" @click="onSubmit"
        >提交审批</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  addVehicle,
  dealersSelList,
  propertyOwnerSelList,
  editVehicle,
  vehicleDtl,
  inspectionPlanSelList,
} from "@/api/riskManage";
import {
  applyQuickLoan,
  custmagerSelList,
  quickLoanDtl,
  editQuickLoan,
} from "@/api/borrowMoneyManage";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
import { Select, Form } from "element-ui";
import { uploadUrl } from "@/api/upload";
import {
  BaiduMap,
  BmNavigation,
  BmView,
  BmGeolocation,
  BmCityList,
} from "vue-baidu-map";
export default {
  name: "AddBorrowMoneyManage",
  components: {
    BaiduMap,
    BmNavigation,
    BmView,
    BmGeolocation,
    BmCityList,
  },
  data() {
    const isNum = (rule, value, callback) => {
      const num = /^[0-9]*$/;
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
      canEdit: false,
      title: "新建快速借款",
      companyId: "",
      companyDtl: {},
      headers: {},
      uploadUrl,
      labelPosition: "top",
      fileData: {
        fileType: "loan",
      },

      carDealersOptions: [],
      inspectionPlanOptions: [],
      propertyOwnerOptions: [],
      selectedOptions: [],
      TextToCode,
      custmagerSelOptions: [],
      options: regionData,
      carSelList: [],
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
      radio1: "半小时内",
      dialogForm: {
        carDealersId: undefined,
        carPicUrl: undefined,
        carNo: undefined,
        carColor: undefined,
        inspectionPlanId: undefined,
        custmagerId: undefined,
        carBrand: undefined,
        carModel: undefined,
        carProductionYear: undefined,
        carRemarks: undefined,
        province: undefined,
        city: undefined,
        county: undefined,
        detailAddress: undefined,
        longitude: undefined,
        latitude: undefined,
        carPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        carPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        applyPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        applyPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        propertyOwnerId: undefined,
        applyRemarks: undefined,
        loanMoney: undefined,
        assessedPrice: undefined,
        loanBankUserName: undefined,
        loanBankCard: undefined,
        loanBankName: undefined,
        hopePaymentAt: undefined,
        loanType: "1",
        paymentFundsType: 1,
      },
      center: { lng: 116.4, lat: 39.9 },
      zoom: 12,
      mapVisible: false,
      clientHeight: document.documentElement.clientHeight - 300, // 屏幕高度
      iconUrl: require("../../assets/addressCenter.png"),
      rules: {
        carPicList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
        loanMoney: [{ required: true, validator: isNum1, trigger: "blur" }],
        carRemarks: [{ required: true, message: "必填项", trigger: "blur" }],
        assessedPrice: [{ required: true, validator: isNum1, trigger: "blur" }],
        loanBankUserName: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        loanBankCard: [{ required: true, validator: isNum, trigger: "blur" }],
        loanBankName: [{ required: true, message: "必填项", trigger: "blur" }],
        hopePaymentAt: [{ required: true, message: "必填项", trigger: "blur" }],
        loanType: [{ required: true, message: "必填项", trigger: "blur" }],
        carPicUrl: [{ required: true, message: "必填项", trigger: "blur" }],
        carNo: [{ required: true, message: "必填项", trigger: "blur" }],
        carDealersId: [{ required: true, message: "必填项", trigger: "blur" }],
        propertyOwnerId: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        custmagerId: [{ required: true, message: "必填项", trigger: "blur" }],
        carColor: [{ required: true, message: "必填项", trigger: "blur" }],
        inspectionPlanId: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        carBrand: [{ required: true, message: "必填项", trigger: "blur" }],
        carModel: [{ required: true, message: "必填项", trigger: "blur" }],
        applyRemarks: [{ required: true, message: "必填项", trigger: "blur" }],
        applyPicList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
        carProductionYear: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        province: [{ required: true, message: "必填项", trigger: "blur" }],
        detailAddress: [{ required: true, message: "必填项", trigger: "blur" }],
        longitude: [{ required: true, message: "必填项", trigger: "blur" }],
        latitude: [{ required: true, message: "必填项", trigger: "blur" }],
        paymentFundsType: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.companyId = userInfo.companyId;
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    this.headers = {
      _t: token,
      _u: userId,
    };
    // this.getCarSelList();
    this.getDealersSelList();
    this.getPropertyOwnerSelList();
    this.getInspectionPlanSelList();
    this.getCustmagerSelList();
  },
  mounted() {
    this.beforeRouter = this.$route.query.beforeRouter;
    if (this.$route.query.canEdit) {
      this.canEdit = JSON.parse(this.$route.query.canEdit);
    }

    if (this.$route.query.workflowId) {
      this.workflowId = this.$route.query.workflowId;
    }

    if (this.canEdit) {
      this.type = "update";
      this.title = "修改快速借款";
      document.title = "修改快速借款";
      this.$route.meta.title = "修改快速借款";
      this.getDetail();
    } else {
      this.type = "add";
      this.title = "新建快速借款";
      document.title = "新建快速借款";
      this.$route.meta.title = "新建快速借款";
    }
  },
  computed: {},
  methods: {
    // async getCarSelList() {
    //   let res = await carSelList({
    //     companyId: this.companyId,
    //     auditStatus: 2,
    //     loanStatus: 0,
    //   });
    //   if (res.rtn == 1) {
    //     this.carSelList = res.carList;
    //   }
    // },
    onCancel() {
      if (!this.canEdit) {
        this.resetForm();
      }
    },
    onBack() {
      this.$router.back(-1);
    },
    onSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          const form = { ...this.dialogForm };
          const isNotPic = form.carPicList.some((item, index) => {
            if (!item.dataUrl || !item.fileName || item.fileName.trim() == "") {
              return true;
            }
          });

          const isNotPic1 = form.applyPicList.some((item, index) => {
            if (!item.dataUrl || !item.fileName || item.fileName.trim() == "") {
              return true;
            }
          });

          if (form.carPdfList.length == 1) {
            if (!form.carPdfList[0].dataUrl && !form.carPdfList[0].fileName) {
              form.carPdfList = undefined;
            }
          }

          if (form.applyPdfList.length == 1) {
            if (
              !form.applyPdfList[0].dataUrl &&
              !form.applyPdfList[0].fileName
            ) {
              form.applyPdfList = undefined;
            }
          }

          if (form.carPdfList && form.carPdfList.length > 0) {
            if (form.carPdfList.length == 1) {
              var isNotPdf = form.carPdfList.some((item, index) => {
                if (
                  (!item.dataUrl && item.fileName) ||
                  ((!item.fileName || item.fileName.trim() == "") &&
                    item.dataUrl)
                ) {
                  return true;
                }
              });
            } else {
              var isNotPdf = form.carPdfList.some((item, index) => {
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

          if (form.applyPdfList && form.applyPdfList.length > 0) {
            if (form.applyPdfList.length == 1) {
              var isNotPdf1 = form.applyPdfList.some((item, index) => {
                if (
                  (!item.dataUrl && item.fileName) ||
                  ((!item.fileName || item.fileName.trim() == "") &&
                    item.dataUrl)
                ) {
                  return true;
                }
              });
            } else {
              var isNotPdf1 = form.applyPdfList.some((item, index) => {
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
            this.$message.warning("车辆图片数据缺少");
            return false;
          }

          if (isNotPdf) {
            this.$message.warning("车辆pdf数据缺少");
            return false;
          }

          if (isNotPic1) {
            this.$message.warning("借款图片数据缺少");
            return false;
          }

          if (isNotPdf1) {
            this.$message.warning("借款pdf数据缺少");
            return false;
          }

          form.carPicList.forEach((item, index) => {
            delete item.isUpload;
          });

          form.applyPicList.forEach((item, index) => {
            delete item.isUpload;
          });

          if (form.carPdfList) {
            var carPdfListCopy = JSON.parse(JSON.stringify(form.carPdfList));

            carPdfListCopy.forEach((item, index) => {
              if (item.pdfFileList) {
                delete item.pdfFileList;
              }
            });
          }

          if (form.applyPdfList) {
            var applyPdfListCopy = JSON.parse(
              JSON.stringify(form.applyPdfList)
            );

            applyPdfListCopy.forEach((item, index) => {
              if (item.pdfFileList) {
                delete item.pdfFileList;
              }
            });
          }

          this.listLoading = true;
          const paramsData = {
            applyId: form.applyId,
            carId: form.carId,
            carDealersId: form.carDealersId,
            carPicUrl: form.carPicUrl,
            carNo: form.carNo,
            carColor: form.carColor,
            inspectionPlanId: form.inspectionPlanId,
            custmagerId: form.custmagerId,
            carBrand: form.carBrand,
            carModel: form.carModel,
            carProductionYear: form.carProductionYear,
            carRemarks: form.carRemarks,
            province: form.province,
            city: form.city,
            county: form.county,
            detailAddress: form.detailAddress,
            longitude: form.longitude,
            latitude: form.latitude,
            carPicList: form.carPicList,
            carPdfList: form.carPdfList,
            paymentFundsType: form.paymentFundsType,
            applyPicList: form.applyPicList,
            applyPdfList: form.applyPdfList,
            applyRemarks: form.applyRemarks,
            loanMoney: form.loanMoney,
            propertyOwnerId: form.propertyOwnerId,
            assessedPrice: form.assessedPrice,
            loanBankUserName: form.loanBankUserName,
            loanBankCard: form.loanBankCard,
            loanBankName: form.loanBankName,
            hopePaymentAt: form.hopePaymentAt,
            loanType: form.loanType,
          };

          if (!this.canEdit) {
            let res = await applyQuickLoan(paramsData);
            if (res.rtn == 1) {
              this.$message.success("创建成功!");
              // this.resetForm();
              this.onBack();
            }
          } else {
            let res = await editQuickLoan(paramsData);
            if (res.rtn == 1) {
              this.$message.success("修改成功!");
              // this.resetForm();
              this.onBack();
            }
          }

          this.listLoading = false;
        }
      });
    },
    resetForm() {
      this.$refs["dialogForm"].clearValidate();
      this.dialogForm = {
        carDealersId: undefined,
        carPicUrl: undefined,
        carNo: undefined,
        carColor: undefined,
        inspectionPlanId: undefined,
        custmagerId: undefined,
        carBrand: undefined,
        carModel: undefined,
        carProductionYear: undefined,
        carRemarks: undefined,
        province: undefined,
        city: undefined,
        county: undefined,
        detailAddress: undefined,
        longitude: undefined,
        latitude: undefined,
        carPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        carPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],

        applyPicList: [
          {
            dataUrl: undefined,
            originalPicUrl: undefined,
            fileName: undefined,
            isUpload: undefined,
          },
        ],
        applyPdfList: [
          {
            dataUrl: undefined,
            fileName: undefined,
          },
        ],
        propertyOwnerId: undefined,
        applyRemarks: undefined,
        loanMoney: undefined,
        assessedPrice: undefined,
        loanBankUserName: undefined,
        loanBankCard: undefined,
        loanBankName: undefined,
        hopePaymentAt: undefined,
        loanType: "1",
        paymentFundsType: 1,
      };
      this.$refs["upload0"][0].clearFiles();
    },
    async getDetail() {
      let res = await quickLoanDtl({
        workflowId: this.workflowId,
      });
      if (res.rtn == 1) {
        const { loanApplyInfo, carInfo } = res.result.auditObject;
        const {
          assessedPrice,
          loanMoney,
          loanBankUserName,
          loanType,
          loanBankCard,
          loanBankName,
          hopePaymentAt,
          applyId,
          paymentFundsType,
        } = loanApplyInfo;

        const {
          carId,
          carPicUrl,
          carBrand,
          carColor,
          carModel,
          carNo,
          province,
          city,
          county,
          propertyOwnerId,
          custmagerId,
          detailAddress,
          latitude,
          longitude,
          carDealersId,
          inspectionPlanId,
          carProductionYear,
        } = carInfo;
        const carRemarks = carInfo.remarks;
        const carPicList = carInfo.dataPicList;
        const carPdfList = carInfo.dataPdfList;
        const applyPicList = loanApplyInfo.dataPicList;
        const applyPdfList = loanApplyInfo.dataPdfList;
        const applyRemarks = loanApplyInfo.remarks;

        if (carPicList && carPicList.length > 0) {
          carPicList.forEach((item, index) => {
            item.isUpload = undefined;
          });
        }

        if (applyPicList && applyPicList.length > 0) {
          applyPicList.forEach((item, index) => {
            item.isUpload = undefined;
          });
        }

        console.log(this.TextToCode, "===");

        this.selectedOptions = [
          this.TextToCode[province].code,
          this.TextToCode[province][city].code,
          this.TextToCode[province][city][county].code,
        ];

        this.dialogForm = {
          applyId,
          carId,
          assessedPrice,
          loanMoney,
          loanBankUserName,
          loanType: loanType.toString(),
          loanBankCard,
          loanBankName,
          hopePaymentAt,
          carPicUrl,
          carBrand,
          carColor,
          carModel,
          carNo,
          province,
          city,
          county,
          propertyOwnerId,
          custmagerId,
          detailAddress,
          latitude,
          longitude,
          carRemarks,
          carPicList:
            carPicList.length > 0
              ? carPicList
              : [
                  {
                    dataUrl: undefined,
                    originalPicUrl: undefined,
                    fileName: undefined,
                    isUpload: undefined,
                  },
                ],
          carPdfList:
            carPdfList.length > 0
              ? carPdfList
              : [
                  {
                    dataUrl: undefined,
                    fileName: undefined,
                  },
                ],
          applyPicList:
            applyPicList.length > 0
              ? applyPicList
              : [
                  {
                    dataUrl: undefined,
                    originalPicUrl: undefined,
                    fileName: undefined,
                    isUpload: undefined,
                  },
                ],
          applyPdfList:
            applyPdfList.length > 0
              ? applyPdfList
              : [
                  {
                    dataUrl: undefined,
                    fileName: undefined,
                  },
                ],
          applyRemarks,
          inspectionPlanId,
          carDealersId,
          carProductionYear,
          paymentFundsType,
        };

        if (carPdfList && carPdfList.length > 0) {
          this.dialogForm.carPdfList.forEach((item, index) => {
            var pdfJson = {};
            item.pdfFileList = [];
            pdfJson.name = "pdf" + item.fileName;
            pdfJson.url = item.dataUrl;
            item.pdfFileList.push(pdfJson);
          });
        }

        console.log(applyPdfList, "=====");
        if (applyPdfList && applyPdfList.length > 0) {
          this.dialogForm.applyPdfList.forEach((item, index) => {
            var pdfJson = {};
            item.pdfFileList = [];
            pdfJson.name = "pdf" + item.fileName;
            pdfJson.url = item.dataUrl;
            item.pdfFileList.push(pdfJson);
          });
        }
      }
    },
    async getDealersSelList() {
      let res = await dealersSelList({
        companyId: this.companyId,
      });
      if (res.rtn == 1) {
        this.carDealersOptions = res.carDealersList;
      }
    },
    async getInspectionPlanSelList() {
      let res = await inspectionPlanSelList({
        companyId: this.companyId,
      });
      if (res.rtn == 1) {
        this.inspectionPlanOptions = res.inspectionPlanList;
      }
    },
    async getPropertyOwnerSelList() {
      let res = await propertyOwnerSelList({
        companyId: this.companyId,
      });
      if (res.rtn == 1) {
        this.propertyOwnerOptions = res.propertyOwnerList;
      }
    },
    async getCustmagerSelList(row) {
      const res = await custmagerSelList({
        companyId: this.companyId,
      });
      if (res.rtn == 1) {
        this.custmagerSelOptions = res.custmagerList;
      }
    },
    headSuccess(res) {
      if (res.rtn == 1) {
        this.dialogForm.carPicUrl = res.url;
      }
    },
    beforePicRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    beforePdfRemove(file) {
      return this.$confirm(`确定移除${file.name || "该pdf"}？`);
    },

    handleImageSuccess(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm.carPicList[index].dataUrl = res.thumbnailUrl;
        this.dialogForm.carPicList[index].originalPicUrl = res.url;
        this.dialogForm.carPicList[index].isUpload = "isLoaded";
      }
    },
    handlePdfSuccess(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm.carPdfList[index].dataUrl = res.url;
        this.dialogForm.carPdfList[index].pdfFileList = [
          {
            name: file.raw.name,
            url: this.dialogForm.carPdfList[index].dataUrl,
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
      this.dialogForm.carPicList[index].isUpload = "isLoading";
    },
    beforePdfUpload(res, file, index) {
      // this.$refs[`upload${index}`][0].clearFiles();
      delete this.dialogForm.carPdfList[index].pdfFileList;
    },
    addPic() {
      let carPicList = this.dialogForm.carPicList;
      // console.log(carPicList)
      if (carPicList.length > 0) {
        carPicList.unshift({
          dataUrl: undefined,
          fileName: undefined,
          isUpload: undefined,
          originalPicUrl: undefined,
        });
        this.dialogForm.carPicList = carPicList;
      }
    },
    addPdf() {
      let carPdfList = this.dialogForm.carPdfList;
      // console.log(carPicList)
      if (carPdfList.length > 0) {
        carPdfList.unshift({
          dataUrl: undefined,
          fileName: undefined,
        });
        this.dialogForm.carPdfList = carPdfList;
      }
    },
    delPic(index) {
      let carPicList = this.dialogForm.carPicList;
      if (carPicList.length > 1) {
        carPicList.splice(index, 1);
        this.dialogForm.carPicList = carPicList;
      }
    },
    delPdf(index) {
      let carPdfList = this.dialogForm.carPdfList;
      if (carPdfList.length > 1) {
        carPdfList.splice(index, 1);
        this.dialogForm.carPdfList = carPdfList;
      }
      this.$refs[`upload${index}`][0].clearFiles();
    },
    pdfRemove(res, file, index) {
      if (res.status == "success") {
        this.dialogForm.carPdfList[index].dataUrl = undefined;
      }
    },
    handlePreview(file) {
      window.open(file.response.url);
    },
    handleImageSuccess1(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm.applyPicList[index].dataUrl = res.thumbnailUrl;
        this.dialogForm.applyPicList[index].originalPicUrl = res.url;
        this.dialogForm.applyPicList[index].isUpload = "isLoaded";
      }
    },
    handlePdfSuccess1(res, file, index) {
      if (res.rtn == 1) {
        this.dialogForm.applyPdfList[index].dataUrl = res.url;
        this.dialogForm.applyPdfList[index].pdfFileList = [
          {
            name: file.raw.name,
            url: this.dialogForm.applyPdfList[index].dataUrl,
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
      this.dialogForm.applyPicList[index].isUpload = "isLoading";
    },
    beforePdfUpload1(res, file, index) {
      // this.$refs[`upload${index}`][0].clearFiles();
      delete this.dialogForm.applyPdfList[index].pdfFileList;
    },
    addPic1() {
      let applyPicList = this.dialogForm.applyPicList;
      // console.log(carPicList)
      if (applyPicList.length > 0) {
        applyPicList.unshift({
          dataUrl: undefined,
          fileName: undefined,
          isUpload: undefined,
          originalPicUrl: undefined,
        });
        this.dialogForm.applyPicList = applyPicList;
      }
    },
    addPdf1() {
      let applyPdfList = this.dialogForm.applyPdfList;
      // console.log(carPicList)
      if (applyPdfList.length > 0) {
        applyPdfList.unshift({
          dataUrl: undefined,
          fileName: undefined,
        });
        this.dialogForm.applyPdfList = applyPdfList;
      }
    },
    delPic1(index) {
      let applyPicList = this.dialogForm.applyPicList;
      if (applyPicList.length > 1) {
        applyPicList.splice(index, 1);
        this.dialogForm.applyPicList = applyPicList;
      }
    },
    delPdf1(index) {
      let applyPdfList = this.dialogForm.applyPdfList;
      if (applyPdfList.length > 1) {
        applyPdfList.splice(index, 1);
        this.dialogForm.applyPdfList = applyPdfList;
      }
      this.$refs[`upload${index}`][0].clearFiles();
    },
    pdfRemove1(res, file, index) {
      if (res.status == "success") {
        this.dialogForm.applyPdfList[index].dataUrl = undefined;
      }
    },

    handleChange(value) {
      console.log(this.selectedOptions);
      this.dialogForm.province = CodeToText[value[0]];
      this.dialogForm.city = CodeToText[value[1]];
      this.dialogForm.county = CodeToText[value[2]];
    },
    handler({ BMap, map }) {
      let _this = this; // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function (r) {
          console.log(r);
          _this.center = { lng: r.longitude, lat: r.latitude }; // 设置center属性值
          _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude }; // 自定义覆盖物
          _this.initLocation = true;
        },
        { enableHighAccuracy: true }
      );

      window.map = map;
    },
    //点击地图监听
    clickEvent(e) {
      console.log(e, "---");
      map.clearOverlays();
      let Icon_0 = new BMap.Icon(this.iconUrl, new BMap.Size(32, 32), {
        anchor: new BMap.Size(18, 32),
        imageSize: new BMap.Size(36, 36),
      });
      var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat), {
        icon: Icon_0,
      });
      map.addOverlay(myMarker);
      //用所定位的经纬度查找所在地省市街道等信息
      var point = new BMap.Point(e.point.lng, e.point.lat);
      var gc = new BMap.Geocoder();
      let _this = this;
      gc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents;
        // console.log(rs.address); //地址信息
        // _this.dialogForm.address = rs.address;
      });
      this.dialogForm.longitude = e.point.lng;
      this.dialogForm.latitude = e.point.lat;
    },
    //定位成功回调
    getLoctionSuccess(point, AddressComponent, marker) {
      map.clearOverlays();
      let Icon_0 = new BMap.Icon(this.iconUrl, new BMap.Size(32, 32), {
        anchor: new BMap.Size(18, 32),
        imageSize: new BMap.Size(36, 36),
      });
      var myMarker = new BMap.Marker(
        new BMap.Point(point.point.lng, point.point.lat),
        { icon: Icon_0 }
      );
      map.addOverlay(myMarker);
      this.dialogForm.longitude = point.point.lng;
      this.dialogForm.latitude = point.point.lat;
    },
    findlocation() {
      this.$emit("findlocdata", this.dialogForm);
      this.mapVisible = false;
    },
    mapShow() {
      this.mapVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.jiedian .el-dialogForm-item__label {
  color: #ee5808 !important;
}
.app-container {
  margin: 0 40px;
}
.header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.headLab {
  font-size: 16px;
  font-weight: 500;
  color: #999;
}
.companyDtl,
.userDtl,
.goodsList,
.logisticsList {
  margin-top: 20px;
  // border-right: 1px solid #eee;
}
.userDtl,
.logisticsList {
  border: 0;
}
.companyDtl__inner {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 20px;
  // border-bottom: 1px solid #eee;
}
.userDtl__inner,
.logisticsItem {
  margin-left: 20px;
  padding: 10px 0 20px;
  border-bottom: 1px solid #eee;
}
.logisticsItem {
  border: 0;
  font-size: 14px;
}
.logisticsItem__time {
  display: inline-block;
  width: 180px;
  margin-right: 10px;
  color: #999;
  vertical-align: top;
  line-height: 25px;
}
.logisticsItem__txt {
  width: calc(100% - 200px);
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  line-height: 25px;
}
.companyDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.userDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.companyDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.companyDtl__line__item {
  display: inline-block;
  width: 20%;
  padding-bottom: 20px;
  font-size: 14px;
}
.companyDtl__line__lab,
.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.companyDtl__line__txt,
.userDtl__line__txt {
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.userDtl__line__txt {
  width: calc(100% - 100px);
}

.box-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 70px 20px 0 20px;
  overflow: auto;
}
.content {
  overflow: auto;
  font-size: 0;
}
.section {
  display: inline-block;
  width: 100%;
  vertical-align: top;
}
.orderStatus {
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.75);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5715;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.companyDtl__header__orderInfo tr {
  height: 40px;
  line-height: 40px;
}
.line {
  width: 100%;
  height: 1px;
  margin: 30px 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;

  list-style: none;
  font-feature-settings: "tnum", "tnum";
  background: #f0f0f0;
}
table tr td {
  width: 33.333333%;
}
.head_pic {
  width: 100px;
  height: 100px;
}
.logisticsStatus {
  font-size: 13px;
  padding: 0 20px;
}
.logisticsStatusWrap {
  padding: 20px 0;
}
.goodsList,
.logisticsList {
  padding-top: 30px;
  margin-top: 0;
}
.goodsItem {
  margin-bottom: 30px;
  position: relative;
}
.goodsItem:last-child {
  margin-bottom: 0;
}
.goodsItem__header {
  font-size: 0;
  padding-bottom: 30px;
}
.goodsImg {
  width: 98px;
  height: 98px;
  vertical-align: bottom;
  background: #eee;
  border: 1px solid #efefef;
}
.goodsInfo {
  width: calc(100% - 190px);
  margin-left: 20px;
  font-size: 14px;
  color: rgba($color: #000, $alpha: 1);
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}
.goodsInfo__arrow {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
}
.goodsInfo__item {
  padding-bottom: 5px;
}
.goodsInfo__item:last-child {
  padding: 0;
}
.goodsName {
  color: #000 !important;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.goodsItemNum,
.goodsNum {
  color: #999;
}
.goodsSkuList {
  font-size: 14px;
  color: #999;
}
.goodsSkuItem {
  padding-bottom: 12px;
}
.goodsSkuItem:last-child {
  padding: 0;
}
.goodsSkuItem__left {
  display: inline-block;
  width: 230px;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
}
.goodsSkuItem__right {
  display: inline-block;
  vertical-align: top;
}
.arrowUp {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
  transdialogform: rotate(-360deg);
  transition: all 1s;
}
.arrowDown {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
  transdialogform: rotate(-180deg);
  transition: all 1s;
}
.col_red {
  color: red;
}
.fontWei_700 {
  font-weight: 700;
}
.addrAll {
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