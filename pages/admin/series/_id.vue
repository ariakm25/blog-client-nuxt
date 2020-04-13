<template>
  <div>
    <a-row style="margin-bottom: 2rem">
      <a-col :span="12">
        <h1>Update Series</h1>
      </a-col>
      <a-col :span="12">
        <a-button type="primary" style="float: right" icon="left" @click="back"
          >Back</a-button
        >
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="14">
        <a-form
          id="create"
          ref="create"
          :form="form"
          @submit.prevent="handleSubmit"
        >
          <a-form-item label="Title">
            <a-input
              v-decorator="[
                'title',
                {
                  initialValue: title,
                  rules: [
                    {
                      required: true,
                      message: 'Please input the title!'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="Status">
            <a-radio-group
              v-decorator="[
                'status',
                {
                  initialValue: status,
                  rules: [
                    {
                      required: true,
                      message: 'Please choose the status!'
                    }
                  ]
                }
              ]"
            >
              <a-radio value="0">
                Draft
              </a-radio>
              <a-radio value="1">
                Publish
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Image">
            <a-input
              v-decorator="[
                'image',
                {
                  initialValue: image,
                  rules: [
                    { required: true, message: 'Please input image url!' }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="Tags">
            <a-select
              v-decorator="[
                'tags',
                {
                  initialValue: currentTags
                }
              ]"
              mode="tags"
              style="width: 100%"
              placeholder="Tags"
            >
              <a-select-option
                v-for="tag in tags"
                :key="tag.id"
                :value="tag.id.toString()"
                >{{ tag.name }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item label="Content">
            <no-ssr>
              <div class="editor">
                <editor-menu-bar
                  v-slot="{ commands, isActive }"
                  :editor="editor"
                >
                  <div class="menubar">
                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.bold() }"
                      title="bold"
                      type="button"
                      @click="commands.bold"
                    >
                      <a-icon type="bold" />
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.italic() }"
                      title="italic"
                      type="button"
                      @click="commands.italic"
                    >
                      <a-icon type="italic" />
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.strike() }"
                      title="strike"
                      type="button"
                      @click="commands.strike"
                    >
                      <a-icon type="strikethrough" />
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.underline() }"
                      title="underline"
                      type="button"
                      @click="commands.underline"
                    >
                      <a-icon type="underline" />
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.code() }"
                      title="code"
                      type="button"
                      @click="commands.code"
                    >
                      <a-icon type="code" />
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.paragraph() }"
                      title="paragraph"
                      type="button"
                      @click="commands.paragraph"
                    >
                      <a-icon type="menu-unfold" />
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                      title="heading"
                      type="button"
                      @click="commands.heading({ level: 1 })"
                    >
                      H1
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                      title="heading"
                      type="button"
                      @click="commands.heading({ level: 2 })"
                    >
                      H2
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                      title="heading"
                      type="button"
                      @click="commands.heading({ level: 3 })"
                    >
                      H3
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.bullet_list() }"
                      title="bullet_list"
                      type="button"
                      @click="commands.bullet_list"
                    >
                      <a-icon type="unordered-list" />
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.ordered_list() }"
                      title="ordered_list"
                      type="button"
                      @click="commands.ordered_list"
                    >
                      <a-icon type="ordered-list" />
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.blockquote() }"
                      title="blockquote"
                      type="button"
                      @click="commands.blockquote"
                    >
                      "
                    </button>

                    <button
                      class="menubar__button"
                      :class="{ 'is-active': isActive.code_block() }"
                      title="code_block"
                      type="button"
                      @click="commands.code_block"
                    >
                      <a-icon type="code" />
                    </button>

                    <button
                      class="menubar__button"
                      title="horizontal_rule"
                      type="button"
                      @click="commands.horizontal_rule"
                    >
                      <a-icon type="dash" />
                    </button>

                    <button
                      class="menubar__button"
                      title="undo"
                      type="button"
                      @click="commands.undo"
                    >
                      <a-icon type="undo" />
                    </button>

                    <button
                      class="menubar__button"
                      title="redo"
                      type="button"
                      @click="commands.redo"
                    >
                      <a-icon type="redo" />
                    </button>
                  </div>
                </editor-menu-bar>
                <editor-content
                  v-decorator="['content']"
                  class="editor__content"
                  :editor="editor"
                />
              </div>
            </no-ssr>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-button
              type="primary"
              html-type="submit"
              style="float: right"
              :loading="loading"
            >
              Update
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="10">
        <a-upload-dragger
          name="images"
          :action="imageApi"
          accept="image/*"
          :multiple="true"
          :headers="{
            Authorization: this.$auth.getToken('local')
          }"
          list-type="picture"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p class="ant-upload-hint">
            Upload images here and copy uploaded url.
          </p>
        </a-upload-dragger>
        <a-row style="margin-top: 1rem">
          <a-col :span="12">
            <h2>Modules</h2>
          </a-col>
          <a-col :span="12">
            <a-button
              type="primary"
              style="float: right"
              icon="plus"
              @click="showModalAddModule"
              >Module</a-button
            >
            <AddModule
              ref="addModule"
              :visible="visibleAddModule"
              modal-title="Add Module"
              :create-loading="createModuleLoading"
              @cancel="handleCancel"
              @create="handleCreateModule"
            />
            <AddModule
              ref="editModule"
              :visible="visibleEditModule"
              :title="moduleVal.title"
              modal-title="Edit Module"
              :create-loading="createModuleLoading"
              @cancel="handleCancel"
              @create="handleUpdateModule"
            />
          </a-col>
        </a-row>
        <a-row v-for="module in modules" :key="module.id">
          <a-col :span="16">
            <a-list>{{ module.title }}</a-list>
          </a-col>
          <a-col :span="8">
            <a-popconfirm
              style="float: right; margin-left  : 10px"
              title="Are you sure？"
              ok-text="Delete"
              cancel-text="Cancel"
              ok-type="danger"
              @confirm="destroyModule(module)"
              ><a-icon
                slot="icon"
                type="question-circle-o"
                style="color: red"
              />
              <a-button type="danger" icon="delete"></a-button>
            </a-popconfirm>
            <a-button
              style="float: right; margin-left: 10px"
              icon="edit"
              @click="showModalEditModule(module)"
            ></a-button>
            <nuxt-link :to="'/admin/materials/' + $route.params.id + '/create'">
              <a-button
                style="float: right"
                type="primary"
                icon="plus"
              ></a-button>
            </nuxt-link>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import php from 'highlight.js/lib/languages/php'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

