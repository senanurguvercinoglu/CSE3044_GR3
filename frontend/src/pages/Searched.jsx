import React from 'react'
import {useEffect,useState} from 'react';
import {useParams} from'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Searched() {
    const[searchedRecipes,setSearchedRecipes]= useState([]);
    let params=useParams();
  
    const getSearched = async(name)=>{

        const data = await fetch(`http://127.0.0.1:8000/recipe/search/?query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes);

    };
    useEffect(()=>{
        getSearched(params.search);
    },[params.search]);

    return (<Grid>
        {searchedRecipes.map((item)=>{
            return(
                <Card key={item.id}>
                    <Link to={'/recipe/'+item.id}>
                    <h4>{item.name}</h4> 
                    </Link>
                </Card>

            );
        })}
        </Grid>
    );
  
}
const Grid=styled.div`
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));
    grid-gap:3rem;
`;
const Card=styled.div`
    img{
        width:100%;
        border-radius:2rem;
    }
    a{
        text-decoration:none;
    }
    h4{
        text-align:center;
        padding:1rem;
    }`;

export default Searched;