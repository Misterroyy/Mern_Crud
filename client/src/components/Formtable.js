import '../App.css';
import {IoMdClose} from "react-icons/io";
import "../App";

const Formtable = ({handlesubmit,handleOnChange,handleClose,rest}) => {
  return (
    <div className='Addwrapper'>
    <form onSubmit={handlesubmit}>
      <div className='closebtn' onClick={handleClose}><IoMdClose /></div>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name' name='name'  required onChange={handleOnChange}  value={rest.name}/>

      <label htmlFor='email'>Title</label>
      <input type='title' id='title' name='title' required onChange={handleOnChange}  value={rest.title}/>

      <label htmlFor='mobile'>Description</label>
      <input type='text' id='description' name='description' required onChange={handleOnChange}  value={rest.description}/>

      <label htmlFor="status">Status</label>
      <select name="status" id="status" class="form-control" required  onChange={handleOnChange}  value={rest.status}>
          <option selected>Default</option>
          <option value="Active">Active</option>
          <option value="Block">Block</option>
      </select>
      

      <button className='btn'>Submit</button>
    </form>
  </div>

)
}




export default Formtable
