import LevelDataSchema, { LevelData } from "../model/levelDataSchema";
import * as express from "express";
import { HydratedDocument } from "mongoose";
import UserDataSchema, { UserData } from "../model/userDataSchema";

interface levelResponse {
  winCondition: string;
  name: string;
  description: {
    paragraph: string;
    rulesList: Array<string>;
    example: string;
  };
  submitText: string;
  type1Quantity: number;
  type2Quantity: number;
  type3Quantity: number;
  levelsCount: number;
}

export async function addLevel(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const levelData: LevelData = req.body;
    const level: HydratedDocument<LevelData> = await LevelDataSchema.create(
      levelData
    );
    res.status(200).json(level);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function getLevel(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const game = req.params.game;
    const levelNumber = Number(req.params.level);
    if (!game || !levelNumber)
      return res
        .status(400)
        .send('Invalid input: "game" and "levelNumber" are required');
    const level: HydratedDocument<LevelData> = await LevelDataSchema.findOne({
      game,
      levelNumber,
    });
    const user: HydratedDocument<UserData> = await UserDataSchema.findOne({
      _id: req.body.userData.user_id,
    });
    if (!user) return res.status(401).send("Invalid Token");
    if (!level)
      return res
        .status(404)
        .send(`Level ${levelNumber} of the game "${game}" not found`);
    const rulesList = level.description.rulesList.map(
      (rule) => rule[user.language]
    );
    const responseBody: levelResponse = {
      winCondition: level.winCondition,
      name: level.name[user.language],
      description: {
        paragraph: level.description.paragraph[user.language],
        rulesList,
        example: level.description.example[user.language],
      },
      submitText: level.submitText[user.language],
      type1Quantity: level.type1Quantity,
      type2Quantity: level.type2Quantity,
      type3Quantity: level.type3Quantity,
      levelsCount: await LevelDataSchema.where({ game: game }).count().exec(),
    };
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function getLevelTotalCount(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const game = req.params.game;
    if (!game) return res.status(400).send('Invalid input: "game" is required');
    res.status(200).json({
      levelsCount: await LevelDataSchema.where({ game: game }).count().exec(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
