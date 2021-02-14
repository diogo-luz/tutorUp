/* eslint-disable no-param-reassign */
import { Request, Response } from 'express';

import db from '../database/connection';

export default class SubjectsController {
  async index(req: Request, res: Response) {
    const subjects = await db('subjects');

    return res.json(subjects);
  }
}
