const driver = require('../neo4jService')

class UserController {
  static createUser = async (req, res) => {
    const session = driver.session()
    console.log(req.body)
    try {
        const { email, password, fullname } = req.body
        const result = await session.run(`CREATE (u:User {fullname: '${fullname.val}', email: '${email.val}', password: ${password.val} })`)
        res.send(result.records)
    } catch (error) {
        res.status(500).send(error)
    } finally {
        await session.close()
    }
  }
}

module.exports = UserController