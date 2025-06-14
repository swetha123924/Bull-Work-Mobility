require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret ='30850651b750966c4d38c7cd9407d4c29400a9b6e5f6ea966792b40117186bf3';

function verifyUser(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
}
function verifyAdmin(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
  
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }
  
      req.user = decoded; 
      next();  
  }
  


module.exports = { verifyAdmin };

