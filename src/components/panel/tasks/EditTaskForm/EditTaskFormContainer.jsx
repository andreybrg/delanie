import React, { useState } from 'react'
import { useUpdateTaskMutation } from 'store/panelAPI'
import { useOutsideClickHandler } from 'hooks/useOutsideClickHandler'
import TaskForm from 'components/panel/tasks/TaskForm/TaskForm'

// onUpdateSingleTask Сделать

const EditTaskFormContainer = ({
    taskId,
    onToggleEditMode,
    onUpdateSingleTask,
    initialTitle,
    initialDescription,
}) => {

    const [ editTask, {isLoading: isEditingTask} ] = useUpdateTaskMutation()

    // const addTaskFormRef = useRef(null)
    const [ titleInput, setTitleInput ] = useState(initialTitle)
    const [ descriptionInput, setDescriptionInput ] = useState(initialDescription)
    const [ isFormDisabled, setIsFormDisabled ] = useState(false)

    const handleEditTask = async (taskId, title, description) => {
        return await editTask({taskId, title, description})
    }

    const onEditTaskFormSubmit = async (e) => {

        if(e)
            e.preventDefault()
        if(!isEditingTask) {
            setIsFormDisabled(prev=>true)
            // Размонтируем компонент если форма пустая
            if(!titleInput && !descriptionInput) {
                onToggleEditMode()
                return
            }
            const result = await handleEditTask(taskId, titleInput, descriptionInput)
            if(!result.error) {
                onToggleEditMode()
                // Если таск изменён, нужно изменить его в ui
                onUpdateSingleTask({
                    title: titleInput,
                    description: descriptionInput,
                    id: result.data.taskId,
                })
                return
            }
            onToggleEditMode()
        }
    }

    const [ editTaskFormRef ] = useOutsideClickHandler(onEditTaskFormSubmit, [titleInput, descriptionInput, isEditingTask])

	return(
        <TaskForm
            taskFormRef={editTaskFormRef}
            titleInput={titleInput}
            descriptionInput={descriptionInput}
            setTitleInput={setTitleInput}
            setDescriptionInput={setDescriptionInput}
            onTaskFormSubmit={onEditTaskFormSubmit}
            isLoadingTask={isEditingTask}
            isFormDisabled={isFormDisabled}
        />
	)
}

export default EditTaskFormContainer