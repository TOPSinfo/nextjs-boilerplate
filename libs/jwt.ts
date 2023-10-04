import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: 3600,
};

export function signJwtAccessToken(
    payload: JwtPayload,
    options: SignOption = DEFAULT_SIGN_OPTION
) {
    const secret_key = process.env.SECRET_KEY;
    const refresh_key = process.env.JWT_REFRESH_KEY;
    const accessToken = jwt.sign(payload, secret_key!, options);
    const refreshToken = jwt.sign(payload, refresh_key!, { expiresIn: 604800 });
    const token = { refreshToken, accessToken };
    return token;
}

export function verifyJwt(token: string) {
    try {
        const secret_key = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secret_key!);
        return decoded as JwtPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export function verifyRefreshJwt(token: string) {
    try {
        const refresh_key = process.env.JWT_REFRESH_KEY;
        const decoded = jwt.verify(token, refresh_key!);
        return decoded as JwtPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
}
