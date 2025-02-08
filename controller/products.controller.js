const Product = require('../modeles/product.modeles'); // Fixed typo in 'models'
const cloudinary = require('../utile/cloudinary'); // Import Cloudinary config
const fs = require('fs'); // To delete local file after upload

const postProducts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'File to upload required' });
        }

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'products' // Optional: Organize images in a folder
        });

        // Extract fields from request body
        const { title, description, price, category, size } = req.body;

        // Create product in database
        const product = await Product.create({
            title,
            description, // Fixed typo (discription -> description)
            price: parseFloat(price),
            category,
            size,
            image: uploadResult.secure_url, // Store Cloudinary URL instead of local file path
            user: req.params.id
        });

        // Delete the locally uploaded file after Cloudinary upload
        fs.unlinkSync(req.file.path);

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
