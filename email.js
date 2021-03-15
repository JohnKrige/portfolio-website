const nodemailer = require('nodemailer');
const { user, pass } = process.env;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    // service: 'gmail',
    service: 'gmail',
    auth: {
      user, 
      pass,
    },
  });

const verifyConnection = () => {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
}

const createRecieveEmail = (email, name, body) => {
    const mailOptions = {
        // from: ,
        to: 'krigejohn@gmail.com',
        subject: `Portflio - ${name} ${email}`,
        replyTo: `${email}`,
        text: 
        `
        sent by: ${name}
        sent from: ${email}
        
        ${body}
        `
    }

    return mailOptions;

};

const createSendEmail = (email, name) => {
  const mailOptions = {
      // from: ,
      to: email,
      subject: '',
      replyTo: `krigejohn@gmail.com`,
      text: 
      `Hi ${name}
       
Thanks for reaching out to me. I received your email and I will get back to you as soon as possible.

Have a great day,
John
      `
  }

  return mailOptions;

};

const sendEmail = async (email, name, type, body) => {
  verifyConnection();
  let resp;

  try {
    if (type === 'receive') {
      resp = await transporter.sendMail(createRecieveEmail(email, name, body));
    } else {
      resp = await transporter.sendMail(createSendEmail(email, name));
    }
    
    if (resp.response.slice(0,3) === '250') {
      return 'success';
    } 
  }

  catch {
    return 'fail';
  }

};

module.exports = sendEmail;

