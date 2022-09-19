export const findData = (stateToSearch, searchVariable) => {
  for (let i = 0; i < stateToSearch.length; i++) {
    if (stateToSearch[i][0] === searchVariable) {
      console.log("Found old data");
      return true;
    }
    return false;
  }
};
