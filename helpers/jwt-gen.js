import jwt from 'jsonwebtoken'

export const genJWT = (uid = '') => {
    return new Promise((res, rej) => {
        const payload = { uid }
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '4h'
            },
            (err, token) => {
                if (err) {
                    console.log(err)
                    rej(`Can't gen token`)
                } else {
                    res(token)
                }
            }
        )
    })
}
