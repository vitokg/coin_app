/**
 * Created by Viktoriia_Goncharuk on 6/8/2016.
 */

var CoinApp = {
    hostUrl: 'http://localhost:3000/calculate',
    formMethod: 'POST',
    ui: {
        resultContainer: document.getElementById('result-container'),
        contentBlock: document.getElementById('result'),
        calcCoinsForm: document.getElementById('calc-coins-form')
    },


    init: function(){
        this.bindEvents();
    },

    bindEvents: function() {

        this.ui.calcCoinsForm.addEventListener('submit', this.calcCoinsSubmitHandler.bind(this));
        this.ui.resultContainer.addEventListener('click', function(e) {
            if(e.target === this) {
                this.className = "";
            }
        })
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
        this.ui.contentBlock.innerHTML = 'Result: ' + content;
        this.ui.resultContainer.className = 'lightbox';
    },

    displayError: function(errorString) {
        this.ui.resultContainer.innerHTML = errorString;
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