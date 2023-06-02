const driver = require('../neo4jService')

class CommunityController {

    static addCommunity = async (req, res) => {
        const session = driver.session()
        try {
        const { ID, name, role } = req.body
        console.log(ID)
        const result = await session.run(
            `
            MATCH (u:User {ID: $ID})
            MATCH (c:Community {name: $name})
            OPTIONAL MATCH (u)-[r:Member_of]->(c)
            FOREACH (rel IN CASE WHEN r IS NULL THEN [] ELSE [r] END |
                SET rel.Puesto = $role
            )
            FOREACH (ignored IN CASE WHEN r IS NULL THEN [1] ELSE [] END |
                CREATE (u)-[:Member_of {Fecha: date(), Puesto: $role}]->(c)
            )
            `,
            { ID, name, role }
        )
        } catch (error) {
            res.status(500).send(error)
        } finally {
            await session.close()
        }
    }

}

module.exports = CommunityController