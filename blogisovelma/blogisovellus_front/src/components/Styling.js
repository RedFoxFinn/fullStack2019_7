
const inputStyle1 = () => {
  return (
    {
      borderImage: 'linear-gradient(to left, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
      outline: '3px solid transparent', borderImageSlice: 5, backgroundColor: 'transparent', marginTop: '0.5em'
    }
  );
};
const inputStyle2 = () => {
  return (
    {
      borderImage: 'linear-gradient(to right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
      outline: '3px solid transparent', borderImageSlice: 5, backgroundColor: 'transparent', marginTop: '0.5em'
    }
  );
};
const logoutStyle = () => {
  return (
    {
      borderImage: 'linear-gradient(to left, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
      outline: '3px solid transparent', borderImageSlice: 5, backgroundColor: 'transparent',
      display: 'inline-block', marginLeft: '1em', marginRight: '0.5em'
    }
  );
};
const tableStyle = () => {
  return (
    {
      marginTop: '2em', outline: '1px solid transparent',
      display: 'block', width: '90%', textAlign: 'left'}
  );
};
const tableBodyStyle = () => {
  return (
    {
      marginTop: '1.5em',
      background: 'linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)',
      WebkitBackgroundClip: 'text', color: 'transparent'}
  );
};

const styles = () => {
  return {
    logoutStyle: logoutStyle(),
    inputStyle1: inputStyle1(),
    inputStyle2: inputStyle2(),
    tableStyle: tableStyle(),
    tableBodyStyle: tableBodyStyle()
  };
};

export default styles;