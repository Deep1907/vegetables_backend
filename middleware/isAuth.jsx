const userModel = require("../models/Users.jsx");
const jwt = require("jsonwebtoken");

 const isAuthenticated = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token Invalid"
            });
        }

        const token = authHeader.split(" ")[1];

        const decodeToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const userId = decodeToken.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }
};

module.exports = isAuthenticated;