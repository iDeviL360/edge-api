import { NextFunction, Request, Response } from "express";
import { z, ZodError, AnyZodObject } from 'zod';


export const fieldsValidation = (schemaValidation : AnyZodObject ) => (req : Request, res : Response, next : NextFunction) => {

    try {

        schemaValidation.parse({
            body: req.body,
            params: req.params
        })

        next();

    } catch (error) {

        console.log(error);
        
        if(error instanceof ZodError) {
            return res.status(400).json(error.issues.map(issue => ({ path: issue.path, message: issue.message })))
        }
    }


}