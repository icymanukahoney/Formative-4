import {useEffect, useState} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const KindName = ({kind}) => {
    return (
        <>
            <h2>All Birds in types:</h2>
            <h3>Type: {kind.name}</h3>
        </>
    )
}

const AllBirdsInKind = ({params}) => {
    const [birds, setBirds] = useState([])

    const endpoint = `${baseUrl}/birds?kind=${params.id}&_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            setBirds(res.data)
        })
        .catch((err) => console.log(err))
    }, [endpoint])

    const renderedBirds = birds.map((bird, index) => {
        function getFeaturedImage(bird) {
            if (bird && bird._embedded && bird._embedded['wp:featuredmedia'] && bird._embedded['wp:featuredmedia'][0].source_url ) {
                return bird._embedded['wp:featuredmedia'][0].source_url
            } else {
                return 'https://placehold.co/600x400'
            }
        }
        return (
            <div className='bird-container item-container' key={index}>
                <Link className='bird-link' to={`/birds/${bird.id}`}>
                    <img src={getFeaturedImage(bird)} alt={bird.title.rendered} />
                    <h4 className='name'>{bird.title.rendered}</h4>
                </Link>
            </div>
        )
    })

    return (
        <>
         {renderedBirds}
        </>
    )
}

const BirdsViaKinds = () => {
    const [kind, setKind] = useState({})
    const params = useParams()
    const navigate = useNavigate()

    const kindEndpoint = `${baseUrl}/kind/${params.id}`

    useEffect(() => {
        axios.get(`${kindEndpoint}`)
        .then((res) => {
            setKind(res.data)
        })
        .catch((err) => console.log(err))
    }, [kindEndpoint])

  return (
    <div id="birds-via-kind" className='page-container'>
        <button className='goBack-button' onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
        <KindName kind={kind}/>
        <div id="kind-grid" className='grid-container'>
            <AllBirdsInKind params={params}/>
        </div>
    </div>
  )
}

export default BirdsViaKinds
