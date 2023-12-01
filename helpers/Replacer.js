function Replacer(inputString, dataObject) {
  const regex = /\[([^\]]+)\]/g;

  // Replace each pattern with its corresponding value from the object
  const replacedString = inputString.replace(regex, (match, key) => {
    const value = dataObject[key.trim()]; // Trim to remove potential whitespace
    // If the key is found in the object, replace the entire pattern; otherwise, keep the original pattern
    return value !== undefined ? value : match;
  });

  return replacedString;
}

export default Replacer