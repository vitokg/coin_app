/**
 * Created by Viktoriia_Goncharuk on 6/8/2016.
 */

var CoinApp = {
    coinsData: [200, 100, 50, 20, 2, 1],
    regExPattern: /^£?(([0-9]+(\.\d*)?))p?$/,

    init: function(){
        this.bindEvents();
    },

    bindEvents: function() {
        var calcCoinsForm = document.getElementById('calc-coins-form');
        calcCoinsForm.addEventListener('submit', this.calcCoinsSubmitHandler.bind(this));

    },

    calcCoinsSubmitHandler: function(e){
        e.preventDefault();
        var inputValue = e.target.amount.value;
        var formatedNumber = this.formatInputData(inputValue);
        var arr = this.countNumberOfEntries(formatedNumber, this.coinsData);
        var result = this.mapEntriesToCoins(arr, this.coinsData);
        this.displayResult(result);
        e.target.amount.value = '';
    },

    formatInputData: function(data) {
        var formatedData = data.trim();

        if(/p$/.test(data)){
            formatedData = formatedData.slice(0, -1);
        }


        if(/^£/.test(data) && !/\./.test(data) ||/^£/.test(data) && /\./.test(data)){
            formatedData = formatedData.substring(1);
            formatedData = parseFloat(formatedData) * 100;
        }

        if( /\./.test(data) && !/^£/.test(data)){
            formatedData = parseFloat(formatedData) * 100;
        }

        return Math.round(formatedData);
    },

    mapEntriesToCoins: function(entryArray, coinsArray) {
        var result = [];
        var dataFormated;
        entryArray.forEach(function(item, i){
            if(item !== 0) {
                dataFormated = coinsArray[i]>=100 ? '£' + coinsArray[i]/100 : coinsArray[i] + 'p';
                result.push( ' ' + item + 'x ' + dataFormated);
            }
        });

        return result;
    },
    
    displayResult: function(result){

        var content = Object.assign([], result).join();
        var divElem = document.getElementById('result-container');
        divElem.innerHTML = 'Result: ' + content;
    },

    countNumberOfEntries: function(num, coins){
        var number;

        return coins.map(function(coin){
            if(num < coin){
                return 0;
            } else{
                number = Math.floor(num/coin);
                num %= coin;
                return number;
            };
        });
    }

};

CoinApp.init();