import React, { useEffect, useState } from 'react'
import "./App.css";
import axios from "axios"
import Formtable from './components/Formtable';

axios.defaults.baseURL = "http://localhost:8080"
const App = () => {
  const [addsection, setAddsection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    status: "",
  })

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    title: "",
    description: "",
    status: "",
    _id: ""
  })

  const [dataList, setDataList] = useState([])


  const handleOnChange = (e) => {
    const { value, name } = e.target
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      }

    })
  }

  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditSection(true)
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("/create", formData)
    if (data.data.success) {
      setAddsection(false)
      getFetchData()
    }

  }

  const getFetchData = async () => {
    const data = await axios.get("/")
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }
  useEffect(() => {
    getFetchData()
  }, [])

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    if (data.data.success) {
      getFetchData()
    }
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("/Update/", formDataEdit)
    getFetchData()
    setEditSection(false)
  }
  const handleEditChange = async (e) => {
    const { value, name } = e.target
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }

    })
  }
  return (
    <>
      <div className='container'>
        <button className='btn btn-add' onClick={() => setAddsection(true)}> Add</button>
        {
          addsection && (
            <Formtable
              handlesubmit={handlesubmit}
              handleOnChange={handleOnChange}
              handleClose={() => setAddsection(false)}
              rest={formData} />
          )}

        {
          editSection && (
            <Formtable
              handlesubmit={handleUpdate}
              handleOnChange={handleEditChange}
              handleClose={() => setEditSection(false)}
              rest={formDataEdit} />
          )}


        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>title</th>
                <th>description</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                dataList[0] ? (
                  dataList.map((el) => {
                    return (
                      <tr>
                        <td>{el.name}</td>
                        <td>{el.title}</td>
                        <td>{el.description}</td>
                        <td>{el.status}</td>
                        <td>
                          <button className='btn btn-edit' onClick={() => handleEdit(el)}
                          >Edit</button>
                          <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })) : (
                  <p>No data</p>
                )
              }

            </tbody>
          </table>
        </div>

      </div>

      

    </>

  )


}



export default App
