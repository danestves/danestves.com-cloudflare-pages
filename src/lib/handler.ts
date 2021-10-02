// Dependencies
import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'

export const handler = nc<NextApiRequest, NextApiResponse>()
