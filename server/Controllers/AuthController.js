import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";



// Register new user
export const registerUser = async (req, res) => {
 const {username, password, firstname, lastname} = req.body;

 const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



 const newUser = UserModel({username,  
    password:hashedPassword, 
    firstname, 
    lastname,})

    try {
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}


export const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await UserModel .findOne ({username})

        if(user) 
        {
            const validity = await bcrypt.compare(password, user.password)

            if(validity)
            {
                res.status(200).json(user)
            }
            else
            {
                res.status(400).json({message:"Invalid Password"})
            }
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}



