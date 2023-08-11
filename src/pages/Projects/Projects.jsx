import React from "react";
import styles from "./Projects.module.css";
import ProjectImage from "../../assets/banner2.jpg";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router";
import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Pagination } from "../../components/Pagination/Pagination";
import { baseURL } from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import { useAxios } from "../../utils/useAxios";

export const Projects = () => {
  const navigate = useNavigate();
  const api = useAxios();
  const { logoutUser, isLoggedIn } = useContext(AuthContext);
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = data.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [userMap, setUserMap] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${baseURL}project-api/projects/`);
      const data = response.data;
      const projects = data.results;
      setData(projects);

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex).map((item, index) => {
      const currentUserArr = userMap?.filter((obj) => obj.project === item.url);

      if (!item) {
        return null;
      }
      return (
        // render each item
        <>
          {!isLoggedIn ? (
            <Link to="/login" key={item.url}>
              <ProjectCard
                image={item.featuredImage}
                projectName={item.title}
                projectDeveloper={currentUserArr[0]?.username}
                // projectFeedback={item.voteRatio}
                // voteCount={item.voteTotal}
              />
            </Link>
          ) : (
            <Link to={`/projects/project/${item.url.split("/")[5]}`}>
              <ProjectCard
                image={item.featuredImage}
                projectName={item.title}
                projectDeveloper={currentUserArr[0]?.username}
                // projectFeedback={item.voteRatio}
                // voteCount={item.voteTotal}
              />
            </Link>
          )}
        </>
      );
    });
  };

  const renderFiltered = () => {
    return (
      <>
        {filteredProjects.map((project) => {
          const currentUserArr = userMap?.filter(
            (obj) => obj.project === project.url
          );

          return (
            <Link to={`/projects/project/${project.url.split("/")[5]}`}>
              <ProjectCard
                image={project.featuredImage}
                projectName={project.title}
                projectDeveloper={currentUserArr[0]?.username}
                // projectFeedback={project.voteRatio}
                // voteCount={project.voteTotal}
              />
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          Search For Projects
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>

        <div className={styles.projects}>
          {searchQuery === "" ? renderData() : renderFiltered()}
        </div>

        {searchQuery === "" && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <Footer />
      </div>
    </>
  );
};
