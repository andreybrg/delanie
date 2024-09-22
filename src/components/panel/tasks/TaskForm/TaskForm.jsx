import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import style from './TaskForm.module.sass'

const TaskForm = ({
    taskFormRef,
    titleInput,
    descriptionInput,
    setTitleInput,
    setDescriptionInput,
    onTaskFormSubmit,
    isLoadingTask,
    isFormDisabled
}) => {

    const titleInputGhostRef = useRef()
    const descriptionInputGhostRef = useRef()
    const [ numRowsTitleInput, setNumRowsTitleInput ] = useState(1)
    const [ numRowsDescriptionInput, setNumRowsDescriptionInput ] = useState(1)

    const setTitleInputRows = (ref) => {
        setNumRowsTitleInput(ref.current.firstChild.getClientRects().length)
    }

    const setDescriptionInputRows = (ref) => {
        setNumRowsDescriptionInput(ref.current.firstChild.getClientRects().length)
    }

    useEffect(() => {
        // console.log(titleInput)
        setTitleInputRows(titleInputGhostRef)
    }, [titleInput])

    useEffect(() => {
        // console.log(descriptionInput)
        setDescriptionInputRows(descriptionInputGhostRef)
    }, [descriptionInput])

	return(<>
		<form ref={taskFormRef} className={cn(style.task, {[style.task_fetching]: isFormDisabled})} onSubmit={(event) => !isLoadingTask ? onTaskFormSubmit(event) : null}>
        <div 
                className={cn(style.textareaCalculatedDiv, style.textareaCalculatedDiv_title)}
                ref={titleInputGhostRef}
                >
                <span>{titleInput}</span>
            </div>
            <div 
                className={cn(style.textareaCalculatedDiv, style.textareaCalculatedDiv_description)}
                ref={descriptionInputGhostRef}
                >
                <span>{descriptionInput}</span>
            </div>
            <fieldset disabled={isFormDisabled}>
                <div className={style.title}>
                    <textarea
                        className={style.titleField} 
                        name="taskTitle" 
                        id="taskTitle" 
                        rows={numRowsTitleInput} 
                        autoFocus 
                        onChange={(event) => {
                            setTitleInput(event.target.value)
                            
                        }} 
                        placeholder='Задача...'
                        // value={titleInput.replace(/ /g, '&nbsp;')}
                        value={titleInput}
                        >
                    </textarea>
                </div>
                <div className={style.description}>
                <textarea
                        className={style.descrField} 
                        name="taskDescr" 
                        id="taskDescr" 
                        rows={numRowsDescriptionInput} 
                        onChange={(event) => {
                            setDescriptionInput(event.target.value)
                        }} 
                        placeholder='Описание...'
                        // value={titleInput.replace(/ /g, '&nbsp;')}
                        value={descriptionInput}
                        >
                    </textarea>
                    {/* <input className={style.descrField} type="text" name="taskDescr" value={descriptionInput} onChange={(event) => setDescriptionInput(event.target.value)} placeholder='Описание...'/> */}
                </div>
                <button type="submit" className={style.submitBtn}></button>
            </fieldset>
        </form>
        </>
	)
}

export default TaskForm