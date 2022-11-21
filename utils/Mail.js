const nodemailer = require('nodemailer')
require("dotenv").config()


class Mail {
    constructor() {
            this.transporter = nodemailer.createTransport({
            port: process.env.EMAIL_PORT,
            host: process.env.EMAIL_SMTP,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD 
            },
            secure: true
        })
    }

    async sendEmail(to, subject, html){
        let data = {
            from: "henrique.carvalho@al.infnet.edu.br",
            to,
            subject,
            // text: "Corpo do email",
            html,
        }
        console.log(data.from)
        try {
            const result = await this.transporter.sendMail(data)
            console.log(result)
        }
        catch(err) {
            console.log(err)            
        }

    }
}

module.exports = Mail