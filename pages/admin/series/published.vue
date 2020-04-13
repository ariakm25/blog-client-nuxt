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
        <a-col :span="12"
          ><h1>Series Published ({{ pagination.total }})</h1></a-col
        >
        <a-col :span="12">
          <nuxt-link to="/admin/series/create"
            ><a-button type="primary" style="float:right"
              >Create Series</a-button
            ></nuxt-link
          ></a-col
        >
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
    <template slot="image" slot-scope="text">
      <img :src="text" width="100px" />
    </template>
    <template slot="action" slot-scope="text">
      <nuxt-link :to="'/admin/series/' + text"
        ><a-button type="primary" icon="edit"></a-button
      ></nuxt-link>
      <a-popconfirm
        title="Are you sure？"
        ok-text="Delete"
        cancel-text="Cancel"
        ok-type="danger"
        @confirm="destroy(text)"
        ><a-icon
          slot="icon"
          type="question-circle-o"
          style="color: red"/><a-button type="danger" icon="delete"></a-button
      ></a-popconfirm>
    </template>
  </a-table>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
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
          title: 'Image',
          dataIndex: 'image',
          width: '10%',
          scopedSlots: {
            customRender: 'image'
          }
        },
        {
          title: 'Title',
          dataIndex: 'title',
          width: '45%',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => {
            if (record.title) {
              return record.title
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
          title: 'Created',
          dataIndex: 'created_at',
          width: '10%'
        },
        {
          title: 'Updated',
          dataIndex: 'updated_at',
          width: '10%'
        },
        {
          title: 'Author',
          dataIndex: 'user.name',
          width: '15%'
        },
        {
          title: 'Action',
          dataIndex: 'id',
          width: '10%',
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
        .$get('/series', {
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

    destroy(id) {
      const key = 'delete'
      this.$message.loading({ content: 'Deleting...', key })
      this.$axios
        .delete(`/series/delete/${id}`)
        .then((data) => {
          this.$message.success({
            content: `Series ${data.data.data.title} deleted succesfully.`,
            key
          })
          this.fetch()
        })
        .catch(() => {
          this.$message.error({ content: 'Failed to delete series.', key })
        })
    }
  },
  head() {
    return {
      title: 'Series Published'
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
