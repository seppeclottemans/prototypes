import React, { Component } from "react";

class TodoItems extends Component {
    constructor(props){
        super(props);

        this.createTasks = this.createTasks.bind(this);
      }

    createTasks(item){
    return <li className={"list-group-item list-item"} key={item.key}><label className={`taskName ${item.complete ? "complete" : ""}`}>{item.text}</label>
    <div className='showOnHover'>
        <button className="completeButton" onClick={() => this.complete(item.key)}>Complete</button> 
        <button className="deleteButton" onClick={() => this.delete(item.key)} >Delete</button>
    </div>
    </li>
    }

    delete(key){
        this.props.delete(key);
    }

    complete(key){
        this.props.complete(key);
    }

    render(){
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return (
            <ul className="tasks">
                {listItems}
            </ul>
        )
    }
}

export default TodoItems;