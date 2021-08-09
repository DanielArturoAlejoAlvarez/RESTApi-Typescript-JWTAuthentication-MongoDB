import Role from '../models/Role'

export const createRole = async ()=>{
    try {
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return
        const values = await Promise.all([
            new Role({name: 'SUPERADMIN'}),
            new Role({name: 'ADMIN'}),
            new Role({name: 'USER'}),
        ])
        console.log(values)
    } catch (err) {
        console.log(err)
    }
}