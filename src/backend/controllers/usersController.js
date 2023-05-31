class UserController {
  static createUser = async (req, res) => {
    const { email, password, fullname } = req.body
    console.log(email)
    console.log(fullname)
    const session = driver.session()
    try {
        const result = await session.run(`MERGE (u:User {fullname: ${fullname}, email: ${email}, password: ${password}})`)
        res.send(result.records)
    } catch (error) {
        res.status(500).send(error)
    } finally {
        await session.close()
    }
  }
}

export default UserController