<template>
  <div class="box">
    <div class="boxs">
      <el-button @click="dialogVisible = true" type="primary"
        >添加角色</el-button
      >
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="ok">确 定</el-button>
        </span>
      </el-dialog>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <el-tag
                  v-for="(tag, i) in props.row.children"
                  :key="i"
                  closable
                  :type="tag.type"
                  style=" margin:5px"
                >
                  {{ tag.authName }} 

                  <el-tag v-for="(tags, i) in tag.children" :key="i" closable  style=" margin:5px">
                    {{ tags.authName }} <br>
                    <el-tag  style=" margin:5px"
                      v-for="(tagss, i) in tags.children"
                      :key="i"
                      closable
                    >
                      {{ tagss.authName }} 
                    </el-tag>
                  </el-tag>
                </el-tag>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              @click="two = true"
              content="设置"
              placement="top"
            >
              <el-button type="info" icon="el-icon-s-tools" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,

      form: {
        name: "",
        type: [],
        desc: "",
      },
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
      ],
    };
  },
  methods: {
    handleClose(done, tag) {
      // console.log(this.tableData);
      // this.tableData[done].children.splice(this.tableData[done].children.indexOf(tag.authName), 1);
    },
    ok() {
      this.dialogVisible = false;
      console.log(this.form);
      this.$axios
        .post("roles", { roleName: this.form.name, roleDesc: this.form.desc })
        .then((res) => {
          console.log(res,1111);
        });
      this.getData();
    },
    getData() {
      this.$axios.get("roles").then((res) => {
        console.log(res, 111);
        this.tableData = res.data.data;
      });
    },
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
  padding-bottom: 300px;
  .boxs {
    padding: 20px;
   
    margin: auto;
    box-shadow: 0 0px 10px 0px #ccc;
  }
 
}
</style>
