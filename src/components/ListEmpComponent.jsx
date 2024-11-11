import { useEffect, useState } from "react"
import { deleteEmployee, listEmployees } from "../services/EmpService";
import { useNavigate } from "react-router-dom";

const ListEmpComponent = () => {

  const [employees,setEmployees]=useState([]);

  const navigate=useNavigate();

  useEffect(()=>{
    getAllEmployees();
  },[]);



  const getAllEmployees=()=>{
    listEmployees().then((response)=>{
        setEmployees(response.data);
     }).catch(error=>{console.error(error)});
  }

  const addNewEmployee=()=>{
      navigate("/add-employee")
  }

  const updateEmployee=(id)=>{
      navigate(`/edit-employee/${id}`)
  }

  const removeEmployee=(id)=>{
    console.log(id);
    deleteEmployee(id).then(()=>{
        getAllEmployees();
     }).catch(error=>{console.error(error)});
}

  return (
    <div className="container">
        <h2 className="text-center py-4">List of Employees</h2>
        <button className="btn btn-dark mb-2 " onClick={addNewEmployee}>Add Employee</button>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Employee Job Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee=>
                    (<tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.jobRole}</td>
                        <td>
                            <button className="btn btn-dark" onClick={()=>updateEmployee(employee.id)}>Update</button>
                            <button className="btn btn-dark" onClick={()=>removeEmployee(employee.id)} style={{marginLeft:'10px'}}>Delete</button>
                        </td>
                    </tr>))
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmpComponent