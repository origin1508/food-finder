export default {
  isJson(str) {
    try {
      JSON.parse(str);
    } catch (error) {
      return false;
    }

    return true;
  },
};
