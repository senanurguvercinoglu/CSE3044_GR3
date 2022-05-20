import {useEffect,useState} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import React from 'react';

function Recipe() {
  let params=useParams();
  const[details,setDetails]=useState({});
  const[activeTab,setActiveTab]=useState('instructions');

  const fetchDetails=async()=>{
    const data=await fetch(`http://127.0.0.1:8000/recipe/${params.name}/`);
    const detailData=await data.json();
    setDetails(detailData);
    console.log(detailData);    

  };
  useEffect(()=>{
    fetchDetails();

  },[params.name]);



  return (
    <DetailWrapper>
      <div>
        <h2> 
          {details.name}
        </h2>
      </div>
      <Info>
        <Button className={activeTab==='instructions'?'active':''}
        onClick={()=>setActiveTab('instructions')}>
          Instructions
        </Button>
        <Button className={activeTab==='ingredients'?'active':''}
        onClick={()=>setActiveTab('ingredients')}>Ingredients
         </Button>
         {activeTab === 'instructions'&&(
          <div>
           <h3 dangerouslySetInnerHTML={{__html:details.recipe_description}}></h3>

         </div>
         )}
         {activeTab === 'ingredients'&&(
           <ul>
           {details.ingredients.map((i)=>(
           <li key={i.id}>{i.name}</li>))}
         </ul>
         )}

       </Info>
    </DetailWrapper>
 );
}
const DetailWrapper=styled.div`
  margin-top:10rem;
  margin-bottom:5rem;
  display:flex;
  .active{
    background: linear-gradient(35deg, #494949,#313131);
    color:white;
  }
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size:1.2rem;
    line-height:2.5rem;
  }
  ul{
    margin-top:2rem;
  }
 
 `;

const Button=styled.button`
    padding:1rem 2rem;
    color:#313131;
    background:white;
    border:2px solid black;
    margin-right:2rem;
    font-weight:600;
    `;
const Info=styled.div`
  
     margin-left:3rem;
     
     
    `;

export default Recipe; 