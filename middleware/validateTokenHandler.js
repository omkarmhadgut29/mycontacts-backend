import expressAsyncHandler from "express-async-handler";
import * as jwt from "jsonwebtoken";

const validateToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User not Authorized!");
            }

            req.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error("User not Authorized or Token is missing.");
        }
    }
});

export { validateToken };
