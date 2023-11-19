import jwt  from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  } 
  try {

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Token error' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};


export {
  verifyToken
};