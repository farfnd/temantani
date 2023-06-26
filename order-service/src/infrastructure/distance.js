const axios = require('axios');
const config = require('../support/config');

class DistanceService {
    constructor() {
        this.origin = {
            subdistrict: 'Keputih',
            district: 'Sukolilo',
            city: 'Surabaya',
            postalCode: '60111',
        };
        this.apiKey = config.googleMapsApiKey;
    }

    getDistance(address) {
        const destination = `${address.subdistrict}, ${address.district}, ${address.city}, ${address.postalCode}`;
        const origin = `${this.origin.subdistrict}, ${this.origin.district}, ${this.origin.city}, ${this.origin.postalCode}`;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${destination}&destinations=${origin}&units=metric&key=${this.apiKey}`;

        return axios.get(url)
            .then(response => {
                const distance = response.data.rows[0].elements[0].distance.value;
                return distance;
            })
            .catch(error => {
                console.error(error);
                throw new Error('Failed to fetch distance data');
            });
    }

    getDistanceByQuery(origin, destination) {
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&units=metric&key=${this.apiKey}`;

        return axios.get(url)
            .then(response => {
                const distance = response.data.rows[0].elements[0].distance.value;
                return distance;
            })
            .catch(error => {
                console.error(error);
                // throw new Error('Failed to fetch distance data');
            });
    }
}

module.exports = DistanceService;
