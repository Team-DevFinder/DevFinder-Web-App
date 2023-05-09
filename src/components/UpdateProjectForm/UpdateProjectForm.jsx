import React, { useEffect, useState } from 'react'
import styles from './UpdateProjectForm.module.css'
import { useAxios } from "../../utils/useAxios"
import { baseURL } from '../../utils/config'
import { useNavigate, useLocation } from 'react-router-dom'
import { locale } from 'dayjs'

export const UpdateProjectForm = () => {

  const api = useAxios();
  const location = useLocation();
  const navigate = useNavigate();

  const [project, setProject] = useState();
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = async () => {
    setTags([...tags, newTag]);
    const response = await api.post(`${location.state.url}tags/create/`, {name: newTag})
    console.log(response);
    setNewTag('');
  };

  const fetchProject = async () => {
    const response = await api.get(`${location.state.url}`)
    console.log(response);
    setProject(response.data);
    setTags(response.data.tags.map((tag) => (tag.name)))
  }

  useEffect(() => {
    fetchProject();
  }, [])

  const dummyData = {
    title: "Updated title aasdasdlife",
    description: "This is some descriptionnnnnn",
    demoLink: "https://github.com/atharvabhide/DevFinder/tree/dev/backend",
    sourceLink: "https://github.com/atharvabhide/DevFinder/tree/dev/backend",
  }

  const [selectedFile, setSelectedFile] = useState(null); 



  const updateProject = async () => {
    const formData = new FormData();

    formData.append("title", project.title);
    formData.append("description", project.description);
    formData.append("demoLink", project.demoLink);
    formData.append("sourceLink", project.sourceLink);

    if (selectedFile != null)
    {
      formData.append("featuredImage", selectedFile);
    }

    const response = await api.patch(`${location.state.url}update/`, formData);
    console.log(response);
    if (response.status == 200)
    {
      navigate(`/account`);
    }
  }

  return (
    <>
        <div className={styles.wrapper}>
        <form className={styles.form} action="" onSubmit={(e) => {e.preventDefault();}}>
            <p className={styles.formTitle}>Update Project</p>
            <input type="text" className={styles.inputField} placeholder='Title' onChange={ (e) => {setProject({...project, title: e.target.value,})} } value={project?.title} />
            <textarea className={styles.bio} name="Bio" id="" cols="30" rows="10" placeholder='About' onChange={ (e) => {setProject({...project, description: e.target.value,})} } value={project?.description} ></textarea>
            
            <div className={styles.uploadContainer}>
              <label>Project Image</label>
              <input type="file" onChange={(e) => {console.log(e.target.files[0]); setSelectedFile(e.target.files[0]);}}/> 
            </div>
            <input type="url" className={styles.inputField} placeholder='Demo Link' onChange={ (e) => {setProject({...project, demoLink: e.target.value,})} } value={project?.demoLink}/>
            <input type="url" className={styles.inputField} placeholder='Source Code' onChange={ (e) => {setProject({...project, sourceLink: e.target.value,})} } value={project?.sourceLink} /><br />

            <div>
              <label htmlFor="newTag">Tags:</label>
              <input
                type="text"
                id="newTag"
                // value={newTag}
                onChange={(e) => (setNewTag(e.target.value))}
              />
              <button type="button" onClick={handleAddTag}>
                Add Tag
              </button>
            </div>

            <div>
              {tags.map((tag, index) => (
                <span key={index} className="tag" style={{marginLeft: "0.5rem"}}>
                  {tag}
                </span>
              ))}
            </div>

            <input type="submit" className={styles.submitButton} value="Submit" onClick={updateProject}  />
            


        </form>
    </div>
    </>
  )
}
