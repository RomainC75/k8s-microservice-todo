import express, { Express, Request, Response, NextFunction } from 'express'
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { AuthenticatedRequest } from '../@types/authenticatedRequest'

export const getAllLists = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {}

export const deleteList = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {}

export const putList = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {}

export const createList = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {}
