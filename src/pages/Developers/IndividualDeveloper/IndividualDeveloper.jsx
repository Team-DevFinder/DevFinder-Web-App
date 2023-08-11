import React from "react";
import styles from "./IndividualDeveloper.module.css";
import { ProjectCard } from "../../../components/ProjectCard/ProjectCard";
// import {ShortProjectCard} from '../IndividualDeveloper/ShortProjectCard'

import { TiLocation } from "react-icons/ti";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAxios } from "../../../utils/useAxios";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Modal } from "../../../components/Modal/Modal";
import { AuthContext } from "../../../context/AuthContext";
import defaultImage from "../../../assets/default-image.svg";

export const IndividualDeveloper = () => {
  const { currentUUID } = useContext(AuthContext);

  const [profile, setProfile] = useState();
  const [project, setProject] = useState([]);
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const profileUrl = `/user-api/profiles/${id}/`;

  const navigate = useNavigate();

  const api = useAxios();

  const defaultText = "No projects";

  const [userMap, setUserMap] = useState([]);

  const fetchProfile = async () => {
    const response = await api.get(profileUrl);
    console.log("profile", response.data);
    setProfile(response.data);

    // projects
    const projectsResponse = await api.get(`${profileUrl}projects/`);
    console.log("projects", projectsResponse);
    setProject(projectsResponse.data.results);
    const projects = projectsResponse.data.results;

    const userIds = projects.map((project) => project.owner);
    console.log("userIDs", userIds);
    const userProfiles = await Promise.all(
      userIds.map(async (id) => {
        const res = await api.get(`user-api/profiles/${id}/`);
        return res.data;
      })
    );
    console.log("userProfiles", userProfiles);

    const userProfileMap = userProfiles.map((user, index) => {
      const currentProject = projects[index].url;
      return { project: currentProject, username: user.username };
    });
    console.log("userProfileMap", userProfileMap);
    setUserMap(userProfileMap);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [skills, setSkills] = useState([]);

  const fetchSkills = async () => {
    const response = await api.get(`${profileUrl}skills/`);
    console.log("skills", response);
    setSkills(response.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.developer}>
          <div className={styles.developerProfile}>
            <div className={styles.developerCard}>
              <div>
                <img
                  src={profile?.profileImage || defaultImage}
                  className={styles.developerImage}
                  alt=""
                />
              </div>
              <div>
                <p className={styles.developerName}>
                  <b>{profile?.username}</b>
                </p>
                <p className={styles.developerPosition}>
                  {profile?.shortIntro}
                </p>

                <p className={styles.developerLocation}>
                  <TiLocation size={22} />:{profile?.location}
                </p>

                <button
                  className={styles.sendBtn}
                  onClick={() => {
                    navigate(`/send-message/${id}`);
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
          <div className={styles.developerInfo}>
            <div className={styles.about}>
              <h2>
                <b>ABOUT ME</b>
              </h2>
              <p>{profile?.bio}</p>
            </div>
            <hr />

            <h2>SKILLS</h2>
            <br />
            <div className={styles.otherSkills}>
              {skills.map((button) => (
                <button className={styles.otherSkillsBtn}>{button.name}</button>
              ))}
            </div>
            <hr />
            <h2>PROJECTS</h2>
            <div className={styles.projectSection}>
              {project?.map((proj) => {
                const currentUserArr = userMap?.filter(
                  (obj) => obj.project === proj.url
                );
                return (
                  <Link to={`/projects/project/${proj.url.split("/")[5]}`}>
                    <ShortProjectCard
                      image={proj.featuredImage}
                      projectName={proj.title}
                      projectDeveloper={currentUserArr[0]?.username}
                    />
                  </Link>
                );
              })}

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
  );
};

export const ShortProjectCard = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        <img className={styles.projectImage} src={props.image} alt="" />
      </div>
      <ul className={styles.projectInfo}>
        <li className={styles.projectTitle}>
          <b>{props.projectName}</b>
        </li>
        <li className={styles.projectDeveloper}>by {props.projectDeveloper}</li>
        {/* <li className={styles.projectFeedback}>{props.projectFeedback} Positive Feedback({props.voteCount} votes)</li> */}
      </ul>
    </div>
  );
};
