import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

export const MdxTable = ({ children }: TableProps) => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </table>
    </div>
  );
};

export const MdxThead = ({ children }: TableProps) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      {children}
    </thead>
  );
};

export const MdxTr = ({ children }: TableProps) => {
  return (
    <tr>
      {children}
    </tr>
  );
};

export const MdxTh = ({ children }: TableProps) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
    >
      {children}
    </th>
  );
};

export const MdxTbody = ({ children }: TableProps) => {
  return (
    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  );
};

export const MdxTd = ({ children }: TableProps) => {
  return (
    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-300">
      {children}
    </td>
  );
};

export const mdxTableComponents = {
  table: MdxTable,
  thead: MdxThead,
  tr: MdxTr,
  th: MdxTh,
  tbody: MdxTbody,
  td: MdxTd,
}; 