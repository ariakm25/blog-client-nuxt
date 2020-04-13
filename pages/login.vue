<template>
  <a-card hoverable class="auth">
    <img slot="cover" alt="example" src="/images/bg-01.jpg" />
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit.prevent="userLogin"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: 'Username tidak boleh kosong!' }
              ]
            }
          ]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Password tidak boleh kosong!' }
              ]
            }
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <!-- <a-form-item> -->
      <!-- <a-checkbox
        v-decorator="[
          'remember',
          {
            initialValue: false,
            valuePropName: 'checked'
          }
        ]"
      >
        Remember me
      </a-checkbox> -->
      <!-- </a-form-item> -->
      <a-form-item>
        <a-button
          block
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          Log in
        </a-button>
      </a-form-item>
      <nuxt-link class="float-right" to="/forgot">Lupa password?</nuxt-link>
      <nuxt-link class="float-left" to="/register">Belum punya akun?</nuxt-link>
    </a-form>
  </a-card>
</template>

<script>
const key = 'loading'
export default {
  auth: 'guest',
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    userLogin() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            this.$message.config({
              top: '70px'
            })
            this.$message.loading({ content: 'Memuat...', key })
            await this.$auth.loginWith('local', {
              data: values
            })
            this.$message.success({ content: 'Berhasil masuk', key })
          } catch (err) {
            this.$message.error({ content: err.response.data.data, key })
          }
        }
      })
    }
  }
}
</script>
