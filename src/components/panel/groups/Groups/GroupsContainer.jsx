import React, { useEffect, useState } from "react"
import style from './Groups.module.sass'
import Groups from "./Groups"
import AddGroup from "components/panel/groups/AddGroup/AddGroup"
import { delGroup, addGroup } from "store/panelSlice"
import { useDispatch } from "react-redux"

const GroupsContainer = ({ data }) => {

    let newGroupPosition = data.length
    const dispatch = useDispatch()

    const [ groupList, setGroupList ] = useState(data)

    useEffect(() => {
        setGroupList(data)
    }, [data])

    const onUpdateGroupList = (newGroup) => {
        dispatch(addGroup({newGroup}))
    }

    const onDeleteGroupFromList = (id) => {
        dispatch(delGroup({id}))
    }

    return(
        <div className={style.groups}>
            <Groups data={groupList} onDeleteGroupFromList={onDeleteGroupFromList}/>
            <AddGroup newGroupPosition={newGroupPosition} onUpdateGroupList={onUpdateGroupList}/>
        </div>
    )
}

export default GroupsContainer