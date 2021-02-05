import * as dotenv from 'dotenv';

dotenv.config();
const path = `${__dirname}/../../../.env.development`;

dotenv.config({ path });

export const { AUTH_SECRET } = process.env;
export const { TOKEN_EXPIRATION_TIME } = process.env;
