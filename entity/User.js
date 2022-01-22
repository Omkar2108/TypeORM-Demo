const { EntitySchema } = require('typeorm');
const User = require('../model/User').User;


module.exports = new EntitySchema({
    name: 'User',
    target: User,
    columns: {
        id:{
            primary: true,
            type: "int",
            generated: true
        },
        email: {
            type: 'varchar'
        },
        password: {
            type: 'varchar'
        },
    }
})