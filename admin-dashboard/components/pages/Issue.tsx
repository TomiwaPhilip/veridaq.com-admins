"use client";

import React from 'react';

import { Wallet } from '../shared/shared';

const IssueVeridaq: React.FC = () => {
  return (
    <main>
      <div className="grid grid-cols-2 items-center justify-center mt-[50px]">
        <div className="text-center">
          <p className='font-bold text-xl m-10'>Amount Received Today</p>
          <Wallet />
        </div>
        <div className="text-center">
          <p className='font-bold text-xl m-10'>Amount Received Today</p>
          <Wallet />
        </div>
        <div className="text-center">
          <p className='font-bold text-xl m-10'>Amount Received Today</p>
          <Wallet />
        </div>
      </div>
    </main>
  );
};

export default IssueVeridaq;
