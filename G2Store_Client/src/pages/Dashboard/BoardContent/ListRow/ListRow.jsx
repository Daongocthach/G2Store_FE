import { useState, useEffect } from 'react'
import categoryApi from '../../../../apis/categoryApi'
import Row from './Row/Row'

function ListRow() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    categoryApi.getCategories()
      .then(response => {
        setCategories(response)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      { Array.isArray(categories) && categories?.map((category, index) => <Row category={category} key={index} />)}
    </>
  )
}

export default ListRow