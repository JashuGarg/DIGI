import { items } from "../models/items.models.js";
import { users } from "../models/users.models.js";
import { getUser } from "../utils/auth.js";



async function adminaddsitems(req, res) {
    const body = req.body;

    const file = req.file;

    if (!body || !body.name || !body.price ) {
        return res.status(404).send({
            mssg: `All fields and image are compulsory`,
            status: "UnSuccessful"
        });
    }

    try {
        const imageUrl = `http://localhost:3000/public/${file.filename}`;

        const item = await items.create({
            itemname: body.name,
            price: body.price,
            discount: body.discount || 0,
            description: body.description,
            category: body.category,
            imageUrl: imageUrl 
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

async function addminsupdateitem(req,res) {
    try {
    const { productId, action } = req.body;
    const token = req.cookies?.usercredentials;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = getUser(token);
    if (!user) return res.status(401).json({ message: "Invalid user" });

    const foundUser = await users.findOne({ email: user.email });
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    // Find the order for this product
    const order = foundUser.orders.find(
      (o) => o.item.toString() === productId
    );

    if (!order) return res.status(404).json({ message: "Item not in cart" });

    // Update quantity
    if (action === "increase") {
      order.quantity += 1;
    } else if (action === "decrease") {
      order.quantity = Math.max(1, order.quantity - 1); // minimum 1
    }

    await foundUser.save();

    // Return updated orders with populated items
    const updatedUser = await users
      .findById(foundUser._id)
      .populate("orders.item")
      .lean();

    res.json({ success: true, orders: updatedUser.orders });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "Server error" });
  }

}

async function userdeleteitem(req,res){
     try {
    const { productId } = req.body;
    const token = req.cookies.usercredentials;
    const user = getUser(token);

    const foundUser = await users.findOne({ email: user.email });
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    foundUser.orders = foundUser.orders.filter(
      (order) => order.item.toString() !== productId
    );

    await foundUser.save();

    res.json({ success: true, message: "Item removed", orders: foundUser.orders });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Server error" });
  }
}
// async function sellingproducts(req,res){
//    try {
    
//         let user = await  users.findOne({email:req.user.email});
//         // console.log(user);
   
//         user.orders.push(req.params.id);
//         // console.log(user);
    
//         await user.save();
//         await user.populate("orders");
//         return res.status(200).send({
//             message: "Order added successfully",
//             orders: user.orders
//             });

//    } catch (error) {
//             return res.status(500).send({
//                 message: `error in fetching : ${error}`,
//                 });       
//    }
// }
//for laptops
async function laptop(req,res){

        try {
            const laptop = await items.find({category:"laptop"})
            // console.log(earphones);
            res.json(laptop);
            
        } catch (error) {
            console.log( "earphones route error :",error );
        }
        
}
// mobiles
async function mobile(req,res) {
    try {
        const mobiles = await items.find({category:"mobile"})

        res.json(mobiles)
    } catch (error) {
        console.log("Mobiles Get error:  ",error);
    }
}
//watches
async function watches(req,res) {
    try {
        const mobiles = await items.find({category:"watch"})

        res.json(mobiles)
    } catch (error) {
        console.log("Mobiles Get error:  ",error);
    }
}
// earphones
async function earphones(req,res) {
    try {
        const earphones = await items.find({category:"earphone"})

        res.json(earphones)
    } catch (error) {
        console.log("earphones Get error:  ",error);
    }
}

//consoles
async function console(req,res) {
    try {
        const console = await items.find({category:"console"})

        res.json(console)
    } catch (error) {
        console.log("Mobiles Get error:  ",error);
    }
}

//speakers
async function speakers(req,res) {
    try {
        const speaker = await items.find({category:"speaker"})

        res.json(speaker)
    } catch (error) {
        console.log("Mobiles Get error:  ",error);
    }
}



async function addtocart(req, res) {
  try {
    const body = req.body;
    const userData = getUser(req.cookies?.usercredentials);
    const user = await users.findById(userData._id);
  

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    user.orders.push({
        item: body.productId,
        quantity:1 
    });
    await user.save();
    await user.populate("orders");

    
    return res.status(200).json({
      message: "Product added to cart successfully",
      orders: user.orders, 
    });

  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({
      message: `Error adding to cart: ${error.message}`,
    });
  }
}


async function getitemdata(req,res){

    const body = req.body;
    const item = await items.findOne({_id:body});

    res.json(item);
}

export {adminaddsitems,
        laptop,
        speakers,
        console,
        earphones,
        watches,
        mobile,
        addtocart,
        getitemdata,
        addminsupdateitem,
        userdeleteitem
}




