const mongoose = require('mongoose')
const ProfileSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    // metaaddress: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    phone: { type: Number, required: true },
    role: { type: String, enum: ['Client', 'Freelancer'], required: true },

    // Only required if role is freelancer
    skill: {
      type: String,
    
    },
    expriance: {
      type: String,
     
    },
    portfolio: {
      type: String,
     
    },
  
  
}, { _id: false });


const UserSchema = mongoose.Schema({


    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],

    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        required: true,


    },
    otp: {
        type: Number,
    },
    otpExpires: {
        type: Date,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },
    profileCompleted: {
        type: Boolean,
        default: false,
    },
    profile: {
        type: ProfileSchema,
        default: null,
    },


    hasPaid: { type: Boolean, default: false },
    paymentDetails: {
        paymentId: { type: String },
        paymentDate: { type: Date },
        paymentStatus: { type: String, enum: ["Pending", "Success", "Failed"], default: "Pending" }
    },
    // varificationToken: String,
    // varificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,

}, { timestamps: true });



module.exports = mongoose.model('User', UserSchema);