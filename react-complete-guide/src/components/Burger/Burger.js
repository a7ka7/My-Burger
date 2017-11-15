import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'

const burger = (props) => {

   /* for(let test in props.ingredients){
        console.log(props.ingredients[test]);
        https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
    }*/

    //Defini le tab d'ingredients
    //On transforme l'objet en tab et on le parcours pour faire un nouveau tab contenant des tab vides dans lesquels
    //on met chaque ingredient sous forme d'objet qu'on fini par concatener pour n'avoir qu'un tab
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey+i} type={igKey} />
        });
        })
        .reduce((arr,el) => {
            return arr.concat(el) //[...arr, el]
        } , [])
    ;
    
    //Si pas d'ingredients dans la tab on affiche cela
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    
    //on affiche le burger avec le pain et le tab d'ingredients au milieu
    return(
        <div className={classes.Burger} >
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;