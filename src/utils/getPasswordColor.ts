const getPasswordColor = (score: number) => {
  switch (score) {
    case 0:
      return 'red';
    case 1:
      return 'orange';
    case 2:
      return 'yellow';
    case 3:
      return 'lightgreen';
    case 4:
      return 'green';
    default:
      return 'transparent';
  }
};

export default getPasswordColor;
