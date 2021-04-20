import React, { useState } from 'react';
import logo from '../assets/logo/cinema.png';
import { IoIosTv, IoIosVideocam, IoIosWallet, IoIosCube, IoIosToday } from "react-icons/io";

const Sidebar = (props) => {
    return (
        <nav className="col-sm-2 d-sm-block bg-dark sidebar h-100 position-fixed">
          
                <div className="sidebar-sticky mt-3">
                  <div className="d-flex justify-content-center">
                    <img className="d-flex logo-white" width="120px" alt="CinemaApp" src={logo}/>
                  </div>
                  <hr className="bg-light"/>
                  <ul className="nav flex-column mt-3">
                    
                    <div className="nav-link"> <IoIosTv className="icon-sidebar"/> Seanse</div>
                    <div className="nav-link"> <IoIosVideocam className="icon-sidebar"/>Filmy</div>
                    <div className="nav-link"> <IoIosWallet className="icon-sidebar"/>Rezerwacje</div>
                    <div className="nav-link"> <IoIosCube className="icon-sidebar"/>Sale</div>
                    <div className="nav-link"> <IoIosToday className="icon-sidebar"/>Repertuar</div>
                    
                  </ul>

                  <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Saved reports</span>
                    <a className="d-flex align-items-center text-muted" href="#1">
                      <span data-feather="plus-circle"></span>
                    </a>
                  </h6>
                  <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                      <a className="nav-link" href="#1">
                        <span data-feather="file-text"></span>
                        Current month
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#2">
                        <span data-feather="file-text"></span>
                        Last quarter
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#3">
                        <span data-feather="file-text"></span>
                        Social engagement
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#4">
                        <span data-feather="file-text"></span>
                        Year-end sale
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
    )
}
export default Sidebar;