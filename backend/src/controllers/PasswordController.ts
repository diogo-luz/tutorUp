import { Request, Response } from 'express';
import handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { addHours, isAfter, parseISO } from 'date-fns';
import db from '../database/connection';
import sendMail from '../utils/mail';

interface MyRequest extends Request {
  id?: number;
}

export default class PasswordController {
  async reset(req: MyRequest, res: Response) {
    const { email } = req.body;

    const userExists = await db('users').where('email', email);

    if (userExists.length === 0) {
      return res
        .status(400)
        .json({ error: 'The email provided does not exist' });
    }

    const token = uuidv4();

    const { id, name } = userExists[0];

    const trx = await db.transaction();

    try {
      await trx('user_tokens').insert({
        token,
        user_id: id,
        created_at: new Date(),
      });

      await trx.commit();

      const forgotPasswordTemplate = path.resolve(
        __dirname,
        '..',
        'views',
        'forgot_password.hbs',
      );

      const templateContent = await fs.promises.readFile(
        forgotPasswordTemplate,
        {
          encoding: 'utf-8',
        },
      );

      const parseTemplate = handlebars.compile(templateContent);

      await sendMail(
        email,
        parseTemplate({
          name,
          link: `http://localhost:3000/recover-password/${token}`,
        }),
      );

      return res.status(201).send();
    } catch (error) {
      console.log(error);

      await trx.rollback();

      return res
        .status(400)
        .json({ error: 'Unexpected error while updating user' });
    }
  }

  async check(req: MyRequest, res: Response) {
    const { token } = req.params;

    const userToken = await db('user_tokens').where('token', '=', token);

    if (!userToken[0]) {
      return res.status(400).json({ message: 'The token doesnt exists' });
    }

    return res.json({ message: 'valid token' });
  }

  async recover(req: MyRequest, res: Response) {
    const { password, token } = req.body;

    const userToken = await db('user_tokens').where('token', token);

    if (userToken.length <= 0) {
      return res.status(404).json({ message: 'Invalid Token' });
    }

    const userExists = await db('users').where('id', '=', userToken[0].user_id);

    if (userToken[0] && userExists[0]) {
      const twoHoursAfter = addHours(parseISO(userToken[0].created_at), 2);

      if (isAfter(Date.now(), twoHoursAfter)) {
        return res.status(401).json({ message: 'Token is expired' });
      }

      const hashedPassword = await hash(password, 8);

      await db('users')
        .where('id', '=', userExists[0].id)
        .update({ password_hash: hashedPassword });

      await db('user_tokens').where('id', '=', userToken[0].id).del();

      return res.status(204).json({ message: 'resource updated successfully' });
    }
    return res
      .status(400)
      .json({ message: 'The user or the token, dont exists' });
  }
}
