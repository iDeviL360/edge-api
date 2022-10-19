import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { fieldsValidation } from '../middlewares/fields.validations';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema';

const router = Router();
const postController = new PostController();

/**
 * @swagger
 * /posts:
 *  get:
 *      summary: Get a list of posts
 *      tags: [posts]
 *      responses:
 *          200:
 *              description: List of posts
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/post'                      
 *          500:
 *              description: Error message
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: The error message
 * 
 */
router.get('/posts', postController.getPosts);


/**
 * @swagger
 * /posts/{postId}:
 *  get:
 *      summary: Get a post by Id
 *      tags: [posts]
 *      parameters:
 *          - $ref: '#components/parameters/postId'
 *      responses:
 *          200:
 *              description: Get a post by its specific Id
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/post'
 *          500:
 *              description: Error message
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: The error message
 * 
 */
router.get('/posts/:postId', postController.getPostById);


/**
 * @swagger
 * /posts:
 *  post:
 *      summary: Create a new post
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/post'
 *      responses:
 *          200:
 *              description: Message if the post was created successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: response message
 *          400:
 *              description: Bad request message if somes of its properties are missing or are wrong
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  path: 
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          description: Invalid fields
 *                                  message:
 *                                      type: string
 *                                      description: Invalid field message
 *          500:
 *              description: Internal Server Error message
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 */
router.post('/posts', fieldsValidation(createPostSchema), postController.createPost);


/**
 * @swagger
 * /posts/{postId}:
 *  put:
 *      summary: Update a post
 *      tags: [posts]
 *      parameters:
 *          - $ref: '#components/parameters/postId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/post'
 *      responses:
 *          200:
 *              description: Message if the post was updated successfully
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: response message
 *                              post:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: number
 *          400:
 *              description: Bad request message if somes of its properties are missing or are wrong
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  path: 
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          description: Invalid fields
 *                                  message:
 *                                      type: string
 *                                      description: Invalid field message
 *          500:
 *              description: Internal Server Error message
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 */
router.put('/posts/:postId', fieldsValidation(updatePostSchema), postController.updatePost);


/**
 * @swagger
 * /posts/{postId}:
 *  delete:
 *      summary: Delete a post using its id
 *      tags: [posts]
 *      parameters:
 *          - $ref: '#components/parameters/postId'
 *      responses:
 *          200:
 *              description: Delete a post
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *          500:
 *              description: Error message
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: The error message
 * 
 */
router.delete('/posts/:postId', postController.deletePostById);


export default router;