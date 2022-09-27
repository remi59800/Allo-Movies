import { forwardRef } from 'react';

const InputSearch = forwardRef((props, ref) => {
  return (
    <>
      <input
        type='text'
        placeholder='Rechercher un film...'
        ref={ref}
        {...props}
      />
    </>
  );
});

export default InputSearch;
