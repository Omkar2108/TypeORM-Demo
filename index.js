const express = require('express');
const typeorm = require('typeorm');
const app = express();
const userModel = require('./model/User').User;  
const userEntity = require('./entity/User');

const {graphql, buildSchema} = require('graphql');
const {graphqlHTTP} = require('express-graphql');

const schema = buildSchema(
    `type Query {
        User: String
    }`
);
var conn=null;
let root= {User: () => 'Hello   '};
const port = 4001;

typeorm.createConnection({
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'users',
    synchronize: true,
    logging: false,
    entities: [
        userEntity
    ]
}).then(async(connection)=>{
    // console.log(connection);
    conn = connection;
    const userRepository = connection.getRepository(userEntity);
    // var user = new userModel( 'Omkar', 'Password');
    // userRepository.save(user);
    root = {User: async() => await "Hello"} ; 
    console.log(await userRepository.find())
}).catch((err)=>{
    console.log(err);
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
console.log(conn);
app.get('/', (_, res)=>{
    res.send("Hello");
})

app.listen(port, ()=>{
    `Listening on ${port}`
})
