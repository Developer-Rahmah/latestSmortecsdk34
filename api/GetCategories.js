import client from './constant';

export const getCategories = async()=> {
    const response = await client.post('/allcategories?language_id=1');
    const data = await response;
    return data;
}

export const getCategoryItems = async() =>  {
    const response = client.post('/getallproducts?language_id=1');
    const data = response;
    return data;
}

export const addToWishList = async () =>{
    const response = client.post('/likeproduct?liked_products_id=1&liked_customers_id=1');
    const data =response;
    return data;
}

export const getWishList = async()=>{
    const response = client.post ('/getallproducts?type=wishlist&customers_id=2');
    const data = response;
    return data;
}

export const getOffers= async () => {
    const response = client.post('/getallproducts?page_number=0&type=most liked&language_id=1');
    const data = response;
    return data;
}

export const getItem = async() =>  {
    const response = client.post('/getallproducts?products_id=$1&language_id=1');
    const data = response;
    return data;
}
export const getSearch=(searchValue)=>{
    const response = client.post('/getallproducts',{
                'searchValue':searchValue
               
            });
            const data = response;
            return data;
        
}

// export const getItem = (product_id) =>  {
//     console.log("product_id",product_id)
//     const response = client.post('/getallproducts',{
//         'language_id':1,
//         'page_number':0,
//         'categories_id':product_id
//     });
//     const data = response;
//     return data;
// }

