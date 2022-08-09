import React, { useEffect } from 'react'
import { fetchDirections, fetchFilter } from './redux/slices/filter/asyncActions'
import useAppDispatch from './hooks/useAppDispatch'
import useAppSelector from './hooks/useAppSelector'
import Filter from './components/Filter'

import './scss/app.scss'
import LoaderCircle from './components/UI/Loaders/LoaderCircle/LoaderCircle'

function App() {
  const { isLoadingDirections, isLoadingFilter } = useAppSelector((state) => state.filter)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchDirections())
    dispatch(fetchFilter())
  }, [])

  if (isLoadingDirections || isLoadingFilter)
    return (
      <div style={{ marginTop: '100px' }}>
        <LoaderCircle />
      </div>
    )

  return (
    <div className='app'>
      <Filter />
    </div>
  )
}

export default App
