<template>
  <div class="app-container">
    <!-- <el-card class="box-card"> -->
    <div class="header" style="text-align: right">
      <!-- <span class="headLab">{{ title }}</span> -->
      <el-button
        style="font-size: 14px; padding: 3px 0; line-height: 30px"
        type="text"
        @click="onBack"
        >返回</el-button
      >
    </div>

    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      :inline="true"
      class="demo-form-inline"
      style="width: 100%"
    >
      <div class="wrap">
        <div class="header">
          <div class="clearfix headLab">
            <span style="font-size: 16px">店铺信息</span>
          </div>
        </div>
        <div class="content">
          <div class="orderHeader">
            <div class="section">
              <div class="userDtl">
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item label="店铺名称" prop="storeName">
                      <el-input
                        placeholder="请输入店铺名称"
                        v-model="form.storeName"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item label="开店时间" prop="openingTime">
                      <el-date-picker
                        v-model="form.openingTime"
                        type="date"
                        placeholder="选择日期"
                        style="width: 200px"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </div>
                <div class="userDtl__inner">
                  <div class="userDtl__line__item" style="width: 100%">
                    <el-form-item label="店铺地址" prop="address">
                      <!-- <el-input
                        placeholder="请输入店铺地址"
                        v-model="form.address"
                        clearable
                        style="width: 400px"
                      ></el-input> -->
                      <tinymce
                        v-model="form.address"
                        :height="200"
                        :width="100 + '%'"
                      />
                    </el-form-item>
                  </div>
                </div>
                <div class="userDtl__inner">
                  <div class="userDtl__line__item" style="width: 100%">
                    <el-form-item label="店铺实拍" prop="picUrlArr">
                      <el-upload
                        :headers="headers"
                        :action="uploadUrl"
                        :data="fileData"
                        list-type="picture-card"
                        :file-list="form.picUrlArr"
                        :on-success="handleImageSuccess"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="" />
                      </el-dialog>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="header">
          <div class="clearfix headLab">
            <span style="font-size: 16px">人员信息</span>
          </div>
        </div>
        <div class="content">
          <div class="orderHeader">
            <div class="section">
              <div class="userDtl">
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="负责人姓名"
                      prop="responsiblePersonName"
                    >
                      <el-input
                        placeholder="请输入负责人姓名"
                        v-model="form.responsiblePersonName"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="负责人电话"
                      prop="responsiblePersonPhone"
                    >
                      <el-input
                        placeholder="请输入负责人电话"
                        v-model="form.responsiblePersonPhone"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item label="负责人微信" prop="responsiblePersonVx">
                      <el-input
                        placeholder="请输入负责人微信"
                        v-model="form.responsiblePersonVx"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="客 服 姓 名"
                      prop="customerServiceName"
                    >
                      <el-input
                        placeholder="请输入客服姓名"
                        v-model="form.customerServiceName"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item
                      label="客 服 电 话"
                      prop="customerServicePhone"
                    >
                      <el-input
                        placeholder="请输入客服电话"
                        v-model="form.customerServicePhone"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="userDtl__line__item">
                    <el-form-item label="客 服 微 信" prop="customerServiceVx">
                      <el-input
                        placeholder="请输入客服微信"
                        v-model="form.customerServiceVx"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="userDtl__inner">
                  <div class="userDtl__line__item" style="width: 100%">
                    <el-form-item label="客 服 描 述" prop="description">
                      <el-input
                        placeholder="请输入客服描述"
                        type="texteara"
                        v-model="form.description"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="header">
          <div class="clearfix headLab">
            <span style="font-size: 16px">帮助中心</span>
          </div>
        </div>
        <div class="content">
          <div class="orderHeader">
            <div class="section">
              <div class="userDtl">
                <div class="userDtl__inner">
                  <div class="userDtl__line__item">
                    <el-form-item label="帮助中心文档" prop="remark">
                      <!-- <el-input
                        type="textarea"
                        v-model="form.remark"
                        placeholder="请输入内容"
                        clearable
                      ></el-input> -->
                      <tinymce
                        v-model="form.remark"
                        :height="200"
                        :width="100 + '%'"
                      />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <el-form-item align="center" style="width: 100%; margin-top: 20px">
        <el-button
          type="primary"
          :loading="isLoaded"
          @click="onSubmit"
          style="margin-right: 20px"
          >确定</el-button
        >
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- </el-card> -->
  </div>
