import dotenv from 'dotenv';

dotenv.config();

if ( !process.env.MONGO_URI)
{
    throw new Error ( "MONGO_URI is not defien in the .env ( enviourment variable) ");
}
const config = {
    MONGO_URI : process.env.MONGO_URI,
    PROFILE_PIC : process.env.PROFILE_PIC,
    JWT_SECTITES : process.env.JWT_SECTITES
}
export default  config;