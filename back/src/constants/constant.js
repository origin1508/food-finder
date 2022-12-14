export default {
  postsPerPage: 5,
  categoriesForParam: ["밥", "반찬", "후식", "국찌개", "면", "탕"],
  categoriesForBody: ["밥", "반찬", "후식", "국&찌개", "면", "탕"],
  methods: ["볶기", "찌기", "튀기기", "끓이기", "굽기", "기타"],
  ingredientKeys: ["name", "amount"],
  stepKeys: ["step", "content"],
  unauthorizedErrorMessage: (target) => `${target}: 권한이 없습니다.`,
  nonexistentValueErrorMessage: (target) =>
    `${target}: 존재하지 않는 값입니다.`,
  conflictValueErrorMessage: (target) => `${target}: 이미 존재하는 값입니다.`,
  invalidValueErrorMessage: (target) => `${target}: 유효하지 않은 값입니다.`,
};
