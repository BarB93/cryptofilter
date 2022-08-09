import React from 'react'

import styles from './LoaderCircle.module.scss'

const LoaderCircle = () => {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default LoaderCircle
