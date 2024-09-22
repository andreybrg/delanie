import React, { useEffect, useRef, useState } from 'react'
import TaskForm from './TaskForm'
import { useAddTaskMutation } from 'store/panelAPI'

const TaskFormContainer = ({ 
    mode,
    onToggleEditMode,
    groupId,
    position,
    onUpdateTaskList,
    onUpdateSingleTask
}) => {

    // mode

    // Меняем
    const [ addTask, {isLoading: isLoadingTask} ] = useAddTaskMutation()
    // const [ editTask, {isLoading: isLoadingTask} ] = useEditTaskMutation()

    const taskFormRef = useRef(null)
    const [ titleInput, setTitleInput ] = useState('')
    const [ descriptionInput, setDescriptionInput ] = useState('')
    const [ isFormDisabled, setIsFormDisabled ] = useState(false)

    const handleAddTask = async (groupId, position, userId, title, description) => {
        return await addTask({groupId, position, userId, title, description})
    }

    const handleEditTask = async (title, description) => {
        return await editTask({title, description})
    }

    // Меняем логику в зависимости от MODE (onUpdateTaskList)
    const onTaskFormSubmit = async (e) => {
        e.preventDefault()
        setIsFormDisabled(prev=>true)
        // Размонтируем компонент если форма пустая
        if(!titleInput && !descriptionInput) {
            onToggleEditMode()
            return
        }
        const result = await handleAddTask(groupId, position, 1, titleInput, descriptionInput)
        // const result = await handleEditTask(titleInput, descriptionInput)
        if(!result.error) {
            onToggleEditMode()
            // Если таск добавлен, нужно добавить его в ui
            onUpdateTaskList({
                title: titleInput,
                description: descriptionInput,
                id: result.data.taskId,
                position: position,
            })
            onUpdateSingleTask({
                title: titleInput,
                description: descriptionInput,
                // Взять id таска
                id
            })
            return
        }
        onToggleEditMode()
    }

    // Функция слушателя клика вне формы
    const handleOutSideClickTaskForm = async (event) => {
        if (!taskFormRef.current?.contains(event.target)) {
            // Eсли клик вне формы, создаём новый таск
            if(!isLoadingTask) {
                await onTaskFormSubmit(event)
            }
        }
    }

    useEffect(() => {
        // При монтировании вешаем слушатель на window с outside click
        window.addEventListener("mousedown", handleOutSideClickTaskForm);
        
        // При размонтировании удаляем слушатель
        return () => {
            window.removeEventListener("mousedown", handleOutSideClickTaskForm);
        }
    }, [titleInput, descriptionInput, isLoadingTask])


	return(
        <TaskForm
            taskFormRef={taskFormRef}
            titleInput={titleInput}
            descriptionInput={descriptionInput}
            setTitleInput={setTitleInput}
            setDescriptionInput={setDescriptionInput}
            onTaskFormSubmit={onTaskFormSubmit}
            isLoadingTask={isLoadingTask}
            isFormDisabled={isFormDisabled}
        />
	)
}

export default TaskFormContainer