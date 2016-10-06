
# Simple Nodejs Emailer

Tested with gmail. You can use other email service like mailjet, sendgrid, etc. It uses [nodemailer](https://github.com/nodemailer/nodemailer). See note [here](https://github.com/nodemailer/nodemailer#tldr-usage-example) about using gmail.

### Clone
```
git clone https://github.com/arifsetiawan/simplemailer
cd simplemailer
npm install
```

### To run
```
DEBUG=app NODE_ENV=development EMAILHOST=smtp.gmail.com EMAILPORT=465 EMAILSECURE=true EMAILUSER=YOUREMAILUSER EMAILPASSWORD=YOUREMAILPASSWORD node app.js
```

**Note**

Replace YOUREMAILUSER, YOUREMAILPASSWORD with your own data

### Send email

```
curl -X POST \
-H "Content-Type: application/json" \
-d '{"data":{"subject":"This is cool","to":["jim@email.com","jane@email.com"],"html":"<h1>Header</h1><p>Send email</p>"}}' \
http://localhost:8080/email
```

## Request body

```
{
    "data": {
        "subject": "This is cool",
        "to": ["jim@email.com", "jane@email.com"],
        "html": "<h1>Header</h1><p>Send email</p>"
    }
}
```

Data fields

1. `subject` - required
1. `to` - required. Use array if there are multiple recipient
1. `html` - if set, `text` will be generated from html content
1. `text` - if set, `html` is ignored and `text` will be send
1. `cc` - optional. Use array if there are multiple cc
1. `bcc` - optional. Use array if there are multiple bcc

## TODO

* Add authentication
* Queue
