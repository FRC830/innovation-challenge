import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Modal, Text, TouchableOpacity, TextInput } from 'react-native'
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
    const [text, setText] = useState(data.name)
    return (
        <Modal transparent={true} visible={visible} onRequestClose={() => onDismiss(null)}>
            <CenterView>
                <ModalView>
                    <TextInput value={text} onChangeText={text => setText(text)} />
                    <TouchableOpacity onPress={() => onDismiss(null)}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onDismiss(text)}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </ModalView>
            </CenterView>
        </Modal>
    )
}

export default DeviceEditModal