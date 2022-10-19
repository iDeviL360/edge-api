import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { Post } from '../models/Post';



export default class PostController {


    public getPosts = async (req : Request, res : Response) : Promise<Response<Post[]>> => {

        try {
    
            const data = await fetch('https://jsonplaceholder.typicode.com/posts/');
            
            if(data.ok) {
                const response = await data.json();
                return res.status(200).json(response);
            } else {
                return res.status(400).json({
                    'message': 'Bad Request'
                })
            }
    
        } catch (error) {
            return res.status(500).json({
                'message': error
            });
        }
    
    }
    


   public getPostById = async (req : Request, res : Response) : Promise<Response<Post>> => {
    
        try {
    
            const { postId } = req.params;
    
            const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${ postId }`);
            
            if(data.ok) {


                const response = await data.json();
                return res.status(200).json(response);

                
            } else {
                return res.status(400).json({
                    'message': 'Bad Request'
                })
            }
    
        } catch (error) {
            return res.status(500).json({
                'message': error
            });
        }
    
    }

    

    public createPost = async (req : Request<any, any, Post>, res : Response) => {
    
        try {
    
            const { title, body, userId } = req.body;
    
            const newPost : Post = {
                title,
                body,
                userId
            }
    
            const data = await fetch('https://jsonplaceholder.typicode.com/posts/', {
                method: 'POST',
                body: JSON.stringify(newPost)
            });
    
            
            if(data.ok) {
                const response = await data.json();
                return res.status(201).json({
                    'message': 'Post was created successfully' 
                });
            } 
    
        } catch (error) {
            return res.status(500).json({
                "message": error
            });
        }
    
    }
    
    

    public updatePost = async (req : Request<{ postId : string }, any, Post>, res : Response) : Promise<Response<{ "message" : string, "post" : Post }>> => {
    
        try {
    
            const { postId } = req.params;
            const { title, body, userId } = req.body;
    
            const post : Post = {
                title,
                body,
                userId
            }
    
            const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'PUT',
                body: JSON.stringify(post)
            });
            
            if(data.ok) {

                const response : Post = await data.json();
                
                return res.status(201).json({
                    'message': 'Post was updated successfully',
                    'post': response
                });
            } else {

                return res.status(400).json({
                    'message': `Bad Request`
                })
            }
    
        } catch (error) {
            return res.status(500).json({
                'message': error
            });
        }
    
    }
    

    public deletePostById = async (req : Request, res : Response) : Promise<Response<string>> => {
    
        try {
    
            const { postId } = req.params;
    
            const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${ postId }`, {
                method: 'DELETE'
            });
            
            if(data.ok) {
                return res.status(200).json({
                    'message': 'Post deleted'
                });
            } else {
                return res.status(400).json({
                    'message': 'Bad Request'
                })
            }
    
        } catch (error) {
            return res.status(500).json({
                'message': error
            });
        }
    
    }




}