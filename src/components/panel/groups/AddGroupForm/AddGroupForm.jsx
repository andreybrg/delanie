import React from "react"
import cn from 'classnames'
import style from './AddGroupForm.module.sass'

const AddGroupForm = ({
    addGroupFormRef,
    groupTitleInput,
    setGroupTitleInput,
    onAddGroupFormSubmit,
    isAddingGroup,
    isFormDisabled,
}) => {
    return(
        !isAddingGroup
        ?
        <div className={style.header}>
            <form ref={addGroupFormRef} className={cn(style.form, {[style.form_fetching]: isFormDisabled})} onSubmit={(event) => !isAddingGroup ? onAddGroupFormSubmit(event) : null}>
                <fieldset disabled={isFormDisabled}>
                    <input className={style.titleField} type="text" name="groupTitle" autoFocus value={groupTitleInput} onChange={(event) => setGroupTitleInput(event.target.value)} placeholder='Новая группа...'/>
                    <button type="submit" className={style.submitBtn}></button>
                </fieldset>
            </form>
        </div>
        :
        <div className={style.header}>
            <div className={
                cn(style.title, 
                style.lightGray,
                {
                    [style.title_fetching]: true
                }
            )}>{groupTitleInput}</div>
        </div>

    )
}

export default AddGroupForm