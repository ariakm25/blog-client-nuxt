<template>
  <a-modal
    :visible="visible"
    :title="modalTitle"
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
      <a-form-item label="Title">
        <a-input
          v-decorator="[
            'title',
            {
              initialValue: title,
              rules: [
                {
                  required: true,
                  message: 'Please input the title of module!'
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
    title: {
      type: String,
      default: null
    },
    modalTitle: {
      type: String,
      default: null
    },
    visible: Boolean,
    createLoading: Boolean
  },
  watch: {
    title() {
      this.form.resetFields()
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'add_module' })
  }
}
</script>

<style></style>
