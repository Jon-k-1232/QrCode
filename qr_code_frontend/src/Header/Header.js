import React from 'react';

export default function Header() {
  return (
    <div className='header' style={style.header}>
      <h1 style={style.headerH1}>QR Generator</h1>
    </div>
  );
}

const style = {
  header: {
    margin: '0 0 10px'
  },
  headerH1: {
    margin: 0
  }
};
