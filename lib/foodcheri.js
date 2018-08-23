const axios = require('axios');
const moment = require('moment');

const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

class Foodcheri {
    constructor(config) {
        this.request = axios.create({
          baseURL: 'https://www.foodcheri.com/api/v1',
          headers: {
            'x-fc-api-key': config.apiKey
          }
        });
      }

      setAccessToken(accessToken) {
        this.request.defaults.headers.common['Authorization'] = '';
        delete this.request.defaults.headers.common['Authorization'];

        this.request.defaults.headers.common[
          'Authorization'
        ] = `Token ${accessToken}`;
      }

    async login(email, password) {
        const auth = new Buffer(`${email}:${password}`).toString('base64')
        try {
            const login = await this.request({
                method: 'GET',
                url: '/session/login',
                headers: {
                    'Authorization': `Basic ${auth}`
                },
                responseType: 'json'
            })
            this.setAccessToken(login.data.user_token)
            return login.data
        }
        catch(err) {
            console.log('error with login', err)
        }
    }

    async getProfile() {
        try {
            const profile = await this.request({
                method: 'GET',
                url: '/customers/me',
                responseType: 'json'
            })
            return profile.data
        }
        catch(err) {
            console.log('error with getProfile', err)
        }
    }

    async getLastOrders() {
        try {
            const orders = await this.request({
                method: 'GET',
                url: '/orders/last',
                responseType: 'json'
            })
            return orders.data
        }
        catch(err) {
            console.log('error with getLastOrders', err)
        }
    }

    async getAllTimeslots({latitude, longitude}) {
        try {
            const timeslots = await this.request({
                method: 'GET',
                url: '/timeslots',
                params: {
                    coordinates: `${latitude},${longitude}`,
                },
                responseType: 'json'
            })
            return timeslots.data
        }
        catch(err) {
            console.log('error with getAllTimeslots', err)
        }
    }

    async getTimeslots({latitude, longitude}, mealDate = moment().format(DATE_FORMAT).toString(), time = "12:00") {
        try {
            const mealDateTime = moment(`${mealDate} ${time}`, DATE_TIME_FORMAT)
            const timeslots = await this.getAllTimeslots({latitude, longitude})
            return timeslots.filter(timeslot => timeslot.date === mealDate)
            .map(timeslots => timeslots.meal)
            .reduce((acc, meals) => [...acc, ...meals], [])
            .find(meal => mealDateTime.isBetween(moment(meal.start_time, DATE_TIME_FORMAT), moment(meal.end_time, DATE_TIME_FORMAT)))
        }
        catch(err) {
            console.log('error with getTimeslots', err)
        }
    }

    async getIdArea({latitude, longitude}, mealDate = moment().format(DATE_FORMAT).toString(), time = "12:00") {
        try {
            const timeslots = await this.getTimeslots({latitude, longitude}, mealDate, time)
            return timeslots.id_area
        }
        catch(err) {
            console.log('error with getIdArea', err)
        }
    }

    async getMenu(meal = 'LUNCH', mealDate = moment().format(DATE_FORMAT).toString(), idArea = '100') {
        try {
            const menu = await this.request({
                method: 'GET',
                url: '/productsPublication',
                params: {
                    meal: meal,
                    meal_date: mealDate,
                    id_area: idArea
                },
                responseType: 'json'
            })
            return menu.data
        }
        catch(err) {
            console.log('error with getMenu', err)
        }
    }
}

module.exports = Foodcheri;