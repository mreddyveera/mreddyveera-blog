import jwt from "jsonwebtoken";
export const authenticate = async (req, res, next) => {
  try {
    const token  = await res.cookies.access_token;
    if (!token) {
      next(403, "Unauthorizerd");
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    next(500, error.message);
  }
};
