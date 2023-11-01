import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from "react-router-dom"
import {ArrowLeft} from 'react-bootstrap-icons'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'


const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Kinds = ({bird}) => {
    const [taxonomies, setTaxonomies] = useState([])

    useEffect(() => {
        if (!bird) {
            return
        }

        const taxonomyEndpoint = bird._links["wp:term"][0].href

        axios.get(`${taxonomyEndpoint}`)
        .then((res) => {
            console.log('bird taxonomy call')
            setTaxonomies(res.data)
        })
        .catch((err) => console.log(err))
    }, [bird])

   const renderedTaxonomies = taxonomies.map((taxonomy, index) => {
        return (
            <Link to={`/kind/${taxonomy.id}`} key={index}>
                <span className='taxonomy-term-pill'>
                    {taxonomy.name}
                </span>
            </Link>
        )
   })
   return (
    <div>
        {renderedTaxonomies}
    </div>
)
}

const Bird = () => {
    const [bird, setBird] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    const navigate = useNavigate()

    const endpoint = `${baseUrl}/birds/${id}?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setBird(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    

    // set images
    function getFeaturedImage(bird) {
        if (bird && bird._embedded && bird._embedded['wp:featuredmedia'] && bird._embedded['wp:featuredmedia'][0].source_url ) {
            return bird._embedded['wp:featuredmedia'][0].source_url
        } else {
            return 'https://placehold.co/600x400'
        }
    }
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
    <div className='container'>
        <button className='goBack-button' onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
       
        <div key={bird.slug} className='post-container-bird'>
            <h4 className='title'>{bird.title.rendered}</h4>
            <img src={getFeaturedImage(bird)} alt="Bird featured Image"/>
            <Kinds bird={bird}/>
            <div dangerouslySetInnerHTML={{__html: bird.content.rendered}}/>
        </div>
    </div>
  )
}

export default Bird