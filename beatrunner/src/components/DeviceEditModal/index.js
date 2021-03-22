import React, { useState } from 'react'
import { Modal, TextInput } from 'react-native'
import styled from 'styled-components/native'

const ModalView = styled.View`
  display: flex;
  background: #267189;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`
const CenterView = styled.View`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ActionButton = styled.TouchableOpacity`
  background-color: #db0019;
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  elevation: 2;
`

const SaveActionButton = styled(ActionButton)`
  background: #91d0dc;
`
const ActionText = styled.Text`
  color: #000000;
  padding: 5px;
`

const Actions = styled.View`
  display: flex;
  flex-direction: row;
`
const MyTextInput = styled.TextInput`
  text-decoration: underline;
  font-size: 20px;
`
function DeviceEditModal({ visible, onDismiss, data }) {
  const [text, setText] = useState(data.name)
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => onDismiss(null)}>
      <CenterView>
        <ModalView>
          <MyTextInput
            value={text}
            onChangeText={(newText) => setText(newText)}
          />
          <Actions>
            <ActionButton onPress={() => onDismiss(null)}>
              <ActionText>Cancel</ActionText>
            </ActionButton>
            <SaveActionButton onPress={() => onDismiss(text)}>
              <ActionText>Save</ActionText>
            </SaveActionButton>
          </Actions>
        </ModalView>
      </CenterView>
    </Modal>
  )
}

export default DeviceEditModal
