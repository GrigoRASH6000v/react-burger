export type DragItemProps = {
  children: React.ReactNode;
  dragType: string;
  index: number;
  className?: string;
  onSort: (from: number, to: number) => void;
};
