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
      <el-form-item label="产权人姓名" prop="ownerName">
        <el-input v-model="form.ownerName" placeholder="产权人姓名" />
      </el-form-item>
      <el-form-item label="产权人证件号" prop="ownerCardId">
        <el-input v-model="form.ownerCardId" placeholder="产权人证件号" />
      </el-form-item>
      <el-form-item label="产权人手机号" prop="ownerPhone">
        <el-input
          v-model="form.ownerPhone"
          :maxlength="11"
          placeholder="产权人手机号"
        />
      </el-form-item>
      <el-form-item label="产权人备注" prop="remarks">
        <el-input v-model="form.remarks" placeholder="产权人备注" />
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
  addPropertyOwner,
  propertyOwnerDtl,
  editPropertyOwner,
} from "@/api/riskManage";
import { Select } from "element-ui";
import { uploadUrl } from "@/api/upload";

export default {
  name: "AddPropertyOwnerManage",
  data() {
    return {
      pdfFileList: 1,
      listLoading: false,
      title: "新建产权人",
      brandSelList: [],
      beforeRouter: undefined,
      type: undefined,
      title: "",
      canEdit: false,
      isDtl: false,
      ownerId: undefined,
      dataOptions: [
        { id: 0, lab: "全部", val: 3 },
        { id: 1, lab: "正价", val: 1 },
        { id: 2, lab: "特价", val: 2 },
      ],
      form: {
        ownerName: undefined,
        ownerCardId: undefined,
        ownerPhone: undefined,
        remarks: undefined,
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
      headers: {},
      uploadUrl,
      rules: {
        ownerName: [{ required: true, message: "必填项", trigger: "blur" }],
        ownerCardId: [{ required: true, message: "必填项", trigger: "blur" }],
        ownerPhone: [{ required: true, message: "必填项", trigger: "blur" }],
        remarks: [{ required: true, message: "必填项", trigger: "blur" }],
        dataPicList: [
          { type: "array", required: true, message: "必填项", trigger: "blur" },
        ],
      },
      fileData: {
        fileType: "propertyOwner",
      },
    };
  },
  created() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    this.headers = {
      _t: token,
      _u: userId,
    };
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
    if (this.$route.query.ownerId) {
      this.ownerId = this.$route.query.ownerId;
    }

    if (this.canEdit) {
      console.log("canEdit");
      this.type = "update";
      this.title = "修改产权人";
      document.title = "修改产权人";
      this.$route.meta.title = "修改产权人";
    } else if (this.isDtl) {
      this.type = "check";
      this.title = "产权人详情";
      document.title = "产权人详情";
      this.$route.meta.title = "产权人详情";
    } else {
      this.type = "add";
      this.title = "新增产权人";
      document.title = "新增产权人";
      this.$route.meta.title = "新增产权人";
    }

    if (this.type === "update" || this.type === "check") {
      this.getDetail();
    }
  },
  methods: {
    onCancel() {
      if (!this.canEdit) {
        this.resetForm();
      }
    },
    onBack() {
      this.$router.back(-1);
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
              ((!item.fileName || item.fileName.trim() == "") && item.dataUrl)
            ) {
              return true;
            }
          });
        } else {
          var isNotPdf = form.dataPdfList.some((item, index) => {
            if (!item.dataUrl || !item.fileName || item.fileName.trim() == "") {
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
        console.log(item,'----');
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

      this.listLoading = true;

      const paramsData = {
        ownerName: form.ownerName,
        ownerCardId: form.ownerCardId,
        ownerPhone: form.ownerPhone,
        remarks: form.remarks,
        dataPicList: form.dataPicList,
        dataPdfList: dataPdfListCopy,
      };

      if (this.canEdit) {
        paramsData.ownerId = this.ownerId;
        let res = await editPropertyOwner(paramsData);
        if (res.rtn == 1) {
          this.$message.success("修改成功!");
          // this.resetForm();
          this.onBack();
        }
      } else {
        let res = await addPropertyOwner(paramsData);
        if (res.rtn == 1) {
          this.$message.success("创建成功!");
          this.resetForm();
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
        ownerName: undefined,
        ownerCardId: undefined,
        ownerPhone: undefined,
        remarks: undefined,
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
    beforeDetailRemove(file) {
      return this.$confirm(`确定移除${file.name || "该图片"}？`);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
      let res = await propertyOwnerDtl({
        ownerId: this.ownerId,
      });
      if (res.rtn == 1) {
        const propertyOwnerDtl = res.result;
        const {
          ownerName,
          ownerCardId,
          ownerPhone,
          remarks,
          dataPicList,
          dataPdfList,
        } = propertyOwnerDtl;

        if (dataPicList && dataPicList.length > 0) {
          dataPicList.forEach((item, index) => {
            item.isUpload = undefined;
          });
        }

        this.form = {
          ownerName,
          ownerCardId,
          ownerPhone,
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
          originalPicUrl:undefined,
          fileName: undefined,
          isUpload: undefined,
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

