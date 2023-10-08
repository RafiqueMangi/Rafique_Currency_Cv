import chalk from "chalk";
import inquirer from "inquirer";


let apiLink = "https://v6.exchangerate-api.com/v6/e6646f5077ebba9ce9532017/latest/PKR";

let fetchData =async (data:any) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res. conversion_rates;
};
let data = await fetchData(apiLink);
let countries = Object.keys(data);

let firstCountry = await inquirer.prompt({
    type:"list",
    name: "name",
    message:"converting from Country",
    choices:countries

});
let userMoney = await inquirer.prompt({
    type:"number",
    name:"rupee",
    message:`please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}:`,
});
let secondCountry = await inquirer.prompt({
    type:"list",
    name: "name",
    message:"Converting To Country",
    choices:countries
});

let cnv = `https://v6.exchangerate-api.com/v6/e6646f5077ebba9ce9532017//pair/${firstCountry.name}/${secondCountry.name}`;

let cnvData = async (data:any) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(cnv);
let convertedRate = userMoney.rupee * conversionRate
console.log(`your ${chalk.greenBright(firstCountry.name)} ${chalk.greenBright(userMoney.rupee)} in ${chalk.greenBright(secondCountry.name)} is ${chalk.greenBright(convertedRate)}`);