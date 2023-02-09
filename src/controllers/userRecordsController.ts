import UserDataSchema, { UserData } from "../model/userDataSchema";
import * as express from "express";
import { HydratedDocument, SortOrder } from "mongoose";

interface TableQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder;
}

export async function getUsersRecords(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const URLQuery: TableQuery = req.query;
    const schemaAggregate = UserDataSchema.aggregate().project({
      _id: 0,
      username: 1,
      records: 1,
    });
    if (URLQuery.limit >= 0) {
      if (URLQuery.page >= 0)
        schemaAggregate.skip(URLQuery.limit * (URLQuery.page - 1));
      schemaAggregate.limit(URLQuery.limit);
    }
    if (URLQuery.sort === "records.flexbox") {
      schemaAggregate.addFields({
        length: { $size: `$${URLQuery.sort}` },
      });
      schemaAggregate.sort({ length: URLQuery.order });
    } else {
      const sortObj: Record<string, SortOrder> = {};
      sortObj[URLQuery.sort] = URLQuery.order;
      schemaAggregate.sort(sortObj);
    }
    const resultArray: Array<HydratedDocument<UserData>> =
      await schemaAggregate.exec();
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
