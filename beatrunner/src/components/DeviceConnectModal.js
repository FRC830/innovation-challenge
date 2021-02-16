import React from 'react'
import { Modal, View, Text } from 'react-native'
function DeviceConnectModal({visible, selectedDevice}) {
    if (selectedDevice != undefined) {
        selectedDevice.connect().then((device) => {
            console.debug('Connecting to device...')
            console.debug(device)
        }).catch((error) => {
            console.error(error)
            throw error
        })
    }
    return (
        <Modal transparent={true} visible={visible} onRequestClose={() => onDismiss(null)}>
            <View>
                <Text> Connect MODAL </Text>
            </View>
        </Modal>
    )
}

export default DeviceConnectModal