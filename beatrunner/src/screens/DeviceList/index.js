import React, { useState } from 'react'

import { FlatList, Button } from 'react-native'
import { connect } from 'react-redux'
import {
  addDevice,
  removeDevice,
  setDeviceName,
} from '_redux/features/deviceSlice'
import DeviceListItem from '_components/DeviceListItem'
import DeviceEditModal from '_components/DeviceEditModal'
import FloatingAddButton from '_components/FloatingAddButton'
import { MyView, MyText } from './styles'

// https://reactnative.dev/docs/using-a-listview
function DeviceListScreen({ navigation, ...props }) {
  const [modalVisible, setModalVisible] = useState(false)
  let [selectedItem, setSelectedItem] = useState({})
  // renderItem has a lot of properties, including index, item, serparators,
  function renderListItem({ item }) {
    console.log('Rendering', item)
    const updateState = (data) => {
      setModalVisible(true)
      setSelectedItem(data)
    }
    return <DeviceListItem onEdit={updateState} data={item} />
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
        onPress={() => navigation.navigate('Logout')}
        title="Navigate to logout screen"
      />
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
