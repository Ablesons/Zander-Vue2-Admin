<!--
 * @Description: 文件上传
 * @Author: Zander
 * @Date: 2022/5/17 14:30
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/17 14:30
 -->
<template>
  <div class="upload-file-box" :class="{ uploadDisabledModality: disabled }" v-loading="loading">
    <div class="upload-file-container">
      <el-upload
        ref="upload"
        :multiple="multiple"
        :action="uploadUrl"
        :headers="headers"
        list-type="picture-card"
        :auto-upload="autoUpload"
        :accept="fileType"
        :limit="limit"
        :data="data"
        :file-list="uploadFileList"
        :disabled="disabled"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-preview="handlePreview">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }" class="list-box">
          <img
            class="el-upload-list__item-thumbnail upload-preview-list"
            :alt="imageName || '唐山港'"
            :src="file.fileUrl ? file.fileUrl : file.url"
            @error="loadError"
          />
          <span class="el-upload-list__item-actions">
            <span
              v-if="!file.fileUrl"
              class="el-upload-list__item-preview"
              @click="handlePreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="file.fileUrl"
              class="el-upload-list__item-delete"
              @click="downloadFile(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
    </div>
    <div class="message" v-if="!disabled">
      只能上传{{ fileType }}文件，且不超过{{ fileSize }}KB
    </div>
    <!-- 图片预览 -->
    <div class="viewerImage" v-viewer="{ movable: true }" v-show="true" style="width: 0;height: 0;overflow: hidden;">
      <img
        v-for="src in viewerImageSrc"
        :src="src.path"
        :key="src.path"
        :alt="src.name || '唐山港'"
        @error="loadError"
      />
    </div>
  </div>
</template>

<script>
// 引入图标
import txtIcon from '@assets/img/txt.png';
import pdfIcon from '@assets/img/pdf.png';
import emlIcon from '@assets/img/eml.png';
import docIcon from '@assets/img/doc.png';
import xlsIcon from '@assets/img/xls.png';
import zipIcon from '@assets/img/zip.png';
import rpIcon from '@assets/img/rp.png';
import pptIcon from '@assets/img/ppt.png';
import errorIcon from '@assets/img/error.png';
// 引入公共方法
import { getToken } from '@utils/auth';
import defaultSettings from '@/config/settings';
import { mathUtils } from '@utils/math';
import { apiLogicBatchDeleteByIds, apiServerFiles } from '@api/sys/enclosure';
import { isEmpty } from '@utils/verify';

