#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getIcon, getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js";
import { TOKEN_DICIONARY, getKeyValue, saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
    if(!token.length) {
        printError('Enter token value!')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICIONARY.token, token)
        printSuccess('Token Saved!')
    }catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    if(!city.length) {
        printError('Enter city value!')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICIONARY.city, city)
        printSuccess('City saved!')
    }catch (e) {
        printError(e.message)
    }
}

const getForecast = async () => {
    try {
        const city = process?.env?.CITY ?? await getKeyValue(TOKEN_DICIONARY.city)
        const weather = await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon))
    }catch (e) {
        if(e?.response?.status == 404) {
            printError('Invalid [CITY api]')
        }else if(e?.response?.status == 404) {
            printError('Invalid TOKEN')
        }else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv); 
    if(args.h) {
        return  printHelp()
    }

    if(args.s) {
        return saveCity(args.s)
    }

    if(args.t) {
        return saveToken(args.t)
    }

    return getForecast()
}

initCLI()