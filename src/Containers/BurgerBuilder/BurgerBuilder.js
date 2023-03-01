import React, { Fragment, useState } from "react";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Burger from "../../Components/Burger/Burger";
import OrderSummry from "../../Components/Burger/OrderSummry/OrderSummry";
import Modal from "../../Components/UI/Modal/Modal";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.3,
  meat: 1.4,
};

const BurgerBuilder = () => {
  const [burgerState, setBurgerState] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
  });

  // Toggling the purschaing to true when clicking on the order btn and pass it to the MODAL to make Styling
  const purchasingHandler = () => {
    setBurgerState({
      ingredients: burgerState.ingredients,
      totalPrice: burgerState.totalPrice,
      purchasable: burgerState.purchasable,
      purchasing: true,
    });
  };

  const purchasingCancelHandler = () => {
    setBurgerState({
      ingredients: burgerState.ingredients,
      totalPrice: burgerState.totalPrice,
      purchasable: burgerState.purchasable,
      purchasing: false,
    });
  };

  const purchasingContinueHandler = () => {
    alert("Continue");
  };

  /*
    1. If there are any ingredients we set the purchasable to true and pass it for the button
    2. We get the updated ingredient from the add and remove methods.
    3. dont forget to update the whole state.
    4. we call this function at the add and remove method
  */
  const updatePurchasableState = (ingredient, price) => {
    const sumOfValues = Object.values(ingredient).reduce((acc, current) => {
      return acc + current;
    }, 0);
    setBurgerState({
      ingredients: ingredient,
      totalPrice: price,
      purchasable: sumOfValues > 0,
    });
  };
  /*
  A=>
    1. Get the value of the ingredient
    2. declare an updated cout when appling the function
    3. declare a new ingredient obj copied from the main one
    4. updated the value of the choosed ingredient
  
  B=>
    1. Get the price of the ingredient 
    2. Get the Old price from the state
    3. update the old price by adding the price of the ingredient to the old price

  -- Update The State With 
  */
  const addIngredientHandler = (type) => {
    const oldCount = burgerState.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...burgerState.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = burgerState.totalPrice;
    const updatedPrince = oldPrice + priceAddition;

    setBurgerState({
      totalPrice: updatedPrince,
      ingredients: updatedIngredients,
    });
    updatePurchasableState(updatedIngredients, updatedPrince);
  };

  const removeIngredientHandler = (type) => {
    const oldCount = burgerState.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...burgerState.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENTS_PRICE[type];
    const oldPrice = burgerState.totalPrice;
    const updatedPrince = oldPrice - priceDeduction;

    setBurgerState({
      totalPrice: updatedPrince,
      ingredients: updatedIngredients,
    });
    updatePurchasableState(updatedIngredients, updatedPrince);
  };
  // Pass this to know if the less Btn should be disabled or not.
  const disapledInfo = {
    ...burgerState.ingredients,
  };
  for (const key in disapledInfo) {
    disapledInfo[key] = disapledInfo[key] <= 0;
  }
  // {salad: true, meat: false, ...}

  return (
    <Fragment>
      <Modal
        show={burgerState.purchasing}
        modalClosed={purchasingCancelHandler}
      >
        <OrderSummry
          price={burgerState.totalPrice}
          ingredients={burgerState.ingredients}
          purchaseCancelled={purchasingCancelHandler}
          purchaseContinued={purchasingContinueHandler}
        />
      </Modal>
      <Burger ingredient={burgerState.ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabled={disapledInfo}
        ordered={purchasingHandler}
        purchasable={burgerState.purchasable}
        price={burgerState.totalPrice}
      />
    </Fragment>
  );
};
export default BurgerBuilder;
