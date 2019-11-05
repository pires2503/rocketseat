import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Container, Label } from "./styles";
import BoardContext from "../Board/context";

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  //DRAG
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "CARD", index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  //DROP
  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      //Lista
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      //Cards
      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      //Tamanho e ponto central do elemento origem
      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      //Verifica o quanto o elemento origem foi arrastado para o elemento origem
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      //Cálculos para realizar ação somente após atingir o ponto central do elemento
      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      //Ação de mover dentro da própria lista
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      //Define o novo valor para list/card
      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  //Ref de DnD
  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => (
          <Label key={label} color={label} />
        ))}
      </header>

      <p>{data.content}</p>

      {data.user && <img src={data.user} alt="Avatar" />}
    </Container>
  );
}
