import { Queue } from "bullmq";
import { getRedisConnection } from "../config/redis.config";

export const theQueue:string='queue';
export const queue=new Queue(theQueue,{
    connection:getRedisConnection(),
})