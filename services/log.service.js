import chalk from "chalk";
import dedent from 'dedent'

const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + ' ' + error);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen('SUCCESS') + ' ' + message);
}

const printHelp = () => {
    console.log(dedent`${chalk.bgCyan('HELP')} 
        No parametres for weather
        -s [CITY] for weather
        -h for help
        -t [API_KEY] for save token`
    );
} 

const printWeather = (res, icon) => {
    console.log(dedent`${chalk.bgYellow('WEATHER')} In ${res.name} weather is
        ${icon } ${res.weather[0].description}
        Temperature: ${res.main.temp} (${res.main.feels_like})
        Humidity: ${res.main.humidity}%
        SW: ${res.wind.speed}`
    );
}

export { printError, printSuccess, printHelp, printWeather }