</template>

<script>
import { shopAdd, shopDtl, shopEdit } from "@/api/shopManage";

import { uploadUrl } from "@/api/upload";

import Tinymce from "@/components/Tinymce";

export default {
  name: "ShopAddManage",
  components: { Tinymce },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      uploadUrl,
      headers: {},
      loading: false,
      isLoaded: false,
      storeNo: "",
      statusOptions: [
        { key: 1, lab: "启用", value: 1 },
        { key: 2, lab: "停用", value: 2 },
      ],
      type: "",
      canEdit: "",
      isDtl: false,
      userId: "",
      form: {
        storeName: undefined,
        address: undefined,
        openingTime: undefined,
        remark: undefined,
        description: undefined,
        customerServicePhone: undefined,
        customerServiceName: undefined,
        customerServiceVx: undefined,
        responsiblePersonName: undefined,
        responsiblePersonPhone: undefined,
        responsiblePersonVx: undefined,
        picUrlArr: [],
      },
      fileData: {
        fileType: "head",
      },
      rules: {
        storeName: [{ required: true, message: "必填项", trigger: "blur" }],
        address: [{ required: true, message: "必填项", trigger: "blur" }],
        openingTime: [{ required: true, message: "必填项", trigger: "blur" }],
        remark: [{ required: true, message: "必填项", trigger: "blur" }],

        description: [{ required: true, message: "必填项", trigger: "blur" }],
        customerServicePhone: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        customerServiceName: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        customerServiceVx: [
          { required: true, message: "必填项", trigger: "blur" },
        ],

        responsiblePersonName: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        responsiblePersonPhone: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        responsiblePersonVx: [
          { required: true, message: "必填项", trigger: "blur" },
        ],
        picUrlArr: [
          {
            type: "array",
            required: true,
            message: "必填项",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.storeNo = this.$route.query.storeNo;
    this.beforeRouter = this.$route.query.beforeRouter;
    console.log(this.$route.query.canEdit, "===");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    this.headers = {
      _t: token,
      _u: userId,
    };
    if (this.$route.query.canEdit) {
      this.canEdit = JSON.parse(this.$route.query.canEdit);
    }

    if (this.canEdit) {
      console.log("canEdit");
      this.type = "update";
      document.title = "修改店铺";
      this.$route.meta.title = "修改店铺";
    } else {
      this.type = "add";
      document.title = "新增店铺";
      this.$route.meta.title = "新增店铺";
    }

    if (this.type === "update" || this.type === "check") {
      this.getDtl();
    }
  },
  methods: {
    async getDtl() {
      this.loading = true;
      const res = await shopDtl({
        storeNo: this.storeNo,
      });

      if (res.rtn == 1) {
        const storeInfo = res.storeInfo;

        const {
          storeName,
          address,
          openingTime,
          remark,
          description,
          customerServicePhone,
          customerServiceName,
          customerServiceVx,
          responsiblePersonName,
          responsiblePersonPhone,
          responsiblePersonVx,
          picUrl,
        } = storeInfo;

        this.form = {
          storeName,
          address,
          openingTime,
          remark,
          description,
          customerServicePhone,
          customerServiceName,
          customerServiceVx,
          responsiblePersonName,
          responsiblePersonPhone,
          responsiblePersonVx,
        };
        this.form.picUrlArr = this.uploadArrayFormat(
          picUrl.split(","),
          "店铺图片"
        );

        console.log(this.form.picUrlArr, "========");
      }
      this.loading = false;
    },

    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.isLoaded = true;

          var picList = [];

          var paramsData = JSON.parse(JSON.stringify(this.form));

          console.log(paramsData);

          paramsData.picUrlArr.forEach((item, index) => {
            if (item.url) {
              picList.push(item.url);
            } else {
              picList.push(item);
            }
          });

          paramsData.picUrl = picList.join(",");

          // delete paramsData.picUrlArr;

          if (this.type === "add") {
            const res = await shopAdd({
              ...paramsData,
            });
            if (res.rtn == 1) {
              this.$message.success("创建成功");
              this.onBack();
            }
            this.isLoaded = false;
          } else {
            paramsData.storeNo = this.storeNo;
            const res = await shopEdit({
              ...paramsData,
            });
            if (res.rtn == 1) {
              this.$message.success("修改成功");
              this.onBack();
            } else {
              this.getDtl();
            }
            this.isLoaded = false;
          }
        }
      });
    },
    onCancel() {
      if (this.type === "add") {
        this.resetForm();
      } else {
        this.onBack();
      }
    },
    resetForm() {
      this.$refs.dataForm.resetFields();
      this.form = {
        storeName: undefined,
        address: undefined,
        openingTime: undefined,
        remark: undefined,
        description: undefined,
        customerServicePhone: undefined,
        customerServiceName: undefined,
        customerServiceVx: undefined,
        responsiblePersonName: undefined,
        responsiblePersonPhone: undefined,
        responsiblePersonVx: undefined,
        picUrlArr: [],
      };
    },

    onBack() {
      this.$router.back(-1);
    },
    handleRemove(file, fileList) {
      if (this.canEdit) {
        const url = file.url;
        for (let i = 0; i < this.form.picUrlArr.length; i++) {
          if (url === this.form.picUrlArr[i].url) {
            this.form.picUrlArr.splice(i, 1);
            return;
          }
        }
      } else {
        const url = file.response.url;
        for (let i = 0; i < this.form.picUrlArr.length; i++) {
          if (url === this.form.picUrlArr[i]) {
            this.form.picUrlArr.splice(i, 1);
            return;
          }
        }
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleImageSuccess(res, file, fileList) {
      if (res.rtn == 1) {
        if (this.canEdit) {
          this.form.picUrlArr.push({ url: res.url });
        } else {
          this.form.picUrlArr.push(res.url);
        }
        console.log(this.form.picUrlArr, "-------------");
      }
    },
    uploadArrayFormat(array, name) {
      console.log(array, "------------");
      array.forEach((item, index) => {
        array[index] = {
          name: `${name}${index + 1}`,
          url: item,
          uid: "uid_" + index + 1,
        };
      });
      return array;
    },
    beforeImageUpload(res, file, index) {},
    beforePicRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
}
.headLab {
  font-size: 16px;
  font-weight: 500;
  color: #999;
}
.userDtl,
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
.userDtl__inner {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 0;
  color: #999;
  // border-bottom: 1px solid #eee;
}
.userDtl__inner,
.logisticsItem {
  margin-left: 20px;
  padding: 10px 0 0;
  // border-bottom: 1px solid #eee;
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
.userDtl__line {
  padding-bottom: 20px;
  font-size: 0;
}
.userDtl__line {
  font-size: 14px;
  padding-bottom: 20px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line:last-child {
  padding-bottom: 10px;
}
.userDtl__line__item {
  display: inline-block;
  width: 33.33%;
  // padding-bottom: 20px;
  font-size: 14px;
}
.userDtl__line__lab,
.userDtl__line__lab {
  display: inline-block;
  color: #999;
  vertical-align: top;
}
.userDtl__line__txt,
.userDtl__line__txt {
  display: inline-block;
  color: rgba($color: #000, $alpha: 1);
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.userDtl__line__txt {
  width: calc(100% - 150px);
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
.userDtl__header__orderInfo tr {
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
  width: 200px;
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
  transform: rotate(-360deg);
  transition: all 1s;
}
.arrowDown {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 30px;
  font-size: 14px;
  line-height: 25px;
  transform: rotate(-180deg);
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
.wrap {
  position: relative;
  border: 1px solid rgba(242, 171, 11, 100);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 50px;
}
.wrap .header {
  top: -20px;
  left: 20px;
  padding: 0 20px;
  color: #fff;
  position: absolute;
  border-radius: 8px;
  background-color: rgba(242, 171, 11, 100);
  font-size: 20px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(255, 255, 255, 100);
}
// .wrap .header::after {
//   position: absolute;
//   top: 0;
//   left: 100%;
//   content: "";
//   width: 0;
//   height: 0;
//   background: transparent;
//   border-top: 18px solid transparent;
//   border-left: 50px solid #3f7efc;
//   border-bottom: 18px solid transparent;
// }
.wrap .header span {
  font-size: 16px;
  color: #fff;
  line-height: 36px;
}
</style>