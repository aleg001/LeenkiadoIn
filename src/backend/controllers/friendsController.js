const driver = require('../neo4jService')

class FriendController {

    static getFriends = async (req, res) => {
        const session = driver.session()
        try {
        const { ID } = req.body
        const result = await session.run(
            `MATCH (u:User { ID:  $ID})-[r:Connects_to]->(c:User)
            return c.ID, c.fullname`, {ID}
        )
        res.send(result.records)
        } catch (error) {
        res.status(500).send(error)
        } finally {
        await session.close()
        }
    }

    static getUsers = async (req, res) => {
        const session = driver.session()
        try {
        const { ID } = req.body
        const result = await session.run(
            `
            MATCH (n:User)
            WHERE n.ID <> $ID AND NOT EXISTS {
            MATCH (n)-[:Connects_to]-(:User {ID: $ID})
            }
            RETURN n.ID, n.fullname
            `,
            { ID }
        )
        console.log(result)
        res.send(result.records)
        } catch (error) {
            res.status(500).send(error)
        } finally {
            await session.close()
        }
    }

    static addFriend = async (req, res) => {
        const session = driver.session()
        try {
        const { ID, friendID } = req.body
        console.log(ID)
        console.log(friendID)
        const result = await session.run(
            `
            MATCH (n1:User {ID: $ID}), (n2:User {ID: $friendID})
            CREATE (n1)-[:Connects_to]->(n2)
            `,
            { ID, friendID }
        )
        const result2 = await session.run(
            `
            MATCH (n1:User {ID: $ID}), (n2:User {ID: $friendID})
            CREATE (n1)<-[:Connects_to]-(n2)
            `,
            { ID, friendID }
        )
        } catch (error) {
            res.status(500).send(error)
        } finally {
            await session.close()
        }
    }

    static removeFriend = async (req, res) => {
        const session = driver.session()
        try {
        const { ID, friendID } = req.body
        console.log(ID)
        console.log(friendID)
        const result = await session.run(
            `
            MATCH (n1:User{ID: $ID})-[r:Connects_to]-(n2:User{ID: $friendID})
            DELETE r
            `,
            { ID, friendID }
        )
        console.log(result)
        } catch (error) {
            res.status(500).send(error)
        } finally {
            await session.close()
        }
    }

}

module.exports = FriendController