import { useEffect } from 'react';
import { useSession } from '~/hooks/store/sessions';
import { getElementInParam } from '~/utils/url';

const ErdInput = () => {
  const { setAddressId } = useSession();

  useEffect(() => {
    const addressId = getElementInParam('addressId');

    if (addressId) {
      setAddressId(addressId as string);
    }
  }, []);

  return (
    <form
      className="flex gap-4"
      onSubmit={(event) => {
        event.preventDefault();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (event.target as any)[0].value;

        setAddressId(value);

        location.replace(`?addressId=${value}`);
      }}
    >
      <input
        placeholder="ERD Address"
        className="w-full md:w-[300px] mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
        type="text"
        id="addressId"
        name="addressId"
        required
      />
      <input className="p-2 rounded bg-blue-400 text-white cursor-pointer" type="submit" value="Send" />
    </form>
  );
};

export default ErdInput;
