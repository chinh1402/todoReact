import React from "react";

class App extends React.Component {
  selectOptions = ["All", "To do", "Done"];

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.selectOptions[0],
      listItem: JSON.parse(localStorage.getItem("listItem")) || [
        ["Item 1", false],
        ["Item 2", true],
        ["Item 3", true],
      ],
      inputValue: "",
    };
  }

  componentDidUpdate(prevState) {
    // Check if the value has changed
    if (prevState.listItem !== this.state.listItem) {
      localStorage.setItem("listItem", JSON.stringify(this.state.listItem));
    }
  }

  listDisplayValue = (value) => {
    this.setState({ selectedValue: value });
  };

  handleToggle = (index) => {
    this.setState((prevState) => {
      const updatedList = prevState.listItem.map((listItem, idx) => {
        return index === idx ? [listItem[0], !listItem[1]] : listItem;
      });
      return { listItem: updatedList };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputValue) {
      this.setState((prevState) => {
        const updatedList = [
          ...prevState.listItem,
          [this.state.inputValue, false],
        ];
        this.state.inputValue = "";

        return { listItem: updatedList };
      });
    }
  };

  handleDelete = (e, index) => {
    e.stopPropagation();
    console.log(index);
    
    if (this.state.listItem) {
      this.setState((prevState) => {
        prevState.listItem.splice(index, 1)
        const updatedList = [...prevState.listItem];
        return {listItem: updatedList}
      })
    }
  }

  render() {
    let displayIndex = 1;
    return (
      <>
        <div className="wrapper">
          <div className="app-texts-container">
            <p className="text mb-8">Let's add what you have to do!</p>
            <p className="text">
              Fill the input and click button or "Enter" to add a new task into
              the list. <br /> To mark as completed, just click directly to the
              task
            </p>
          </div>

          <form
            action="#"
            className="input-form"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div className="input-wrapper">
              <input
                type="text"
                className="input"
                value={this.state.inputValue}
                onInput={(e) => this.setState({ inputValue: e.target.value })}
              />
            </div>
            <div className="input-add-btn">
              <button type="submit" className="btn">
                <i className="btn-icon fa fa-plus"></i>
              </button>
            </div>
          </form>

          <div className="todo-list-container">
            <div className="list-header">
              <h2 className="list-title">List:</h2>
              <select
                name=""
                id=""
                className="list-select"
                value={this.state.selectedValue}
                onChange={(e) => this.listDisplayValue(e.target.value)}
              >
                {this.selectOptions.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <ul className="list-body">
              {
              this.state.listItem.map((value, index) => {
                switch (this.state.selectedValue) {
                  case "All":
                    return (
                      <li
                        key={index}
                        className={`list-item`}
                        onClick={() => this.handleToggle(index)}
                      >
                        <span className={`${value[1] ? "done" : ""} texts`}>{displayIndex++}. {value[0]}</span>
                        <i
                          className="list-item-icon fa fa-trash"
                          onClick={(e) => this.handleDelete(e, index)}
                          
                        ></i>
                      </li>
                    );
                  case "To do":
                    return (
                      !value[1] && (
                        <li
                          key={index}
                          className={`list-item`}
                          onClick={() => this.handleToggle(index)}
                        >
                          <span className={`${value[1] ? "done" : ""} texts`}>{displayIndex++}. {value[0]}</span>
                          <i
                            className="list-item-icon fa fa-trash"
                            onClick={(e) => this.handleDelete(e, index)}
                            
                          ></i>
                        </li>
                      )
                    );
                  case "Done":
                    return (
                      value[1] && (
                        <li
                          key={index}
                          className={`list-item`}
                          onClick={() => this.handleToggle(index)}
                        >
                          <span className={`${value[1] ? "done" : ""} texts`}>{displayIndex++}. {value[0]}</span>
                          <i
                            className="list-item-icon fa fa-trash"
                            onClick={(e) => this.handleDelete(e, index)}
                            
                          ></i>
                        </li>
                      )
                    );
                  default:
                    return (
                      (
                        <li
                          key={index}
                          className={`list-item`}
                          onClick={() => this.handleToggle(index)}
                        >
                          <span className={`${value[1] ? "done" : ""} texts`}>{displayIndex++}. {value[0]}</span>
                          <i
                            className="list-item-icon fa fa-trash"
                            onClick={(e) => this.handleDelete(e, index)}
                            
                          ></i>
                        </li>
                      )
                    );
                }
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default App;
