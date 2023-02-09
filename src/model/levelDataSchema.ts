import mongoose, { Schema } from "mongoose";
import { games } from "../types";

type LevelDataI18N = {
  en_us: string;
  es_es: string;
  ru: string;
  uk: string;
};

export interface LevelData {
  levelNumber: number;
  game: games;
  winCondition: string;
  name: LevelDataI18N;
  description: {
    paragraph: LevelDataI18N;
    rulesList: Array<LevelDataI18N>;
    example: LevelDataI18N;
  };
  submitText: LevelDataI18N;
  type1Quantity: number;
  type2Quantity: number;
  type3Quantity: number;
}

const LevelDataI18NSchema = new Schema<LevelDataI18N>({
  en_us: {
    type: String,
    required: true,
  },
  es_es: {
    type: String,
    required: true,
  },
  ru: {
    type: String,
    required: true,
  },
  uk: {
    type: String,
    required: true,
  },
});

const LevelDataSchema = new Schema<LevelData>({
  levelNumber: { type: Number, required: true },
  game: { type: String, required: true },
  winCondition: { type: String, required: true },
  name: {
    type: LevelDataI18NSchema,
    required: true,
  },
  description: {
    paragraph: {
      type: LevelDataI18NSchema,
      required: true,
    },
    rulesList: {
      type: [LevelDataI18NSchema],
      required: true,
    },
    example: {
      type: LevelDataI18NSchema,
      required: true,
    },
  },
  submitText: {
    type: LevelDataI18NSchema,
    required: true,
  },
  type1Quantity: {
    type: Number,
    required: true,
  },
  type2Quantity: {
    type: Number,
    required: true,
  },
  type3Quantity: {
    type: Number,
    required: true,
  },
});

const model = mongoose.model<LevelData>("LevelData", LevelDataSchema);
export const schema = model.schema;
export default model;
