import mongoose, { Schema } from "mongoose";

type games = "flexbox";

export interface LevelData {
  levelNumber: number;
  game: games;
  winCondition: string;
  name: {
    en_us: string;
    es_es: string;
    ru: string;
    uk: string;
  };
  description: {
    en_us: string;
    es_es: string;
    ru: string;
    uk: string;
  };
  submitText: {
    en_us: string;
    es_es: string;
    ru: string;
    uk: string;
  };
}

const LevelDataSchema = new Schema<LevelData>({
  levelNumber: { type: Number, required: true },
  game: { type: String, required: true },
  winCondition: { type: String, required: true },
  name: {
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
  },
  description: {
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
  },
  submitText: {
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
  },
});

const model = mongoose.model<LevelData>("LevelData", LevelDataSchema);
export const schema = model.schema;
export default model;
