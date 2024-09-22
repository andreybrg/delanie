import React, { useEffect, useRef, useState } from "react"
import AddGroupForm from "./AddGroupForm"
import { useAddGroupMutation } from "store/panelAPI"
import { setNewMicroalert } from "store/alertSlice"
import { useDispatch, useSelector } from "react-redux"
import { useOutsideClickHandler } from "hooks/useOutsideClickHandler"

const AddGroupFormContainer = ({ position, onToggleAddGroupMode, onUpdateGroupList }) => {

    const userId = useSelector(store => store.auth.auth.userId)

    const [ addGroup, {isLoading: isAddingGroup} ] = useAddGroupMutation()
    const dispatch = useDispatch()
    const [ groupTitleInput, setGroupTitleInput ] = useState('')
    const [ isFormDisabled, setIsFormDisabled ] = useState(false)

    const handleAddGroup = async (position, title, userId) => {
        return await addGroup({position, title, userId})
    }

    const onAddGroupFormSubmit = async (e) => {
        
        // Если сабмит был по кнопке, отменяем стандартный сабмит
        if(e)
            e.preventDefault()

        if(!isAddingGroup) {
            setIsFormDisabled(prev=>true)
            // Размонтируем компонент если форма пустая
            if(!groupTitleInput) {
                onToggleAddGroupMode()
                return
            }
            const result = await handleAddGroup(position, groupTitleInput, userId)
            console.log(result)
            if(!result.error) {
                onToggleAddGroupMode()
                // Если группа добавлена, нужно добавить его в ui
                onUpdateGroupList({
                    group: {
                        id: result.data.groupId,
                        title: groupTitleInput,
                        position: position,
                        color: 'lightGray',
                    },
                    tasks: []
                })
                dispatch(setNewMicroalert({text: `Группа «${groupTitleInput}» добавлена`}))
                return
            }
            onToggleAddGroupMode()
        }
    }

    const [ addGroupFormRef ] = useOutsideClickHandler(onAddGroupFormSubmit, [groupTitleInput, isAddingGroup])

    return(
        <AddGroupForm
            addGroupFormRef={addGroupFormRef}
            groupTitleInput={groupTitleInput}
            setGroupTitleInput={setGroupTitleInput}
            onAddGroupFormSubmit={onAddGroupFormSubmit}
            isAddingGroup={isAddingGroup}
            isFormDisabled={isFormDisabled}
        />
    )
}

export default AddGroupFormContainer