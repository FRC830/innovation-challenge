import React from 'react'

import { View, Button, StyleSheet, Text, FlatList } from 'react-native'
import { connect } from "react-redux"
import { addDevice, removeDevice } from '_redux/features/deviceSlice'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
})

// https://reactnative.dev/docs/using-a-listview
function DeviceListScreen({navigation, ...props}) {
    // renderItem has a lot of properties, including index, item, serparators,
    function renderListItem({ item }) {
        console.log('Rendering', item)
        return (
            <Text style={styles.item}>{item.name}</Text>
        )
    }
    // note that the example uses javascript object for styles, though class + stylesheets may be better.
    return (
        <View style={styles.container}>
            <Text> Device List Screen </Text>
            <FlatList data={props.devices} renderItem={renderListItem} />
            <Button onPress={() => navigation.navigate('Logout')} title="Navigate to logout screen" />
        </View>
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