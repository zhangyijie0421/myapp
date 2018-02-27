<template>
  <div class="tmpl">
    <div class="abread bt-line">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <span>返回上一层</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>新增商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="operation">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="sub_title">
              <el-input v-model="ruleForm.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="所属类别">
              <el-select v-model="ruleForm.category_id" placeholder="所属类别">
                <!-- 这些值是从api接口请求下来的，v-for来生成 -->
                <el-option v-for="item in catelist" :label="item.title" :value="item.category_id">
                  <span v-for="sub in (item.class_layer -1)">&nbsp;</span> <span v-if="item.class_layer>1">|-</span>
                  {{item.title}}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否发布">
              <el-switch v-model="ruleForm.status" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="推荐类型">
              <el-switch v-model="ruleForm.is_slide" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
              </el-switch>
              <el-switch v-model="ruleForm.is_top" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
              </el-switch>
              <el-switch v-model="ruleForm.is_hot" :width="58" on-text="ON" off-text="OFF" on-color="#13ce66" off-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="封面上传">
              <el-upload class="upload-demo" action="#" :file-list="ruleForm.imgList" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="相册上传">
              <el-upload class="upload-demo" action="#" :file-list="ruleForm.fileList" list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品货号" prop="goods_no">
              <el-input v-model="ruleForm.goods_no"></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="stock_quantity">
              <el-input v-model="ruleForm.stock_quantity"></el-input>
            </el-form-item>
            <el-form-item label="市场价格" prop="market_price">
              <el-input v-model="ruleForm.market_price"></el-input>
            </el-form-item>
            <el-form-item label="销售价格" prop="sell_price">
              <el-input v-model="ruleForm.sell_price"></el-input>
            </el-form-item>
            <el-form-item label="内容摘要" prop="zhaiyao">
              <el-input type="textarea" :rows="2" placeholder="请输入摘要" v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="商品详情" prop="content">
              <!-- 用的是vue的一个单独第三方组件：富文本编辑器组件https://surmon-china.github.io/vue-quill-editor/ -->
              <quill-editor :content="ruleForm.content"
              @change="onEditorChange($event)">
              </quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  //导入富文本编辑器
  import { quillEditor } from 'vue-quill-editor';

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        catelist:[],
        //表单元素的双向数据绑定对象
        ruleForm: {
          title: '1',
          sub_title: '2',
          category_id: 43,
          "goods_no": "NZ0000000002",
          "stock_quantity": 200,
          "market_price": 1000,
          "sell_price": 800,
          "status": true,
          "is_slide": true,
          "is_top": false,
          "is_hot": true,
          "zhaiyao": "为不凡而生",
          "content": "<p><strong>产品参数：</strong></p>",
          "imgList": [
            {
              "name": "wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
              "url": "http://127.0.0.1:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg",
              "shorturl": "/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg"
            }
          ],
          "fileList": [
            {
              "name": "HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
              "url": "http://127.0.0.1:8899/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg",
              "shorturl": "/imgs/HN5d4_wrbsUk5KQNjzYSGGwm.jpg"
            }
          ]
        },
        //表单元素的验证规则
        rules: {
          title: [
            //表示商品标题非空验证，通过失去焦点的时候触发
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ]
        }
      }
    },
    mounted(){
      //获取商品分类数据列表
      this.getcastlist();
    },
    methods: {
      //富文本编辑器的内容改变事件
      onEditorChange(ev){
        this.ruleForm.content=ev.html;
      },
      //获取商品分类数据
      getcastlist() {
        var url='/admin/category/getlist/goods';
        this.$ajax.get(url).then(res=>{
          this.catelist=res.data.message;
        })
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //提交保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          //valid:返回true的话，表示表单元素全部合法，否则不合法
          if (valid) {
            //表示表单验证成功，应该将数据提交给服务器，完成新增工作
            this.$ajax.post('/admin/goods/add/goods',this.ruleForm)
            .then(res=>{
              if (res.data.status==1) {
                this.$message.error('')
              }
            });
          } else {
            console.log('提交失败');
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>
</style>