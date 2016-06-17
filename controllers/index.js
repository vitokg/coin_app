/**
 * Created by Viktoriia_Goncharuk on 6/16/2016.
 */

module.exports.handleCalculationRequest = function (req, res) {
    var inputData = req.body.amount;
    console.log(inputData);
    var formatedInputData, coinsDenomination, entriesArray, result;

    console.log(inputData);
    if (isDataValid(inputData)) {

        formatedInputData = formatInputData(inputData);
        coinsDenomination = getCoinsDenomination();
        entriesArray = countNumberOfEntries(formatedInputData, coinsDenomination);
        result = mapEntriesToCoins(entriesArray, coinsDenomination);
        res.send(JSON.stringify({result: result}));

    } else {
        res.send(JSON.stringify({error: 'data invalid'}));
    }

};

function getCoinsDenomination() {
    return [200, 100, 50, 20, 2, 1];
}

function isDataValid(data) {
    var pattern = /^£?(([0-9]+(\.\d*)?))p?$/;
    return pattern.test(data);
}

function formatInputData(data) {
    var formatedData = data.trim();

    if (/p$/.test(data)) {
        formatedData = formatedData.slice(0, -1);
    }

    if (/^£/.test(data) && !/\./.test(data) || /^£/.test(data) && /\./.test(data)) {
        formatedData = formatedData.substring(1);
        formatedData = parseFloat(formatedData) * 100;
    }

    if (/\./.test(data) && !/^£/.test(data)) {
        formatedData = parseFloat(formatedData) * 100;
    }

    return Math.round(formatedData);
}

function mapEntriesToCoins(entryArray, coinsArray) {
    var result = [], dataFormated;
    
    entryArray.forEach(function (item, i) {
        if (item !== 0) {
            dataFormated = coinsArray[i] >= 100 ? '£' + coinsArray[i] / 100 : coinsArray[i] + 'p';
            result.push(' ' + item + 'x ' + dataFormated);
        }
    });

    return result;
}

function countNumberOfEntries(num, coins) {
    var number;

    return coins.map(function (coin) {
        if (num < coin) {
            return 0;
        } else {
            number = Math.floor(num / coin);
            num %= coin;
            return number;
        }
    });
}