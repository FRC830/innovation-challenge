// import {
//   SimulatedPeripheral,
//   SimulatedService,
//   SimulatedCharacteristic,
// } from 'react-native-blemulator'
// // Works only on android, not iOS
// const myCharacteristic = new SimulatedCharacteristic({
//   uuid: 'F000AA01-0451-4000-B000-000000000000', // https://github.com/Polidea/blemulator_flutter
//   isReadable: true,
//   isWritableWithResponse: false,
//   isWritableWithoutResponse: false,
//   isNotifiable: false,
//   initialValue: '69',
//   convenienceName: 'My characteristic',
// })
// export const simulatedPeripheral = new SimulatedPeripheral({
//   name: 'My peripheral',
//   localName: 'My peripheral local name',
//   id: '1234',
//   advertisementInterval: 1000,
//   isConnectable: true,
//   serviceUuids: [],
//   rssi: -90,
//   services: [
//     new SimulatedService({
//       uuid: 'F000AA00-0451-4000-B000-000000000000',
//       isAdvertised: true,
//       convenienceName: 'My service',
//       characteristics: new Map([[100, myCharacteristic]]),
//     }),
//   ],
// })
