import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res = await axios.get("https://6678369d0bd45250561de22c.mockapi.io/students");
        if (res.status === 200) {
            setStudents(res.data);
        }
    }


    const handleDelete = async (id) => {
        const res = await axios.delete(`https://6678369d0bd45250561de22c.mockapi.io/students/${id}`);
        if (res.status === 200) {
            fetchStudents();
            toast.success("Deleted Successfully");
        } else {
            toast.error("Delete: Error!");
        }
        handleClose();
    }

    const handleClickOpen = (id) => {
        setOpen(true);
        setStudent(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="student-container">
            <div className="btn-add">
            <Link to={'/add'}>
                <button className='add-student-btn'>Add new student</button>
            </Link>
        </div>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Image</th>
                        <th>Feedback</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(students) && students.length > 0 ? (students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.dateofbirth}</td>
                            <td>{String(student.gender)}</td>
                            <td>{student.class}</td>
                            <td><img src={student.image} alt={student.name}/></td>
                            <td>{student.feedback}</td>
                            <td>
                                <Link to={`/update/${student.id}`}><button> 
                                    <i className="fa fa-pen-to-square"></i>
                                    </button>
                                </Link>
                                <button onClick={() => handleClickOpen(student.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                
                            </td>
                        </tr>
                    ))
                    ):(
                        <tr>
                            <td colSpan={8}>No students found</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete Student?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to delete a student with ID: {student}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDelete(student)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Dashboard;