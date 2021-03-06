import React, { useState } from 'react'

import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import {
  addDevice,
  removeDevice,
  setDeviceName,
} from '_redux/features/deviceSlice'
import DeviceListItem from '_components/DeviceListItem'
import DeviceEditModal from '_components/DeviceEditModal'
import FloatingAddButton from '_components/FloatingAddButton'
import { MyView, MyText, Button } from './styles'

// https://reactnative.dev/docs/using-a-listview
function DeviceListScreen({ navigation, ...props }) {
  const [modalVisible, setModalVisible] = useState(false)
  let [selectedItem, setSelectedItem] = useState({})
  // renderItem has a lot of properties, including index, item, serparators,
  const updateState = (data) => {
    setModalVisible(true)
    setSelectedItem(data)
  }

  const sendToPlaylist = () => {
    navigation.navigate('PlaylistList') // TODO pass in device & connection logic
  }
  function renderListItem({ item }) {
    console.log('Rendering', item)
    return (
      <DeviceListItem
        onEdit={updateState}
        onSelect={sendToPlaylist}
        data={item}
      />
    )
  }
  function handleEditDismiss(value) {
    if (value !== null) {
      props.setDeviceName({ id: selectedItem.id, name: value })
    }
    setModalVisible(false)
  }
  // note that the example uses javascript object for styles, though class + stylesheets may be better.
  return (
    <MyView>
      <MyText> Device List Screen </MyText>
      <DeviceEditModal
        visible={modalVisible}
        data={selectedItem}
        onDismiss={handleEditDismiss}
      />
      <FlatList data={props.devices} renderItem={renderListItem} />
      <Button
        onPress={() => navigation.navigate('Logout')}>
        <MyText>Navigate to logout screen</MyText>
      </Button>
      <FloatingAddButton />
    </MyView>
  )
}

const mapStateToProps = (state) => {
  return {
    devices: state.devices.list,
  }
}
// Object is shorthand for a map function
const mapDispatchToProps = {
  addDevice,
  removeDevice,
  setDeviceName,
}
export default connect(mapStateToProps, mapDispatchToProps)(DeviceListScreen)
