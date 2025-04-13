import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) return res.status(401).json({ message: 'Unauthorized' });
        req.userId = decoded.userId;
        next();

    } catch (error) {

        return res.status(401).json({ message: 'Unauthorized' });
    }

}