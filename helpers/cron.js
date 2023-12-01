import cron from 'node-cron';
import _MySQL from './mySQL.js';
import { DateTime } from 'luxon';
import nodemailer from 'nodemailer'
import Replacer from './Replacer.js'
import fs from 'fs';

export default async () => {


  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });



  cron.schedule("* * * * *", async () => {


    const today = DateTime.now().plus({ week: 1 }).toFormat('yyyy-MM-dd HH:mm:ss')

    let due_payments = await _MySQL.findDirect("SELECT * FROM transaction WHERE due_date = :today AND  payment_status = :payment_status", { today, payment_status: 'PENDING' })

    if (due_payments.length > 0) {
      due_payments.forEach(async detail => {
        let user_id = detail.user_id

        const user = await _MySQL.findOne('user', { id: user_id });

        let html = fs.readFileSync('templates/email.html', 'utf8');

        const replaceValues = {
          name: `${user.title}. ${user.firstname} ${user.lastname}`,
          transactionDate: DateTime.fromJSDate(detail.transaction_date).toFormat('EEEE dd-MM-yyyy HH:mm:ss'),
          dueDate: DateTime.fromJSDate(detail.due_date).toFormat('EEEE dd-MM-yyyy HH:mm:ss'),
          price:`${detail.amount}`
        };

        html = await Replacer(html, replaceValues);

        let mailOptions = {
          from: 'bstprogrammer999@gmail.com',
          to: user.email,
          subject: 'Invoice overdue!',
          html: html
        };

        await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log(error);
          } else {
            try {
              await _MySQL.updateOne('transaction', { payment_status: 'SUCCESSFUL' }, { id: detail.id })
            } catch (error) {
              console.log(error);
            }
            console.log('Email sent: ' + info.accepted[0]);
          }
        });
      });
    } else {
      console.log('No pending transaction')
    }
  });

}
