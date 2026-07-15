import React from 'react';

// Text component — render đoạn văn bản.
const AdminText = ({ content, align = 'left' }) => {
  return <p style={{ textAlign: align }} className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700">{content}</p>;
};

export default AdminText;
