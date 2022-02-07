import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { ClientOnly } from 'remix-utils';
import styled from 'styled-components';

const RemoveButtonContainer = styled.div`
  top: 10px;
  right: 10px;
`;

const ReactGridLayout = WidthProvider(RGL);

const ReactGridLayoutStyled = styled(ReactGridLayout)`
  height: 100% !important;
`;

interface IProps<Data = unknown> {
  className?: string;
  itemToRender: (data: Data) => JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const GridLayout = <Data extends {}>({ className, itemToRender }: IProps<Data>) => {
  const [layouts, setLayouts] = useState<Layout[]>([]);
  const [dataMatch, setDataMatch] = useState<Array<{ key: string; data: Data }>>([]);

  return (
    <ClientOnly fallback={<div />}>
      <ReactGridLayoutStyled
        className={`${className} rounded bg-gray-100`}
        margin={[5, 5]}
        allowOverlap
        rowHeight={30}
        cols={12}
        layout={layouts}
        isDroppable={true}
        onDrop={(layouts, _layoutItem, _event: DragEvent) => {
          setLayouts(
            layouts.map((layout, index) => {
              if (layout.i === '__dropping-elem__') {
                setDataMatch([
                  ...dataMatch,
                  { key: index.toString(), data: JSON.parse(_event.dataTransfer?.getData('data') as string) as Data },
                ]);

                return {
                  ...layout,
                  i: index.toString(),
                  w: 4,
                  h: 8,
                };
              }

              return layout;
            }),
          );
        }}
      >
        {layouts?.map((l) => {
          const existingData = dataMatch.find((data) => data.key === l.i);

          return (
            <div className="relative bg-gray-200" key={l.i}>
              <RemoveButtonContainer
                className="cursor-pointer z-10 absolute flex items-center justify-center bg-white rounded w-7 h-7"
                onClick={() => {
                  setLayouts(layouts.filter((layout) => layout.i !== l.i));
                  setDataMatch(dataMatch.filter((data) => data.key !== l.i));
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </RemoveButtonContainer>
              {existingData ? itemToRender(existingData.data) : null}
            </div>
          );
        })}
      </ReactGridLayoutStyled>
    </ClientOnly>
  );
};

export default GridLayout;
