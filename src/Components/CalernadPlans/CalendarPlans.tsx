import { FC, useState } from 'react'
import styles from './styles.module.css'
import { faL } from '@fortawesome/free-solid-svg-icons'


interface PlansProps {
    /*
    closeStatus: boolean,
    CloseNotesWindow: () => void*/
}

export const Plans: FC<PlansProps> = (/*{closeStatus, CloseNotesWindow}*/) => {
const [button, setButton] = useState(false)

    const closeWindow = () => {
setButton(false)
    }
    return (
        <form className={styles.form} action="">
                 <button type="submit">X</button>
            <input type="text" placeholder="Title"/>
            <input type="text" placeholder="Discribe"/>
       
        </form>
       
    )
}


