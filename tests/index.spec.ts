import request from 'supertest';
import app from '../src/app';
import { Post } from '../src/models/Post';


describe('GET /posts', () => {

    test("should receive a status code of 200", async () => {
        const response = await request(app).get('/posts').send();
        expect(response.statusCode).toBe(200);
    })


    test("should receive an array that have at least 1 object", async () => {
        const response = await request(app).get('/posts').send();
        expect(response.body.length).toBeGreaterThan(0);
    })


    test("should be an object of type post", async () => {

        const expectedPost : Post = {
            id: 1,
            title: 'Some title',
            body: 'Some description',
            userId: 1
        }


        const response = await request(app).get('/posts').send();

        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('body');
        expect(response.body[0]).toHaveProperty('userId');
    })

    
})


describe('GET /posts/{postId}', () => {

    test("should receive a status code of 200", async () => {
        const response = await request(app).get('/posts/1').send();
        expect(response.statusCode).toBe(200);
    })


    test("should be an object of type post", async () => {

        const response = await request(app).get('/posts/1').send();

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('body');
        expect(response.body).toHaveProperty('userId');
    })

})


describe('POST /posts', () => {

    const postValue : Post = {
        title: 'Title 1',
        body: 'Some important description',
        userId: 3
    }

    test("should receive a status code of 201", async () => {
        const response = await request(app).post('/posts').send(postValue);
        expect(response.statusCode).toBe(201);
    })


    test("should fail and receive a statusCode of 400 if one of their properties are missing", async () => {

        const invalidPost : any = { ...postValue }
        delete invalidPost.title;

        const response = await request(app).post('/posts').send(invalidPost);
        expect(response.statusCode).toBe(400);
    })

})


describe('PUT /posts/{ postId }', () => {

    const postValue : Post = {
        title: 'Title 1',
        body: 'Some important description',
        userId: 3
    }

    test("should receive a status code of 201 if the post was updated succesfully", async () => {
        const response = await request(app).put('/posts/1').send(postValue);
        expect(response.statusCode).toBe(201);
    })


    test("should fail and receive a statusCode of 400 if one of their properties are invalid", async () => {

        const invalidPost = { ...postValue }
        invalidPost.title = '1';

        const response = await request(app).post('/posts').send(invalidPost);
        expect(response.statusCode).toBe(400);
    })

})


describe('DELETE /posts/{ postId }', () => {


    test("should receive a status code of 200 if the post was deleted", async () => {
        const response = await request(app).delete('/posts/1').send();
        expect(response.statusCode).toBe(200);
    })


})