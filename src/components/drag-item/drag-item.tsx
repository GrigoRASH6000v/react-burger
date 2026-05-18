import { useDrag, useDrop } from 'react-dnd';

import type { DragItemProps } from './types';

export const DragItem = ({
  children,
  dragType,
  index,
  onSort,
  className = '',
}: DragItemProps): React.JSX.Element => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: dragType,
      item: { index },
      collect: (monitor): { isDragging?: boolean } => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [index, dragType]
  );

  const [, drop] = useDrop(
    () => ({
      accept: dragType,
      drop: (item: { index: number }): void => {
        if (item.index !== index) onSort(item.index, index);
      },
    }),
    [onSort]
  );

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={className}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {children}
    </div>
  );
};
