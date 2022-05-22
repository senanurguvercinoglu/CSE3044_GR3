import React, { Component } from "react";
import ReactDOM from "react-dom";
import { colourOptions } from "./data.jsx";
import { utensil } from "./data2.jsx";

import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Option = (props) => {
  return (
    
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>    
  );
};



export default class Example extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      optionSelectedUtensils: [],
      optionSelectedIngredients: []

    };
  }

  handleChangeUtensils = (selected) => {

    this.setState({
      optionSelectedUtensils: selected
    });
  };
  handleChangeIngredients = (selected) => {
    this.setState({
      optionSelectedIngredients: selected
    });
  };

  getFilteredRecipes = () => {
    console.log(this.state); 
  }

  



  render() {
    return (
     
      <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >



      <h1 >Utensils</h1>
      <ReactSelect 
          options={colourOptions}
          isMulti={true}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChangeUtensils}
          allowSelectAll={true}
          value={this.state.optionSelectedUtensils}
        />



        <h1>Ingredients</h1>
        <ReactSelect
          options={utensil}
          isMulti={true}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChangeIngredients}
          allowSelectAll={true}
          value={this.state.optionSelectedIngredients}
        />

    <button onClick={this.getFilteredRecipes}>
        Find recipes
    </button>

          
      </span>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Example />, rootElement);