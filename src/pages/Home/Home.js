import React, { useState, useEffect, refresh } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/index'
import { Grid } from '@mui/material'
import './Home.css'
import { app, db } from '../../utils/firebase';
import { getStorage, deleteObject, ref } from "@firebase/storage";
import { getDocs, deleteDoc, doc } from "@firebase/firestore";
import { colRef } from '../../utils/firebase'
import { useUserAuth } from '../../context/UserAuthContext';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '../../Components/Modal';

function Home() {
    const { user } = useUserAuth();
    const storage = getStorage(app);
    const [TasksData, setTasksData] = useState([]);
    const [editTask, setEditTask] = useState({});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchTask, setSearchTask] = useState('');
    //editar a tarefa
    const handleEdit = (data) => {
        setShowModal(true);
        setEditTask(data);
        console.log(editTask);
    }
    //deleta a tarefa e exclui o arquivo da tarefa
    const handleDelete = (id) => {
        let decision = window.confirm("Você quer mesmo deletar essa tarefa?");
        if (decision) {
            const taskDoc = doc(db, "tasks_db", id)
            deleteDoc(taskDoc)
            const filteredtasks = [...TasksData];
            let task = filteredtasks.filter(task => task.id !== id);
            setTasksData(task);
        }
    }

    console.log(user);

    //pega os dados do db
    useEffect(() => {
        async function tasklist() {
            setLoading(false);
            await getDocs(colRef)
                .then(snapshot => {
                    // console.log(snapshot.docs)
                    let taskslist = []
                    snapshot.docs.forEach(doc => {
                        taskslist.push({ ...doc.data(), id: doc.id })
                    })
                    setTasksData(taskslist.filter((task) => task.user === user.email))
                    setLoading(true);
                })
                .catch(err => {
                    console.log(err.message)
                })
        } tasklist();
        return () => tasklist();

    }, [])

    if (loading === false) {
        return (
            <h3 className="loading"> Aguarde... <CircularProgress size={70}></CircularProgress></h3>
        )
    }
    if (!user) {
        return (
            <Navigate to="/login" />
        )

    }
    return (
        <>
            <Navbar />
            <Grid>
                <div>
                    <div className="wrapper">
                        <h2>Solicitações</h2>
                        <h4 className="filter-title">Filtrar por título ou status: </h4>
                        <div className="filter">
                            <input className="search" type="text" value={searchTask} placeholder="Filtrar por título ou status" onChange={(e) => setSearchTask(e.target.value)} />
                        </div>
                        {TasksData.length === 0 ?
                            <h3> Nenhuma solicitação no momento...</h3> :
                            TasksData.filter((task) => {
                                // filtrando os registros pelo status e pelo titulo
                                if (searchTask === '') {
                                    return task
                                }
                                else if (task.title?.toLowerCase().includes(searchTask.toLowerCase())) {
                                    return task
                                }
                                else if (task.status?.toLowerCase().includes(searchTask.toLowerCase())) {
                                    console.log(searchTask);
                                    return task
                                }

                            }).map((task, index) =>
                                <div className="card" key={index}>
                                    <div className="headerCard">#{index} |  <strong> {task.user} </strong> : </div>
                                    <div className="headerCard">  <h4>{task.title} </h4>| {task.status}
                                        <span style={{ color: "grey" }}>{task.date}</span>
                                        <div>  <button className="button" onClick={() => handleEdit(task)}><EditOutlinedIcon /></button></div>
                                        <div>  <button className="button" onClick={() => handleDelete(task.id)}><DeleteForeverIcon /></button></div>
                                    </div>
                                    <div className="bodyCard" >  {task.description}</div>
                                    <div className="footerCard" ><strong>Produto: </strong> {task.product} | <strong>Categoria: </strong>  {task.category} |
                                        <strong>Prioridade</strong>:{task.priority} | <a href={task.fileUrl} target="_blank">Abrir arquivo</a> </div>
                                </div>)}

                    </div>
                    {showModal && editTask ? (<Modal onClose={() => setShowModal(false)} editTask={editTask}></Modal>) : null}
                </div>
            </Grid>

        </>
    )
}
export default Home;
