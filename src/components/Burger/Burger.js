import React from 'react';
import classes from "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const burger = (props) =>{
    
    let transformedIngredients = Object.keys(props.ingredients)
    .map(keyIng=>{
        return [...Array(props.ingredients[keyIng])].map((_,i)=><BurgerIngredients key={keyIng+i} type={keyIng}/>)
    }).reduce((arr,el) => {return arr.concat(el)},[]);

   if (transformedIngredients.length === 0) {
       transformedIngredients  = <p>Please start adding ingredients</p>
   }
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
          {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>   
   );
}


export default burger;