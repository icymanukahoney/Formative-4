import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import { Hourglass } from 'react-loader-spinner';


//Product Endpoint from our env 
const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL;


const Shopfront = () => {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${productsUrl}`)
        .then((res) => {
            console.log(res.data)
            setProducts(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])
    if (loading) {
        return (
          <div className="loader-container">
            <Hourglass
              visible={true}
              height={80}
              width={80}
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={['#306cce', '#72a1ed']}
            />
          </div>
        );
      }

    const Products = ({products}) => {
        console.log({products})
        const mappedProducts = products.map((product, index) => {

            function getFeaturedImage(product) {
                if (product && product.images && product.images[0] ) {
                    return product.images[0].src
                } else {
                    return 'https://placehold.co/600x400'
                }
            } // end of getFeatured Image
            return (
                <div className='product-conatiner item-container' key={index}>
                    <img className='product-image' src={getFeaturedImage(product)} alt="Product Image"/>
                    <Link className='product-link' to={`/product/${product.id}`}>
                    <h4 className='name'>{product.name}</h4>
                    </Link>
                    <h3 className='name'>
                        ${((parseFloat(product.prices.regular_price)) / 100).toFixed(2)} {product.prices.currency_code}</h3>
                    <h4 className='name'>
                        ${((parseFloat(product.prices.sale_price)) / 100).toFixed(2)} {product.prices.currency_code}</h4>
                </div>
           ) // end of map return
        }) // end of map

         // return for products
        return (
            <>
                {mappedProducts}
            </>
        )
    }// end of Products

 // shopfront return
  return (

    <>
    <Helmet>
  <title>West Coast Penguin Trust - Shop page</title>
  <meta name="description" content="Supporting and conserving penguins and seabirds on the West Coast of New Zealand." />
  <meta name="keywords" content="west-coast-penguin-trust-shop" />

  {/* Facebook Open Graph Meta Tags */}
  <meta property="og:title" content="West Coast Penguin Trust" />
  <meta property="og:description" content="Supporting and conserving penguins and seabirds on the West Coast of New Zealand." />
  <meta property="og:image" content="https://maria.stromova.yoobeestudent.net/formative2/wp-content/uploads/2023/10/TumbleweedTees-kids-tshirt-gold-little-penguin.jpg" />
  <meta property="og:url" content="https://formative-4-20sca9osy-icymanukahoney.vercel.app/#/shop" />
  <meta property="og:type" content="website" />
</Helmet>
    
    <div id='shop-page' className='container'>
    <h2>Shop</h2>
    <div id='product-grid' className='grid-container'>
            {loading ? <Loading/> : <Products products={products}/>}
     </div>
</div>
</>
  )
}

export default Shopfront
