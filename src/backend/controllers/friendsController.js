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
      console.log(result)
      res.send(result.records)
    } catch (error) {
      res.status(500).send(error)
    } finally {
      await session.close()
    }
  }

}

module.exports = FriendController
