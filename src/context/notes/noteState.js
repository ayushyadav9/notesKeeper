import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notesInitial =[
        {
          "_id": "6134aad05540df4e4b773528",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:32.860Z",
          "__v": 0
        },
        {
          "_id": "6134aad25540df4e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        },
        {
          "_id": "6134aad25540df4e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        },
        {
          "_id": "6134aad25540df4e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        },
        {
          "_id": "6134aad25540df4e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        },
        {
          "_id": "6134aad25540df4e4b77352a",
          "user": "6133aaa346fe57fb5ff5d5d5",
          "title": "Hellodfo",
          "description": "askdhdsdaksjcnskjcns",
          "tag": "persdssonal",
          "date": "2021-09-05T11:32:34.426Z",
          "__v": 0
        }
      ]
      const [notes, setnotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value = {{notes,setnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;