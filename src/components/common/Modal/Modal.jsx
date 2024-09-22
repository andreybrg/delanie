import React from 'react'
import style from './Modal.module.sass'

const Modal = props => {
	return(
		<div className={style.modal} id={'forTasks'}>
            <div className={style.container}>
                <div className={style.content}></div>
            </div>
        </div>
	)
}

export default Modal