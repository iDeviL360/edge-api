import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { Post } from '../models/Post';



export default class PostController {


    public getPosts = async (req : Request, res : Response) : Promise<Response<Post[]>> => {

        try {
    
            const data = await fetch('https://jsonplaceholder.typicode.com/posts/');
            
            if(data.status === 200) {
                const response = await data.json();
                return res.status(200).json(response);
            } else {
                return res.status(400).json({
                    'message': 'Something went wrong'
                })
            }
    
        } catch (error) {
            return res.status(500).json(error);
        }
    
    }
    


   public getPostById = async (req : Request, res : Response) : Promise<Response<Post>> => {
    
        try {
    
            const { postId } = req.params;
    
            const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${ postId }`);
            
            if(data.status === 200) {
                const response = await data.json();
                return res.status(200).json(response);
            } else {
                return res.status(400).json({
                    'message': 'Something went wrong'
                })
            }
    
        } catch (error) {
            return res.status(500).json(error);
        }
    
    }

    

    public createPost = async (req : Request, res : Response) : Promise<Response<string>> => {
    
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
            } else {
                return res.status(400).json({
                    'message': 'Something went wrong'
                })
            }
    
        } catch (error) {
            return res.status(500).json(error);
        }
    
    }
    
    

    public updatePost = async (req : Request, res : Response) : Promise<Response<{ "message" : string, "post" : Post }>> => {
    
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
                const response = await data.json();
                
                return res.status(201).json({
                    'message': 'Post was updated successfully',
                    'post': response
                });
            } else {
                return res.status(400).json({
                    'message': 'Something went wrong'
                })
            }
    
        } catch (error) {
            return res.status(500).json(error);
        }
    
    }
    

    public deletePostById = async (req : Request, res : Response) : Promise<Response<string>> => {
    
        try {
    
            const { postId } = req.params;
    
            const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${ postId }`, {
                method: 'DELETE'
            });
            
            if(data.status === 200) {
                return res.status(200).json({
                    'message': 'Post deleted'
                });
            } else {
                return res.status(400).json({
                    'message': 'Something went wrong'
                })
            }
    
        } catch (error) {
            return res.status(500).json(error);
        }
    
    }




}