import UserDataSchema, { UserData } from "../model/userDataSchema";
import * as express from "express";
import { HydratedDocument, SortOrder } from "mongoose";

interface TableQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortOrder;
  fullInfo?: boolean;
}

export async function getUsersRecords(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const URLQuery: TableQuery = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      order: req.query.order as SortOrder,
      sort: req.query.sort.toString(),
      fullInfo: Boolean(req.query.fullInfo),
    };
    if (URLQuery.fullInfo && !req.body.userData.isAdmin)
      return res.status(401).send("You don't have rights to do that");
    const schemaAggregate = UserDataSchema.aggregate();
    if (URLQuery.fullInfo) {
      schemaAggregate
        .lookup({
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "authData",
        })
        .unwind({ path: "$authData" });
    }
    schemaAggregate
      .project({
        _id: 0,
        username: 1,
        records: 1,
        language: 1,
        "authData.email": 1,
        "authData.isAdmin": 1,
      })
      .project({
        "records._id": 0,
        "authData._id": 0,
      });
    if (!URLQuery.fullInfo) schemaAggregate.project({ language: 0 });
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
    if (!Number.isNaN(URLQuery.limit) && URLQuery.limit > 0) {
      if (!Number.isNaN(URLQuery.page) && URLQuery.page > 0)
        schemaAggregate.skip(URLQuery.limit * (URLQuery.page - 1));
      schemaAggregate.limit(URLQuery.limit);
    }
    const resultArray: Array<HydratedDocument<UserData>> =
      await schemaAggregate.exec();
    res.setHeader(
      "X-Total-Count",
      `${await UserDataSchema.find().estimatedDocumentCount().exec()}`
    );
    res.setHeader("Access-Control-Expose-Headers", `X-Total-Count`);
    res.status(200).json(resultArray);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
