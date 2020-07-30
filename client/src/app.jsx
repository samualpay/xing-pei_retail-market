import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import {addLoadingStatus,subLoadingStatus} from './redux/actions'
import {Button} from 'antd'
import RetaiMarketTable from './components/retailMarketTable'
import {findAllRetailMarket} from './api/taipeiApis'

import './app.css'
class App extends Component {
  static propTypes = {
    loadingStatus: PropTypes.number.isRequired,
    addLoadingStatus: PropTypes.func.isRequired,
    subLoadingStatus: PropTypes.func.isRequired
  }
  componentWillMount(){
    const {addLoadingStatus,subLoadingStatus} = this.props
    axios.interceptors.request.use((config)=>{
        addLoadingStatus()
        return config
    },(error)=> {
      return Promise.reject(error)
    })
    axios.interceptors.response.use((config)=>{
        subLoadingStatus()
        return config
    },(error)=> {
      subLoadingStatus()
      return Promise.reject(error)
    })
  }
  handleClick = async()=> {
    let result = await findAllRetailMarket({sort:'_id desc'})
    console.log(result)
    debugger
    // const {addLoadingStatus,subLoadingStatus} = this.props
    // addLoadingStatus()
    // setTimeout(()=>{
    //   subLoadingStatus()
    // },1000)
  }
  render() {
    const {loadingStatus} = this.props
    return (
      <div >
        {/* <Button type="primary" onClick={this.handleClick}>Button</Button> */}
        {/* {loadingStatus>0?(<div>loading...</div>):null} */}
        <RetaiMarketTable />
      </div>
    );
  }
}

export default connect(
  state => ({loadingStatus:state}),
  {addLoadingStatus,subLoadingStatus}
)(App)
