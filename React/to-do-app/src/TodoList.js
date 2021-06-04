import React, { Component } from "react";
import TodoItems from './TodoItems';
import './TodoList.css';

class TodoList extends Component {
  constructor(props){
    super(props);

    this.state = {
      items: []
    }

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
  }

  addItem(event){
    if(this._inputElement.value !== ''){
      let newItem = {
        text: this._inputElement.value,
        key: Date.now(),
        complete: false
      };

      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem)
        };
      });
    }
    this._inputElement.value = '';

    event.preventDefault();
  }

deleteItem(key){
  var filteredItems = this.state.items.filter(function(item){
    return (item.key !== key)
  });

  this.setState({
    items: filteredItems
  });
}

completeItem(key){
  var item = this.state.items.find(function(item){
    return item.key === key;
  });

  item.complete = true;

  this.setState({
    items: this.state.items
  });
}

    render() {
        return (
          <div className="todoListMain">
            <div className="header">
              <form onSubmit={this.addItem}>
                <input name='taskName' id='taskName' ref={(taskName) => this._inputElement = taskName} placeholder="enter task">
                </input>
                <button className='submit' type="submit">add</button>
              </form>
            </div>
            <TodoItems entries={this.state.items} delete={this.deleteItem} complete={this.completeItem}/>
          </div>
        );
      }
}

export default TodoList;