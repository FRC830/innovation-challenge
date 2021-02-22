import React, { useState } from 'react'
import { Modal, TextInput } from 'react-native'
import { CenterView, EditButton, EditButtonText, TextInput } from './styles'

function DeviceEditModal({ visible, onDismiss, data }) {
  const [text, setText] = useState(() => data.name)
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => onDismiss(null)}>
      <CenterView>
        <ModalView>
          <TextInput value={text} onChangeText={(text) => setText(text)} />
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
