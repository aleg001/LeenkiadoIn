const driver = require('../neo4jService')

class UserController {
  static createUser = async (req, res) => {
    const session = driver.session()
    try {
      const { email, password, fullname } = req.body
      const result = await session.run(
        `CREATE (u:User {fullname: '${fullname.val}', email: '${email.val}', password: '${password.val}' })`
      )
      res.send(result.records)
    } catch (error) {
      res.status(500).send(error)
    } finally {
      await session.close()
    }
  }
  
  static getUser = async (req, res) => {
    const session = driver.session()
    try {
      const { email, password } = req.body
      const result = await session.run(`MATCH (u:User { email: '${email.val}', password: '${password.val}' }) RETURN u`)
      res.send(result)
    } catch (error) {
      res.status(500).send(error)
    } finally {
      await session.close()
    }
  }

  static getUsers = async (req, res) => {
    const session = driver.session()
    try {
      const result = await session.run('MATCH (u:User) RETURN u')
      const users = result.records.map((record) => record.get('u').properties)
      res.send(users)
    } catch (error) {
      res.status(500).send(error)
    } finally {
      await session.close()
    }
  }

}

module.exports = UserController
