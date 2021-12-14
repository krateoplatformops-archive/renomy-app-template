import React, { useState, useEffect } from 'react'
import axios from 'axios'

import uris from '../../../uris'
import css from './Logs.module.scss'

const Logs = () => {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    const result = await axios(uris.baseUrl + uris.logs)
    setData(result.data)
  }

  const refreshClickHandler = () => {
    setData([])
    fetchData()
  }

  useEffect(() => {
    if (!data) {
      fetchData()
    }
  }, [data])

  return (
    <React.Fragment>
      <div className={css.BtnContainer}>
        <button className={css.BtnRefresh} onClick={refreshClickHandler}>
          refresh logs
        </button>
      </div>
      <ul className={css.UlLogs}>
        {(data || []).map((l, key) => (
          <li key={key}>
            <span>Date:</span>
            {l.time}
            <span>Method:</span>
            {l.method}
            <span>Path:</span>
            {l.path}
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default Logs
