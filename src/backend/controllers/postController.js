const driver = require('../neo4jService')

class PostController {

    static getPost = async (req, res) => {
        const session = driver.session()
        try {
        const { ID } = req.body
        console.log(ID)
        const result = await session.run(
            `
            MATCH (u:User {ID: $ID})-[:Connects_to]->(f:User)-[:Publishes]->(p:Post)
            RETURN p.content, p.date, f.fullname
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

}

module.exports = PostController