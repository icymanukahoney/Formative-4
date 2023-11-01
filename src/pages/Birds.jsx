import {useEffect, useState} from 'react'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL
console.log(baseUrl);

const Birds = () => {
    const [loading, setLoading] = useState(true)
    const [birds, setBirds] = useState(null)

    const endpoint = `${baseUrl}/birds?_embed`

    useEffect(() => {
        axios.get(endpoint)
        .then((res) => {
            console.log(res.data)
            setBirds(res.data)
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

    function getFeaturedImage(bird) {
        if (bird && bird._embedded && bird._embedded['wp:featuredmedia'] && bird._embedded['wp:featuredmedia'][0].source_url ) {
            return bird._embedded['wp:featuredmedia'][0].source_url
        } else {
            return 'https://placehold.co/600x400'
        }
    }

    const Birds = ({birds}) => {
        const mappedBirds = birds.map((bird, index) => {
            return (
               
                <div key={bird.slug + "-" + index} className='post-container'>
                     <img src={getFeaturedImage(bird)} alt="bird-image" />
                    <h4 className='title'>{bird.title.rendered}</h4>
                    <li>
                        <a href={`#/birds/${bird.id}`}>Read More</a>
                    </li>
                </div>
             
            )
        })
        return (
            <>
                {mappedBirds}
            </>
        )
    }



  return (
<>
    <Helmet>
    <title>{birds[0].title.rendered}</title>
    <meta name='description' content={birds[0].acf.description}/>
    <meta name='keywords' content={`${birds[0].acf.keyword1}, ${birds[0].acf.keyword2}, ${birds[0].acf.keyword3}`}/>
   </Helmet>

<div className='container'>
    <h2>Our Birds</h2>
    <div id='homeCont'>
        {loading ? <p>Loading...</p> : <Birds birds={birds}/>}
    </div>
</div>
</>
  )
}

export default Birds
