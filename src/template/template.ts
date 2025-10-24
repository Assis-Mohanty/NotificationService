import path from "path";
import { promises as fs } from "fs";
import Handlebars from "handlebars";

export async function converHBStoString(templateId:string,params:Record<string,any>):Promise<string> {
    const templatePath=path.join(__dirname,'mailer',`${templateId}.hbs`);
    try {
        const content = await fs.readFile(templatePath, 'utf8');
        const finalTemplate=Handlebars.compile(content)
        return finalTemplate(params)
    } catch (error) {
        throw error;
    }
}
