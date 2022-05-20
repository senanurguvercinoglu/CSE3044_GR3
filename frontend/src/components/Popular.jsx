import { useEffect,useState } from 'react';
import styled from 'styled-components';
import {Splide,SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import {Link} from 'react-router-dom';

function Popular() {

    const[popular,setPopular]=useState([]);


    useEffect(() => {
        getPopular();


        },[]);


    const getPopular=async()=>{

        const check= localStorage.getItem('popular');
        const api=  await fetch('http://127.0.0.1:8000/recipe/');
        const data= await api.json();

        localStorage.setItem('popular', JSON.stringify(data));
        setPopular(data);
        console.log(data);  
        
    }; 

    return <div>
                <Wrapper>
                    <h3>Popular Picks</h3>
                    <Splide options={{
                        perPage:4,
                        arrows: true,
                        pagination:false,
                        drag:'free',
                        gap:'5rem',
                    }}>


                    {popular.map((recipe)=>{
                        return(
                            <SplideSlide key={recipe.id}>

                            <Card>
                                <Link to={'/recipe/'+recipe.id}>
                                    <p>{recipe.name}</p>
                                    <img src={recipe.image} alt={recipe.name} />
                                    <Gradient/>
                                </Link>

                            </Card>
                            </SplideSlide>


                        );
                    })}
                      </Splide>
                </Wrapper>


    </div>;

}
const Wrapper = styled.div`
    margin: 4rem 0rem;`;
const Card = styled.div`
    min-height:25rem;
    border-radius:2rem;
    overflow:hidden;
    position: relative;
    img{
        border-radius: 3rem;
        position: absolute;
        left: 0;
        width:100%;
        height:100%;
        object-fit:cover;
    }
    p{
        position:absolute;
        z-index:10;
        left:50%;
        bottom:0%;
        transform:translate(-50%,0%);
        color:white;
        width:100%;
        text-align:center;
        font-weight:600;
        font-size:1rem;
        height:40%;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    
    `;
const Gradient=styled.div`
    z-index:3;
    position:absolute;
    width:100%;
    height:100%;
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`;

export default Popular 