import React from 'react';
import UserInfo from 'components/UserInfo';
import AddUser from 'components/AddUser';

const Borrower = () => {
  return (
    <div class="flex ">
      <div class="flex-none w-14 h-14 border-1 bg-kmuttColor-800">01</div><UserInfo/>
      <div class="flex-initial w-32 border-1">02</div><AddUser/>
      <div class="flex-initial w-32 border-1">03</div><UserInfo/>
      
    </div>
  );
};

export default Borrower;
