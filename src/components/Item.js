import React from "react";

import Game from "./Game";

import App from "./App";

function Item(props) {
  const ref = React.useRef(props.itemId);
  React.useEffect(() => {
    console.log(
      props.itemId,
      "-------",
      typeof props.itemId,
      props.itemId === "cursor"
    );
    if (props.itemId === "cursor") {
      ref.current.focus();
    }
  }, [props]);

  return (
    <button ref={ref} onClick={props.itemClick}>
      <div>{props.name}</div>
      <div>{props.cost}</div>
      <div>{props.value}</div>
      <div>{props.purchasedItems}</div>
    </button>
  );
}

export default Item;
