import React ,{useEffect,useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link,useParams} from 'react-router-dom';


function Cuisine(){

    const [cuisine,setCuisine]=useState([]);
    let params = useParams();

    const getCuisine = async(name)=>{
        const data = await fetch(`http://127.0.0.1:8000/recipe/search/?query=${name}`);
        const recipes = await data.json();
        setCuisine(recipes);

    };
    useEffect(()=>{
        getCuisine(params.type)
        console.log(params.type);

    },[params.type]);

    return <Grid>
        {/* animate={{opacity:1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition={{duration:0.5}} */}
        {cuisine.map((item)=>{
            return(
                <Card key={item.id}>
                    <Link to={'/recipe/'+item.id}>
                    <h4>{item.name}</h4> 
                    </Link>
                </Card>
            )
        })}
        
    </Grid>;
}
const Grid=styled(motion.div)`
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
export default Cuisine;