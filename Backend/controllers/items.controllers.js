import { items } from "../models/items.models.js";
import { users } from "../models/users.models.js";



async function adminaddsitems(req, res) {
    const body = req.body;
    // console.log(body);
    

    if (!body || !body.name || !body.price) {
        return res.status(404).send({
            mssg: `All fields and image are compulsory`,
            status: "UnSuccessful"
        });
    }

    try {
        const item = await items.create({
            itemname: body.name,
            price: body.price,
            discount: body.discount || 0,
            description: body.description,
        });

        return res.status(201).send({
            mssg: `Item : ${body.name} added to the webpage`,
            status: "Successful",
            data: item
        });

    } catch (error) {
        return res.status(502).send({
            mssg: `Error in adding the item : ${error.message}`,
            status: "UnSuccessful"
        });
    }
}


async function sellingproducts(req,res){
   try {
    
        let user = await  users.findOne({email:req.user.email});
        // console.log(user);
   
        user.orders.push(req.params.id);
        // console.log(user);
    
        await user.save();
        return res.status(200).send({
            message: "Order added successfully",
            orders: user.orders
            });

   } catch (error) {
            return res.status(500).send({
                message: `error in fetching : ${error}`,
                });       
   }
}

export {adminaddsitems,
        sellingproducts
}




