import { createSlice } from '@reduxjs/toolkit'
// https://redux-toolkit.js.org/tutorials/intermediate-tutorial
// https://medium.com/javascript-in-plain-english/react-native-full-authentication-flow-with-spotify-bc0a5b895696

const contains = (list, id) => {
    return list.some(elem => elem.id === id)
}
const deviceSlice = createSlice({
    name: 'devices',
    initialState: {
        list: [
            {
                id: 'fake_device',
                name: 'Fake Device',
                canRemove: true
            }
        ]
    },
    reducers: {
        addDevice(state, action) {
            if (contains(state.list, action.payload.id)) {
                throw new Exception(`Cannot add device ${action.payload.id}, has already been added.`)
            }
            // Remember state updates must be pure
            state = {
                ...state,
                list: [...state.list, action.payload]
            }
            // Should return state by default
        },
        removeDevice(state, action) {
            const IDToRemove = action.payload.id
            if (!contains(state.list, IDToRemove)) {
                throw new Exception(`Cannot remove device ${IDToRemove}, does not exist.`)
            }
            // https://stackoverflow.com/questions/34582678/is-this-the-correct-way-to-delete-an-item-using-redux
            state = {
                ...state,
                list: state.list.filter(item => item.id != IDToRemove)
            }

        },
    }
})

export const {
    addDevice,
    removeDevice,
} = deviceSlice.actions

export default deviceSlice.reducer