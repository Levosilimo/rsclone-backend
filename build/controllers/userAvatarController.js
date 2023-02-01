import UserDataSchema from "../model/userDataSchema.js";
import * as express from "express";
import { bucket } from "../model/db.js";

export async function updateAvatar(
    req,
    res
) {
    try {
        // Field "id" is not typed in Multer.File
        // @ts-ignore
        const { id } = req.file;
        const userId = req.body.userData.user_id;
        await UserDataSchema.findOneAndUpdate(
            { _id: userId },
            { avatarId: id },
            { new: true }
        );
        res.status(200).end();
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

export async function updateAvatarByUsername(
    req,
    res
) {
    try {
        // Field "id" is not typed in Multer.File
        // @ts-ignore
        const { id } = req.file;
        const username = req.params.username;
        if (username) {
            await UserDataSchema.findOneAndUpdate(
                { username },
                { avatarId: id },
                { new: true }
            );
        } else return res.status(400).send('Invalid input: "username" is required');
        res.status(200).end();
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

export async function getAvatar(
    req,
    res
) {
    try {
        const username = req.params.username;
        if (!username)
            return res.status(400).send('Invalid input: "username" is required');
        const user = await UserDataSchema.findOne({
            username: username,
        });
        if (!user)
            return res.status(404).send('User with this "username" not found');
        const files = await bucket
            .find({ _id: user.avatarId })
            .toArray();
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: "User does not have an avatar",
            });
        }
        bucket.openDownloadStream(user.avatarId).pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}