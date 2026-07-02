import React from 'react';

// Heading component — render thẻ h1-h6.
const AdminHeading = ({ content, level = 2, align = 'left', variant = 'default' }) => {
  const Tag = `h${level}`;
  
  if (variant === 'metik') {
    return (
      <div style={{ position: 'relative', width: '100%', marginTop: '20px', marginBottom: '1.5rem', textAlign: align }}>
        <div style={{ 
          width: '50px', 
          height: '10px', 
          backgroundColor: '#ffd000', 
          position: 'absolute', 
          top: '-15px', 
          left: align === 'center' ? '50%' : align === 'right' ? '100%' : '0',
          transform: align === 'center' ? 'translateX(-50%)' : align === 'right' ? 'translateX(-100%)' : 'none'
        }}></div>
        <Tag style={{ color: '#48a842', fontSize: '1.8rem' }} className="font-black uppercase">{content}</Tag>
      </div>
    );
  }

  return <Tag style={{ textAlign: align }} className="font-bold">{content}</Tag>;
};

export default AdminHeading;
