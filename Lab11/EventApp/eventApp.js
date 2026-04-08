
const EventEmitter = require('events');

// 2. Create EventEmitter instance
const eventEmitter = new EventEmitter();


// 3. Register Event Listeners


// Event: userRegistered (Multiple listeners)
eventEmitter.on('userRegistered', (username) => {
    console.log(`Listener 1: Welcome ${username}!`);
});

eventEmitter.on('userRegistered', (username) => {
    console.log(`Listener 2: Sending email to ${username}...`);
});

// Event: orderPlaced (Multiple arguments)
eventEmitter.on('orderPlaced', (orderId, product) => {
    console.log(`Order ${orderId} placed for ${product}`);
});

// Event: dataProcessed (Asynchronous behavior)
eventEmitter.on('dataProcessed', (data) => {
    setTimeout(() => {
        console.log(`Processed data: ${data}`);
    }, 1000);
});

// Emit Events

console.log("Starting Event Execution...\n");

// Emit userRegistered event
eventEmitter.emit('userRegistered', 'Ananya');

// Emit orderPlaced event
eventEmitter.emit('orderPlaced', 101, 'Razor Laptop');

// Emit async event
eventEmitter.emit('dataProcessed', 'Data');

console.log("\nAll events emitted. Waiting for async tasks...");