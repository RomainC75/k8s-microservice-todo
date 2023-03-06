import { useContext } from "react";
import { DataContext } from "../context/data.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { DataContextInterface } from "../@types/dataContext.type";

import "./styles/navbar.css";
import { AuthContext } from "../context/auth.context";
import { AuthContextInterface } from "../@types/authContext.type";

const NavBar = (): JSX.Element => {
  const {
    isListPanelDisplayed,
    setIsListPanelDisplayed,
    isDetailsPanelDisplayed,
    setIsDetailsPanelDisplayed,
  } = useContext(DataContext) as DataContextInterface;
  const {removeToken} = useContext(AuthContext) as AuthContextInterface
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
      
      <div className="rightSide">
      <FontAwesomeIcon icon={faArrowRightFromBracket} className="deconnexion" onClick={removeToken}/>
      <div
        className={`showHideIcon ${isDetailsPanelDisplayed ? "rotate" : ""}`}
        onClick={() => setIsDetailsPanelDisplayed(!isDetailsPanelDisplayed)}
      > 
      
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>

      </div>
    </nav>
  );
};

export default NavBar;
