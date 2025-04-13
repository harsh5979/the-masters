const {sendMail} = require('../config/mail.config');
const verificationMailTemplate = require('../templates/verification_mail.template');
const welcomeMailTemplate = require('../templates/Welcome_mail.template');
const forgotPasswordMailTemplate = require('../templates/forgotPassword_mail.template');
const resetSuccessfulMailTemplate = require('../templates/resetPasswordSuccessfully.template');

exports.sendVerificationEmail = async (email, otp) => {
  const subject = 'Account Verification - Your OTP Code';
  const template = verificationMailTemplate(otp);
  await sendMail(email, subject, template);
};

exports.sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to iomd✨';
  const template = welcomeMailTemplate(name);
  await sendMail(email, subject, template);
};

exports.sendForgotPasswordEmail = async (email, resetLink) => {
  const subject = 'Reset your password';
  const template = forgotPasswordMailTemplate(email, resetLink);
  await sendMail(email, subject, template);
};

exports.sendresetPasswordEmail = async (email,name) => {
  const subject = 'Password Reset Successful';
  const template = resetSuccessfulMailTemplate(name);
  await sendMail(email, subject, template);
};

