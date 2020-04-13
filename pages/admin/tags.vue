<template>
  <a-table
    :columns="columns"
    :row-key="(record) => record.id"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="title">
      <a-row>
        <a-col :span="12">
          <h1>Tag Management</h1>
        </a-col>
        <a-col :span="12">
          <a-button type="primary" style="float: right" @click="showModal"
            >Add Tag</a-button
          >
          <AddTag
            ref="addTag"
            title="Add Tag"
            :visible="visible"
            :create-loading="createLoading"
            @cancel="handleCancel"
            @create="handleCreate"
          />
          <AddTag
            ref="editTag"
            title="Edit Tag"
            :name="tagVal.name"
            :visible="visibleEdit"
            :create-loading="createLoading"
            @cancel="handleCancel"
            @create="handleUpdate"
          />
        </a-col>
      </a-row>
    </template>
    <div
      slot="filterDropdown"
      slot-scope="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column
      }"
      style="padding: 8px"
    >
      <a-input
        v-ant-ref="(c) => (searchInput = c)"
        :placeholder="`Search ${column.dataIndex}`"
        :value="selectedKeys[0]"
        style="width: 188px; margin-bottom: 8px; display: block;"
        @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="
          () => handleSearch(selectedKeys, confirm, column.dataIndex)
        "
      />
      <a-button
        type="primary"
        icon="search"
        size="small"
        style="width: 90px; margin-right: 8px"
        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >Search</a-button
      >
      <a-button
        size="small"
        style="width: 90px"
        @click="() => handleReset(clearFilters)"
        >Reset</a-button
      >
    </div>
    <a-icon
      slot="filterIcon"
      slot-scope="filtered"
      type="search"
      :style="{ color: filtered ? '#108ee9' : undefined }"
    />
    <template slot="customRender" slot-scope="text, record, index, column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
            >{{ fragment }}</mark
          >
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>{{ text }}</template>
    </template>
    <template slot="action" slot-scope="val">
      <a-button type="primary" icon="edit" @click="editModal(val)"></a-button>
      <a-popconfirm
        title="Are you sure？"
        ok-text="Delete"
        cancel-text="Cancel"
        ok-type="danger"
        @confirm="destroy(val)"
      >
        <a-icon slot="icon" type="question-circle-o" style="color: red" />
        <a-button type="danger" icon="delete"></a-button>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script>
import AddTag from '~/components/modal/AddTag'

export default {
  layout: 'admin',
  components: {
    AddTag
  },
  data() {
    return {
      visible: false,
      visibleEdit: false,
      tagVal: {
        id: null,
        name: null
      },
      createLoading: false,
      data: [],
      pagination: {
        showQuickJumper: true
      },
      loading: false,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: true,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => {
            if (record.name) {
              return record.name
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            }
          },
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: 'Slug',
          dataIndex: 'slug'
        },
        {
          title: 'Action',
          align: 'center',
          scopedSlots: {
            customRender: 'action'
          }
        }
      ]
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch(params = {}) {
      this.loading = true
      this.$axios
        .$get('/tags', {
          params: {
            ...params
          }
        })
        .then((data) => {
          const pagination = { ...this.pagination }
          pagination.total = data.data.total
          pagination.pageSize = data.data.perPage
          pagination.current = data.data.page
          this.loading = false
          this.data = data.data.data
          this.pagination = pagination
        })
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      let sort = sorter.order

      switch (sort) {
        case 'ascend':
          sort = 'asc'
          break
        case 'descend':
          sort = 'desc'
          break
      }

      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        perPage: pagination.perPage,
        page: pagination.current,
        orderby: sorter.field,
        order: sort,
        ...filters
      })
    },

    handleSearch(selectedKeys, confirm, dataIndex) {
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
      confirm()
    },

    handleReset(clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    showModal() {
      this.visible = true
    },
    editModal(val) {
      this.visibleEdit = true
      this.tagVal = val
    },
    handleCancel() {
      this.visible = false
      this.visibleEdit = false
    },
    handleCreate() {
      this.createLoading = true
      const form = this.$refs.addTag.form
      form.validateFields((err, values) => {
        if (err) {
          this.createLoading = false
          return
        }
        this.$axios
          .post('/tags/create', values)
          .then((data) => {
            this.$message.config({
              top: '70px'
            })
            this.$message.success('Tag created successfully!')
            form.resetFields()
            this.createLoading = false
            this.fetch()
          })
          .catch((err) => {
            err.response.data.data.forEach((item) => {
              this.$refs.addTag.form.setFields({
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
            this.createLoading = false
          })
      })
    },
    handleUpdate() {
      this.createLoading = true
      const form = this.$refs.editTag.form
      form.validateFields((err, values) => {
        if (err) {
          this.createLoading = false
          return
        }
        this.$axios
          .put('/tags/update/' + this.tagVal.id, values)
          .then((data) => {
            this.$message.config({
              top: '70px'
            })
            this.$message.success('Tag updated successfully!')
            form.resetFields()
            this.visibleEdit = false
            this.createLoading = false
            this.fetch()
          })
          .catch((err) => {
            err.response.data.data.forEach((item) => {
              this.$refs.editTag.form.setFields({
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
            this.createLoading = false
          })
      })
    },
    destroy(val) {
      const key = 'delete'
      this.$message.loading({ content: 'Deleting...', key })
      this.$axios
        .delete(`/tags/delete/${val.id}`)
        .then((data) => {
          this.$message.success({
            content: `Tag ${data.data.data.name} deleted succesfully.`,
            key
          })
          this.fetch()
        })
        .catch(() => {
          this.$message.error({ content: 'Failed to delete tag.', key })
        })
    }
  },
  head() {
    return {
      title: 'Tags'
    }
  }
}
</script>
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
