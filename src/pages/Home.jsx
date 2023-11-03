import { useState, useEffect} from 'react'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';



const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Home = () => {

    // Loading state
  const [loading, setLoading] = useState(true)
  // Posts state - they change based on the posts on the API
  const [posts, setPosts] = useState(null)

  const endpoint = `${baseUrl}/posts?_embed`

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      console.log(res.data)
      setPosts(res.data)
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

  function getFeaturedImage(post) {
    if (post && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url ) {
        return post._embedded['wp:featuredmedia'][0].source_url
    } else {
        return 'https://placehold.co/600x400'
    }
}

  const Posts = ({posts}) => {
    const mappedPosts = posts.map((post, index) => {
      return (
        <div key={post.slug + "-" + index} className='post-container'>
            <img src={getFeaturedImage(post)} alt="" />
          <h4 className='title'>{post.title.rendered}</h4>
          <li key={post.slug + "-" + index}>
            <a href={`#/post/${post.id}`}>Read More</a>
          </li>
        </div>
      )
    })

    return (
      <>
        {mappedPosts}
      </>
    )
  }

  // RETURN OF THE HOME COMPONENT
  return (
    <>
      <Helmet>
  <title>West Coast Penguin Trust - Home</title>
  <meta name="description" content="Supporting and conserving penguins and seabirds on the West Coast of New Zealand." />
  <meta name="keywords" content="west-coast-penguin, west-coast-seabirds, new-zealand-penguin, blue-penguin, little-penguin, fiordland-crested-penguin" />

  {/* Facebook Open Graph Meta Tags */}
  <meta property="og:title" content="West Coast Penguin Trust" />
  <meta property="og:description" content="Supporting and conserving penguins and seabirds on the West Coast of New Zealand." />
  <meta property="og:image" content="https://formative-4-20sca9osy-icymanukahoney.vercel.app/images/littlebluepe.jpg" />
  <meta property="og:url" content="https://formative-4-20sca9osy-icymanukahoney.vercel.app" />
  <meta property="og:type" content="website" />
</Helmet>

   
    <div>
      <div className="fullscreen-image-container">
        <div className="fullscreen-image">
          <img src="/images/littlebluepe.jpg" alt="Little Blue Penguin" />
        </div>
      </div>
        <div className="home-page">
        <h2>Our Vision</h2>
        <p>Sea and shore birds, and their habitat across the West Coast Te Tai Poutini, are healthy and thriving.</p>
        <h2>Our Mission</h2>
        <p>To achieve this through research, education, awareness, advocacy and practical projects, founded on strong science.</p>
        <p>Penguins and other seabirds are a treasure or taonga, and we strive to protect and conserve them and their habitat – the wider marine and coastal environment.</p>
        
        </div>
    <div className='container'>
      <h2>Birds We Protect</h2>
      <div id='homeCont'>
        {loading ? <p>Loading...</p> : <Posts posts={posts}/>}
      </div>
    </div>
    <div className="fullscreen-image-container">
        <div className="fullscreen-image-west-coast">
          <img src="/images/WestCoast-db16bb9fdf594fd4871c6344616ed729.jpg" alt="West Coast" />
        </div>
      </div>
      <div className='container-two'>
        
      </div>
    </div>
    </>
  )
}

export default Home

