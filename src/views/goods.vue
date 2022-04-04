<template>
  <div class="box">
    <div class="boxs" style="margin-top: 25px">
      <el-input
        style="width: 300px; margin-right: 30px"
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
        @change="seatch"
      >
        <el-button
          slot="append"
          @click="seatch(input3)"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button
        type="primary"
        @click="
          dialogVisible = true;
          title = '添加用户';
          flag = true;
          ruleForm.name = '';
          ruleForm.eail = '';
          ruleForm.tal = '';
        "
        >添加用户</el-button
      >

      <el-table :data="tableData" border>
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" width="500px" label="商品名称">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column  label="创建时间">
             <template slot-scope="scope">
                {{  new Date(scope.row.upd_time).toLocaleString()}}
             </template>
         </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="del(scope.row)"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[1, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input3: "",
      id: 0,
      title: "添加用户",
      dialogVisible: false,
      value2: true,
      select: "",
      flag: true,
      ruleForm: {
        name: "",
        pass: "",
        eail: "",
        tal: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        eail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 3, max: 5, message: "请输入正确的邮箱格式", trigger: "blur" },
        ],
        tal: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
      },
      currentPage4: 1, //当前页
      total: 0, //总页数
      pagesize: 1, //每页几个
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods: {
    del(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(e);
          //     this.$axios
          // .delete(
          //   "categories",
          //   { id: e.goods_id}
          // )
          // .then((res) => {
          //     console.log(res);
          //   if (res.data.meta.status == 200) {

          //   }
          // });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    seatch(e) {
      console.log(e);
      console.log(
        this.$axios
          .get(
            "goods?query=" +
              e +
              "&pagenum=" +
              this.currentPage4 +
              "&pagesize=" +
              this.pagesize +
              ""
          )
          .then((res) => {
            if (res.data.meta.status == 200) {
              console.log(res);
              this.total = res.data.data.total;
              this.tableData = res.data.data.goods;
            }
          })
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getData();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
   
   
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.getData();
    },
    change(e) {
      console.log(e.id);
      this.$axios
        .put("users/:uId/state/:type?uId=" + e.id * 1 + "&type=" + e.mg_state)
        .then((res) => {
          console.log(res);
        });
      // this.$axios.put("menus?:uId="+e.id+"&type="+e.mg_state).then(res=>{
      //     console.log(res);
      // })
    },
    getData() {
      this.dialogVisible = false;
      this.$axios
        .get(
          "goods?query=&pagenum=" +
            this.currentPage4 +
            "&pagesize=" +
            this.pagesize +
            ""
        )
        .then((res) => {
          if (res.data.meta.status == 200) {
            this.total = res.data.data.total;
            this.tableData = res.data.data.goods;

          }
        });
    },

    update() {},
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
.box {
  padding: 20px;
  padding-top: 0;
  height: 90vh;
  overflow: scroll;
  padding-bottom: 300px;
  .boxs {
    padding: 20px;
    margin: auto;
    box-shadow: 0 0px 10px 0px #ccc;
    .el-table {
      margin: 10px 0;
    }
  }
}
</style>
