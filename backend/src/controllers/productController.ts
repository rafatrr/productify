import { Request, Response } from "express";
import * as queries from '../db/queries';
// import { getProductById } from "../db/queries";
import { getAuth } from "@clerk/express";


// Get all products
export const getAllProducts = async (req:Request, res:Response) => {
    try{
        const products = await queries.getAllProducts();
        res.status(200).json(products);
    } catch (error){
        console.log('Error fetching products:', error);
        res.status(500).json({error:'Falid to get products'})
    }
};

//get products by current user (protected)
export const getMyProducts = async(req:Request, res:Response) => {
    try{
        const { userId} = getAuth(req)
        if(!userId) return res.status(401).json({error: 'Unauthorized'});
            const products = await queries.getProductsByUserId(userId)
     }catch(error){
        console.log('Error getting user products', error)
        res.status(500).json({error: 'Failed to get products'})
     }
};


//Get  product by id(public) 
export const getProductById  = async (req:Request<{id: string}>, res:Response) => {
    try{
        const { id } = req.params;
        const product = await queries.getProductById(id);
        
        if(!product) return res.status(404).json({error: 'Product not found'});

        res.status(200).json(product);

    } catch (error) {
        console.log('Error fetching product:', error);
        res.status(500).json({error:'Falid to get product'})
    }

};

// Create a new product (protected)
export const createProduct = async(req: Request, res: Response) => {
    try{
        const { userId} = getAuth(req);
        if(!userId) return res.status(401).json({error: 'Unauthorized'});
         
        const { title, desc, imageUrl } = req.body;

        if(!title || !desc || !imageUrl) {
             res.status(400).json({error: ' Title, description and image URL are required '});
             return;
        }
        const product = await queries.creatProduct({title,desc,imageUrl, userId});
        res.status(201).json(product);

    } catch (error) {
        console.log('Error creating product:', error);
        res.status(500).json({error:'Failed to create product'});
    }
}


//Apdate product (protected - owner only)
export const updateProduct= async(req:Request<{id: string}>, res:Response)=> {
    try{
         const { userId }= getAuth(req);
         if(!userId) return res.status(401).json({error: 'Unauthorized'});
         const { id } = req.params;
         const { title, desc, imageUrl } = req.body;
         //check if product exists and belongs to user
         const existingProduct = await queries.getProductById(id);
         if(!existingProduct) {
             res.status(404).json({error: 'Product not found'});
             return;
         } 
         if(existingProduct.userId !== userId) {
            res.status(403).json({error: 'You can only update your own products'});
            return;
         }
         const product = await queries.updateProduct(id, {title, desc, imageUrl});
         res.status(200).json(product);
    } catch (error) {
        console.log('Error updating product:', error);
        res.status(500).json({error:'Failed to update product'});
    }
}


//Delete product (protected - owner only)
export const deleteProduct = async (req:Request<{id: string}>, res:Response)=> {
    try{
        const { userId } = getAuth(req);
        if(!userId){ return res.status(401).json({error: 'Unauthorized'});}
        const { id } = req.params;
        //check if product exists
        const existingProduct = await queries.getProductById(id);
        if(!existingProduct) {
            res.status(404).json({error: 'Product not found'});
            return;
        }
        if(existingProduct.userId !== userId) {
            res.status(403).json({error: 'You can only delete your own products'});
            return;
        }
         await queries.deleteProduct(id);
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        console.log('Error deleting product:', error);
        res.status(500).json({error:'Failed to delete product'});
    }
}