import {
  Blockquote,
  CodeBlockHighlight,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from 'tiptap-extensions'
import AddModule from '~/components/modal/AddModule'

export default {
  layout: 'admin',
  components: {
    EditorContent,
    EditorMenuBar,
    AddModule
  },
  async asyncData({ $axios, params }) {
    const tags = await $axios.get('/tags?all=true')
    const getSeries = await $axios.get('/series/id/' + params.id)
    const series = getSeries.data.data

    return {
      tags: tags.data.data,
      title: series.title,
      image: series.image,
      status: series.status.toString(),
      content: series.content,
      modules: series.modules,
      currentTags: series.tags.map((i) => i.id.toString())
    }
  },
  data() {
    return {
      visibleAddModule: false,
      visibleEditModule: false,
      moduleVal: {
        id: null,
        title: null
      },
      createModuleLoading: false,
      loading: false,
      imageApi: null,
      tags: null,
      editor: null,
      content: null,
      title: null,
      image: null,
      currentTags: null,
      status: null,
      modules: null
    }
  },
  mounted() {
    this.imageApi = process.env.API_URL + '/images/upload'
    this.editor = new Editor({
      onUpdate: ({ getHTML }) => {
        this.form.setFieldsValue({
          content: getHTML()
        })
      },
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlockHighlight({
          languages: {
            php,
            javascript,
            css
          }
        }),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Image(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: `${this.content}`
    })
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'create_series' })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    back() {
      this.$router.back()
    },
    handleChange(info) {
      const fileList = [...info.fileList]
      fileList.forEach((item) => {
        if (item && item.response) {
          item.url = item.response.data
        }
      })
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          this.$axios
            .put('/series/update/' + this.$route.params.id, values)
            .then((data) => {
              this.loading = false
              this.$message.config({
                top: '70px'
              })
              this.$message.success('Series updated successfully!')
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
                this.loading = false
              })
              this.loading = false
            })
        }
      })
    },
    showModalAddModule() {
      this.visibleAddModule = true
    },
    showModalEditModule(val) {
      this.visibleEditModule = true
      this.moduleVal = val
    },
    handleCancel() {
      this.visibleAddModule = false
      this.visibleEditModule = false
    },
    handleCreateModule() {
      this.createModuleLoading = true
      const form = this.$refs.addModule.form
      form.validateFields((err, values) => {
        if (err) {
          this.createModuleLoading = false
          return
        }
        values.series_id = this.$route.params.id
        this.$axios
          .post('/modules/create', values)
          .then((data) => {
            this.$message.config({
              top: '70px'
            })
            this.$message.success('Module created successfully!')
            form.resetFields()
            this.visibleAddModule = false
            this.createModuleLoading = false
            this.updateModule()
          })
          .catch((err) => {
            err.response.data.data.forEach((item) => {
              this.$refs.addModule.form.setFields({
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
            this.createModuleLoading = false
          })
      })
    },
    handleUpdateModule() {
      this.createModuleLoading = true
      const form = this.$refs.editModule.form
      form.validateFields((err, values) => {
        if (err) {
          this.createModuleLoading = false
          return
        }
        this.$axios
          .put('/modules/update/' + this.moduleVal.id, values)
          .then((data) => {
            this.$message.config({
              top: '70px'
            })
            this.$message.success('Module updated successfully!')
            form.resetFields()
            this.visibleEditModule = false
            this.createModuleLoading = false
            this.updateModule()
          })
          .catch((err) => {
            err.response.data.data.forEach((item) => {
              this.$refs.editModule.form.setFields({
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
            this.createModuleLoading = false
          })
      })
    },
    destroyModule(val) {
      const key = 'delete'
      this.$message.loading({ content: 'Deleting...', key })
      this.$axios
        .delete(`/modules/delete/${val.id}`)
        .then((data) => {
          this.$message.success({
            content: `Module ${data.data.data.title} deleted succesfully.`,
            key
          })
          this.updateModule()
        })
        .catch(() => {
          this.$message.error({ content: 'Failed to delete module.', key })
        })
    },
    async updateModule() {
      const getSeries = await this.$axios.get(
        '/series/id/' + this.$route.params.id
      )
      const series = getSeries.data.data
      this.modules = series.modules
    }
  },
  head() {
    return {
      title: 'Edit series'
    }
  }
}
</script>
<style>
.editor {
  position: relative;
  margin: 0 auto 5rem;
}

.editor__content {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  border: 1px solid #ccc;
}

.editor__content * {
  caret-color: currentColor;
}

.editor__content pre {
  padding: 0.7rem 1rem;
  border-radius: 5px;
  background: #000;
  color: #fff;
  font-size: 0.8rem;
  overflow-x: auto;
}

.editor__content pre code {
  display: block;
}

.editor__content p code {
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
}

.editor__content ol,
.editor__content ul {
  padding-left: 1rem;
}

.editor__content li > ol,
.editor__content li > p,
.editor__content li > ul {
  margin: 0;
}

.editor__content a {
  color: inherit;
}

.editor__content blockquote {
  border-left: 3px solid rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
  padding-left: 0.8rem;
  font-style: italic;
}

.editor__content blockquote p {
  margin: 0;
}

.editor__content img {
  max-width: 100%;
  border-radius: 3px;
}

.editor__content table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.editor__content table td,
.editor__content table th {
  min-width: 1em;
  border: 2px solid #ddd;
  padding: 3px 5px;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}

.editor__content table td > *,
.editor__content table th > * {
  margin-bottom: 0;
}

.editor__content table th {
  font-weight: 700;
  text-align: left;
}

.editor__content table .selectedCell:after {
  z-index: 2;
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 255, 0.4);
  pointer-events: none;
}

.editor__content table .column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: 0;
  width: 4px;
  z-index: 20;
  background-color: #adf;
  pointer-events: none;
}

.editor__content .tableWrapper {
  margin: 1em 0;
  overflow-x: auto;
}

.editor__content .resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

.menubar {
  margin-bottom: 1rem;
  -webkit-transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
}

.menubar.is-hidden {
  visibility: hidden;
  opacity: 0;
}

.menubar.is-focused {
  visibility: visible;
  opacity: 1;
  -webkit-transition: visibility 0.2s, opacity 0.2s;
  transition: visibility 0.2s, opacity 0.2s;
}

.menubar__button {
  font-weight: 700;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  background: transparent;
  border: 0;
  color: #000;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}

.menubar__button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menubar__button.is-active {
  background-color: rgba(0, 0, 0, 0.1);
}

.menubar span.menubar__button {
  font-size: 13.3333px;
}

.menububble {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.2s, visibility 0.2s;
  transition: opacity 0.2s, visibility 0.2s;
}

.menububble.is-active {
  opacity: 1;
  visibility: visible;
}

.menububble__button {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  background: transparent;
  border: 0;
  color: #fff;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}

.menububble__button:last-child {
  margin-right: 0;
}

.menububble__button:hover {
  background-color: hsla(0, 0%, 100%, 0.1);
}

.menububble__button.is-active {
  background-color: hsla(0, 0%, 100%, 0.2);
}

.menububble__form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.menububble__input {
  font: inherit;
  border: none;
  background: transparent;
  color: #fff;
}

.editor__content .ProseMirror {
  padding: 10px;
}
:-webkit-any(article, aside, nav, section)
  :-webkit-any(article, aside, nav, section)
  h1 {
  font-size: 1.7em;
}
</style>
