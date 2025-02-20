const Product = require('../modeles/productModeles'); // Fixed typo in 'models'
const cloudinary = require('../utile/cloudinary'); // Import Cloudinary config

const postProducts = async (req, res) => {
    try {
        let image=null;
        if (req.file) {

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
           image=uploadResult ? uploadResult.secure_url:null;
        }
        // Extract fields from request body
        const { title, description, price, category, size } = req.body;

        // Create product in database
        const product = await Product.create({
            title,
            description, // Fixed typo (discription -> description)
            price: parseFloat(price),
            category,
            size,
            image,// Store Cloudinary URL instead of local file path
            user: req.params.id
        });

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


const getProducts=async(req,res)=>{
    
}

// Export module properly
module.exports = { postProducts };
