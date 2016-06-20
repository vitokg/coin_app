/**
 * Created by Vitok on 20.06.2016.
 */
'use strict';

var chai = require('chai');
var expect = chai.expect;
var CoinsAppCtl = require('../src/controllers');

describe('Coins App Controller', function(){
    it('formatInputData() should format user input value to integer', function(){
        var formatDate = CoinsAppCtl.formatInputData;
        expect(formatDate('4')).to.equal(4);
        expect(formatDate('85')).to.equal(85);
        expect(formatDate('197p')).to.equal(197);
        expect(formatDate('2p')).to.equal(2);
        expect(formatDate('1.87')).to.equal(187);
        expect(formatDate('£1.23')).to.equal(123);
        expect(formatDate('£2')).to.equal(200);
        expect(formatDate('£10')).to.equal(1000);
        expect(formatDate('£1.87')).to.equal(187);
        expect(formatDate('£1p')).to.equal(100);
        expect(formatDate('£1.p')).to.equal(100);
        expect(formatDate('001.41p')).to.equal(141);
        expect(formatDate('4.235p')).to.equal(424);
        expect(formatDate('£1.257422457p')).to.equal(126);
    });

    it('isDataValid() should not accept inputs', function() {
        expect(CoinsAppCtl.isDataValid('')).to.be.false;
        expect(CoinsAppCtl.isDataValid('1x')).to.be.false;
        expect(CoinsAppCtl.isDataValid('£1x.0p')).to.be.false;
        expect(CoinsAppCtl.isDataValid('£p')).to.be.false;
    });

    it('should count the minimum number of pennies', function(){
        var coins = CoinsAppCtl.getCoinsDenomination();
        expect(CoinsAppCtl.countNumberOfEntries(100, coins)).to.deep.equal([0, 1, 0, 0, 0, 0]);
        expect(CoinsAppCtl.countNumberOfEntries(123, coins)).to.deep.equal([0, 1, 0, 1, 1, 1]);
        expect(CoinsAppCtl.countNumberOfEntries(100, coins)).to.deep.not.equal([0, 0, 2, 0, 0, 0]);
        expect(CoinsAppCtl.countNumberOfEntries(123, coins)).to.deep.not.equal([0, 0, 0, 6, 1, 1]);
    });
});