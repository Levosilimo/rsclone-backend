import LevelDataSchema, { LevelData } from "../model/levelDataSchema";
import * as express from "express";
import { HydratedDocument } from "mongoose";
import UserDataSchema, { UserData } from "../model/userDataSchema";

type Tooltip = {
  key: string;
  text: string;
};

interface levelResponse {
  winCondition: string;
  pre: string;
  post: string;
  name: string;
  description: {
    paragraph: string;
    rulesList: Array<string>;
    tooltips: Array<Tooltip>;
    example: string;
  };
  submitText: string;
  items: Array<number>;
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
    const tooltips: Array<Tooltip> = level.description.tooltips.map(
      (tooltip) => {
        return { key: tooltip.key, text: tooltip[user.language] };
      }
    );
    const responseBody: levelResponse = {
      winCondition: level.winCondition,
      pre: level.pre,
      post: level.post,
      name: level.name[user.language],
      description: {
        paragraph: level.description.paragraph[user.language],
        rulesList,
        tooltips,
        example: level.description.example[user.language],
      },
      submitText: level.submitText[user.language],
      items: level.items,
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
