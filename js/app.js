/**
 * Created by Viktoriia_Goncharuk on 6/8/2016.
 */

var CoinApp = {
    hostUrl: 'http://localhost:3000/calculate',
    formMethod: 'POST',
    resultContainer: document.getElementById('result-container'),

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
        var query = 'amount=' + inputValue;
        var ajax = this.createAjaxObj();
        this.sendAjaxRequest(ajax, query);
        e.target.amount.value = '';
    },

    displayResult: function(dataArr){

        var content = Object.assign([], dataArr).join();
        this.resultContainer.innerHTML = 'Result: ' + content;
    },

    displayError: function(errorString) {
        this.resultContainer.innerHTML = errorString;
    },

    createAjaxObj: function() {
        var xhttp = null;

        if(window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            xhttp =  new XMLHttpRequest();
        }

        return xhttp;
    },

    sendAjaxRequest: function(ajaxObj, data){
        var xhttp = ajaxObj;
        var responce = null;

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                responce = JSON.parse(xhttp.responseText);

                if(responce.result) {
                    this.displayResult(responce.result);
                }

                if (responce.error) {
                    this.displayError(responce.error);
                }
                
            }
        }.bind(this);

        xhttp.open(this.formMethod, this.hostUrl, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
    }

};

CoinApp.init();