import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { BleManager } from 'react-native-ble-plx'
import DeviceConnectModal from '_components/DeviceConnectModal'
import { ScanButton } from './styles'

function DeviceAddScreen(props) {
  console.log('Component Rendering...')
  const [bleStackLaunched, setBleStackLaunched] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [deviceList, setDeviceList] = useState([])
  let selectedDevice = null
  const manager = new BleManager()
  // https://polidea.github.io/react-native-ble-plx/ FOR IOS -- do not delete yet...
  const subscription = manager.onStateChange((state) => {
    console.debug(`Received state: ${state}`)
    if (state === 'PoweredOn') {
      subscription.remove()
      setBleStackLaunched(true)
    }
  })
  function startScan() {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error)
        throw error
      }
      setDeviceList([...deviceList, device])
    })
  }
  // seperator, index, item
  function renderDevice({ item }) {
    return (
      <View>
        <TouchableOpacity
          onPress={(item) => {
            console.log('Pressing device')
            attemptConnect(item)
          }}>
          <Text> {item.name} </Text>
        </TouchableOpacity>
      </View>
    )
  }

  function attemptConnect(item) {
    console.log('Attempting connection')
    // setSelectedDevice(item)
    selectedDevice = item
    setModalVisible(true)
  }

  return bleStackLaunched ? (
    <View>
      <DeviceConnectModal visible={modalVisible} data={selectedDevice} />
      <ScanButton onPress={startScan}>
        <Text> Restart Scan </Text>
      </ScanButton>
      <Text> Devices Found: </Text>
      <FlatList data={deviceList} renderItem={renderDevice} />
    </View>
  ) : (
    <View>
      <Text> Loading BLE Stack... "{String(bleStackLaunched)}" </Text>
    </View>
  )
}

export default DeviceAddScreen
