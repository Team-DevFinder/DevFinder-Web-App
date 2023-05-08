import React, { useEffect, useState } from 'react'
import styles from './Developers.module.css'
import { DevCard } from '../../components/DevCard/DevCard'
import Atharva from '../../assets/nalla.jpg'
import Ak from '../../assets/ak.jpg'
import Dhanya from '../../assets/dhanya2.jpg'
import {Footer} from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import axios from 'axios'
import { baseURL } from '../../utils/config'
import { Pagination } from '../../components/Pagination/Pagination'


export const Developers = () => {

  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage =6;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const fetchDevelopers = async () => {
    const response = await axios.get(`${baseURL}user-api/profiles/`);
    const items = response.data.results;
    console.log(items);
    setUsers(items);
  }

  useEffect(() => {
    fetchDevelopers();
  }, [])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderData = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return (
    users.slice(startIndex, endIndex).map((item, index) => {
    if (!item) {
      return null;
    }
    return (
      // render each item
      <>
      <Link to="/developers/developer" key={item.url} state={{url: item.url}}>
            <DevCard
              
              name={item.username}
              position={item.shortIntro}
              image={item.profileImage}
              bio={item.bio}
 
            />
            </Link>
         
      

      </>
    );
  
  }));
};


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
            Search For Developers
            <SearchBar />
        </div>  

        <div className={styles.developers}>

        {renderData()}
        </div>
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        />
    </div>
    
    <Footer />

    </>
  )
}
