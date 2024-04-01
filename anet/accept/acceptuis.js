var blob = "";
function getSecureData(button) {
    var parameters = {};
    parameters.showBilling = true;
    parameters.apiLoginID = '5KP3u95bQpv';
    parameters.clientKey = '5FcB6WrfHGS76gHW3v7btBCE3HuuBuke9Pj96Ztfn5R32G5ep42vne7MCWZtAucY';
    callbackFn = 'callbackMerchant';

    parameters.buttonText = 'Pay';
    parameters.headerText = 'Payment Details';

    Accept.showForm(button, parameters, callbackFn);

}

function populateErrorMessage(response) {
    var text = '';
    for (var i = 0; i < response.messages.message.length; i++) {
        text = text + response.messages.message[i].code + ':' + response.messages.message[i].text + '\n';
    }
    console.log(text);
};

function callbackMerchant(response) {
    if (response.messages.resultCode === 'Error') {
        populateErrorMessage(response);
    } else {
        var msg01 = '<b> PAYMENT NONCE (Data Value) : </b> ' + response.opaqueData.dataValue;
        var msg02 = '<b> TYPE (Data Descriptor) : </b> ' + response.opaqueData.dataDescriptor;
        var msg03 = '<b>CARD NUMBER</b> : ' + response.encryptedCardData.cardNumber + '<br />' + '<b>EXPIRATION DATE</b> : ' + response.encryptedCardData.expDate + '<br />' + '<b>BIN</b> : ' + response.encryptedCardData.bin;
        if ($('#paymentReceipt').length == 0) {
            $('body').append($('<br/><br/><div id = "paymentReceipt" style="margin: auto;border: 1px solid black;padding: 15px;width: 50%;"></div>'));
        }
        $('#paymentReceipt').html(msg01 + '<br /><hr>' + msg02 + '<br /><hr>' + msg03);
    }
}
