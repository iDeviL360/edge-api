import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition : OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: "Api Docs with Express & Swagger",
        version: "1.0.0",
        description: "This is a simple doc of an API made with Express, that uses an external services provided by https://jsonplaceholder.typicode.com/",
        contact: {
            name: "Gabriel Gimenez",
            url: "./www.google.com",
            email: "gabriel.gimenez.centeno97@gmail.com"
        },
    },
    servers: [
        {
            url: "http://localhost:3000/"
        }
    ],
    components: {
        schemas: {
            post: {
                type: "object",
                required: ["title", "body", "userId"],
                properties: {
                    id: {
                        type: 'number',
                        description: 'The post id'
                    },
                    title: {
                        type: 'string',
                        description: 'Title of the post'
                    },
                    body: {
                        type: 'string',
                        description: 'Body of the post'
                    },
                    userId: {
                        type: 'number',
                        description: 'User who created the post'
                    }
                },
                example: {
                    id: 1,
                    title: "sunt aut facere repellat",
                    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita",
                    userId: 1
                }
            }
        },
        parameters: {
            postId: {
                in: 'path',
                name: 'postId',
                required: true,
                schema: {
                    type: 'number'
                },
                description: 'Id of the post'
            }
        }
    },
    tags: [
        {
            name: "posts",
            description: ""
        }
    ],
    
}


const swaggerOptions : OAS3Options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"]
}

export default swaggerJSDoc(swaggerOptions);
