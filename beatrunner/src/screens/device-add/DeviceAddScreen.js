import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { BleManager } from 'react-native-ble-plx'
import styled from 'styled-components/native'
import DeviceConnectModal from '_components/DeviceConnectModal'
const ScanButton = styled.TouchableOpacity`
    background: lightblue;
    border-radius: 10px;
`
function DeviceAddScreen(props) {
    const [bleStackLaunched, setBleStackLaunched] = useState(true)
    console.log(bleStackLaunched)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState(null)
    const manager = new BleManager()
    const [deviceList, setDeviceList] = useState([])
    const appendDeviceList = (device) => {
        setDeviceList([...deviceList, device])
    }
    // https://polidea.github.io/react-native-ble-plx/ FOR IOS -- do not delete yet...
    const subscription = manager.onStateChange((state) => {
        console.debug(`Received state: ${state}`)
        if (state === 'PoweredOn') {
            setBleStackLaunched(true)
            subscription.remove()
        }
    })
    function startScan() {
        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error)
                throw error
            }
            appendDeviceList(device)
        })
    }
    // seperator, index, item
    function renderDevice({item}) {
        return (
            <View>
                <TouchableOpacity onPress={attemptConnect(item)}>
                    <Text> { item.name } </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function attemptConnect(item) {
        setSelectedDevice(item)
        setModalVisible(true)

    }

    return (bleStackLaunched) ?
        (
            <View>
                <DeviceConnectModal visible={modalVisible} data={selectedDevice} />
                <ScanButton onPress={startScan}>
                    <Text> Restart Scan </Text>
                </ScanButton>
                <Text> Devices Found: </Text>
                <FlatList data={deviceList} renderItem={renderDevice} />
            </View>
        ) :
        (
            <View>
                <Text> Loading BLE Stack... "{String(bleStackLaunched)}" </Text>
            </View>
        )
}

export default DeviceAddScreen