const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const {
    token
} = require('./config.json');
const fs = require('node:fs');


// Place your client and guild ids here
const clientId = '989912114267312138';

const commands = [

        new SlashCommandBuilder()
        .setName('midpoint')
        .setDescription('Calculates integrals with the midpoint method')
        .addStringOption(option =>
            option.setName('intervals')
            .setDescription('The number of sub intervals')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('start')
            .setDescription('The start of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('end')
            .setDescription('The end of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('function')
            .setDescription('The function to integrate (The integral function!!!)')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('round')
            .setDescription('Number of decimal places to round to (Optional)')
            .setRequired(false)),


        new SlashCommandBuilder()
        .setName('simpsons')
        .setDescription('Calculates with the simpsons method')
        .addStringOption(option =>
            option.setName('intervals')
            .setDescription('The number of sub intervals (If the instructions didn\'t specify how many subintervals to use, use 3)')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('start')
            .setDescription('The start of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('end')
            .setDescription('The end of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('function')
            .setDescription('The function to integrate (The integral function!!!)')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('round')
            .setDescription('Number of decimal places to round to (Optional)')
            .setRequired(false)),

        new SlashCommandBuilder()
        .setName('trapezoid')
        .setDescription('Calculates with the trapezoid method')
        .addStringOption(option =>
            option.setName('intervals')
            .setDescription('The number of sub intervals')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('start')
            .setDescription('The start of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('end')
            .setDescription('The end of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('function')
            .setDescription('The function to integrate (The integral function!!!)')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('round')
            .setDescription('Number of decimal places to round to (Optional)')
            .setRequired(false)),

        new SlashCommandBuilder()
        .setName('allmethods')
        .setDescription('Quickly calculate integrals with all supported methods!')
        .addStringOption(option =>
            option.setName('intervals')
            .setDescription('The number of sub intervals')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('start')
            .setDescription('The start of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('end')
            .setDescription('The end of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('function')
            .setDescription('The function to integrate (The integral function!!!)')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('round')
            .setDescription('Number of decimal places to round to (Optional)')
            .setRequired(false)),

        new SlashCommandBuilder()
        .setName('midpointerror')
        .setDescription('Get everything you need for error analysis with the midpoint method')
        .addStringOption(option =>
            option.setName('intervals')
            .setDescription('(Set as -1 if unknown) The number of sub intervals')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('start')
            .setDescription('The start of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('end')
            .setDescription('The end of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('function')
            .setDescription('The function to integrate (The integral function!!!)')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('accuratetowithin')
            .setDescription('(Set as 0 to calculate for). Attempts to calculate n given a accuracy number')
            .setRequired(true)),
        new SlashCommandBuilder()

        .setName('trapezoiderror')
        .setDescription('Get everything you need for error analysis with the trapezoid method')
        .addStringOption(option =>
            option.setName('intervals')
            .setDescription('(Set as -1 if unknown) The number of sub intervals')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('start')
            .setDescription('The start of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('end')
            .setDescription('The end of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('function')
            .setDescription('The function to integrate (The integral function!!!)')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('accuratetowithin')
            .setDescription('(Set as 0 to calculate for). Attempts to calculate n given a accuracy number')
            .setRequired(true)),
        new SlashCommandBuilder()
        .setName('simpsonserror')
        .setDescription('Get everything you need for error analysis with the simpsons method')
        .addStringOption(option =>
            option.setName('intervals')
            .setDescription('(Set as -1 if unknown) The number of sub intervals')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('start')
            .setDescription('The start of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('end')
            .setDescription('The end of the integral')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('function')
            .setDescription('The function to integrate (The integral function!!!)')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('accuratetowithin')
            .setDescription('(Set as 0 to calculate for). Attempts to calculate n given a accuracy number')
            .setRequired(true)),
        new SlashCommandBuilder()
        .setName('derivative')
        .setDescription('Get a fast CAS derivative')
        .addStringOption(option =>
            option.setName('function')
            .setDescription('The function to differentiate')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('degree')
            .setDescription('The degree of the derivative (Usually 1)')
            .setRequired(true)),


    ]
    .map(command => command.toJSON());

const rest = new REST({
    version: '9'
}).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId), {
                body: commands
            },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();