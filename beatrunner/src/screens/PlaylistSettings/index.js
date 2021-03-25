import React, { useState } from 'react'
import { MyView, MyText, CheckboxRow, Title, ContinueButton } from './styles'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Seperator from '_components/Seperator'
const IconButton = styled.TouchableOpacity`
  margin-right: 5px;
`

function Checkbox({ onPress, isChecked, color = 'white', size = '30' }) {
  const MyIcon = styled(Icon)`
    font-size: ${size}px;
    color: ${color};
  `
  return (
    <IconButton onPress={onPress}>
      <MyIcon name={isChecked ? 'check-square' : 'square'} />
    </IconButton>
  )
}

function PlaylistSettings({ navigation, route, ...props }) {
  const [isChecked, setIsChecked] = useState(false)
  // {props.route.params.playlistID}
  return (
    <MyView>
      <Title>Playlist settings </Title>
      <Seperator />
      <CheckboxRow>
        <Checkbox
          isChecked={isChecked}
          onPress={() => {
            setIsChecked(!isChecked)
          }}></Checkbox>
        <MyText>Include 1/2 and double BPM </MyText>
      </CheckboxRow>
      <ContinueButton
        onPress={() =>
          navigation.navigate('Play', {
            playlistID: route.params.playlistID,
            include: isChecked,
          })
        }>
        <MyText>Continue</MyText>
      </ContinueButton>
    </MyView>
  )
}
export default PlaylistSettings
