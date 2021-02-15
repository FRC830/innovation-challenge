import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { BleManager } from 'react-native-ble-plx'
import styled from 'styled-components/native'

const ScanButton = styled.TouchableOpacity`
    background: blue;
    border-radius: 10px;
`
function DeviceAddScreen(props) {
    const [bleStackLaunched, setBleStackLaunched] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState(null)
    const manager = new BleManager()
    const [deviceList, setDeviceList] = useState([])
    const appendDeviceList = (device) => {
        setDeviceList([...deviceList, device])
    }
    // https://polidea.github.io/react-native-ble-plx/
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
                <TouchableOpacity onclick={attemptConnect(item)}>
                    <Text> { item.name } </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function attemptConnect(item) {
        setSelectedDevice(item)
        setModalVisible(true)

    }

    if (bleStackLaunched) {
        return (
            <View>
                <DeviceConnectModal visible={modalVisible} data={selectedItem} onDismiss={handleEditDismiss} />
                <ScanButton onclick={startScan}> <Text> Restart Scan </Text></ScanButton>
                <Text> Add Device </Text>
                <FlatList data={deviceList} renderItem={renderDevice}> </FlatList>
            </View>
        )
    } else {
        return (
            <View>
                <Text> Loading BLE Stack </Text>
            </View>
        )
    }
}

export default DeviceAddScreen