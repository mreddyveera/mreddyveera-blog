import jwt from "jsonwebtoken";
export const onlyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    
    if (!token) {
      next(403, "Unauthorizerd");
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
   
    if (decodeToken.role === "admin") {
      req.user = decodeToken;
      next();
    } else {
      next(403, "Unauthorizerd");
    }
  } catch (error) {
    next(500, error.message);
  }
};
