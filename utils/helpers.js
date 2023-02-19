module.exports = {
  async validateEmail(email) {
    const regex = /^.+@(?:[\w-]+\.)+\w+$/;
    const bool = await regex.test(email);
    return bool;
  },
  // used to create 2 to 5 thoughts for users, and 2 to 5 reactions for thoughts
  randomCommentCount(min = 2, max = 5) {
    // quick fix to account for Math.floor rounding down
    max += 1
    const difference = max - min;
    let randomAmount = Math.floor(Math.random() * difference);
    randomAmount += min;
    return randomAmount;
  },
  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  
    return array;
  }
};
