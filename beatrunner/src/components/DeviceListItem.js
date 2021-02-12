import React from 'react'

import { Alert } from 'react-native'
import styled from 'styled-components/native'
// https://stackoverflow.com/questions/39282253/how-can-i-alias-a-default-import-in-javascript
import Icon from 'react-native-vector-icons/FontAwesome5'

const MyText = styled.Text`
    font-size: 18px;
    margin: auto;
`

const ListItemWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 10px;
    background: lightgray;

`
const IconButton = styled.TouchableOpacity``
const TrashIcon = styled(Icon)`
    font-size: 30px;
`
function DeviceListItem(props) {
    return (
        <ListItemWrapper>
            <MyText>{props.name} - {props.id}</MyText>
            <IconButton onPress={() => Alert.alert('clicked 2')}>
                <TrashIcon name={'trash'}/>
            </IconButton>
        </ListItemWrapper>
    )
}

export default DeviceListItem