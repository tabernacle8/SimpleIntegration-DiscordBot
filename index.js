const {
  Client,
  Intents
} = require("discord.js");
const bot = new Client({
  intents: []
});
const {
  token
} = require('./config.json');
const math = require('mathjs');

bot.on("ready", () => {
  console.log("I am ready!");
});

bot.on("messageCreate", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
});

bot.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const {
    commandName
  } = interaction;

  if (commandName === 'derivative') {
    try {
      var functionToCalculate = interaction.options.getString('function');
      var degree = interaction.options.getString('degree');
      var derivative = functionToCalculate;

      for (var i = 0; i < degree; i++) {
        derivative = math.derivative(derivative, "x").toString();
      }

      await interaction.reply("```" + derivative + "```");
    } catch (error) {
      console.log(error);
      await interaction.reply("**Issue with request!**\n\n*Trying to use ln() in a formula? Replace it with log()*\n\n```" + error + "```");
    }

  }

  if (commandName === 'midpointerror') {
    try {
      var subIntervals = interaction.options.getString('intervals');
      var start = interaction.options.getString('start');
      var end = interaction.options.getString('end');
      var functionToCalculate = interaction.options.getString('function');
      var totalText = `__**Using ${functionToCalculate} with the midpoint error formula**__\n\n`;
      var accuratetowithin = interaction.options.getString('accuratetowithin');

      if (subIntervals !== "-1") {
        var potentialError = math.abs(math.evaluate(`((${end} - ${start})^3)/(24*(${subIntervals}^2))`));
        totalText += ("\n**The potential error formula for this problem is:** ```|max(f''(x))| * " + potentialError + "```");

        //Get derivative of function
        var derivative = math.derivative(math.derivative(functionToCalculate, "x"), "x").toString();

        //Plug in numbers from -999 to 9999 for x in derivative and find maximum value 
        var max = -999;
        console.log(derivative.replace(/x/g, `(${i})`));
        for (var i = -100; i <= 100; i += 0.1) {
          var result = math.evaluate(derivative.replace(/x/g, `(${i})`));
          if (result > max) {
            max = result;
          }
        }

        if (max == -999) {
          totalText += ("\n**:warning: Issue calculating The __APPROXIMATE__ maximum value of the second derivative! Use the formula above!**");
        } else {
          totalText += ("\n**The __APPROXIMATE__ maximum value of the second derivative is:** ```" + max + "```");
          totalText += ("\n\n**The midpoint error for this problem is: **" + (potentialError * max));
        }
        //Send totalText
        await interaction.reply(totalText);
      }
      if (accuratetowithin !== "0") {
        //Get derivative of function
        var derivative = math.derivative(math.derivative(functionToCalculate, "x"), "x").toString();

        //Plug in numbers from -999 to 9999 for x in derivative and find maximum value 
        var max = -999;
        console.log(derivative.replace(/x/g, `(${i})`));
        for (var i = -100; i <= 100; i += 0.1) {
          var result = math.evaluate(derivative.replace(/x/g, `(${i})`));
          if (result > max) {
            max = result;
          }
        }

        totalText += "**The second derivative is:** ```" + derivative + "```";
        if (max == -999) {
          totalText += ("\n**:warning: Issue calculating The __APPROXIMATE__ maximum value of the second derivative! Use the formula above!**");
        } else {
          max = math.abs(max);
          totalText += ("\n**The __APPROXIMATE__ maximum value of the second derivative is:** ```" + max + "```\n");
          var result = math.evaluate(`(sqrt((-6*(${start}-${finish})^3*${max})/${accuratetowithin}))/12`)
          totalText += "**The formula to calculate n is:** ```" + `(sqrt((-6*(${start}-${finish})^3*${max})/${accuratetowithin}))/12` + "```\n\n"
          totalText += `**The n value required for the requested precision is** ${math.ceil(result)}`;
        }
        //Send totalText
        await interaction.reply(totalText);



      }
    } catch (error) {
      console.log(error);
      await interaction.reply("**Issue with request!**\n\n*Trying to use ln() in a formula? Replace it with log()*\n\n```" + error + "```");
    }

  }
  if (commandName === 'trapezoiderror') {
    try {
      var subIntervals = interaction.options.getString('intervals');
      var start = interaction.options.getString('start');
      var end = interaction.options.getString('end');
      var functionToCalculate = interaction.options.getString('function');
      var totalText = `__**Using ${functionToCalculate} with the trapezoid error formula**__\n\n`;
      var accuratetowithin = interaction.options.getString('accuratetowithin');

      if (subIntervals != "-1") {
        var potentialError = math.abs(math.evaluate(`((${end} - ${start})^3)/(12*(${subIntervals}^2))`));
        totalText += ("\n**The potential error formula for this problem is:** ```|max(f''(x))| * " + potentialError + "```");

        //Get derivative of function
        var derivative = math.derivative(math.derivative(functionToCalculate, "x"), "x").toString();

        //Plug in numbers from -999 to 9999 for x in derivative and find maximum value 
        var max = -999;
        console.log(derivative.replace(/x/g, `(${i})`));
        for (var i = -100; i <= 100; i += 0.1) {
          var result = math.evaluate(derivative.replace(/x/g, `(${i})`));
          if (result > max) {
            max = result;
          }
        }

        if (max == -999) {
          totalText += ("\n**:warning: Issue calculating The __APPROXIMATE__ maximum value of the second derivative! Use the formula above!**");
        } else {
          totalText += ("\n**The __APPROXIMATE__ maximum value of the second derivative is:** ```" + max + "```");
          totalText += ("\n\n**The midpoint error for this problem is: **" + (potentialError * max));
        }
        //Send totalText
        await interaction.reply(totalText);
      }
      if (accuratetowithin != "0") {
        //Get derivative of function
        var derivative = math.derivative(math.derivative(functionToCalculate, "x"), "x").toString();

        //Plug in numbers from -999 to 9999 for x in derivative and find maximum value 
        var max = -999;
        console.log(derivative.replace(/x/g, `(${i})`));
        for (var i = -100; i <= 100; i += 0.1) {
          var result = math.evaluate(derivative.replace(/x/g, `(${i})`));
          if (result > max) {
            max = result;
          }
        }

        totalText += "**The second derivative is:** ```" + derivative + "```\n";
        if (max == -999) {
          totalText += ("\n**:warning: Issue calculating The __APPROXIMATE__ maximum value of the second derivative! Use the formula above!**");
        } else {
          totalText += ("\n**The __APPROXIMATE__ maximum value of the second derivative is:** ```" + max + "```\n");
          max = math.abs(max);
          var result = math.evaluate(`(sqrt((-3*(${start}-${end})^3*${max})/${accuratetowithin}))/6`)
          totalText += "**The formula to calculate n is:** ```" + `(sqrt((-3*(${start}-${end})^3*${max})/${accuratetowithin}))/6` + "```\n"
          totalText += `**The n value required for the requested precision is:** ${math.ceil(result)}`;
        }
        //Send totalText
        await interaction.reply(totalText);


      }
    } catch (error) {
      console.log(error);
      await interaction.reply("**Issue with request!**\n\n*Trying to use ln() in a formula? Replace it with log()*\n\n```" + error + "```");
    }
  }
  if (commandName === 'simpsonserror') {
    try {
      var subIntervals = interaction.options.getString('intervals');
      var start = interaction.options.getString('start');
      var end = interaction.options.getString('end');
      var functionToCalculate = interaction.options.getString('function');
      var totalText = `__**Using ${functionToCalculate} with the simpsons error formula**__\n\n`;
      var accuratetowithin = interaction.options.getString('accuratetowithin');

      if (subIntervals != "-1") {
        var potentialError = math.abs(math.evaluate(`((${end} - ${start})^5)/(180*(${subIntervals}^4))`));
        totalText += ("\n**The potential error formula for this problem is:** ```|max(f''''(x))| * " + potentialError + "```");

        //Get derivative of function with a loop and one at a time printing each
        var derivative = functionToCalculate
        for (var i = 1; i <= 4; i++) {
          derivative = math.derivative(derivative, "x").toString();
          console.log(derivative)
        }

        //Plug in numbers from -999 to 9999 for x in derivative and find maximum value
        derivative = derivative.toString();
        var max = -999;
        console.log(derivative.replace(/x/g, `(${i})`));
        for (var i = -100; i <= 100; i += 0.1) {
          var result = math.evaluate(derivative.replace(/x/g, `(${i})`));
          if (result > max) {
            max = result;
          }
        }

        if (max == -999) {
          totalText += ("\n**:warning: Issue calculating The __APPROXIMATE__ maximum value of the fourth derivative! Use the formula above!**");
        } else {
          totalText += ("\n**The __APPROXIMATE__ maximum value of the fourth derivative is:** ```" + max + "```");
          totalText += ("\n\n**The midpoint error for this problem is: **" + (potentialError * max));
        }
        //Send totalText
        await interaction.reply(totalText);
      }
      if (accuratetowithin != "0") {
        //Get derivative of function
        var derivative = functionToCalculate
        for (var i = 1; i <= 4; i++) {
          derivative = math.derivative(derivative, "x").toString();
          console.log(`${i} WITH ${derivative}`)
        }

        //Plug in numbers from -999 to 9999 for x in derivative and find maximum value 
        var max = -999;
        console.log(derivative.replace(/x/g, `(${i})`));
        for (var i = -100; i <= 100; i += 0.1) {
          var result = math.evaluate(derivative.replace(/x/g, `(${i})`));
          if (result > max) {
            max = result;
          }
        }

        totalText += "**The fourth derivative is:** ```" + derivative + "```\n";
        if (max == -999) {
          totalText += ("\n**:warning: Issue calculating The __APPROXIMATE__ maximum value of the fourth derivative! Use the formula above!**");
        } else {
          totalText += ("\n**The __APPROXIMATE__ maximum value of the fourth derivative is:** ```" + max + "```\n");

          var result = math.evaluate(`(((-(${start}-${end})^5*${math.abs(max)})/${accuratetowithin})^(1/4)*sqrt(6)*5^(3/4))/30`)
          totalText += "**The formula to calculate n is:** ```" + `(((-(${start}-${end})^5*${math.abs(max)})/${accuratetowithin})^(1/4)*sqrt(6)*5^(3/4))/30` + "```\n"
          //If result is an odd number, add 1 to make it even
          console.log(result)
          result = math.ceil(result)
          if (result % 2 != 0) {
            result = math.ceil(result) + 1;
            totalText += `**The n value required for the requested precision is:** ${result}\n\n:warning: **Simpsons value only allows even n values, the result was originally ${result-1}**`;
          } else {
            totalText += `**The n value required for the requested precision is:** ${result}`;
          }

        }
        //Send totalText
        await interaction.reply(totalText);


      }
    } catch (error) {
      console.log(error);
      await interaction.reply("**Issue with request!**\n\n*Trying to use ln() in a formula? Replace it with log()*\n\n```" + error + "```");
    }
  }
  if (commandName === 'midpoint') {
    //Catch error
    try {
      var subIntervals = interaction.options.getString('intervals');
      var start = interaction.options.getString('start');
      var end = interaction.options.getString('end');
      var functionToCalculate = interaction.options.getString('function');
      var round = interaction.options.getString('round');
      var totalText = `__**Let's calculate the integral ${functionToCalculate} with the midpoint formula!**__\n\n`;

      //Convert to numbers
      subIntervals = Number(math.evaluate(subIntervals));
      start = Number(math.evaluate(start));
      end = Number(math.evaluate(end));
      round = Number(round);

      console.log(round)

      if (round != null || round == 0) {
        totalText += ("You have: **" + subIntervals + "** subintervals\n");
        totalText += ("The start point is: **" + start + "**\n");
        totalText += ("The end point is: **" + end + "**\n");
      } else {
        totalText += ("You have: **" + math.round(subIntervals, round) + "** subintervals\n");
        totalText += ("The start point is: **" + math.round(start, round) + "**\n");
        totalText += ("The end point is: **" + math.round(end, round) + "**\n");
      }
      //Get midpoints of suninterval
      var midpoints = [];
      var step = (end - start) / subIntervals;
      midpoints.push(start + step / 2);
      for (var i = 1; i < subIntervals; i++) {
        if (round != null || round == 0) {
          midpoints.push(midpoints[i - 1] + step);
        } else {
          midpoints.push(math.round((midpoints[i - 1] + step), round));

        }
      }

      totalText += ("The midpoints are: **" + midpoints + "**\n");

      //Print final function
      //Function is (step)*(functionToCalculate(midpoint))
      //Replace x in function with functionToCalculate(midpoint)
      var finalFunction = "";
      for (var i = 0; i < midpoints.length; i++) {
        finalFunction += "(" + step + ")*(" + functionToCalculate.replace(/x/g, "(" + midpoints[i] + ")") + ")+";
      }
      //Remove last trailing +
      finalFunction = finalFunction.slice(0, -1);
      totalText += ("The final function is: \n\n```" + finalFunction + "```\n\n");

      //Eval the final function
      var finalFunctionValue = math.evaluate(finalFunction);
      if (round != null || round == 0) {
        totalText += ("The final function value is: **" + finalFunctionValue + "**");

      } else {
        totalText += ("The final function value is: **" + math.round(finalFunctionValue, round) + "**");

      }

      //var potentialError = math.evaluate(`((${end} - ${start})^3)/(24*(${subIntervals}^2))`);
      //totalText += ("\n**The potential error formula for this problem is:** ```|max(f''(x))| * " + potentialError+"```");

      await interaction.reply(totalText);
    } catch (error) {
      console.log(error);
      await interaction.reply("**Issue with request!**\n\n*Trying to use ln() in a formula? Replace it with log()*\n\n```" + error + "```");
    }
  }

  if (commandName === 'trapezoid') {
    try {
      var subIntervals = interaction.options.getString('intervals');
      var start = interaction.options.getString('start');
      var end = interaction.options.getString('end');
      var functionToCalculate = interaction.options.getString('function');
      var round = interaction.options.getString('round');
      var totalText = `__**Let's calculate the integral ${functionToCalculate} with trapezoids!**__\n\n`;

      //Convert to numbers
      subIntervals = Number(math.evaluate(subIntervals));
      start = Number(math.evaluate(start));
      end = Number(math.evaluate(end));
      round = Number(round);

      if (round != null || round == 0) {
        totalText += ("You have: **" + subIntervals + "** subintervals\n");
        totalText += ("The start point is: **" + start + "**\n");
        totalText += ("The end point is: **" + end + "**\n");
      } else {
        totalText += ("You have: **" + math.round(subIntervals, round) + "** subintervals\n");
        totalText += ("The start point is: **" + math.round(start, round) + "**\n");
        totalText += ("The end point is: **" + math.round(end, round) + "**\n");
      }
      //Get midpoints of suninterval
      var step = (end - start) / subIntervals;
      var subIntervalList = [];
      for (var i = 0; i <= subIntervals; i++) {
        if (round != null || round == 0) {
          subIntervalList.push(start + step * i);
        } else {

          subIntervalList.push(math.round((start + step * i), round));
        }
      }

      totalText += ("The intervals are: **" + subIntervalList + "**\n");

      //Print final function
      //Function is (step)*(functionToCalculate(midpoint))
      //Replace x in function with functionToCalculate(midpoint)
      var finalFunction = `(${step})*(1/2)*(`
      for (var i = 0; i < subIntervalList.length; i++) {
        if (i == 0 || i == subIntervalList.length - 1) {
          finalFunction += `(${functionToCalculate.replace(/x/g, "("+subIntervalList[i]+")")})`;
        } else {
          finalFunction += `2*(${functionToCalculate.replace(/x/g, "("+subIntervalList[i]+")")})`;
        }
        if (i != subIntervalList.length - 1) {
          finalFunction += `+`;
        }
      }

      finalFunction += ")"
      totalText += ("The final function is: \n\n```" + finalFunction + "```\n\n");

      //Eval the final function
      var finalFunctionValue = math.evaluate(finalFunction);
      if (round != null || round == 0) {
        totalText += ("The final function value is: **" + finalFunctionValue + "**");

      } else {
        totalText += ("The final function value is: **" + math.round(finalFunctionValue, round) + "**");


      }
      //var potentialError = math.evaluate(`((${end} - ${start})^3)/(12*(${subIntervals}^2))`);
      //totalText += ("\n**The potential error formula for this problem is:** ```|max(f''(x))| * " + potentialError+"```");

      await interaction.reply(totalText);
    } catch (error) {
      console.log(error);
      await interaction.reply("**Issue with request!**\n\n*Trying to use ln() in a formula? Replace it with log()*\n\n```" + error + "```");
    }
  }
  if (commandName === 'simpsons') {
    try {
      var subIntervals = interaction.options.getString('intervals');
      var start = interaction.options.getString('start');
      var end = interaction.options.getString('end');
      var round = interaction.options.getString('round');
      var functionToCalculate = interaction.options.getString('function');
      //Replace ln with log
      functionToCalculate = functionToCalculate.replace("ln", "log");
      var totalText = `__**Let's calculate the integral ${functionToCalculate} with simpsons rule!**__\n\n`;

      //Convert to numbers
      subIntervals = Number(math.evaluate(subIntervals));
      start = Number(math.evaluate(start));
      end = Number(math.evaluate(end));

      round = Number(round);

      if (round != null || round == 0) {
        totalText += ("You have: **" + subIntervals + "** subintervals\n");
        totalText += ("The start point is: **" + start + "**\n");
        totalText += ("The end point is: **" + end + "**\n");
      } else {
        totalText += ("You have: **" + math.round(subIntervals, round) + "** subintervals\n");
        totalText += ("The start point is: **" + math.round(start, round) + "**\n");
        totalText += ("The end point is: **" + math.round(end, round) + "**\n");
      }
      //Get midpoints of suninterval
      var step = (end - start) / subIntervals;
      var subIntervalList = [];

      for (var i = 0; i <= subIntervals; i++) {
        if (round != null || round == 0) {
          subIntervalList.push(start + step * i);

        } else {
          subIntervalList.push(math.round((start + step * i), round));
        }
      }

      totalText += ("The intervals are: **" + subIntervalList + "**\n");

      //Print final function
      //Function is (step)*(functionToCalculate(midpoint))
      //Replace x in function with functionToCalculate(midpoint)
      var finalFunction = `(${step})*(1/3)*(`
      for (var i = 0; i < subIntervalList.length; i++) {
        //The first and last midpoints are not multiplied by anything
        //The other midpoints alternate between being multiplied by 4 and 2
        if (i == 0 || i == subIntervalList.length - 1) {
          finalFunction += `(${functionToCalculate.replace(/x/g, "("+subIntervalList[i]+")")})+`;
        } else if (i % 2 == 0) {
          finalFunction += `2*(${functionToCalculate.replace(/x/g, "("+subIntervalList[i]+")")})+`;
        } else {
          finalFunction += `4*(${functionToCalculate.replace(/x/g, "("+subIntervalList[i]+")")})+`;
        }

      }

      //Remove trailing +
      finalFunction = finalFunction.slice(0, -1);
      finalFunction += ")"
      totalText += ("The final function is: \n\n```" + finalFunction + "```\n\n");

      //Eval the final function
      var finalFunctionValue = math.evaluate(finalFunction);
      if (round != null || round == 0) {
        totalText += ("The final function value is: **" + finalFunctionValue + "**");

      } else {

        totalText += ("The final function value is: **" + math.round(finalFunctionValue, round) + "**");

      }

      //var potentialError = math.evaluate(`((${end} - ${start})^5)/(180*(${subIntervals}^4))`);
      //totalText += ("\n**The potential error formula for this problem is:** ```|max(f''''(x))| * " + potentialError+"```");
      await interaction.reply(totalText);
    } catch (error) {
      console.log(error);
      await interaction.reply("**Issue with request!**\n\n*Trying to use ln() in a formula? Replace it with log()*\n\n```" + error + "```");
    }


  }

  if (commandName === "allmethods") {
    try {
      var totalText = "";
      var subIntervals = interaction.options.getString('intervals');
      var start = interaction.options.getString('start');
      var end = interaction.options.getString('end');
      var functionToCalculate = interaction.options.getString('function');
      //Replace ln with log
      functionToCalculate = functionToCalculate.replace("ln", "log");
      //var totalText = `__**Let's calculate the integral ${functionToCalculate} with simpsons rule!**__\n\n`;

      //Convert to numbers
      subIntervals = Number(math.evaluate(subIntervals));
      start = Number(math.evaluate(start));
      end = Number(math.evaluate(end));

      //totalText += ("You have: **" + subIntervals + "** subintervals\n");
      //totalText += ("The start point is: **" + start + "**\n");
      //totalText += ("The end point is: **" + end + "**\n");
      //Get midpoints of suninterval
      var step = (end - start) / subIntervals;
      var subIntervalList = [];
      for (var i = 0; i <= subIntervals; i++) {
        subIntervalList.push(start + step * i);
      }

      //totalText += ("The intervals are: **" + midpoints + "**\n");

      //Print final function
      //Function is (step)*(functionToCalculate(midpoint))
      //Replace x in function with functionToCalculate(midpoint)
      var finalFunction = `(${step})*(1/3)*(`
      for (var i = 0; i < subIntervalList.length; i++) {
        //The first and last midpoints are not multiplied by anything
        //The other midpoints alternate between being multiplied by 4 and 2
        if (i == 0 || i == subIntervalList.length - 1) {
          finalFunction += `(${functionToCalculate.replace(/x/g, "("+subIntervalList[i]+")")})+`;
        } else if (i % 2 == 0) {
          finalFunction += `2*(${functionToCalculate.replace(/x/g, "("+subIntervalList[i]+")")})+`;
        } else {
          finalFunction += `4*(${functionToCalculate.replace(/x/g, "("+subIntervalList[i]+")")})+`;
        }

      }

      //Remove trailing +
      finalFunction = finalFunction.slice(0, -1);
      finalFunction += ")"
      //totalText += ("The final function is: \n\n```" + finalFunction + "```\n\n");

      //Eval the final function
      var finalFunctionValue = math.evaluate(finalFunction);
      totalText += ("The final simpsons value is: **" + finalFunctionValue + "**\n");

      subIntervals = interaction.options.getString('intervals');
      start = interaction.options.getString('start');
      end = interaction.options.getString('end');
      functionToCalculate = interaction.options.getString('function');
      //totalText = `__**Let's calculate the integral ${functionToCalculate} with trapezoids!**__\n\n`;

      //Convert to numbers
      subIntervals = Number(math.evaluate(subIntervals));
      start = Number(math.evaluate(start));
      end = Number(math.evaluate(end));

      //totalText += ("You have: **" + subIntervals + "** subintervals\n");
      //totalText += ("The start point is: **" + start + "**\n");
      //totalText += ("The end point is: **" + end + "**\n");
      //Get midpoints of suninterval
      step = (end - start) / subIntervals;
      subIntervalList = [];
      for (var i = 0; i <= subIntervals; i++) {
        subIntervalList.push(start + step * i);
      }

      //totalText += ("The intervals are: **" + midpoints + "**\n");

      //Print final function
      //Function is (step)*(functionToCalculate(midpoint))
      //Replace x in function with functionToCalculate(midpoint)
      finalFunction = `(${step})*(1/2)*(`
      for (var i = 0; i < subIntervalList.length; i++) {
        if (i == 0 || i == subIntervalList.length - 1) {
          finalFunction += `(${functionToCalculate.replace(/x/g, "("+subIntervalList[i]+")")})`;
        } else {
          finalFunction += `2*(${functionToCalculate.replace(/x/g, "("+subIntervalList[i]+")")})`;
        }
        if (i != subIntervalList.length - 1) {
          finalFunction += `+`;
        }
      }

      finalFunction += ")"
      //totalText += ("The final function is: \n\n```" + finalFunction + "```\n\n");

      //Eval the final function
      finalFunctionValue = math.evaluate(finalFunction);
      totalText += ("The final trapezoid value is: **" + finalFunctionValue + "**\n");

      subIntervals = interaction.options.getString('intervals');
      start = interaction.options.getString('start');
      end = interaction.options.getString('end');
      functionToCalculate = interaction.options.getString('function');
      //var totalText = `__**Let's calculate the integral ${functionToCalculate} with the midpoint formula!**__\n\n`;

      //Convert to numbers
      subIntervals = Number(math.evaluate(subIntervals));
      start = Number(math.evaluate(start));
      end = Number(math.evaluate(end));

      //totalText += ("You have: **" + subIntervals + "** subintervals\n");
      //totalText += ("The start point is: **" + start + "**\n");
      //totalText += ("The end point is: **" + end + "**\n");
      //Get midpoints of suninterval
      var midpoints = [];
      step = (end - start) / subIntervals;
      midpoints.push(start + step / 2);
      for (var i = 1; i < subIntervals; i++) {
        midpoints.push(midpoints[i - 1] + step);
      }

      //totalText += ("The midpoints are: **" + midpoints + "**\n");

      //Print final function
      //Function is (step)*(functionToCalculate(midpoint))
      //Replace x in function with functionToCalculate(midpoint)
      finalFunction = "";
      for (var i = 0; i < midpoints.length; i++) {
        finalFunction += "(" + step + ")*(" + functionToCalculate.replace(/x/g, "(" + midpoints[i] + ")") + ")+";
      }
      //Remove last trailing +
      finalFunction = finalFunction.slice(0, -1);
      //totalText += ("The final function is: \n\n```" + finalFunction + "```\n\n");

      //Eval the final function
      finalFunctionValue = math.evaluate(finalFunction);
      totalText += ("The final midpoint value is: **" + finalFunctionValue + "**");

      //Send totalText
      await interaction.reply(`**Solving with all methods for: ${functionToCalculate}**\n\n` + totalText);
    } catch (error) {
      console.log(error);
      await interaction.reply("**Issue with request!**\n\n*Trying to use ln() in a formula? Replace it with log()*\n\n```" + error + "```");
    }

  }


});

bot.login(token);