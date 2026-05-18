import { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import type { DropZoneProps } from './types';
import type { ShortIngredient } from '@/types/Ingredient';

export const DropZone = ({
  accept,
  children,
  type,
  canDrop,
  onDrop,
  onEnter,
  onLeave,
  className = '',
}: DropZoneProps): React.JSX.Element => {
  const [dragItem, setDragItem] = useState<ShortIngredient | null>(null);

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept,
      drop: (item: ShortIngredient): void => {
        if (canDrop({ zoneType: type, item })) {
          onDrop(item);
        }
      },
      collect: (monitor): { isOver: boolean } => ({
        isOver: !!monitor.isOver(),
      }),
      hover: (item: ShortIngredient): void => {
        if (!dragItem) {
          setDragItem(item);
        }
      },
    }),
    [accept, canDrop, onDrop, dragItem]
  );

  useEffect(() => {
    if (isOver && dragItem) {
      onEnter(dragItem);
    } else if (!isOver && dragItem) {
      onLeave(dragItem);
      setDragItem(null);
    }
  }, [isOver, dragItem, onEnter, onLeave]);

  return (
    <div ref={dropRef} className={className}>
      {children}
    </div>
  );
};
