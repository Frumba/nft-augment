import { useState } from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { ClientOnly } from 'remix-utils';

const ReactGridLayout = WidthProvider(RGL);

interface IProps {
  className?: string;
}

const GridLayout = ({ className }: IProps) => {
  const [layouts, setLayouts] = useState<Layout[]>([]);

  return (
    <ClientOnly fallback={<div />}>
      <ReactGridLayout
        className={`${className} bg-gray-100`}
        margin={[5, 5]}
        autoSize
        allowOverlap
        rowHeight={30}
        cols={12}
        isDroppable={true}
        measureBeforeMount={false}
        onDrop={(layouts, layoutItem, _event: DragEvent) => {
          console.log(layouts, layoutItem, _event.dataTransfer?.getData('data'));
          setLayouts(layouts);
        }}
      >
        {layouts?.map((l) => {
          return (
            <div className="bg-gray-200" key={l.i}>
              <span className="text">{l.i}</span>
            </div>
          );
        })}
      </ReactGridLayout>
    </ClientOnly>
  );
};

export default GridLayout;
