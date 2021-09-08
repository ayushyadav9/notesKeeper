import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial =[]
      const [notes, setnotes] = useState(notesInitial)

       //Add a note
       const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2FhYTM0NmZlNTdmYjVmZjVkNWQ1In0sImlhdCI6MTYzMDc3NTk5MX0.OLQvWPAIhTGqm44oLHMXr8ZhrHdmRhKFDYu460sR41U'
          }
        });
        const json = await response.json()
        console.log(json)
        setnotes(json)
      }


      //Add a note
      const addNote = async (title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2FhYTM0NmZlNTdmYjVmZjVkNWQ1In0sImlhdCI6MTYzMDc3NTk5MX0.OLQvWPAIhTGqm44oLHMXr8ZhrHdmRhKFDYu460sR41U'
          },
          body: JSON.stringify({title,description,tag}) 
        });
        const note ={
          "_id": "6134aad255dd4540df4e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        }
        setnotes(notes.concat(note))
      }



      //Delete a note
      const deleteNote = (id)=>{
        const newNote = notes.filter((note)=>{return note._id!==id})
        setnotes(newNote)
      }




      //Edit a note
      const editNote = async (id,title,description,tag)=>{

        const response = await fetch(`${host}/api/notes/update/${id}`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2FhYTM0NmZlNTdmYjVmZjVkNWQ1In0sImlhdCI6MTYzMDc3NTk5MX0.OLQvWPAIhTGqm44oLHMXr8ZhrHdmRhKFDYu460sR41U'
          },
          body: JSON.stringify({title,description,tag}) 
        });
        for (let idx = 0; idx < notes.length; idx++) {
          const element = notes[idx];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag
          }
        }
      }

    return (
        <NoteContext.Provider value = {{notes,setnotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;