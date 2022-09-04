export const getUsers = (req = request, res = response) => {
    const { q, name = 'No name', apiKey } = req.query

    res.json({
        msg: 'Get Hello from controller',
        q,
        name,
        apiKey
    })
}
export const updateUsers = (req, res) => {
    const id = req.params.idUser
    res.json({
        msg: `The user with user ID ${id}`
    })
}
export const addUser = (req, res) => {
    const { name, age } = req.body
    res.json({
        msg: 'Post Hello from controller',
        name,
        age
    })
}
export const deleteUser = (req, res) => {
    res.json({
        msg: 'Delete Hello from controller'
    })
}
export const patchUser = (req, res) => {
    res.json({
        msg: 'Patch Hello from controller'
    })
}
