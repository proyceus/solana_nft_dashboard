export const findData = (stateToSearch, searchVariable, searchVariableType) => {
  for (let i = 0; i < stateToSearch.length; i++) {
    if (stateToSearch[i][searchVariableType] === searchVariable) {
      console.log("Found old data");
      return true;
    }
  }
  return false;
};
