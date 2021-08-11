# RESTApi-Typescript-JWTAuthentication-MongoDB
## Description

Software of Development to Authentication of users with Typescript, Express, Mongoose, Bcrypt, JWT, etc.

![alt text](https://user-images.githubusercontent.com/43285317/45602339-ae69a100-b9d9-11e8-919b-a41b1c2fa66e.png)

## Installation
Using Typescript 4.3, NodeJS 16.2 preferably.

## DataBase
Using MongoDB preferably.

## Apps
Using Postman or RestEasy to feed the api.

## Usage
```html
$ git clone https://github.com/DanielArturoAlejoAlvarez/RESTApi-Typescript-JWTAuthentication-MongoDB.git [NAME APP] 

$ npm install

$ npm run dev (development)

```
Follow the following steps and you're good to go! Important:

![alt text](https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2020/04/missingReturnValue-3-9.gif)

## Coding

### Controllers
```typescript
...
export const signUp = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { displayName, email, username, password, avatar, roles, status } =
      req.body;

    const newUser: IUser = new User({
      displayName,
      email,
      username,
      password,
      avatar,
      status,
    });

    newUser.password = (await newUser.encryptPassword(password)).toString();

    //roles
    if (req.body.roles) {
      const arrayRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = arrayRoles.map((role: any) => role._id);
    } else {
      const role = Role.findOne({ name: "USER" });
      newUser.roles = [role._id];
    }

    const user = await newUser.save();
    console.log(user);

    const token = jwt.sign({ id: user._id }, config.secret_key, {
      expiresIn: 60 * 60,
    });

    return res.header("auth-token", token).status(200).json({
      msg: "User registered successfully!",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
...
```

### Models
```typescript
...
export interface IUser extends Document {
    displayName: string;
    email: string;
    username: string;
    password: string;
    avatar: string;
    roles: any;
    status: boolean;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string, receivePassword: string): Promise<boolean> 
}

const userSchema = new Schema({
    displayName: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        minLength: 4,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        maxLength: 512
    },
    roles: [
        {
            ref: "Role",
            type: Schema.Types.ObjectId
        }
    ],
    status: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false
})

userSchema.methods.encryptPassword = async (password: string): Promise<string>=>{
    const salt = await bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

userSchema.methods.validatePassword = async (password: string, receivePassword: string): Promise<boolean>=>{
    return await bcrypt.compareSync(password, receivePassword)
}

export default model<IUser>('User', userSchema)
...
```

### Routers
```typescript
...
import { Router } from 'express'

const router: Router = Router()

import { profile, signIn,signUp } from '../controllers/auth/auth.controller'
import { isAuth } from '../middlewares/verifyToken'

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/profile', isAuth, profile)

export default router
...
```

### Middlewares
```typescript
...
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("auth-token");

    if (!token)
      return res.status(401).json({
        msg: "Access denied!",
      });

    const payload = jwt.verify(token, config.secret_key) as IPayload;

    req.userId = payload.id

    console.log(payload);
    console.log(req.userId)

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const checkRolesExists = async (req: Request, res: Response, next: NextFunction)=>{
    const arrayRoles: Array<string> = req.body.roles 

    if(req.body.roles) {
        for (let i = 0; i < arrayRoles.length; i++) {
            if(!ROLES.includes(arrayRoles[i])) {
                return res.status(401).json({
                    msg: `Role ${arrayRoles[i]} does not exixts`
                })
            }           
        }
    }

    next()
}

export const isSuperAdmin = async (req: Request,res: Response,next: NextFunction)=>{
    try {
        const user = await User.findById(req.userId)

        const roles = await Role.findOne({_id: {$in: user?.roles}})

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name==='SUPERADMIN') {
                next()
                return
            }      
        }
        return res.status(403).json({
            msg: 'Require SUPERADMIN Role!'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}
...
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/DanielArturoAlejoAlvarez/RESTApi-Typescript-JWTAuthentication-MongoDB. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
