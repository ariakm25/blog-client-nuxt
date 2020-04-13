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
                  message: 'Please input the name of role!'
                }
              ]
            }
          ]"
          @change="handleSlug"
        />
      </a-form-item>
      <a-form-item label="Slug">
        <a-input
          v-decorator="[
            'slug',
            {
              initialValue: slug,
              rules: [
                {
                  required: true,
                  message: 'Please input the slug of role!'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="Description">
        <a-input
          v-decorator="[
            'description',
            {
              initialValue: description,
              rules: [
                {
                  required: true,
                  message: 'Please input the description of role!'
                }
              ]
            }
          ]"
          type="textarea"
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
    slug: {
      type: String,
      default: null
    },
    description: {
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
    this.form = this.$form.createForm(this, { name: 'add_role' })
  },
  methods: {
    handleSlug(e) {
      const value = e.target.value
      this.form.setFieldsValue({
        slug: value.replace(/\s/g, '-').toLowerCase()
      })
    }
  }
}
</script>

<style></style>
