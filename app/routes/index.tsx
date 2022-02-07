import GridLayout from '~/components/common/GridLayout';
import ErdInput from '~/components/ErdInput';
import NFTDraggableList from '~/components/NFTDraggableList';
import { useInitApp } from '~/hooks/init';

export default function Index() {
  useInitApp();

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <ErdInput />
      <div className="hidden md:flex flex-1 gap-4">
        <div className="w-1/5 h-full relative">
          <NFTDraggableList className="overflow-y-auto absolute inset-0" />
        </div>
        <GridLayout className="w-4/5" />
      </div>
      <div className="md:hidden">{`Not usable on a mobile device sorry ;)`}</div>
    </div>
  );
}
