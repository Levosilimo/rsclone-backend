import * as express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserAuthSchema from "../model/userAuthSchema.js";
import UserDataSchema from "../model/userDataSchema.js";

export async function loginUser(
    req,
    res
) {
    try {
        const { login, password, adminPassword } =
            req.body;
        let isAdmin = false;
        if (!(login && password)) {
            return res
                .status(400)
                .send('Invalid input: "password" and "login" are required');
        } else if (adminPassword) {
            if (adminPassword !== process.env.ADMIN_PASSWORD)
                return res.status(401).send("Incorrect admin password");
            isAdmin = true;
        }
        const user =
            (await UserAuthSchema.findOne({ email: login })) ||
            (await UserAuthSchema.findOne({ username: login }));
        const encryptedPassword = user.password;
        if (user && (await bcrypt.compare(password, encryptedPassword))) {
            user.update({ isAdmin });
            const token = jwt.sign(
                { user_id: user._id, isAdmin },
                process.env.TOKEN_KEY,
                {
                    expiresIn: process.env.TOKEN_LIFETIME,
                }
            );
            res.status(200).json(token);
        } else {
            res
                .status(404)
                .send('User with this "password" and "login" was not found');
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export async function registerUser(
    req,
    res
) {
    try {
        const {
            email,
            password,
            username,
            adminPassword,
        } = req.body;
        let isAdmin = false;
        if (!(email && password && username)) {
            return res
                .status(400)
                .send('Invalid input: "email", "password" and "username" are required');
        } else if (adminPassword) {
            if (adminPassword !== process.env.ADMIN_PASSWORD)
                return res.status(401).send("Invalid admin password");
            isAdmin = true;
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await UserAuthSchema.create({
            email: email.toLowerCase(),
            username: username,
            password: encryptedPassword,
            isAdmin,
        });
        await UserDataSchema.create({
            username: username,
            _id: user._id,
        });
        const token = jwt.sign(
            { user_id: user._id, isAdmin },
            process.env.TOKEN_KEY,
            {
                expiresIn: process.env.TOKEN_LIFETIME,
            }
        );
        res.status(201).json(token);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export function checkUsernameEligibility(autonomous) {
    return async (
        req,
        res,
        next
) => {
        try {
            const username = req.body.username;
            if (!username) {
                return res.status(400).send('Invalid input: "username" is required');
            } else if (await UserAuthSchema.findOne({ username })) {
                return res.status(422).send("Username is already taken");
            }
            if (!autonomous) return next();
            res.end();
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    };
}

export function checkEmailEligibility(autonomous) {
    return async (
        req,
        res,
        next
) => {
        try {
            const email = req.body.email;
            if (!email) {
                return res.status(400).send('Invalid input: "email" is required');
            } else if (await UserAuthSchema.findOne({ email })) {
                return res
                    .status(409)
                    .send("A user with this email address already exists");
            }
            if (!autonomous) return next();
            res.end();
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    };
}

export function verifyToken(verifyAdmin) {
    return async (
        req,
        res,
        next
) => {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        try {
            const userData = jwt.verify(token, process.env.TOKEN_KEY);
            if (userData.user_id === undefined || userData.isAdmin === undefined) {
                return res.status(401).send("Invalid Token");
            }
            if (verifyAdmin && !userData.isAdmin)
                return res.status(401).send("You don't have rights to do that");
            req.body.userData = userData;
        } catch {
            return res.status(401).send("Invalid Token");
        }
        return next();
    };
}