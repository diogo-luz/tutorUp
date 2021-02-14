/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';
import db from '../database/connection';

interface MyRequest extends Request {
  id?: number;
}

export default class FavoritesController {
  async store(req: MyRequest, res: Response) {
    const { teacher_id } = req.body;
    const user_id = req.id;

    const fav = await db('favorites')
      .where('user_id', user_id)
      .where('teacher_id', teacher_id);

    if (fav.length !== 0) {
      return res.status(400).json({ error: 'Is already favorited' });
    }

    await db('favorites').insert({
      user_id,
      teacher_id,
    });

    return res.status(201).send();
  }

  async index(req: MyRequest, res: Response) {
    const user_id = req.id;

    // const fav = await db('favorites')
    //   .where('user_id', user_id)
    //   .join('users', 'favorites.teacher_id', 'users.id')
    //   .join('class_schedule', 'classes.owner_id', 'class_schedule.owner_id')
    //   .select(['favorites.id', 'classes.*', 'class_schedule.*']);

    const fav = await db('favorites')
      .where('user_id', user_id)
      .select(['teacher_id']);

    return res.json(fav);
  }

  async delete(req: MyRequest, res: Response) {
    const { teacher_id } = req.params;
    const user_id = req.id;

    const trx = await db.transaction();

    try {
      await trx('favorites')
        .where('user_id', user_id)
        .where('teacher_id', teacher_id)
        .del();

      await trx.commit();

      return res.send();
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return res
        .status(400)
        .json({ error: 'Unexpected error while deleting favorite' });
    }
  }
}
