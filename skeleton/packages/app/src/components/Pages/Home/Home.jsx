import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

import uris from '../../../uris'
import css from './Home.module.scss'

const Home = () => {
  const [data, setData] = useState(null)
  const [input, setInput] = useState('')

  const removeButtonHandler = async (id) => {
    await axios.delete(uris.baseUrl + uris.todo + `?id=${id}`).then((res) => {
      setData(data.filter((x) => x.id !== id))
    })
  }

  const addButtonHandler = async () => {
    await axios
      .post(uris.baseUrl + uris.todo, {
        message: input
      })
      .then((res) => {
        setData(res.data)
        setInput('')
      })
  }

  const fetchData = async () => {
    const result = await axios(uris.baseUrl + uris.todo)
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
          refresh todo
        </button>
      </div>
      <label>
        Add todo
        <div className={css.LabelDiv}>
          <input
            type='text'
            placeholder='Add todo'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={addButtonHandler}
            className={css.BtnAdd}
            disabled={input === ''}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </label>
      <ul className={css.UlTodos}>
        {(data || []).map((l) => (
          <li key={l.id}>
            <button
              className={css.BtnDelete}
              onClick={(e) => removeButtonHandler(l.id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {l.message}
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default Home
