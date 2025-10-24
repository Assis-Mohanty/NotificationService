import { Job, Worker } from "bullmq";
import { theQueue } from "../queue/queue";
import { PAYLOAD } from "../publisher/email.publisher";
import { NotificationDTO } from "../dto/notification.dto";
import { getRedisConnection } from "../config/redis.config";
import { converHBStoString } from "../template/template";
import { sendEmail } from "../service/mailer.service";
import logger from "../config/logger.config";

export const setUpEmailWorker=()=>{
const emailWorker= new Worker<NotificationDTO>(theQueue,async(job:Job)=>{
if(job.name!==PAYLOAD){
        throw new Error('Invalid job name')
    }
    const jobData=job.data
    console.log(jobData)
    const emailContent=await converHBStoString(jobData.templateId,jobData.params)
    await sendEmail(jobData.to,jobData.subject,emailContent);
    logger.info(`Email has been sent succesfully with booking${ jobData.templateId}`)
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