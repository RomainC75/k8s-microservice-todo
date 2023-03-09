import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import './styles/scrollingSection.css'

interface ScrollingSectionInterface {
  children: JSX.Element
  isOpenedByDefault?: boolean
  margin?: number
  menuName?: string
}

const ScrollingSection = ({
  children,
  isOpenedByDefault,
  margin,
  menuName,
}: ScrollingSectionInterface): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(
    isOpenedByDefault ? isOpenedByDefault : false
  )

  return (
    <div className="ScrollingSection">
      <div className="title" onClick={() => setIsOpened(!isOpened)}>
        <FontAwesomeIcon
          className={`chevron ${isOpened ? 'opened' : ''}`}
          icon={faChevronLeft}
          style={{ marginLeft: `${margin ? margin : 0}px` }}
          onClick={() => setIsOpened(!isOpened)}
        />
        <h3>{menuName}</h3>
      </div>
      <div className={`children ${isOpened ? 'opened' : ''}`}>{children}</div>
    </div>
  )
}

export default ScrollingSection
