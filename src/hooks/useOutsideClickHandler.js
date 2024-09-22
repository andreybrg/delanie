import { useEffect, useRef } from "react"

const useOutsideClickHandler = (callback, changers, addListenerReason=true) => {

    // Создаём `ref`, относительно которого прослушивается клик
    const ref = useRef()

    // Если клик вне нашего `ref`, выполняем `callback`
    const hendleOutsideClick = (event) => {
        if (!ref.current?.contains(event.target)) {
            callback()
        }
    }

    // Вешаем слушатель клика на `window`
    // Перерегистрируем слушатели с новым контекстом на основе `changers`
    useEffect(()=>{

        if(addListenerReason) {
            window.addEventListener("mousedown", hendleOutsideClick)
        }

        // Если компонент размонтируется, удаляем слушатель
        return () => {
            window.removeEventListener("mousedown", hendleOutsideClick)
        }

    }, changers)

    // Возвращаем `ref` который будем указывать элементу для прослушивания клика вне элемента
    return [ ref ]
}

export { useOutsideClickHandler }