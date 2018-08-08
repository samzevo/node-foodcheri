const axios = require('axios');

class Foodcheri {
    constructor() {
        this.request = axios.create({
            baseURL: 'https://www.foodcheri.com'
        });
        this.request.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }

    async trackOrder(orderId) {
        try {
            let response = await this.request({
                method: 'POST',
                url: '/tracking-order-details',
                data: {
                    hashOrder: orderId
                },
                responseType: 'json'
            });
            return response.data;
        }
        catch(err) {
            console.log('error', err);
        }
    }
}

module.exports = Foodcheri;