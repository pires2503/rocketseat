import React, { useState } from "react";
import produce from "immer";

import { loadLists } from "../../services/api";
import { Container } from "./styles";
import List from "../List";
import BoardContext from "./context";

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  //MOVE CARD
  function move(fromList, toList, from, to) {
    setLists(
      produce(lists, draft => {
        //Dados do card selecionado
        const dragged = draft[fromList].cards[from];

        //Retirando do local atual (List/Card)
        draft[fromList].cards.splice(from, 1);

        //Colocando no local destino (List/Card)
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
}
