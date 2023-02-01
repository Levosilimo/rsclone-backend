import UserDataSchema from "../model/userDataSchema.js";
import * as express from "express";

export async function updateUserData(
    req,
    res,
    next
) {
    try {
        const { language, levelFlexbox } = req.body;
        if (!language && !levelFlexbox) return next();
        let user;
        if (req.body.username) {
            if (!req.body.userData.isAdmin)
                return res.status(401).send("You don't have rights to do that");
            const username = String(req.body.username);
            user = await UserDataSchema.findOneAndUpdate(
                { username },
                { language, levelFlexbox },
                { new: true }
            );
        } else {
            const userId = req.body.userData.user_id;
            user = await UserDataSchema.findOneAndUpdate(
                { _id: userId },
                { language, levelFlexbox },
                { new: true }
            );
        }
        const responseBody = {
            language: user.language,
            levelFlexbox: user.levelFlexbox,
        };
        res.status(200).json(responseBody);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

export async function updateUserDataByUsername(
    req,
    res,
    next
) {
    try {
        const { language, levelFlexbox } = req.body;
        if (!language && !levelFlexbox) return next();
        const username = req.params.username;
        if (!username)
            return res.status(400).send('Invalid input: "username" is required');
        const user =
            await UserDataSchema.findOneAndUpdate(
                { username },
                { language, levelFlexbox },
                { new: true }
            );
        const responseBody = {
            language: user.language,
            levelFlexbox: user.levelFlexbox,
        };
        res.status(200).json(responseBody);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

export async function getUserData(
    req,
    res
) {
    try {
        let user;
        if (req.body.username) {
            if (!req.body.userData.isAdmin)
                return res.status(401).send("You don't have rights to do that");
            const username = String(req.body.username);
            user = await UserDataSchema.findOne({ username });
            if (!user)
                return res.status(404).send('User with this "nickname" not found');
        } else {
            const userId = req.body.userData.user_id;
            user = await UserDataSchema.findOne({ _id: userId });
        }
        const responseBody = {
            language: user.language,
            levelFlexbox: user.levelFlexbox,
        };
        res.status(200).json(responseBody);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

export async function getUserDataByUsername(
    req,
    res
) {
    try {
        const username = req.params.username;
        if (!username)
            return res.status(400).send('Invalid input: "username" is required');
        if (!req.body.userData.isAdmin)
            return res.status(401).send("You don't have rights to do that");
        const user = await UserDataSchema.findOne({
            username,
        });
        if (!user)
            return res.status(404).send('User with this "nickname" not found');
        const responseBody = {
            language: user.language,
            levelFlexbox: user.levelFlexbox,
        };
        res.status(200).json(responseBody);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}