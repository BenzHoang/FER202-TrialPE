import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/form.css';
import { toast } from 'react-toastify';

const initialState = {
   name: '',
   dateofbirth: '',
   gender: '',
   class: '',
   image: '',
   feedback: ''
}

const error_init = {
   name_err:'',
   dob_err: '',
   gender_err: '',
   class_err: '',
   image_err: '',
   feedback_err: ''

}

const Form = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [student, setStudent] = useState(initialState);
    const [errors, setErrors] = useState(error_init);

    const getOneStudent = async (id) => {
        const res = await axios.get(`https://6678369d0bd45250561de22c.mockapi.io/students/${id}`);
        if (res.status === 200) {
            setStudent(res.data);
        }
    }

    useEffect(() => {
        if(id) {
            getOneStudent(id);
        }
    }, [id]);

    const updateStudent = async (studentID, data) => {
        data.dateofbirth = data.dateofbirth.split("-").reverse().join("/")
        const res = await axios.put(`https://6678369d0bd45250561de22c.mockapi.io/students/${studentID}`, data);
        if (res.status === 200) {
            toast.success(`Updated student with ID: ${studentID} successfully !!!`);
            navigate('/dashboard');
        }
    }

    const addNewStudent = async (data) => {
        data.dateofbirth = data.dateofbirth.split("-").reverse().join("/")
        const res = await axios.post(`https://6678369d0bd45250561de22c.mockapi.io/students`, data);
        if (res.status === 200 || res.status === 201) {
            toast.success("New student has been added successfully !!!");
            navigate('/dashboard');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (id) {
                updateStudent(id, student);
            }
            else {
                addNewStudent(student);
            }
        } else {
            toast.error("Some info is invalid. Please check again !!!");
        }
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };
    
    const validateForm = () => {
        let isValid = true;
        let errors = { ...error_init };

        if (!student.name.trim()) {
            errors.name_err = 'Name is required';
            isValid = false;
        }else if (student.name.length < 2) {
            errors.name_err = 'Name must be more than 2 words';
            isValid = false;
        }

        if (!student.dateofbirth.trim()) {
            errors.dob_err = 'Birthday is required';
            isValid = false;
        }
        
        if (!student.gender) {
            errors.gender_err = 'Gender is required';
            isValid = false;
        }

        if (!student.class.trim()) {
            errors.class_err = 'Class is required';
            isValid = false;
        }

        
        if (!student.image.trim()) {
            errors.image_err = 'Image is required';
            isValid = false;
        }

        
        if (!student.feedback.trim()) {
            errors.feedback_err = 'Feedback is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }

    return (
        <div className='container'>
            <div className="form">
                <h2>{id ? "Update Course" : "Add New Course"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name='name' placeholder="Enter name" value={student.name} onChange={handleChange} />
                        {errors.name_err && <span className='error'>{errors.name_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="dateofbirth">Birthday: </label>
                        <input type="date" name='dateofbirth' value={student.dateofbirth.split("/").reverse().join("-")} onChange={handleChange} />
                        {errors.dob_err && <span className='error'>{errors.dob_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="gender">Gender: </label>
                        <select value={student.gender} name='gender' onChange={handleChange}>
                            <option value="">Choose gender</option>
                            <option value="true">Male</option>
                            <option value="false">Female</option>
                        </select>
                        <br/>
                        {errors.gender_err && <span className='error'>{errors.gender_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="class">Class: </label>
                        <input type="text" name='class' placeholder="Enter class" value={student.class} onChange={handleChange} />
                        {errors.class_err && <span className='error'>{errors.class_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="image">Image: </label>
                        <input type="text" name='image' placeholder="Enter image's URL" value={student.image} onChange={handleChange} />
                        {errors.image_err && <span className='error'>{errors.image_err}</span>}
                    </div>
                    <div>
                        <label htmlFor="feedback">Feedback: </label>
                        <input type="text" name='feedback' placeholder="Enter your feedback" value={student.feedback} onChange={handleChange} />
                        {errors.feedback_err && <span className='error'>{errors.feedback_err}</span>}
                    </div>
                    <button type='submit' className='form-button'>{id ? "Update" : "Submit"}</button>
                </form>
            </div>
        </div>
    );
}

export default Form;