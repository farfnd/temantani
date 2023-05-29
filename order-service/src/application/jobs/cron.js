const cron = require('node-cron');
const cancelExpiredOrders = require('./commands/cancel-expired-orders');

cron.schedule('*/1 * * * *', () => {
    console.log('Running cron job...');
    cancelExpiredOrders();
});

setInterval(() => {}, 60 * 60 * 1000);