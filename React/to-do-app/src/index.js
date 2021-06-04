import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoList from "./TodoList"

var destination = document.querySelector("#wrapper");
  
ReactDOM.render(
    <div className='main'>
        <TodoList/>
    </div>,
    destination
);