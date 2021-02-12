import React from 'react'
import styled from 'styled-components/native'
import { Modal, Text, TouchableOpacity } from 'react-native'
const ModalView = styled.View`
margin: 20px;
display: flex;
background: blue;
border-radius: 20px;
padding: 35px;
align-items: center;
justify-content: center;
`
const CenterView = styled.View`
flex-grow: 1;
display: flex;
justify-content: center;
align-items: center;
`
function DeviceEditModal({visible, onDismiss, data}) {
    return (
        <Modal transparent={true} visible={visible} onRequestClose={() => onDismiss()}>
            <CenterView>
                <ModalView>
                    <TouchableOpacity onPress={() => onDismiss()}><Text>{ data.name }</Text></TouchableOpacity>
                </ModalView>
            </CenterView>
        </Modal>
    )
}

export default DeviceEditModal