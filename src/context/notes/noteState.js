import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial =[
        {
          "_id": "6134aad051540df4e4b3773528",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:32.860Z",
          "__v": 0
        },
        {
          "_id": "6134aad25540df334e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        },
        {
          "_id": "6134aad2554055df4e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        },
        {
          "_id": "6134aad255470df4e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        },
        {
          "_id": "6134aad255440df4e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        },
        {
          "_id": "6134aad2554540df4e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        }
      ]
      const [notes, setnotes] = useState(notesInitial)

      //Add a note
      const addNote = (title,description,tag)=>{
        console.log("Adding new note")
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

      }

      //Edit a note
      const editNote = (id)=>{

      }

    return (
        <NoteContext.Provider value = {{notes,setnotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;