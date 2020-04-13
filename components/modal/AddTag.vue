<template>
  <a-modal
    :visible="visible"
    :title="title"
    @ok="
      () => {
        $emit('create')
      }
    "
    @cancel="
      () => {
        $emit('cancel')
      }
    "
  >
    <a-form layout="vertical" :form="form">
      <a-form-item label="Name">
        <a-input
          v-decorator="[
            'name',
            {
              initialValue: name,
              rules: [
                {
                  required: true,
                  message: 'Please input the name of tag!'
                }
              ]
            }
          ]"
        />
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button
        key="back"
        @click="
          () => {
            $emit('cancel')
          }
        "
        >Cancel</a-button
      >
      <a-button
        key="submit"
        type="primary"
        :loading="createLoading"
        @click="
          () => {
            $emit('create')
          }
        "
      >
        Submit
      </a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    visible: Boolean,
    createLoading: Boolean
  },
  watch: {
    name() {
      this.form.resetFields()
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'add_tag' })
  }
}
</script>
