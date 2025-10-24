import nodemailer from "nodemailer"
import { serverConfig } from "."

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:serverConfig.EMAIL_USERNAME,
        pass:serverConfig.EMAIL_PASSWORD
    }
})

export default transporter