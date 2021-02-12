import React from 'react'

import styled from 'styled-components/native'
import { FlatList, Button } from 'react-native'
import { connect } from "react-redux"
import { addDevice, removeDevice } from '_redux/features/deviceSlice'
import DeviceListItem from '_components/DeviceListItem'
const MyView = styled.View`
    flex: 1;
    padding-top: 22px;
`

const MyText = styled.Text`
    padding: 10px;
    font-size: 18px;
    height: 44px;
`

// https://reactnative.dev/docs/using-a-listview
function DeviceListScreen({navigation, ...props}) {
    // renderItem has a lot of properties, including index, item, serparators,
    function renderListItem({ item }) {
        console.log('Rendering', item)
        return DeviceListItem(item)
    }
    // note that the example uses javascript object for styles, though class + stylesheets may be better.
    return (
        <MyView>
            <MyText> Device List Screen </MyText>
            <FlatList data={props.devices} renderItem={renderListItem} />
            <Button onPress={() => navigation.navigate('Logout')} title="Navigate to logout screen" />
        </MyView>
    )
}

const mapStateToProps = state => {
	return {
		devices: state.devices.list
	}
}
// Object is shorthand for a map function
const mapDispatchToProps = {
    addDevice, removeDevice
}
export default connect(mapStateToProps, mapDispatchToProps)(DeviceListScreen)