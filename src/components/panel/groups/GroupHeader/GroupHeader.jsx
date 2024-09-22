import React, { useState } from "react"
import { setNewMicroalert } from "store/alertSlice"
import { useDispatch } from "react-redux"
import style from './GroupHeader.module.sass'
import cn from 'classnames'
import EditGroupHeaderTitle from "components/panel/groups/EditGroupHeaderTitle/EditGroupHeaderTitle"
import { useUpdateGroupTitleMutation } from "store/panelAPI"
import EditGroupControlsContainer from "components/panel/groups/EditGroupControls/EditGroupControlsContainer"
import { useToggleMode } from "hooks/useToggleMode"
import { setGroupTitle } from "store/panelSlice"

const GroupHeader = ({ group, onDeleteGroupFromList, onToggleGroupFetching, isGroupFetching }) => {
 
    const [ updateGroupTitle, {isLoading: isUpdatingTitle} ] = useUpdateGroupTitleMutation()
    const dispatch = useDispatch()
    const [ inputGroupTitle, setInputGroupTitle ] = useState(group.title)
    const [ editMode, toggleEditMode] = useToggleMode(false)

    const handleUpdateGroupTitle = async (id, title) => {
        return await updateGroupTitle({id, title})
    }

    const onChangeGroupTitleSubmit = async (e) => {
        e.preventDefault()

        const titleBeforeUpdate = group.title
        // Выключаем edit mode
        toggleEditMode(false)

        // Удаляем пробелы по краям
        const trimmedInput = inputGroupTitle.trim()
        
        // Если значение не пустое, устанавливаем новый заголовок
        if(trimmedInput && trimmedInput !== group.title) {
            dispatch(setGroupTitle({id: group.id, title: trimmedInput}))
            setInputGroupTitle(prevInput => trimmedInput)
            // Отправляем на сервер
            const result = await handleUpdateGroupTitle(group.id, trimmedInput)
            
            if(!result.error) {
                dispatch(setNewMicroalert({text: 'Название группы успешно изменено'}))
            }
            // Если при апдейте произошла ошибка, устанавливаем старый заголовок
            if(result.error) {
                dispatch(setGroupTitle({id: group.id, title: titleBeforeUpdate}))
                dispatch(setNewMicroalert({text: 'Не удалось изменить название группы'}))
                setInputGroupTitle(prevInput => titleBeforeUpdate)
            }
        // Если значение пустое, устанавливаем предыдущий заголовок
        } else {
            // в инпут
            setInputGroupTitle(group.title)
        }
    }
    
    // Контроль инпута формы
    const onChangeInputTitle = (value) => {
        setInputGroupTitle(prev => value)
    }
    
    return(
        
        <div className={cn(style.header, {[style.header_fetching]: isGroupFetching})}>
            <div data-title={group.title} className={
                cn(style.title, 
                style[group.color],
                {
                    [style.title_fetching]: isUpdatingTitle
                }
            )} onClick={() => !isGroupFetching && !editMode && !isUpdatingTitle ? toggleEditMode() : null}>{group.title}</div>
            {
                editMode
                ?
                <EditGroupHeaderTitle
                    onChangeGroupTitleSubmit={onChangeGroupTitleSubmit}
                    onToggleEditMode={toggleEditMode}
                    onChangeInputTitle={onChangeInputTitle}
                    inputGroupTitle={inputGroupTitle}/>
                : null
            }
            <EditGroupControlsContainer
                groupColor={group.color}
                groupId={group.id}
                onDeleteGroupFromList={onDeleteGroupFromList}
                onToggleGroupFetching={onToggleGroupFetching}
                isGroupFetching={isGroupFetching}
            />
        </div>
    )

}

export default GroupHeader