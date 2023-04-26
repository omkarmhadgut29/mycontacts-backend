import * as bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const { sign } = jwt;

/**
 * @desc Get All Contacts
 * @route GET api/contacts
 * @access public
 */
const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
        res.status(400);
        throw new Error("User already exists!");
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
        username, // If key and value having same 'name' then we can use only one name
        email,
        password: hashPassword, // else use both key and value
    });

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }

    res.json("User Register");
});

const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Enter email address and password.");
    }

    const user = await UserModel.findOne({ email: email });
    // console.log(user.password);
    // res.status(200).json({ user: user.password });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "15m" }
        ); //jwt.sign()
        res.status(200).json({ accessToken });
    } else {
        res.status(400);
        throw new Error("Email or Password is not valid!");
    }
});

const currentUser = expressAsyncHandler(async (req, res) => {
    res.json(req.user);
});

export { registerUser, loginUser, currentUser };
