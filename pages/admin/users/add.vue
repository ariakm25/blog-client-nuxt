<template>
  <div>
    <a-row style="margin-bottom: 2rem">
      <a-col :span="12">
        <h1>Add new user</h1>
      </a-col>
      <a-col :span="12">
        <a-button type="primary" style="float: right" icon="left" @click="back"
          >Back</a-button
        >
      </a-col>
    </a-row>
    <a-form
      id="components-form-demo-validate-other"
      :form="form"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 8 }"
      @submit.prevent="handleSubmit"
    >
      <a-form-item label="Name">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your name!'
                }
              ]
            }
          ]"
          has-feedback
          placeholder="Input your name..."
        />
      </a-form-item>
      <a-form-item label="E-mail">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid e-mail!'
                },
                {
                  required: true,
                  message: 'Please input your e-mail!'
                }
              ]
            }
          ]"
          has-feedback
          placeholder="Input your email..."
        />
      </a-form-item>
      <a-form-item label="Username">
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]
            }
          ]"
          has-feedback
          placeholder="Input your username..."
        />
      </a-form-item>
      <a-form-item label="Password">
        <a-input-password
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters!'
                },
                {
                  validator: validateToNextPassword
                }
              ]
            }
          ]"
          has-feedback
          type="password"
          placeholder="Input your password..."
        />
      </a-form-item>
      <a-form-item label="Confirm password">
        <a-input-password
          v-decorator="[
            'password_confirmation',
            {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            }
          ]"
          type="password"
          placeholder="Confirm your password..."
          has-feedback
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item label="Status">
        <a-select
          v-decorator="[
            'account_status',
            {
              initialValue: 'pending',
              rules: [
                {
                  required: true,
                  message: 'Please select your account status!'
                }
              ]
            }
          ]"
        >
          <a-select-option value="pending">
            Pending
          </a-select-option>
          <a-select-option value="active">
            Active
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Roles">
        <a-select
          v-decorator="[
            'roles',
            {
              rules: [
                {
                  required: true,
                  message: 'Please select at least 1 role!',
                  type: 'array'
                }
              ]
            }
          ]"
          mode="multiple"
          placeholder="Select roles"
        >
          <a-select-option
            v-for="role of roles"
            :key="role.id"
            :value="role.id"
          >
            {{ role.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 11 }">
        <a-button
          type="primary"
          html-type="submit"
          style="float: right"
          :loading="loading"
        >
          Create
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  asyncData({ $axios, $message }) {
    return $axios.get('/roles?all=true').then((data) => {
      return {
        roles: data.data.data
      }
    })
  },

  data() {
    return {
      confirmDirty: false,
      loading: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'create_user' })
  },
  methods: {
    back() {
      this.$router.back()
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          this.$axios
            .post('/users/create', values)
            .then((data) => {
              this.loading = false
              this.$message.config({
                top: '70px'
              })
              this.$message.success('User created successfully!')
              this.$router.push('/admin/users')
            })
            .catch((err) => {
              err.response.data.data.forEach((item) => {
                this.form.setFields({
                  [item.field]: {
                    errors: [
                      {
                        message: item.message
                      }
                    ]
                  }
                })
                this.$message.error(item.message)
              })
              this.loading = false
            })
        }
      })
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        // eslint-disable-next-line standard/no-callback-literal
        callback("Password doesn't match!")
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    }
  },
  head() {
    return {
      title: 'Add user'
    }
  }
}
</script>
