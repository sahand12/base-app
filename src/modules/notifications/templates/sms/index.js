"use strict";
var _a;
exports.__esModule = true;
var notification_types_1 = require("../../notification.types");
var util = require("util");
var shared = {
    BRAND_NAME: 'بازی نهنگز',
    CONFIRMATION_CODE: 'کد تایید'
};
var smsTemplates = (_a = {},
    _a[notification_types_1.NotificationPurpose.account_creation_welcome_message] = {},
    _a[notification_types_1.NotificationPurpose.account_password_changed_message] = {
        text: ''
    },
    _a[notification_types_1.NotificationPurpose.account_password_reset_code] = {
        text: ''
    },
    _a[notification_types_1.NotificationPurpose.account_registration_code] = {
        format: function (code) {
            return util.format('%s\n%s: %d', shared.BRAND_NAME, shared.CONFIRMATION_CODE, code);
        }
    },
    _a);
exports.smsTemplates = smsTemplates;
