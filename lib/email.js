
'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();

const debug = require('debug')('app');

// Email setup
const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const options = {
    pool: true,
    host: process.env.EMAILHOST,
    port: parseInt(process.env.EMAILPORT),
    secure: process.env.EMAILSECURE === 'true' ? true : false,
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
    }
}

const transporter = nodemailer.createTransport(options);
transporter.use('compile', htmlToText());

// Send email
router.post('/email', (req, res, next) => {

    if (!_.has(req.body,'data')) {
        const err = new Error('Body must have data field');
        err.status = 400;
        return next(err);
    }

    const required = [ 'to', 'subject' ];
    const dataFields = _.keys(req.body.data);
    const difference = _.difference(required, dataFields);

    if (difference.length > 0) {
        const err = new Error(`Missing ${difference.toString()} from required fields ${required.toString()}`);
        err.status = 400;
        return next(err);
    }

    const data = req.body.data;
    const mailOptions = {
        to: data.to.toString(),
        subject: data.subject,
    };

    if (_.has(data, 'html')) {
        mailOptions.html = data.html
    }
    else if (_.has(data, 'text')) {
        mailOptions.text = data.text
    }
    else {
        const err = new Error(`Should have text or html field`);
        err.status = 400;
        return next(err);
    }

    if(_.has(data, 'cc')) {
        mailOptions.cc = data.cc.toString()
    }

    if(_.has(data, 'bcc')) {
        mailOptions.bcc = data.bcc.toString()
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            debug({error: err});
            next(err);
        } else {
            debug({message:`Email is sent: ${info.response}`, data:JSON.stringify(mailOptions)});
            res.ok({message:'Email sent'})
        }
    });

});

module.exports = router;