export default {
  name: 'upload',
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 上传文件大小 单位KB
    fileSize: {
      type: Number,
      default: 1024 * 5
    },
    // 上传文件类型
    fileType: {
      type: String,
      default: 'jpg/png/jpeg/pdf/xls/xlsx/doc/docx'
    },
    // 上传文件路径
    folder: {
      type: String,
      required: true
    },
    // 最大允许上传个数
    limit: {
      type: Number,
      default: 5
    },
    // 是否支持多选文件
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否在选取文件后立即进行上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 已上传文件ID集合字符串
    value: String,
    // 文件上传额外携带参数
    params: Object,
    // 图片名称
    imageName: {
      type: String,
      default: '#'
    },
    // 接口地址
    action: {
      type: String,
      default: '/fileCenter/uploadFiles'
    }
  },
  data() {
    return {
      imgList: {
        txt: txtIcon,
        pdf: pdfIcon,
        eml: emlIcon,
        doc: docIcon,
        docx: docIcon,
        xls: xlsIcon,
        xlsx: xlsIcon,
        zip: zipIcon,
        rar: zipIcon,
        rp: rpIcon,
        ppt: pptIcon,
        pptx: pptIcon
      },
      errorImg: errorIcon,
      loading: false,
      viewerImageSrc: [],
      // 文件ID集合字符串
      fileIds: '',
      // 上传额外参数
      data: {
        folder: this.folder
      },
      // 编辑回显文件集合
      uploadFileList: [],
      // 上传成功的文件列表
      submitFileList: []
    }
  },
  computed: {
    /**
     * 上传地址
     */
    uploadUrl() {
      // 接口前缀
      const baseURL = process.env.VUE_APP_BASE_API;
      return `${baseURL}${this.action}`
    },
    /**
     * 请求头
     */
    headers() {
      return {
        'X-Origin': defaultSettings.origin,
        'X-Token': getToken(),
        'X-AppId': defaultSettings.appInfo.AppId,
        'X-AppToken': defaultSettings.appInfo.AppToken,
        'X-AppSecret': defaultSettings.appInfo.AppSecret
      }
    }
  },
  watch: {
    value: {
      handler() {
        if (this.submitFileList.length === 0) {
          this.fileIds = this.value;
          // this.searchServerFiles();
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.submitFileList = [];
  },
  methods: {
    /**
     * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
     * @param file
     */
    beforeUpload(file) {
      this.data.folder = this.folder;
      this.data = Object.assign(this.data, this.params);
      if (!file) {
        return true;
      }
      this.loading = true;
      let isTypeOk = false;
      if (file.name.lastIndexOf('.') > 0) {
        const suffix = file.name.substring(file.name.lastIndexOf('.') + 1).toLocaleLowerCase();
        isTypeOk = this.fileType.indexOf(suffix) >= 0;
      }
      const isLt = mathUtils.divide(file.size, 1024) < Number(this.fileSize);
      if (!isTypeOk) {
        this.$message.error(`文件格式不正确,只能上传${this.fileType}文件!`);
        this.loading = false;
        return false;
      } else if (!isLt) {
        this.$message.error(`上传文件不能超过${this.fileSize}KB!`);

        this.loading = false;

        return false;
      }

      return true;
    },
    /**
     * 上传成功
     * @param response
     * @param file
     * @param fileList
     */
    uploadSuccess(response, file, fileList) {
      const suffix = file.name.substring(file.name.lastIndexOf('.') + 1).toLocaleLowerCase();
      if (response.success) {
        this.submitFileList.push(file);
        const fileList = [];
        this.submitFileList.map(function(item) {
          if (item.response && item.response.data) {
            fileList.push(item.response.data[0].fileId);
          }
        });
        const attacList = fileList.join(',');
        this.$emit('update:attac', attacList);
        this.$emit('changeUpload');
        if (suffix !== 'JPG' || suffix !== 'PNG' || suffix !== 'JPEG') {
          file.fileUrl = this.imgList[suffix];
        }
        this.$message.success('上传成功');
      } else {
        fileList.pop();
        this.$message.error('上传失败：' + response.message);
      }
      this.loading = false;
    },
    /**
     * 图片预览
     * @param file
     */
    handlePreview(file) {
      const list = [], srcList = [];
      const uploadPreviewList = document.querySelectorAll('.upload-preview-list')
      if (uploadPreviewList && uploadPreviewList.length > 0) {
        uploadPreviewList.forEach(item => {
          const alt = item.getAttribute('alt'), src = item.getAttribute('src');
          list.push({
            name: alt,
            path: src
          });
          srcList.push(src);
        })
      }
      this.viewerImageSrc = list;
      const viewer = this.$el.querySelector('.viewerImage').$viewer;
      viewer.index = srcList.indexOf(file.url) > -1 ? srcList.indexOf(file.url) : 0;
      viewer.show();
    },
    /**
     * 上传失败
     * @param err
     */
    uploadError(err) {
      this.loading = false;
      this.$message.error(err || '上传失败');
    },
    /**
     * 文件下载
     * @param file
     */
    downloadFile(file) {
      window.open(file.url, '_blank');
    },
    /**
     * 文件删除
     * @param file
     */
    handleRemove(file) {
      const fileList = this.$refs.upload.uploadFiles;
      const _this = this;
      this.$confirm('是否删除该附件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.submitFileList.indexOf(file);
        if (index > -1) this.submitFileList.splice(index, 1);
        if (file.response && file.response.data) {
          apiLogicBatchDeleteByIds(file.response.data[0].fileId).then(res => {
            if (res.success) {
              const fileList = [];
              _this.submitFileList.map(function(item) {
                if (item.response && item.response.data) {
                  fileList.push(item.response.data[0].fileId);
                }
              });
              const attacList = fileList.join(',');
              _this.$emit('input', attacList);
              _this.$emit('changeUpload');
              _this.$message.success('删除成功');
            } else {
              _this.$message.success('删除失败' || res.message);
            }
          }).catch()
        }
        const idx = fileList.findIndex(fileItem => {
          return fileItem.uid === file.uid;
        });
        fileList.splice(idx, 1);
      }).catch(() => {})
    },
    /**
     * 加载已上传的文件
     */
    searchServerFiles() {
      if (!isEmpty(this.fileIds)) {
        this.loading = true;
        apiServerFiles(this.fileIds).then(result => {
          this.loading = false;
          if (result) {
            if (result.success) {
              for (const item of result.data) {
                const suffix = item.origName.substring(
                  item.origName.lastIndexOf('.') + 1
                ).toLocaleLowerCase();
                item.url = item.filePath;
                if (!(suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg')) {
                  item.fileUrl = this.imgList[suffix];
                }
                this.uploadFileList.push({
                  name: item.name,
                  url: item.url,
                  fileUrl: item.fileUrl,
                  response: {
                    data: [
                      {
                        fileId: item.id
                      }
                    ]
                  }
                });
              }
              this.submitFileList = this.uploadFileList;
            } else {
              this.$message({
                message: '文件加载失败!',
                type: 'error'
              });
            }
          }
        }).catch(() => {
          this.loading = false;
        })
      }
    },
    /**
     * 图片加载失败
     * @param event
     */
    loadError(event) {
      const img = event.srcElement;
      img.src = this.errorImg;
      img.onerror = null;
    }
  }
}
</script>

<style scoped lang="scss">
.upload-file-box {
  .upload-file-container > div {
    ::v-deep .el-upload--picture-card {
      width: 80px;
      height: 80px;
      line-height: 78px;
      i {
        font-size: 20px;
      }
    }
    ::v-deep .el-upload-list--picture-card .el-upload-list__item {
      width: 80px;
      height: 80px;
      .list-box {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .el-upload-list__item-thumbnail {
        height: auto;
        width: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .message {
    color: #555555;
    background: #fff1a8;
    margin: 5px 0;
    border-left: 5px solid #ffce55;
    padding: 5px;
    font-size: 12px;
  }
}
.uploadDisabledModality {
  ::v-deep .el-upload--picture-card{
    display: none;
  }
}
</style>
