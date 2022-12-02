<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { ElNotification, FormInstance } from 'element-plus'
import { loginApi } from '@/api/modules/login'
import { useGlobalStore } from '@/stores'
import { getTimeState } from '@/utils/getTime'
import { useRouter } from 'vue-router'
// import { login } from '@/api'

const router = useRouter()
const globalStore = useGlobalStore()

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

const loading = ref(false)
const form = ref({
  username: 'admin',
  password: '123456',
})

const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (!valid) return
    loading.value = true

    try {
      // 1.执行登录接口
      const { data } = await loginApi(form.value)

      globalStore.setToken(data.token)

      // 2.添加动态路由
      // 3.清除上个账号的 tab 信息

      // 4.跳转到首页
      router.push('/home/index')
      ElNotification({
        title: getTimeState(),
        message: '欢迎登录',
        type: 'success',
        duration: 3000,
      })
    } finally {
      loading.value = false
    }
  })
}

onMounted(() => {
  // 监听enter事件（调用登录）
  document.onkeydown = (e: any) => {
    e = window.event || e
    if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
      if (loading.value) return
      onSubmit(loginFormRef.value)
    }
  }
})
</script>

<template>
  <el-form ref="loginFormRef" :model="form" :rules="loginRules" label-position="top">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" :prefix-icon="User" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" show-password v-model="form.password" :prefix-icon="Lock" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit(loginFormRef)" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.el-button {
  width: 100%;
}
</style>
