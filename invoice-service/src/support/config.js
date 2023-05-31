require('dotenv').config();

module.exports = {
    env: process.env.APP_ENV || 'development',
    port: process.env.PORT || 4005,
    kafkaBootstrapServer: process.env.KAFKA_BOOTSTRAP_SERVER,
};
