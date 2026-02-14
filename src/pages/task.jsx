import { useEffect, useState } from "react";

export default function TasksPage() {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchTasks() {
            try {
                setLoading(true)
                const response = await fetch('/tasks')
                if (!response.ok) {
                    throw new Error('Произошла ошибка')
                }
                const data = await response.json()
                setTasks(data)
            }
            catch (err) {
                setError(err.message)
            }
            finally {
                setLoading(true)
            }
        }
        fetchTasks()
    }, [])


    return (
        <>  
            {error && <p>{error}</p>}
            {loading && <p>Загрузка...</p>}
            <h1>Задачи пользователя</h1>
            <div>
                <ul>
                    {tasks.map((task) => 
                        <li id={task.id}>{task.title}</li>
                    )}
                </ul>
            </div>
        </>
    )

}