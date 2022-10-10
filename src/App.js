import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import { cards } from "./cards";

function App() {
  const startSort = () => {
    // 1. 서식지 별로 분류
    const cardGropsByHabitat = [];
    cards.forEach((card) => {
      const splitedCard = card.split("-");
      if (cardGropsByHabitat[Number(splitedCard[0])]) {
        cardGropsByHabitat[Number(splitedCard[0])].push(Number(splitedCard[1]));
      } else {
        const newGroup = [];
        newGroup.push(Number(splitedCard[1]));
        cardGropsByHabitat[Number(splitedCard[0])] = newGroup;
      }
    });
    console.log("cardGroups", cardGropsByHabitat);

    // 2. 같은 서식지끼리는 두지 말며, 최대한 떨어뜨려서 분포시킬것
    const BOX_LIMIT = 1000;
    const sortedCards = [];
    cardGropsByHabitat.forEach((group, habitatNumber) => {
      if (group) {
        const interval = Math.trunc(BOX_LIMIT / group.length);
        let myIndex = 0;
        group.forEach((card) => {
          if (sortedCards[myIndex]) {
            sortedCards[myIndex].push(
              `${formattingTwo(habitatNumber + "")}-${formatting(card + "")}`
            );
          } else {
            const newArray = [];
            newArray.push(
              `${formattingTwo(habitatNumber + "")}-${formatting(card + "")}`
            );
            sortedCards[myIndex] = newArray;
          }
          myIndex += interval;
        });
      }
    });

    console.log("sortedCards", sortedCards);

    // 3. 상자에 담기
    const boxes = {};
    sortedCards.forEach((sortedCard, index) => {
      let boxNumber = index + "";
      if (boxNumber.length !== 4) {
        boxNumber = formatting(boxNumber);
      }

      boxes[boxNumber] = sortedCard;
    });
    console.log("boxes", boxes);
  };

  const formatting = (target) => {
    switch (target.length) {
      case 1:
        return `000${target}`;
      case 2:
        return `00${target}`;
      case 3:
        return `0${target}`;
      default:
        break;
    }
  };

  const formattingTwo = (target) => {
    switch (target.length) {
      case 1:
        return `00${target}`;
      case 2:
        return `0${target}`;
      case 3:
        return target;
      default:
        return target;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={startSort} variant="contained">
          정리 실행
        </Button>
      </header>
    </div>
  );
}

export default App;
