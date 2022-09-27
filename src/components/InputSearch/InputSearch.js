import { forwardRef } from 'react';

const InputSearch = forwardRef((props, ref) => {
  return (
    <div className='input-search'>
      <input
        type='text'
        placeholder='Rechercher un film...'
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default InputSearch;
