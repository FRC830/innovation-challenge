import { createSlice } from '@reduxjs/toolkit'
// https://redux-toolkit.js.org/tutorials/intermediate-tutorial
// https://medium.com/javascript-in-plain-english/react-native-full-authentication-flow-with-spotify-bc0a5b895696

const contains = (list, id) => {
  return list.some((elem) => elem.id === id)
}
const deviceSlice = createSlice({
  name: 'devices',
  initialState: {
    list: [
      {
        id: 'fake_device',
        name: 'Fake Device',
        canRemove: true,
      },
    ],
  },
  reducers: {
    addDevice(state, action) {
      if (contains(state.list, action.payload.id)) {
        throw new Exception(
          `Cannot add device ${action.payload.id}, has already been added.`,
        )
      }
      // Remember state updates must be pure
      state = {
        ...state,
        list: [...state.list, action.payload],
      }
      // Should return state by default
      return state
    },
    setDeviceName(state, action) {
      const { id, name } = action.payload
      if (!contains(state.list, id)) {
        throw new Exception(`Cannot set name of device ${id}, does not exist.`)
      }
      // https://stackoverflow.com/questions/35628774/how-to-update-single-value-inside-specific-array-item-in-redux
      state = {
        ...state,
        list: state.list.map((item) => {
          if (item.id === id && item.name !== name) {
            return {
              ...item,
              name: name,
            }
          }
          return item
        }),
      }
      return state
    },
    removeDevice(state, action) {
      const IDToRemove = action.payload.id
      if (!contains(state.list, IDToRemove)) {
        throw new Exception(
          `Cannot remove device ${IDToRemove}, does not exist.`,
        )
      }
      // https://stackoverflow.com/questions/34582678/is-this-the-correct-way-to-delete-an-item-using-redux
      state = {
        ...state,
        list: state.list.filter((item) => item.id != IDToRemove),
      }
      return state
    },
  },
})

export const { addDevice, removeDevice, setDeviceName } = deviceSlice.actions

export default deviceSlice.reducer
