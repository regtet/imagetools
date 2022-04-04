<template>
  <div class="login" :style="'background-image: linear-gradient(#'+color+', #'+color2+')'">
    <div class="box">
      <div class="img">
        <img src="../assets/1.webp" title="阿狸鸭" />
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input
            @blur="blur"
            prefix-icon="el-icon-s-custom"
            data-type="pass"
            v-model="form.name"
          ></el-input>
          <span v-show="one" style="color: red">长度在3-5个字符</span>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            @blur="blur"
            prefix-icon="el-icon-coffee-cup"
            data-type="desc"
            v-model="form.desc"
            show-password
          ></el-input>
          <span v-show="two" style="color: red"
            >由字母和数字组成长度在 6 到 8 个字符</span
          >
        </el-form-item>
        <el-button style="margin-left: 300px" type="primary" @click="onSubmit"
          >登录</el-button
        >
        <el-button>取消</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      one: 0,
      two: 0,
      color: "",
      color2: "",
      form: {
        name: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .post("login", {
          username: this.form.name,
          password: this.form.desc,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success",
            });
          }
          console.log(res.data.data);
          sessionStorage.setItem("token", res.data.data.token);
          console.log(sessionStorage.getItem("token"));
          if (sessionStorage.getItem("token")) {
            this.$router.push("/");
          }
        });
    },
    blur(e) {
      let text = e.target.value;
      let type = e.target.getAttribute("data-type");
      let pass = /^\w{3,5}$/;
      let desc = /^\w{6,8}$/;
      if (type == "pass") {
        if (pass.test(text)) {
          this.one = false;
          console.log(this.one);
        } else {
          this.one = true;
        }
      } else if (type == "desc") {
        if (desc.test(text)) {
          this.two = false;
        } else {
          this.two = true;
        }
      }
    },
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    setInterval(() => {
      this.color2 = this.color;
      this.color = Math.ceil(Math.random() * 1000000);
    }, 800);
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  padding-top: 150px;
  background-color: pink;
  .box {
    position: relative;
    width: 500px;
    height: 300px;
    padding: 100px 20px;
    background-color: skyblue;
    border-radius: 15px;
    margin: auto;
     box-shadow: 0 3px 5px 3px green;

    .img {
      position: absolute;
      width: 120px;
      height: 120px;
      top: -12%;
      left: 35%;
      background-color: #fff;
      border-radius: 50%;
      padding: 10px;
      img {
        height: 100px;
        width: 100px;
        overflow: hidden;
        border-radius: 50%;
        text-align: center;
        line-height: 100px;
        box-shadow: 0 3px 5px 3px red;
      }
    }
    span {
      position: absolute;
      left: 0;
      top: 33px;
      width: 100%;
      margin: 0;
      padding: 0;
      font-size: 12px;
    }
  }
}
</style>
