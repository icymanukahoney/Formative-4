import {useState, useEffect} from 'react'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;


const Project = () => {

      // Loading state
  const [loading, setLoading] = useState(true)
  // project state - they change based on the posts on the API
  const [projects, setProjects] = useState(null)
  
  const endpoint = `${baseUrl}/projects?_embed`

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      console.log(res)
      setProjects(res.data)
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

  function getFeaturedImage(project) {
    if (project && project._embedded && project._embedded['wp:featuredmedia'] && project._embedded['wp:featuredmedia'][0].source_url ) {
        return project._embedded['wp:featuredmedia'][0].source_url
    } else {
        return 'https://placehold.co/600x400'
    }
}

  const Projects = ({ projects }) => {
    
    const mappedProjects = projects.map((project, index) => {
      const type = project.acf.project_type
        //console.log("projects data:", projects);
      return (
        
      
      
        <div key={project.slug + "-" + index} className="post-container">
            <img src={getFeaturedImage(project)} alt="project-image" />
          <h4 className="title">{project.title.rendered}</h4>
          <div>Key: {project.slug + "-" + index}</div>
          <p>{type.toUpperCase()}</p>
          <li key={project.slug + "-" + index}>
            <a href={`#/project/${project.id}`}>Read</a>
          </li>
        </div>

       
      )
    })
    
    console.log({ mappedProjects });
    
    return (
      <>
        {/* All our projects are here! */}
        {mappedProjects}
      </>
    )
  }

  return (
   
    <div className='container'>
       {projects && projects.length > 0 && (
        <Helmet>
          <title>{projects[0].title.rendered}</title>
          <meta name="description" content={projects[0].acf.description} />
          <meta
            name="keywords"
            content={`${projects[0].acf.keyword1}, ${projects[0].acf.keyword2}, ${projects[0].acf.keyword3}`}
          />
        </Helmet>
      )}

      <h2>Our Projects</h2>
      <div id='projectsCont'>
        {loading ? <p>Loading...</p> : <Projects projects={projects}/>}
      </div>
    </div>
  
  )
}

export default Project
