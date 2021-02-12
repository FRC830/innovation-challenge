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
    justify-content: space-between;
    flex-direction: row;
    padding: 10px;
    background: lightgray;

`
const IconButton = styled.TouchableOpacity`
    margin-right: 5px;
`
const MyIcon = styled(Icon)`
    font-size: 25px;
`

function DeviceListItem({onEdit, data}) {
    return (
        <ListItemWrapper>
            <MyText>{data.name} - {data.id}</MyText>
            <IconButton onPress={() => onEdit(data)}>
                <MyIcon name={'pen'}/>
            </IconButton>
            <IconButton onPress={() => Alert.alert('clicked 2')}>
                <MyIcon name={'trash'}/>
            </IconButton>
        </ListItemWrapper>
    )
}

export default DeviceListItem