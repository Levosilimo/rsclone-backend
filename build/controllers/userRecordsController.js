import UserDataSchema from "../model/userDataSchema.js";
import * as express from "express";

export async function getUsersRecords(
    req,
    res
) {
    try {
        const URLQuery = req.query;
        const schemaQuery = UserDataSchema.find();
        if (URLQuery.limit >= 0) {
            if (URLQuery.page >= 0)
                schemaQuery.skip(URLQuery.limit * (URLQuery.page - 1));
            schemaQuery.limit(URLQuery.limit);
        }
        schemaQuery.sort([[URLQuery.sort, URLQuery.order]]);
        schemaQuery.select({ _id: 0, username: 1, levelFlexbox: 1 });
        const resultArray =
            await schemaQuery.exec();
        res.setHeader(
            "X-Total-Count",
            `${await UserDataSchema.find().estimatedDocumentCount().exec()}`
        );
        res.status(200).json(resultArray);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}