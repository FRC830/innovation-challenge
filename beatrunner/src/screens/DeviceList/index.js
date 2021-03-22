import React, { useState } from 'react'

import { connect } from 'react-redux'
import {
  addDevice,
  removeDevice,
  setDeviceName,
} from '_redux/features/deviceSlice'
import DeviceListItem from '_components/DeviceListItem'
import DeviceEditModal from '_components/DeviceEditModal'
import FloatingAddButton from '_components/FloatingAddButton'
import { MyView, MyText, TitleWrapper, MyList } from './styles'
import Seperator from '_components/Seperator'
import PressableIcon from '_components/PressableIcon'
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
      <TitleWrapper>
        <MyText> Device List </MyText>
        <PressableIcon
          name={'cog'}
          size={40}
          color={'white'}
          onPress={() => navigation.navigate('Settings')}
        />
      </TitleWrapper>
      <Seperator />
      <DeviceEditModal
        visible={modalVisible}
        data={selectedItem}
        onDismiss={handleEditDismiss}
      />
      <MyList
        ItemSeparatorComponent={() => <Seperator />}
        data={props.devices}
        renderItem={renderListItem}
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
