import React from "react"
import GroupContentContainer from "components/panel/groups/GroupContent/GroupContentContainer"
import style from './Groups.module.sass'

const Groups = ({ data, onDeleteGroupFromList }) => {



    return(
        data?.map(el =>
            <div key={el.group.id} className={style.group}>
                <GroupContentContainer
                    group={el.group}
                    onDeleteGroupFromList={onDeleteGroupFromList}
                    groupId={el.group.id} 
                    tasks={el.tasks}
                />
            </div>
        )
    )
}

export default Groups