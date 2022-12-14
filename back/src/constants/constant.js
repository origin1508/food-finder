export default {
  postsPerPage: 5,
  categories: ["밥", "반찬", "후식", "국찌개", "면", "탕"],
  methods: ["볶기", "찌기", "튀기기", "끓이기", "굽기", "기타"],
  ingredientKeys: ["name", "amount"],
  stepKeys: ["step", "content"],
  invalidValueErrorMessage: (target) => `${target}: 유효하지 않은 값입니다.`,
};
