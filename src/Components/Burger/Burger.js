import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  /* 
    1. We made an array of the ingredient Obj keys , looped on them and return a
    new Array that the length of it is the same value as the key in the ingredient obj.
    so if the value of the meat key was 2 then we will get an array with the legnth 2 despite the inner values

    2. From the returned array we loop again by using map() and return the BurgerIngredient
    with the key and type.so we add the ingredients as the length of the array. and
    if we had more thatn one chesse then the key would be {cheese0} , {cheese1}

    3. After adding the burgerIngredients we want to check if the ingredients are empty to display a msg
    so we do that by reducing the length of the array and concat it with an intial empty array
    so if the ingredients were empty we will get an empty array with 0 length otherwise we will get an array
    with the length of the passes ingredients. lastly we can check if the legnth == 0 and display the msg
  */

  let transformedIngredients = Object.keys(props.ingredient)
    .map((igKey) => {
      return [...Array(props.ingredient[igKey])].map((_, index) => {
        return <BurgerIngredient key={igKey + index} type={igKey} />;
      });
    })
    .reduce((acc, current) => {
      return acc.concat(current);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start Adding Ingredients!!!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
