import React, { useContext } from "react";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import "./styles/navbar.css";

const NavBar = (): JSX.Element => {
  const {
    selectedListId,
    setSelectedListId,
    isListPanelDisplayed,
    setIsListPanelDisplayed,
    isDetailsPanelDisplayed,
    setIsDetailsPanelDisplayed,
  } = useContext(DataContext) as DataContextInterface;
  return (
    <nav className="NavBar">
      <div className="main">
        <div
          className={`showHideIcon ${!isListPanelDisplayed ? "rotate" : ""}`}
          onClick={() => setIsListPanelDisplayed(!isListPanelDisplayed)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="title">
            <div className="logo">
                <div className="horizontal"></div>
                <div className="vertical"></div>
            </div>
            <h1>ask</h1>
        </div>
      </div>

      <div
        className={`showHideIcon ${isDetailsPanelDisplayed ? "rotate" : ""}`}
        onClick={() => setIsDetailsPanelDisplayed(!isDetailsPanelDisplayed)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    </nav>
  );
};

export default NavBar;
