const { validationResult, cookie } = require('express-validator')
const usermodel = require('../model/User.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { generateTokenAndSetCookie } = require('../services/generateTokenAndSetCookie');
const { sendVerificationEmail, sendWelcomeEmail, sendForgotPasswordEmail, sendresetPasswordEmail } = require('../services/mail.services');




const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.senderEmail,
        pass: process.env.senderPassword,
    },
});

const mailsend = async (mailOptions, res) => {
    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending OTP email', error });
        }



        return res.status(200).json({ message: 'User registered. Please verify OTP sent to your email.', });

    });
}

exports.register = async (req, res) => {
    // const error = validationResult(req)
    // if (!error.isEmpty()) {
    //     return res.status(400).json({ error: error.array() })
    // }
    const { email, password } = req.body;
    if (email === '' || password === '') {
        return res.status(400).json({ error: 'All fields are required' })
    }


    const isUserExist = await usermodel.findOne({ email }).lean();;

    if (isUserExist) {
        return res.status(400).json({ error: 'User already exist with this email' })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = crypto.randomInt(100000, 999999);

    const [UserCreate] = await Promise.all([
        usermodel.create({
            email,
            password: hashedPassword,
            otp,
        }),
        await sendVerificationEmail(email, otp),
    ])

    generateTokenAndSetCookie(res, UserCreate._id)



    res.status(201).json({
        message: 'Account created successfully..', user: {
            id: UserCreate._id,
            email: UserCreate.email,
            isVerified: UserCreate.isVerified,
            profileCompleted: UserCreate.profileCompleted

        }
    });


}

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const user = await usermodel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }


    if (user.otp !== otp || user.otpExpires < Date()) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    try {
        user.otp = undefined;
        user.otpExpires = undefined;
        user.isVerified = true;

        await user.save();

        generateTokenAndSetCookie(res, user._id)
        await sendWelcomeEmail(user.email, user.email)

        // const expirationTime = new Date();
        // expirationTime.setHours(expirationTime.getHours() + 24);

        res.status(200).json({
            message: 'Email verified successfully',
        });

    } catch (error) {
        console.error("Error saving user:", error);
        res.status(400).json({ message: 'Invalid or expired OTP' });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const isUserExist = await usermodel.findOne({ email });

    if (!isUserExist) {
        return res.status(401).json({ message: 'Invalid email or password' })

    }

    const isPasswordValid = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    generateTokenAndSetCookie(res, isUserExist._id)
    isUserExist.lastLogin = new Date();


    await isUserExist.save();
    res.status(200).json({
        success: true, message: 'Login successful', user: {
            id: isUserExist._id,
            email: isUserExist.email,
            isVerified: isUserExist.isVerified,
            profileCompleted: isUserExist.profileCompleted

        }
    });



}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' })
    }
    const user = await usermodel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found with this email' })
    }
    const resetToken = crypto.randomBytes(21).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendForgotPasswordEmail(email, resetUrl)
    res.status(200).json({ message: 'Reset password link sent to your email' })

}
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!token || !password) {
        return res.status(400).json({ message: 'Token and password are required' })
    }

    const user = await usermodel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });

    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    await sendresetPasswordEmail(user.email, user.fullname);
    res.status(200).json({ message: 'Password reset successfully' });
}

exports.checkAuth = async (req, res) => {
    try {
        const user = await usermodel.findById(req.userId).select('-password');
        if (!user) {

            return res.status(404).json({ message: 'User not found' });
        }
        console.log(req.ip)
        res.status(200).json({ success: true, user });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}
exports.completeProfile = async (req, res) => {
    try {
        const { fullName, role, skills, experience, gender, phone,  portfolio } = req.body;

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await usermodel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: 'Verify your email first' });
        }

       

        const profileData = {
            fullName,
            // metaaddress,
            gender,
            phone,
            role,
        };

        if (role === 'freelancer') {
            profileData.skill = skills;
            profileData.expriance = experience;
            profileData.protfolio = portfolio;
        }

        user.profile = profileData;
        user.profileCompleted = true;
        await user.save();

        res.status(200).json({ message: 'Profile completed successfully' });
    } catch (error) {
        console.error("Profile completion error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getProfile = async (req, res) => {
    const userID = req.userId;

    if (!userID) {
        res.status(400).json({ message: "Unauthorized" })
    }
    try {
        const user = await usermodel.findById(userID).lean()
        res.status(200).json({
            message: "is success", profile: { Email :user.email,...user.profile}

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error  " })
    }


}