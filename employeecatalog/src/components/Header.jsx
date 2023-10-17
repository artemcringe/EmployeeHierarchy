import React, {useState} from "react";
import {Link} from "react-router-dom";

import logoSvg from '../assets/img/header-logo.svg'

function Header({employees, setEmployees, originalEmployees}) {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (event.target.value !== '') {
      const filteredEmployees = employees.filter((emp) => {
        const values = Object.values(emp).join("").toLowerCase();
        return values.includes(query.toLowerCase());
      });
      setEmployees(filteredEmployees)
    } else {
      setEmployees(originalEmployees.current)
    }
  }

  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img width={60} height={60} src={logoSvg} alt="headerLogo"/>
          </Link>
        </div>
        <div className="categories">

          <ul>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <li>Редактирование сотрудников</li>
            <hr/>
            <Link to="/signin">
              <li>Sign In</li>
            </Link>
            <hr/>
            <Link to="/signup">
              <li>
                Sign up
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header;
