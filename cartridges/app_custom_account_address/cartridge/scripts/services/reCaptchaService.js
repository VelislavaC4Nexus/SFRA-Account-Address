"use strict";

const reCAPTCHA_SERVICE = "http.recaptcha.service";
const LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");

const reCaptchaService = LocalServiceRegistry.createService(reCAPTCHA_SERVICE, {
    createRequest(svc, args) {
        svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
        svc.setRequestMethod("POST");

        const secret = encodeURIComponent(args.secret);
        const token = encodeURIComponent(args.token);

        return `secret=${secret}&response=${token}`;
    },
    parseResponse(svc, client) {
        let result;

        try {
            result = JSON.parse(client.text);
        } catch (e) {
            result = client.text;
        }

        return result;
    },
    filterLogMessage(msg) {
        return msg;
    },
});

module.exports = reCaptchaService;
