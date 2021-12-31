const EventEmitter = require('events').EventEmitter
const eventEmitter = new EventEmitter()

eventEmitter.on('start', () => {
    console.log('Durante')
})

console.log('Antes')
eventEmitter.emit('start')
console.log('Depois')