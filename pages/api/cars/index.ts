// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { TCar } from '../../../src/types'

const cars = require('./cars.json')

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TCar>,
) {
  res.status(200).json(cars)
}
