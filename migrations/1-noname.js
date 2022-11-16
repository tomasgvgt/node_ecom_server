'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Categories", deps: []
 * createTable "Users", deps: []
 * createTable "Customers", deps: [User]
 * createTable "Orders", deps: [Customer]
 * createTable "Products", deps: [Categorie]
 * createTable "OrderProducts", deps: [Orders, Products]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2022-11-16T21:21:44.086Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Categories",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Customers",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "phone": {
                    "type": Sequelize.STRING,
                    "field": "phone",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true,
                    "field": "UserId",
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "User",
                        "key": "id"
                    },
                    "unique": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Orders",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "CustomerId": {
                    "type": Sequelize.INTEGER,
                    "field": "CustomerId",
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Customer",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Products",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name",
                    "allowNull": false
                },
                "price": {
                    "type": Sequelize.SMALLINT,
                    "field": "price",
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.TEXT,
                    "field": "description",
                    "allowNull": false
                },
                "CategoryId": {
                    "type": Sequelize.INTEGER,
                    "field": "CategoryId",
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Categorie",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "OrderProducts",
            {
                "amount": {
                    "type": Sequelize.INTEGER,
                    "field": "amount",
                    "allowNull": false
                },
                "OrderId": {
                    "type": Sequelize.INTEGER,
                    "unique": "OrderProducts_ProductId_OrderId_unique",
                    "primaryKey": true,
                    "field": "OrderId",
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Orders",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "ProductId": {
                    "type": Sequelize.INTEGER,
                    "unique": "OrderProducts_ProductId_OrderId_unique",
                    "primaryKey": true,
                    "field": "ProductId",
                    "onDelete": "SET NULL",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "Products",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
