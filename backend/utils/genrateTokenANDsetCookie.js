import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {

    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
    })
    return token;

}