import {useState, useEffect} from 'react'
import {ArrowLeft} from "react-bootstrap-icons"
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { Hourglass } from 'react-loader-spinner'

// Products Url
const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL

const Product = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    


    const endpoint = `${productsUrl}/${id}`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setProduct(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            //const loader = setTimeout(() => setLoading(false), 2000) 
            setLoading(false)
        })
    }, [endpoint])

   

    function getFeaturedImage(product) {
        if (product && product.images && product.images[0] ) {
            return product.images[0].src
        } else {
            return 'https://placehold.co/600x400'
        }
    } // end of getFeatured Image

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

  return (
    <div id="shop-page" className='container'>
        <div className='product-container item-container'>
            <button className='goBack-button' onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
            <img className='product-image' src={getFeaturedImage(product)} alt="Product Image"/>
            <h4 className='name'>{product.name}</h4>
            <h3>${((parseFloat(product.prices.price)) / 100).toFixed(2)}</h3>
            <button className='add-button'>Add to Cart</button>
        </div>
        <div
            id="product-description"
            dangerouslySetInnerHTML={{__html: product.description}}/>
    </div>
  )
}

export default Product
