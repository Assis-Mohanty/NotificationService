import { Job, Worker } from "bullmq";
import { theQueue } from "../queue/queue";
import { PAYLOAD } from "../publisher/email.publisher";
import { NotificationDTO } from "../dto/notification.dto";
import { getRedisConnection } from "../config/redis.config";

export const setUpEmailWorker=()=>{
const emailWorker= new Worker<NotificationDTO>(theQueue,async(job:Job)=>{
if(job.name!==PAYLOAD){
        throw new Error('Invalid job name')
    }
    const jobData=job.data
    console.log(jobData)
},
{
    connection:getRedisConnection()
})

emailWorker.on('failed',()=>{
    console.log('Email processing failed');
})

emailWorker.on('completed',()=>{
    console.log('Email processing completed succesfully');  
})
}