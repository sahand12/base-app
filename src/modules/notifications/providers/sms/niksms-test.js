"use strict";
exports.__esModule = true;
var niksms_1 = require("./niksms");
var sms_1 = require("../../templates/sms");
var notification_types_1 = require("../../notification.types");
var text = sms_1.smsTemplates[notification_types_1.NotificationPurpose.account_registration_code].format('82124');
niksms_1.send({ to: '09123017212', text: text, textId: '39u9287897wer' })
    .then(console.log)["catch"](console.log);
