import React, { Component } from "react";
import ReactDOM from "react-dom";


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


const utensilOptions = [
  {label: "tepsi", value: "1"},
  {label: "rende", value: "2"},
  {label: "şef bıçağı", value: "3"},
  {label: "fırın", value: "5"},
  {label: "ızgara", value: "6"},
  {label: "mutfak robotu", value: "7"},
  {label: "büyük kaşık", value: "8"},
  {label: "süzgeç", value: "9"},
  {label: "mikser", value: "10"}
]

const ingredientOptions = [
  {label: "pirinç", value: "1"},
  {label: "bulgur", value: "2"},
  {label: "burger ekmeği", value: "3"},
  {label: "kıyma", value: "4"},
  {label: "pul biber", value: "5"},
  {label: "süt", value: "6"},
  {label: "su", value: "7"},
  {label: "yumurta", value: "8"},
  {label: "midye", value: "9"},
  {label: "soda", value: "10"},
  {label: "soğan", value: "11"},
  {label: "kabartma tozu", value: "12"},
  {label: "patates", value: "13"},
  {label: "kaşar peyniri", value: "14"},
  {label: "zeytinyağı", value: "15"},
  {label: "domates", value: "16"},
  {label: "soğan", value: "17"}
]


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



  getFilteredRecipes = async () => {
    {/*
      DONE 1- Statedeki utensil ve ingredient ID'lerini birlestirip bir string haline getir
      DONE 2- requesti yolla
      3- requestten donen jsonla ----bir şekilde----- render et



      http://127.0.0.1:8000/recipe/filter/?u=1&i=1
    */}
    
    
    this.ingredient_ids = this.state.optionSelectedIngredients.map(i => i.value);
    this.utensil_ids = this.state.optionSelectedUtensils.map(u => u.value);

    this.ingredients_str = this.ingredient_ids.join('_');
    this.utensils_str = this.utensil_ids.join('_');
    
    this.request_url  = 'http://127.0.0.1:8000/recipe/filter/?';

    if (this.ingredients_str != '') {
        this.request_url += 'i=' + this.ingredients_str;
    }

    if (this.utensils_str != '') {
      if (this.request_url.includes('i=')) {
        this.request_url += '&';
      }
      this.request_url += 'u=' + this.utensils_str;
    }

    const data = await fetch(this.request_url);
    console.log(await data.json());


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
          options={utensilOptions}
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
          options={ingredientOptions}
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