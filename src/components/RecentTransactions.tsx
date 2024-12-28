import React from 'react';
import { Link } from 'react-router-dom';

export default function RecentTransactions() {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">Recent Transaction</div>
        <Link to="/transactions" className="text-[#6CBF41] text-xs">
          See All
        </Link>
      </div>
      <div className="bg-[#FAFAFA] rounded p-3 flex justify-between">
        <div className="text-sm">No transactions yet</div>
        <div className="font-bold text-sm">---</div>
      </div>
    </div>
  );
}