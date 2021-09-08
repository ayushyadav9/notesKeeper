import React,{ useContext,useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'

function Notes() {
    const context = useContext(noteContext)
    const {notes,getNotes} = context
    useEffect(() => {
        getNotes()
    }, [])
    return (
        <>
            <AddNote/>
            <div className="row my-3">
                <h1>Your notes:</h1>
                {notes.map((note)=>{
                    return <Noteitem key = {note._id} note = {note}></Noteitem>
                })}
          </div>
        </>
    )
}

export default Notes
