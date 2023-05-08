import React from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import {IoIosSend} from 'react-icons/io'
import Logo from '../../assets/logo-dark.png'
import {HiMailOpen} from 'react-icons/hi'

export const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.footerCol}>
                    <img className={styles.logo} src={Logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus iste officia praesentium iusto aperiam eaque, neque ab dolores beatae nulla sunt repellendus atque obcaecati velit saepe nisi provident, ullam vel.</p>
                    <div className={styles.mail}>
                        <HiMailOpen size={34} style={{color: '#eb7724'}} />
                        <div className={styles.mailInfo}>
                            <p className={styles.mailTitle}>Mail us</p>
                            <p className={styles.mailName}>mail@info.com</p>
                        </div>
                    </div>
                </div>
                <div className={styles.footerCol}>
                    <p className={styles.title}>Useful Links</p>
                    <ul>
                        <li><Link to="#">Home</Link></li>
                        <li><Link to="/developers">Developers</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/inbox">Inbox</Link></li>
                        {/* <li><Link to="#">Help</Link></li> */}
                    </ul>
                </div>
                <div className={styles.footerCol}>
                    <p className={styles.title}>Connect With Us</p>
                    <p>To connect with us, kindly fill the form below</p>
                    <div className={styles.connectField}>
                        <input className={styles.inputField} type="email" placeholder='Enter your Email' />
                        <button className={styles.button}><IoIosSend size={22} style={{color: '#fff'}} /></button>
                    </div>
                </div>
                
            </div>

        </div>
    </div>
  )
}
