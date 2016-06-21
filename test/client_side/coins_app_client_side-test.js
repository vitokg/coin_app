/**
 * Created by Vitok on 20.06.2016.
 */
'use strict';

var expect = chai.expect;

describe("Coins App Client Side", function() {

    describe('DOM tests for Calculator form', function() {
        var formElem = document.getElementById('calc-coins-form');

        it('Form exists in the DOM', function() {
            expect(formElem).to.not.equal(null);
        });

        it('Amount Input field should be set to type text', function() {
            expect(formElem.amount.getAttribute('type')).to.equal('text');
        });

        it('Submit Input field should be set to type submit', function() {
            expect(formElem.submit.getAttribute('type')).to.equal('submit');
        });

        it('Submit button has the right text', function() {
            expect(formElem.submit.value).to.equal('Calculate');
        });
    });

});