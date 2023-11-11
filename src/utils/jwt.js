import promisify from 'util';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"

dotenv.config();

const secretKey = process.env.JWT_SECRET;
const expiresIn = "2h"
function generateToken(payload) {
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
}

export {generateToken};