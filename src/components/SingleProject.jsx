import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'
import { Hourglass } from 'react-loader-spinner'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const SingleProject = () => {

    const {id} = useParams()
    // Loading state
    const [loading, setLoading] = useState(true)
    // set a state for the post
    const [singleProject, setProject] = useState(null)
    // call useNavigate
    const navigate = useNavigate()

    // Set endpoint for a single post
    const endpoint = `${baseUrl}/projects/${id}?_embed`

    // useEffect
    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            setProject(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [id])

    function getFeaturedImage(dinosaur) {
        if (singleProject && singleProject._embedded && singleProject._embedded['wp:featuredmedia'] && singleProject._embedded['wp:featuredmedia'][0].source_url ) {
            return singleProject._embedded['wp:featuredmedia'][0].source_url
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
    <div key={singleProject.slug} className='project-container'>
        <h4 className='title'>{singleProject.title.rendered}</h4>
        <img src={getFeaturedImage(singleProject)} alt="" />
        <div dangerouslySetInnerHTML={{__html: singleProject.content.rendered}}/>
        <div className='key'>Key: {singleProject.slug}</div>
    </div>
</div>
  )
}

export default SingleProject
