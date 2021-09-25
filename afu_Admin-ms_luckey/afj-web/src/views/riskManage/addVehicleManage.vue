<template>
  <div class="app-container">
    <div class="header">
      <div class="clearfix headLab">
        <span style="font-size: 16px">{{ title }}</span>
        <el-button
          style="float: right; padding: 3px 0; font-size: 14px"
          type="text"
          @click="onBack"
          >返回</el-button
        >
      </div>
    </div>
    <el-form
      ref="dataForm"
      :model="form"
      label-position="right"
      label-width="120px"
      v-loading="listLoading"
      :rules="rules"
      style="width: calc(100% - 600px); margin-left: 240px"
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
          <img v-if="form.carPicUrl" :src="form.carPicUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="车架号" prop="carNo">
        <el-input v-model="form.carNo" placeholder="车架号" />
      </el-form-item>
      <el-form-item label="车辆颜色" prop="carColor">
        <el-input v-model="form.carColor" placeholder="车辆颜色" />
      </el-form-item>
      <el-form-item label="巡检计划ID" prop="inspectionPlanId">
        <el-select
          v-model="form.inspectionPlanId"
          placeholder="巡检计划ID"
          clearable
        >
          <el-option
            v-for="item in inspectionPlanOptions"
            :key="item.inspectionPlanId"
            :label="item.inspectionPlanName"
            :value="item.inspectionPlanId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车商ID" prop="carDealersId">
        <el-select v-model="form.carDealersId" placeholder="车商ID" clearable>
          <el-option
            v-for="item in carDealersOptions"
            :key="item.carDealersId"
            :label="item.carDealersName"
            :value="item.carDealersId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产权人ID" prop="propertyOwnerId">
        <el-select
          v-model="form.propertyOwnerId"
          placeholder="产权人ID"
          clearable
        >
          <el-option
            v-for="item in propertyOwnerOptions"
            :key="item.ownerId"
            :label="item.ownerName"
            :value="item.ownerId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="品牌" prop="carBrand">
        <el-input v-model="form.carBrand" placeholder="车辆品牌" />
      </el-form-item>
      <el-form-item label="车型" prop="carModel">
        <el-input v-model="form.carModel" placeholder="车辆型号" />
      </el-form-item>
      <el-form-item label="年份" prop="carProductionYear">
        <el-input v-model="form.carProductionYear" placeholder="生产年份" />
      </el-form-item>
      <el-form-item label="描述" prop="remarks">
        <el-input v-model="form.remarks" placeholder="车辆描述信息" />
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
        <el-input v-model="form.detailAddress" placeholder="详细地址" />
      </el-form-item>

      <el-form-item label="图片" prop="dataPicList">
        <el-button size="small" type="primary" @click="addPic">
          新增
        </el-button>
        <template v-for="(item, index) in form.dataPicList">
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
              v-if="form.dataPicList.length > 1"
              @click="delPic(index)"
              style="margin: 12px 0"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="pdf文件" prop="dataPdfList">
        <el-button
          size="small"
          type="primary"
          @click="addPdf"
          style="margin-bottom: 8px"
        >
          新增
        </el-button>
        <template v-for="(item, index) in form.dataPdfList">
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
              v-if="form.dataPdfList.length > 1"
              @click="delPdf(index)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input
          disabled
          class="lineinput"
          style="width: 200px"
          size="mini"
          v-model.number="form.longitude"
        ></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input
          disabled
          class="lineinput"
          style="width: 200px"
          size="mini"
          v-model.number="form.latitude"
        ></el-input>
      </el-form-item>
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
      <el-form-item align="center">
        <el-button type="primary" @click="onSubmit" style="margin-right: 20px"
          >确定</el-button
        >
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
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
  name: "AddVehicleManage",
  components: {
    BaiduMap,
    BmNavigation,
    BmView,
    BmGeolocation,
    BmCityList,
  },
  data() {
    return {
      listLoading: false,
      title: "",
      canEdit: false,
      isDtl: false,
      carId: undefined,
      type: "",
      beforeRouter: undefined,
      TextToCode,
      companyId: undefined,
      form: {
        carPicUrl: undefined,
        carNo: undefined,
        carColor: undefined,
        inspectionPlanId: undefined,
        carBrand: undefined,
        carModel: undefined,
        carProductionYear: undefined,
        remarks: undefined,
        province: undefined,
        city: undefined,
        county: undefined,
        detailAddress: undefined,
        longitude: undefined,
        latitude: undefined,
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
      carDealersOptions: [],
      inspectionPlanOptions: [],
      propertyOwnerOptions: [],
      selectedOptions: [],
      options: regionData,
      headers: {},
      uploadUrl,
      rules: {
        carPicUrl: [{ required: true, message: "必填项", trigger: "blur" }],
        carNo: [{ required: true, message: "必填项", trigger: "blur" }],
        carDealersId: [{ required: true, message: "必填项", trigger: "blur" }],
        propertyOwnerId: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        carColor: [{ required: true, message: "必填项", trigger: "blur" }],
        inspectionPlanId: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        carBrand: [{ required: true, message: "必填项", trigger: "blur" }],
        carModel: [{ required: true, message: "必填项", trigger: "blur" }],
        remarks: [{ required: true, message: "必填项", trigger: "blur" }],
        dataPicList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
        carProductionYear: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        province: [{ required: true, message: "必填项", trigger: "blur" }],
        detailAddress: [{ required: true, message: "必填项", trigger: "blur" }],
        longitude: [{ required: true, message: "必填项", trigger: "blur" }],
        latitude: [{ required: true, message: "必填项", trigger: "blur" }],
      },
      fileData: {
        fileType: "carArchives",
      },
      center: { lng: 116.4, lat: 39.9 },
      zoom: 12,
      mapVisible: false,
      clientHeight: document.documentElement.clientHeight - 300, // 屏幕高度
      iconUrl: require("../../assets/addressCenter.png"),
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

    this.getDealersSelList();
    this.getPropertyOwnerSelList();
    this.getInspectionPlanSelList();
  },
  mounted() {
    this.beforeRouter = this.$route.query.beforeRouter;
    console.log(this.$route.query);
    if (this.$route.query.canEdit) {
      this.canEdit = JSON.parse(this.$route.query.canEdit);
    }
    if (this.$route.query.isDtl) {
      this.isDtl = JSON.parse(this.$route.query.isDtl);
    }
    if (this.$route.query.carId) {
      this.carId = this.$route.query.carId;
    }
    if (this.canEdit) {
      console.log("canEdit");
      this.type = "update";
      this.title = "修改车辆";
      document.title = "修改车辆";
      this.$route.meta.title = "修改车辆";
    } else if (this.isDtl) {
      this.type = "check";
      this.title = "车辆详情";
      document.title = "车辆详情";
      this.$route.meta.title = "车辆详情";
    } else {
      this.type = "add";
      this.title = "新增车辆";
      document.title = "新增车辆";
      this.$route.meta.title = "新增车辆";
    }

    if (this.type === "update" || this.type === "check") {
      this.getDetail();
    }
  },

  methods: {
    onCancel() {
      this.resetForm();
    },
    onBack() {
      this.$router.back(-1);
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
    uploadArrayFormat(array, name) {
      array.forEach((item, index) => {
        array[index] = {
          name: `${name}${index + 1}`,
          url: item,
          uid: "uid_" + index + 1,
        };
      });
      return array;
    },
    async getDetail() {
      let res = await vehicleDtl({
        carId: this.carId,
      });
      if (res.rtn == 1) {
        const vehicleDtl = res.result;
        const {
          carBrand,
          carDealersId,
          carId,
          carModel,
          carNo,
          carColor,
          inspectionPlanId,
          carProductionYear,
          city,
          companyId,
          county,
          detailAddress,
          latitude,
          longitude,
          propertyOwnerId,
          province,
          remarks,
          carPicUrl,
          dataPicList,
          dataPdfList,
        } = vehicleDtl;

        if (dataPicList && dataPicList.length > 0) {
          dataPicList.forEach((item, index) => {
            item.isUpload = undefined;
          });
        }

        this.form = {
          carPicUrl,
          carBrand,
          carDealersId,
          carId,
          carColor,
          inspectionPlanId,
          carModel,
          carNo,
          carProductionYear,
          city,
          companyId,
          county,
          detailAddress,
          latitude,
          longitude,
          propertyOwnerId,
          province,
          remarks,
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

        this.selectedOptions = [
          this.TextToCode[province].code,
          this.TextToCode[province][city].code,
          this.TextToCode[province][city][county].code,
        ];
        if (dataPdfList && dataPdfList.length > 0) {
          this.form.dataPdfList.forEach((item, index) => {
            var pdfJson = {};
            item.pdfFileList = [];
            pdfJson.name = "pdf" + item.fileName;
            pdfJson.url = item.dataUrl;
            item.pdfFileList.push(pdfJson);
          });
        }
      }
    },
    onSubmit() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          const form = { ...this.form };

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
                  !item.fileName ||
                  (item.fileName.trim() == "" && item.dataUrl)
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
            carPicUrl: form.carPicUrl,
            carNo: form.carNo,
            carBrand: form.carBrand,
            carModel: form.carModel,
            carProductionYear: form.carProductionYear,
            remarks: form.remarks,
            province: form.province,
            city: form.city,
            county: form.county,
            detailAddress: form.detailAddress,
            longitude: form.longitude,
            latitude: form.latitude,
            inspectionPlanId: form.inspectionPlanId,
            carDealersId: form.carDealersId,
            propertyOwnerId: form.propertyOwnerId,
            carColor: form.carColor,
            dataPicList: form.dataPicList,
            dataPdfList: dataPdfListCopy,
          };

          if (this.canEdit) {
            paramsData.carId = form.carId;

            this.listLoading = true;
            let res = await editVehicle(paramsData);
            if (res.rtn == 1) {
              this.$message.success("修改成功");
              // this.resetForm();
              this.onBack();
            }
          } else {
            form.companyId = this.companyId;
            this.listLoading = true;
            let res = await addVehicle(paramsData);
            if (res.rtn == 1) {
              this.$message.success("创建成功");
              // this.resetForm();
              this.onBack();
            }
          }
          this.listLoading = false;
        }
      });
    },
    resetForm() {
      this.$refs["dataForm"].clearValidate();
      this.form = {
        carPicUrl: undefined,
        carNo: undefined,
        carColor: undefined,
        inspectionPlanId: undefined,
        carBrand: undefined,
        carModel: undefined,
        carProductionYear: undefined,
        remarks: undefined,
        province: undefined,
        city: undefined,
        county: undefined,
        detailAddress: undefined,
        latitude: undefined,
        longitude: undefined,
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
    handleChange(value) {
      console.log(this.selectedOptions);
      this.form.province = CodeToText[value[0]];
      this.form.city = CodeToText[value[1]];
      this.form.county = CodeToText[value[2]];
    },

    beforeDetailRemove(file) {
      return this.$confirm(`确定移除${file.name || "该图片"}？`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
        // _this.form.address = rs.address;
      });
      this.form.longitude = e.point.lng;
      this.form.latitude = e.point.lat;
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
      this.form.longitude = point.point.lng;
      this.form.latitude = point.point.lat;
    },
    findlocation() {
      this.$emit("findlocdata", this.form);
      this.mapVisible = false;
    },
    mapShow() {
      this.mapVisible = true;
    },
    headSuccess(res) {
      if (res.rtn == 1) {
        this.form.carPicUrl = res.url;
      }
    },
    handleImageSuccess(res, file, index) {
      if (res.rtn == 1) {
        this.form.dataPicList[index].dataUrl = res.thumbnailUrl;
        this.form.dataPicList[index].originalPicUrl = res.url;
        this.form.dataPicList[index].isUpload = "isLoaded";
      }
    },
    handlePdfSuccess(res, file, index) {
      if (res.rtn == 1) {
        this.form.dataPdfList[index].dataUrl = res.url;
        this.form.dataPdfList[index].pdfFileList = [
          {
            name: file.raw.name,
            url: this.form.dataPdfList[index].dataUrl,
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
      this.form.dataPicList[index].isUpload = "isLoading";
    },
    beforePdfUpload(res, file, index) {
      // this.$refs[`upload${index}`][0].clearFiles();
      delete this.form.dataPdfList[index].pdfFileList;
    },
    beforePicRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    addPic() {
      let dataPicList = this.form.dataPicList;
      // console.log(dataPicList)
      if (dataPicList.length > 0) {
        dataPicList.unshift({
          dataUrl: undefined,
          fileName: undefined,
          isUpload: undefined,
          originalPicUrl: undefined,
        });
        this.form.dataPicList = dataPicList;
      }
    },
    addPdf() {
      let dataPdfList = this.form.dataPdfList;
      // console.log(dataPicList)
      if (dataPdfList.length > 0) {
        dataPdfList.unshift({
          dataUrl: undefined,
          fileName: undefined,
        });
        this.form.dataPdfList = dataPdfList;
      }
    },
    delPic(index) {
      let dataPicList = this.form.dataPicList;
      if (dataPicList.length > 1) {
        dataPicList.splice(index, 1);
        this.form.dataPicList = dataPicList;
      }
    },
    delPdf(index) {
      let dataPdfList = this.form.dataPdfList;
      if (dataPdfList.length > 1) {
        dataPdfList.splice(index, 1);
        this.form.dataPdfList = dataPdfList;
      }
      this.$refs[`upload${index}`][0].clearFiles();
    },
    handlePreview(file) {
      window.open(file.url);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    beforePdfRemove(file) {
      return this.$confirm(`确定移除${file.name || "该pdf"}？`);
    },
    pdfRemove(res, file, index) {
      if (res.status == "success") {
        this.form.dataPdfList[index].dataUrl = undefined;
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
.sku-block {
  margin-bottom: 8px;
  .sku-block-formEle {
    margin-right: 8px;
  }
  .sku-block-inputs {
    display: flex;
    flex-wrap: wrap;
    .sku-block-formEle {
      margin-top: 8px;
    }
  }
  .avatar-uploader {
    margin-top: 8px;
    .avatar {
      width: 120px;
      height: 120px;
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
}
.addPriceStyle.el-input-group--append /deep/ .el-input__inner {
  color: crimson;
}
</style>
<style lang="scss" scoped>
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
  .avatar {
    width: 120px;
    height: 120px;
    vertical-align: middle;
  }
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