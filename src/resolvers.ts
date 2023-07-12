import { IResolvers } from '@graphql-tools/utils';
import * as bcrypt from 'bcryptjs';
import { User } from "./entity/User";

export const resolvers: IResolvers = {
    Query: {
        hello: () => "hi"
    },
    Mutation : {
        register: async (_, { full_name, email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                full_name,
                email,
                password: hashedPassword
            }).save();             

            return true;
        },
        login: async (_, { email, password }, {req}) => {
            const user = await User.findOne({where: { email }});
            if (!user) {                
                alert("Please enter the correct email. Thank you")
                return null;
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                alert("Incorrect Password!")
                return null;
            }
        
        req.session.userId = user.id;        
        return user;
        }
        
    }
};