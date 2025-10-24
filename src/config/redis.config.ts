import Redis from "ioredis";
import { serverConfig } from ".";


// export function ConnectToRedis(){
//     try {
//     const redisConfig={
//     host:serverConfig.REDIS_HOST,
//     port:serverConfig.REDIS_PORT
//     }
//     const connection = new Redis(redisConfig);

//     return connection
//     } catch (error) {
//         console.log("Error while connecting to Redis: ",error)
//         throw error
//     }
// }



export function connectToRedis(){
    try {
        let connection: Redis
        const redisConfig={
            host:serverConfig.REDIS_HOST,
            port:serverConfig.REDIS_PORT
        }
        return ()=>{
            if(!connection){
                connection = new Redis({
                    ...redisConfig,
                    maxRetriesPerRequest: null
                })
                return connection;
            }
            return connection;
        }
    } catch (error) {
        console.log("Error connecting to Redis :",error)
        throw error
    }
}

export const getRedisConnection=connectToRedis();

