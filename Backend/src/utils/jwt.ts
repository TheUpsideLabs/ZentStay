import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  role: string;
}

export const generateToken = (
  userId: string,
  role: string
): string => {
  const secret =
    process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error(
      "JWT_ACCESS_SECRET environment variable is missing"
    );
  }

  return jwt.sign(
    {
      id: userId,
      role,
    } as TokenPayload,
    secret,
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (
  userId: string,
  role: string
): string => {
  const secret =
    process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error(
      "JWT_REFRESH_SECRET environment variable is missing"
    );
  }

  return jwt.sign(
    {
      id: userId,
      role,
    } as TokenPayload,
    secret,
    {
      expiresIn: "7d",
    }
  );
};

export const verifyRefreshToken = (
  refreshToken: string
): TokenPayload => {
  const secret =
    process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error(
      "JWT_REFRESH_SECRET environment variable is missing"
    );
  }

  return jwt.verify(
    refreshToken,
    secret
  ) as TokenPayload;
};