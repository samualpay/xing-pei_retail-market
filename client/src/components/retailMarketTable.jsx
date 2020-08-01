import { Table } from 'antd';
import { findAllRetailMarket as taipeiFetch } from '../api/taipeiApis'
import { findAllRetailMarket as localFetch } from '../api/localApi'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
const columns = [
  {
    title: '_id',
    dataIndex: '_id',
    sorter: true,
    width: '10%',
  },
  {
    title: ' 平均(元 / 公斤)',
    dataIndex: ' 平均(元 / 公斤)',
    width: '15%',
  },
  {
    title: ' 品名',
    dataIndex: '  品名',
    width: '15%',
  },
  {
    title: ' 市場',
    dataIndex: ' 市場',
    width: '15%',
  },
  {
    title: '日期',
    dataIndex: '日期',
    sorter: true,
    width: '30%',
  },
  {
    title: ' 種類',
    dataIndex: ' 種類',
    width: '15%',
  },
];
const sortMapping = {
  'ascend': 'asc',
  'descend': 'desc'
}
async function fetchHandle({ isFetchLocale, sortByColumn, sortOrder, offset, limit }) {
  if (isFetchLocale) {
    return localFetch({ sortByColumn, sortOrder, offset, limit })
  } else {
    let result = await taipeiFetch({ sortByColumn, sortOrder, offset, limit })
    if (!result.success) {
      result = await localFetch({ sortByColumn, sortOrder, offset, limit })
    }
    return result
  }
}
class RetailMarketTable extends Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false
  }
  static propTypes = {
    isFetchLocale: PropTypes.bool.isRequired
  }
  handleTableChange = (pagination, filters, sorter) => {
    let sortByColumn = sorter.field
    let sortOrder = sortMapping[sorter.order]
    this.fetch({ sortByColumn, sortOrder, pagination })
  }
  fetch = async ({ sortByColumn = '_id', sortOrder = 'asc', pagination }) => {
    let { isFetchLocale } = this.props
    let offset = (pagination.current - 1) * pagination.pageSize
    let limit = pagination.pageSize
    this.setState({ loading: true })
    let result = await fetchHandle({ isFetchLocale, sortByColumn, sortOrder, offset, limit })
    this.setState({ loading: false })
    if (result.success) {
      this.setState({
        pagination: {
          ...pagination,
          total: result.totalCount
        },
        data: result.datas
      })
    }
  }
  componentDidMount() {
    const { pagination } = this.state
    this.fetch({ pagination })
  }
  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Table columns={columns} rowKey={record => record['_id']} dataSource={data} loading={loading} pagination={pagination} onChange={this.handleTableChange} />
    );
  }
}

export default RetailMarketTable;