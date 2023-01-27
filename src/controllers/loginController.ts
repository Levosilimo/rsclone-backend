import * as express from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import User from "../model/user";

interface RegistrationCredentialsRequestBody {
  email: string;
  username: string;
  password: string;
}

interface LoginCredentialsRequestBody {
  login: string;
  password: string;
}

export async function loginUser(
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const { login, password }: LoginCredentialsRequestBody = req.body;
    if (!(login && password)) {
      res
        .status(400)
        .send('Invalid input: "password" and "username"/"email" are required');
      return;
    }
    const user =
      (await User.findOne({ email: login })) ||
      (await User.findOne({ username: login }));
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = jwt.sign(
        { user_id: user._id, password },
        process.env.TOKEN_KEY,
        {
          expiresIn: "6h",
        }
      );
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .send('User with this "password" and "username"/"email" was not found');
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function registerUser(
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const { email, password, username }: RegistrationCredentialsRequestBody =
      req.body;
    if (!(email && password && username)) {
      res
        .status(400)
        .send('Invalid input: "email", "password" and "username" are required');
      return;
    } else if (await User.findOne({ email: email })) {
      res.status(409).send("A user with this email address already exists");
      return;
    } else if (await User.findOne({ username: username })) {
      res.status(422).send("Username is already taken");
      return;
    }
    const user = await User.create({
      email: email.toLowerCase(),
      username: username,
      password: await bcrypt.hash(password, 10),
    });
    user.token = jwt.sign(
      { user_id: user._id, password },
      process.env.TOKEN_KEY,
      {
        expiresIn: "6h",
      }
    );
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}
