import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";

const OrderSummry = (props) => {
  const ingredientSummry = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your Order:</h3>
      <p>A Delicious burger witht the following ingredients:</p>
      <ul>{ingredientSummry}</ul>
      <p>
        Total Price:
        <strong> {props.price}$</strong>
      </p>
      <p>Continue To Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Fragment>
  );
};

export default OrderSummry;
