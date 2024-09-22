import React, { useState } from "react"
import style from './AddGroup.module.sass'
import AddGroupBtn from "components/panel/groups/AddGroupBtn/AddGroupBtn"
import AddGroupFormContainer from "components/panel/groups/AddGroupForm/AddGroupFormContainer"

const AddGroup = ({ newGroupPosition, onUpdateGroupList }) => {

    // Состояние для вкл\выкл режима добавления таски
    const [isAddGroupMode, setIsAddGroupMode] = useState(false)

    // Вкл\выкл режима добавления таски
    const onToggleAddGroupMode = () => {
        setIsAddGroupMode(prev => !prev)
    }

    return(
        <div className={style.group}>
            {
                !isAddGroupMode
                    ?
                    <AddGroupBtn
                        onToggleAddGroupMode={onToggleAddGroupMode}
                        position={newGroupPosition}
                    />
                    :
                    <AddGroupFormContainer
                        position={newGroupPosition}
                        onToggleAddGroupMode={onToggleAddGroupMode}
                        onUpdateGroupList={onUpdateGroupList}
                    />
            }
        </div>
    )
}

export default AddGroup