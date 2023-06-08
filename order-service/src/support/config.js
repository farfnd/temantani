require('dotenv').config();

module.exports = {
    env: process.env.APP_ENV || 'development',
    port: process.env.PORT || 4003,
    kafkaBootstrapServer: process.env.KAFKA_BOOTSTRAP_SERVER,
    midtrans: {
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        expiry: {
            duration: 24 * 60,
            unit: 'minutes',
        }
    },
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    shippingCost: {
        base: 10000,
        perKmUnder10Km: 2000,
        perKmAbove10Km: 2500,
    }
};
