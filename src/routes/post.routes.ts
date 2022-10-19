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
 *                              mensaje:
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
 *              description: Get a post using its specific Id
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
 *                              mensaje:
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
 *          500:
 */
router.post('/posts', fieldsValidation(createPostSchema), postController.createPost);

router.put('/posts/:postId', fieldsValidation(updatePostSchema), postController.updatePost);

router.delete('/posts/:postId', postController.deletePostById);


export default router;