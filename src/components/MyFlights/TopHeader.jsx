import React from 'react'

import "./TopHeader.css"
import { IoIosInformationCircleOutline } from 'react-icons/io'
const TopHeader = () => {
  return (
    <div className="top-header-container">
      <div className="d-flex align-items-center">
        Sort by:{" "}
        <div class="dropdown">
          <button
            class="dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Recommended
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='avg-fare'><IoIosInformationCircleOutline color="#47a4cc" size={25}/> <span>Avg Fare: $225</span></div>
    </div>
  )
}

export default TopHeader