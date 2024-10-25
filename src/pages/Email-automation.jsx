const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

const mailOptions = {
  from: 'your-email@gmail.com',
  to: user.email, // from form submission
  subject: 'Welcome to Our Website!',
  text: 'Thank you for signing up!'
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
if (user.profileCompleted) {
    // Trigger email
    transporter.sendMail({ 
      to: user.email,
      subject: 'Profile Complete!',
      text: 'Congrats! Your profile is complete.'
    });
  }
  const Queue = require('bull');
const emailQueue = new Queue('emailQueue');

// Add job to queue
emailQueue.add({ userId: user.id, type: 'signup-welcome' });

// Process email queue
emailQueue.process(async (job) => {
  const user = await getUserById(job.data.userId); // Fetch user info
  sendEmail(user.email, 'Welcome!', 'Thank you for signing up!'); // Send email
});
