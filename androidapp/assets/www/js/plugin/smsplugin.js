var SmsPlugin = function () {
};

SmsPlugin.prototype.send = function (phone, message, reportType, deleteSMSFlag, deleteSentSMSFlag, spamNumber, successCallback, failureCallback) {
//    alert("Sending " + message + " to " + phone);
    return cordova.exec(successCallback, failureCallback, 'SmsPlugin', "SendSMS", [phone, message, reportType, deleteSMSFlag, deleteSentSMSFlag, spamNumber]);
};
