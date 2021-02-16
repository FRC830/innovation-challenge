import React, { useState } from 'react'
import styled from 'styled-components/native'
import { Modal, Text, TouchableOpacity, TextInput } from 'react-native'
const ModalView = styled.View`
margin: 20px;
display: flex;
background: lightblue;
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
const EditButton = styled.TouchableOpacity`
padding: 10px 30px;
margin: 15px 0px 15px;
backgroundColor: #0B9ED9;
align-items: center;
justify-content: center;
`
const EditButtonText = styled.Text`
color: #000000;
`

function DeviceEditModal({visible, onDismiss, data}) {
    const [text, setText] = useState(() => data.name)
    return (
        <Modal transparent={true} visible={visible} onRequestClose={() => onDismiss(null)}>
            <CenterView>
                <ModalView>
                    <TextInput value={text} onChangeText={text => setText(text)} />
                    <EditButton onPress={() => onDismiss(null)}>
                        <EditButtonText>Cancel</EditButtonText>
                    </EditButton>
                    <EditButton onPress={() => onDismiss(text)}>
                        <EditButtonText>Save</EditButtonText>
                    </EditButton>
                </ModalView>
            </CenterView>
        </Modal>
    )
}

export default DeviceEditModal