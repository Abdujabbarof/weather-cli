import https from 'https'
import {TOKEN_DICIONARY, getKeyValue} from './storage.service.js'
import axios from 'axios'

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};


const getWeather = async (city) => {
    const token = process?.env?.TOKEN ?? await getKeyValue(TOKEN_DICIONARY.token)
    if(!token) {
        throw new Error('API key not given, please enter key from -t [API key]')
    }
    const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    const { data } = await axios.get(url, {
        params: {
            q: city,
            appid: token,
            lang: 'en',
            units: 'metric'
        }
    })
    return data;
}

export { getWeather, getIcon }