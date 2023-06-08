const axios = require('axios');
const config = require('../support/config');

class DistanceService {
    constructor(address) {
        // Initialize the address and destination
        this.address = {
            subdistrict: address.subdistrict,
            district: address.district,
            city: address.city,
            postalCode: address.postalCode,
        };
        this.origin = {
            subdistrict: 'Keputih',
            district: 'Sukolilo',
            city: 'Surabaya',
            postalCode: '60111',
        };
        this.apiKey = config.googleMapsApiKey;
    }

    getDistance() {
        const destination = `${this.address.subdistrict}, ${this.address.district}, ${this.address.city}, ${this.address.postalCode}`;
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
}

module.exports = DistanceService;
