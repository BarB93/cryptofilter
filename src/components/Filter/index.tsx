import React from 'react'
import Select from 'react-select'
import clsx from 'clsx'

import useAppSelector from '../../hooks/useAppSelector'
import styles from './Filter.module.scss'
import useAppDispatch from './../../hooks/useAppDispatch'
import {
  setCategoryFromId,
  setCategoryToId,
  setCurrentFrom,
} from '../../redux/slices/filter/slice'
import Delimiter from '../Delimiter'

const filtersFrom = ['Все', 'Криптовалюты', 'Наличные', 'Банки RUB', 'Банки UAH']
const filtersTo = ['Все', 'Криптовалюты', 'Банки RUB', 'Банки UAH', 'Наличные']

const Filter: React.FC = () => {
  const dispatch = useAppDispatch()
  const { currentDirections, currentFilter, filter, categoryToId, categoryFromId } =
    useAppSelector((state) => state.filter)

  const fromOptions = currentDirections.map((item) => ({
    value: item,
    label: item.name,
  }))

  const toOptions = currentFilter.map((item) => ({
    value: item,
    label: item.to,
  }))

  return (
    <div className={styles.container}>
      <div className={styles.filterBlock}>
        <h2 className={styles.title}>Отдаёте</h2>
        <ul className={styles.filterList}>
          {filtersFrom.map((item, index) => (
            <li
              className={clsx(
                styles.filterItem,
                categoryFromId === index && styles.active,
              )}
              key={item}
              onClick={() => dispatch(setCategoryFromId(index))}
            >
              {item}
            </li>
          ))}
        </ul>
        <Select
          options={fromOptions}
          onChange={(value) => {
            if (value?.value !== undefined) {
              dispatch(setCurrentFrom(value.value))
            }
          }}
          isOptionSelected={(option) => option.value.code === 'BTC'}
        />
      </div>
      <div className={clsx(styles.filterBlock, styles.to)}>
        <Delimiter />
        <h2 className={styles.title}>Получаете</h2>
        <ul className={styles.filterList}>
          {filtersTo.map((item, index) => (
            <li
              className={clsx(styles.filterItem, categoryToId === index && styles.active)}
              key={item}
              onClick={() => dispatch(setCategoryToId(index))}
            >
              {item}
            </li>
          ))}
        </ul>
        <Select options={toOptions} />
      </div>
    </div>
  )
}

export default Filter
