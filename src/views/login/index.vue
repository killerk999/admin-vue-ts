<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

const loginFormRef = ref<FormInstance>()
const loginRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: 'Length should be 3 to 6', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' },
  ],
})
const form = ref({
  username: '',
  password: '',
})

const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      console.log(form.value)

      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
  <div class="login-container flex-center">
    <div class="login-form-box">
      <el-form ref="loginFormRef" :model="form" :rules="loginRules" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :prefix-icon="User" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" show-password v-model="form.password" :prefix-icon="Lock" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit(loginFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  position: relative;
  width: 100vw;
  min-width: 550px;
  height: 100vh;
  min-height: 500px;

  .login-form-box {
    width: 420px;
    padding: 50px 40px 45px;
    border-radius: 10px;
    box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
    .el-button {
      width: 100%;
    }
  }
}
</style>
