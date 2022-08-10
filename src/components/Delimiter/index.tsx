import React from 'react'

import styles from './Delimiter.module.scss'

const Delimiter: React.FC = () => {
  return (
    <div className={styles.delimiter}>
      <svg
        height='24px'
        version='1.1'
        viewBox='0 0 24 24'
        width='24px'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title />
        <desc />
        <g
          fill='none'
          fillRule='evenodd'
          id='Action-/-43---Action,-arrows,-vertical,-move,-swap,-switch,-transfer-icon'
          stroke='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1'
        >
          <path
            d='M14.0008723,8.49912766 L18.0008723,2.99912766 L22.0008723,8.49912766 M18.0008723,3.00087234 L18.0008723,20.9991277'
            id='Path'
            stroke='#000000'
            strokeWidth='2'
          />
          <path
            d='M10.0008723,15.5008723 L6.00087234,21.0008723 L2.00087234,15.5008723 M6.00087234,20.9991277 L6.00087234,2.99912766'
            id='Path'
            stroke='#000000'
            strokeWidth='2'
          />
        </g>
      </svg>
    </div>
  )
}

export default Delimiter
