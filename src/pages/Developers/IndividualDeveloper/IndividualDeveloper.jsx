import React from 'react'
import styles from './IndividualDeveloper.module.css'
import {ProjectCard} from '../../../components/ProjectCard/ProjectCard'
// import {ShortProjectCard} from '../IndividualDeveloper/ShortProjectCard'
import ProjectImage from '../../../assets/banner5.jpg'
import ProfileImage from '../../../assets/nalla.jpg'
import {TiLocation} from 'react-icons/ti'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useAxios } from '../../../utils/useAxios'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal } from '../../../components/Modal/Modal'
import { AuthContext } from '../../../context/AuthContext'

export const IndividualDeveloper = () => {

  const {currentUUID} = useContext(AuthContext);

  const [profile, setProfile] = useState();
  const [project, setProject] = useState([]);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  
  const api = useAxios();

  const location = useLocation();
  

  const fetchProfile = async () => {
    console.log(location);
    const profileUrl = location.state.url;
    const response = await api.get(profileUrl);
    console.log("profile", response.data);
    setProfile(response.data)


    // projects
    const projectsResponse = await api.get(`${profileUrl}projects/`)
    console.log("projects", projectsResponse);
    setProject(projectsResponse.data.results);
  }
  
  useEffect(() => {
    fetchProfile();
  }, [])

  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    const response = await api.get(`${location.state.url}skills/`);
    console.log("skills", response);
    setSkills(response.data);
  }

  useEffect(() => {
    fetchSkills();
  }, [])

  return (
    <>
        <div className={styles.wrapper}>
          <div className={styles.developer}>
            <div className={styles.developerProfile}>
              <div className={styles.developerCard}>
                <div>
                <img src={profile?.profileImage} className={styles.developerImage} alt="" />
                </div>
                <div>
                <p className={styles.developerName}><b>{profile?.username}</b></p>
                <p className={styles.developerPosition}>{profile?.shortIntro}</p>
                
                <p className={styles.developerLocation}><TiLocation size={22} />: </p>

                <button className={styles.sendBtn} onClick={()=>{navigate('/send-message', {state: {url: location.state.url}})}}>Send Message</button>
                </div>
                

              </div>

            </div>
            <div className={styles.developerInfo}>
              <div className={styles.about}>
                <h2><b>ABOUT ME</b></h2>
                <p>{profile?.bio}</p>
              </div><hr />
              <div className={styles.skillSection}>
                <h2>SKILLS</h2>
                <div className={styles.skill}>
                  <p className={styles.skillName}>Django</p>
                  <p className={styles.skillInfo}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit maxime magni numquam enim aut dolorum ducimus, mollitia, molestias impedit obcaecati totam veritatis aliquid ut illo amet fuga pariatur, quidem harum!</p>

                </div>
                <div className={styles.skill}>
                  <p className={styles.skillName}>Django</p>
                  <p className={styles.skillInfo}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit maxime magni numquam enim aut dolorum ducimus, mollitia, molestias impedit obcaecati totam veritatis aliquid ut illo amet fuga pariatur, quidem harum!</p>

                </div>
                <div className={styles.skill}>
                  <p className={styles.skillName}>Django</p>
                  <p className={styles.skillInfo}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit maxime magni numquam enim aut dolorum ducimus, mollitia, molestias impedit obcaecati totam veritatis aliquid ut illo amet fuga pariatur, quidem harum!</p>

                </div>


              </div><hr />
              <h2>OTHER SKILLS</h2><br />
              <div className={styles.otherSkills}>
                <button className={styles.otherSkillsBtn}>Communication</button>
                <button className={styles.otherSkillsBtn}>Leadership</button>
                <button className={styles.otherSkillsBtn}>Communication</button>
                <button className={styles.otherSkillsBtn}>Communication</button>

              </div><hr />
                <h2>PROJECTS</h2>
              <div className={styles.projectSection}>
              
              {project.map((proj) => (
                <ShortProjectCard
                image={proj.featuredImage}
                projectName={proj.title}
                projectDeveloper={proj.owner}
              />
              ))}

              {/* <ShortProjectCard
                image={ProjectImage}
                projectName="Portfolio"
                projectDeveloper="wolfmartel"
                projectFeedback="78%"
                voteCount="80" 
              /> */}
              
                
              </div>


              </div>

            </div>

          </div>

        
    </>
  )
}

export const ShortProjectCard = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        <img className={styles.projectImage} src={props.image} alt="" />
      </div>
      <ul className={styles.projectInfo}>
        <li className={styles.projectTitle}><b>{props.projectName}</b></li>
        <li className={styles.projectDeveloper}>by {props.projectDeveloper}</li>
        {/* <li className={styles.projectFeedback}>{props.projectFeedback} Positive Feedback({props.voteCount} votes)</li> */}
      </ul>
            
    </div>
  )
}
