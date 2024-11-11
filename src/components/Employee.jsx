import { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmpService';
import {useNavigate, useParams} from 'react-router-dom'

const Employee = () => {

  
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')
  const [jobRole,setJobRole]=useState('')


  const {id}=useParams();

  const [errors,setErrors]=useState(
    {
      firstName:"",
      lastName:"",
      email:"",
      jobRole:""
    }
  )
  const navigate=useNavigate()

  useEffect(()=>{
    if(id){
      getEmployee(id).then((response)=>{
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setJobRole(response.data.jobRole);
      }).catch(error=>{
        console.error(error);
      })
    }

  },[])

  const handleFirstName=(e)=>{
       setFirstName(e.target.value);
  }
  const handleLastName=(e)=>{
    setLastName(e.target.value);
  }
  const handleEmail=(e)=>{
    setEmail(e.target.value);
  }
  const handleJobRole=(e)=>{
    setJobRole(e.target.value);
  }

const saveEmployee=(e)=>{
    e.preventDefault();

    if(validateForm()){

      const employee={firstName,lastName,email,jobRole}
      console.log(employee)

      if(id){
        updateEmployee(id,employee).then((response)=>{
          console.log(response.data);
          navigate('/employees');
        }).catch(error=>{
          console.error(error);
        })
      }else{
        createEmployee(employee).then((response)=>{
          console.log(response.data);
          navigate('/employees');
        }).catch(error=>{
          console.error(error);
        })
  }
  }
}

  const validateForm=()=>{
    let valid=true;
    const errorsCopy={... errors}

    if(firstName.trim()){
      errorsCopy.firstName='';
    }else{
      errorsCopy.firstName='First name is required';
      valid=false;
    }

    if(lastName.trim()){
      errorsCopy.lastName='';
    }else{
      errorsCopy.lastName='Last name is required';
      valid=false;
    }

    if(email.trim()){
      errorsCopy.email='';
    }else{
      errorsCopy.email='Email is required';
      valid=false;
    }

    if(jobRole.trim()){
      errorsCopy.jobRole='';
    }else{
      errorsCopy.jobRole='Job Role is required';
      valid=false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  const pageTitle=()=>{
     if(id){
      return <h2 className="text-center">Update Employee</h2>
     }else{
      return <h2 className="text-center">Add Employee</h2>
     }
  }
  
  return (
    <div className="container">
      <br></br>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {pageTitle()}
            <div className="card-body">
              <form >
                <div className='form-group mb-2'>
                  <label className='form-label'>First Name :</label>
                  <input 
                  type='text'
                  placeholder='Enter Employee First Name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={handleFirstName}
                  >
                  </input>
                  {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Last Name :</label>
                  <input 
                  type='text'
                  placeholder='Enter Employee last Name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={handleLastName}
                  >
                  </input>
                  {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Email Address :</label>
                  <input 
                  type='text'
                  placeholder='Enter Employee Email Address'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={handleEmail}
                  >
                  </input>
                  {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Job Role :</label>
                  <input 
                  type='text'
                  placeholder='Enter Employee Job Role'
                  name='jobRole'
                  value={jobRole}
                  className={`form-control ${errors.jobRole ? 'is-invalid' : ''}`}
                  onChange={handleJobRole}
                  >
                  </input>
                  {errors.jobRole && <div className='invalid-feedback'>{errors.jobRole}</div>}
                </div>
                 <button className='btn btn-dark' onClick={saveEmployee}>Submit</button> 
              </form>
            </div>
      </div>
      </div>
    </div>
  );
};

export default Employee;
