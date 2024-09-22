import React, { useState } from "react"
import MoreBtn from "components/panel/groups/MoreBtn/MoreBtn"
import MoreAction from "./MoreAction"
import { useDeleteGroupMutation } from "store/panelAPI"
import { useDispatch } from "react-redux"
import { setNewMicroalert } from "store/alertSlice"

const MoreActionContainer = ({
    toggleIsControlsOpened, 
    groupId, 
    onDeleteGroupFromList, 
    onToggleGroupFetching, 
    isControlsOpened,
    groupColor,
}) => {
    const dispatch = useDispatch()
    const [ submenuData, setSubmenuData ] = useState({isOpened: false, mode: null})
    const [ deleteGroup, {isLoading: isDeletingGroup} ] = useDeleteGroupMutation()

    const onSetSubmenu = ({ isOpened=false, mode=null }) => {
        setSubmenuData({ isOpened, mode })
    }

    const onDeleteGroup = async (id) => {
        onToggleGroupFetching()
        const response = await deleteGroup(id)
        if(!response.error) {
            onDeleteGroupFromList(id)
            dispatch(setNewMicroalert({text: `Группа удалена`}))
        }
    }

    return(
        <>
            <MoreBtn 
                toggleIsControlsOpened={toggleIsControlsOpened} 
                isControlsOpened={isControlsOpened}
                />
            <MoreAction
                isControlsOpened={isControlsOpened}
                toggleIsControlsOpened={toggleIsControlsOpened}
                groupColor={groupColor}
                submenuData={submenuData}
                setSubmenu={onSetSubmenu}
                onDeleteGroup={onDeleteGroup}
                isDeletingGroup={isDeletingGroup}
                groupId={groupId}
            />
        </>
    )
}

export default MoreActionContainer