import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Item from "./Item";
import cookieSrc from "../cookie.svg";
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 }
];

const calculateCookiesPerSecond = purchasedItems => {
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find(item => item.id === itemId);
    const value = item.value;

    return acc + value * numOwned;
  }, 0);
};

const Game = () => {
  const [numCookies, setNumCookies] = React.useState(100);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0
  });

  React.useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;
    return () => {
      document.title = `Cookie Clicker Workshop`;
    };
  }, [numCookies]);

  React.useEffect(() => {
    const handleKeyDown = ev => {
      if (ev.code === "Space") {
        HandleClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  function HandleClick() {
    setNumCookies(numCookies + 1);
  }

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerSecond(purchasedItems)}</strong> cookies
          per second
        </Indicator>
        <Button onClick={HandleClick}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map(item => {
          return (
            <Item
              key={item.name}
              itemId={item.id}
              name={item.name}
              value={item.value}
              cost={item.cost}
              purchasedItems={purchasedItems[item.id]}
              itemClick={() => {
                if (numCookies >= item.cost) {
                  setNumCookies(numCookies - item.cost);
                  setPurchasedItems({
                    ...purchasedItems,
                    [item.id]: purchasedItems[item.id] + 1
                  });
                } else {
                  alert("not enough cookies!!!");
                }
              }}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
