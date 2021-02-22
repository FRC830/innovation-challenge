import React from 'react'
import { connect } from 'react-redux'
import {
  setAccessToken,
  setRefreshToken,
} from '_redux/features/authenticationSlice'
function PlaylistListScreen() {}
const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}
const mapDispatchToProps = {
  setAccessToken,
  setRefreshToken,
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistListScreen)
