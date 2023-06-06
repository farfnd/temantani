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
    jwtSecret: process.env.JWT_SECRET,
};
