import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import "./styles/scrollingSection.css";

interface ScrollingSectionInterface {
  children: JSX.Element;
  isOpenedByDefault?: boolean;
}

const ScrollingSection = ({
  children,
  isOpenedByDefault,
}: ScrollingSectionInterface): JSX.Element => {
  
  const [isOpened, setIsOpened] = useState<boolean>(
    isOpenedByDefault ? isOpenedByDefault : false
  );

  return (
    <div className="ScrollingSection">
      <FontAwesomeIcon
        className={`chevron ${isOpened ? "opened" : ""}`}
        icon={faChevronLeft}
        onClick={() => setIsOpened(!isOpened)}
      />
      <div className={`children ${isOpened ? "opened" : ""}`}>{children}</div>
    </div>
  );
  
};

export default ScrollingSection;
