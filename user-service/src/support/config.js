require('dotenv').config();

module.exports = {
    env: process.env.APP_ENV || 'development',
    port: process.env.PORT || 4000,
    kafkaBootstrapServer: process.env.KAFKA_BOOTSTRAP_SERVER,
    
    fileUpload: {
        createParentPath: true,
        limits: {
            fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
        },
    },
};
