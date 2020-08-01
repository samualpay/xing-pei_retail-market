import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import { addLoadingStatus, subLoadingStatus } from './redux/actions'
import { Checkbox } from 'antd'
import RetaiMarketTable from './components/retailMarketTable'
import './app.css'
class App extends Component {
  static propTypes = {
    loadingStatus: PropTypes.number.isRequired,
    addLoadingStatus: PropTypes.func.isRequired,
    subLoadingStatus: PropTypes.func.isRequired
  }
  state = {
    isFetchLocale: false
  }
  componentWillMount() {
    const { addLoadingStatus, subLoadingStatus } = this.props
    axios.interceptors.request.use((config) => {
      addLoadingStatus()
      return config
    }, (error) => {
      return Promise.reject(error)
    })
    axios.interceptors.response.use((config) => {
      subLoadingStatus()
      return config
    }, (error) => {
      subLoadingStatus()
      return Promise.reject(error)
    })
  }
  handleChange = (e) => {
    let isFetchLocale = e.target.checked
    this.setState({ isFetchLocale })
  }
  render() {
    const { isFetchLocale } = this.state
    return (
      <div >
        <RetaiMarketTable isFetchLocale={isFetchLocale} />
        <Checkbox defaultChecked={isFetchLocale} onChange={this.handleChange}>Load data from local</Checkbox>
      </div>
    );
  }
}

export default connect(
  state => ({ loadingStatus: state }),
  { addLoadingStatus, subLoadingStatus }
)(App)
