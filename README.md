# 🍔 원하는 음식 정보를 찾고 레시피를 공유해요!

<br />

## 📃 개요

- 서비스명 : 맛집 검색, 레시피 공유 서비스 Food-Finder
- 개발 기간 : 2022.11.14 ~ 2022.12.17
- 주제 : 레시피 공유 및 인공지능을 활용한 레시피, 맛집 검색 서비스
- 목표 : 음식 레시피, 맛집 정보 제공
- api 문서 : [바로 가기](https://documenter.getpostman.com/view/22452329/2s8YzQXjQP#f27f89f7-d29f-400c-9790-bf33693f7df0)
- 테스트 페이지 : [바로 가기](http://kdt-ai5-team03.elicecoding.com/)

<br />

## 👪 팀원 소개


**김대운**
- Front-End
- Gmail : eodnsdlekd@gmail.com
- Github : [@dlzagu](https://github.com/dlzagu)

**윤태경**
- Front-End
- Gmail : origin1508@gmail.com
- Github : [@origin1508](https://github.com/origin1508)

**이재희**
- Back-End
- Gmail : jaeheelee169@gmail.com
- Github : [@L-JaeHee](https://github.com/L-JaeHee)

**지은혜**
- Back-End
- Gmail :
- Github : [@pado-c](https://github.com/pado-c)

**황현성**
- Back-End
- Gmail : hhs950120@gmail.com
- Github : [@iHateAI](https://github.com/iHateAI)

<br />

## 🔧 기술 스택

### Front-End

<div>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
<br />
<img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=React Query&logoColor=white"/>
<img src="https://img.shields.io/badge/styled_components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/Recoil-FAB040?style=flat-square&logo=Recoil&logoColor=white"/>
<img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=React Hook Form&logoColor=white"/>

</div>

<br />

### Back-End

<div>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=Sequelize&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-41454A?style=flat-square&logo=JSON%20web%20tokens&logoColor=white"/>
</div>

<br />

### AI

<div>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>
<img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=PyTorch&logoColor=white"/>
</div>

<br />

### Server-Infra
<div>
<img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white"/>
<img src="https://img.shields.io/badge/pm2-2B037A?style=flat-square&logo=pm2&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon_S3-569A31?style=flat-square&logo=Amazon S3&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat-square&logo=Amazon RDS&logoColor=white"/>
</div>

<br />

## 기능 소개

|기능|설명|
|---|---|
|<h3>로그인</h3>![로그인](https://user-images.githubusercontent.com/108377283/227825989-253b07b0-7e73-406f-b472-076da1809bd9.png)|로그인 페이지|
|<h3>레시피 생성</h3>![레시피 생성](https://user-images.githubusercontent.com/108377283/227826050-96c3a3ee-ad2c-44e7-a9f3-882e9b033e8c.png)| <ul><li>자신만의 레시피를 작성할 수 있습니다.</li><li>재료나 요리 순서를 추가하거나 제거할 수 있습니다.</li><li>사진을 등록하면 미리보기를 볼 수 있습니다.</li><li>등록된 사진은 최대 용량 3MB, 크기 1920px로 압축되어 서버에 전송됩니다.</li></ul>|
|<h3>레시피 상세</h3>![레시피 상세 페이지](https://user-images.githubusercontent.com/108377283/227827112-7c78cb50-0c6b-4c31-9825-640f7a4f75d8.png)|<ul><li>등록된 레시피의 상세 내용을 볼 수 있는 페이지입니다.</li><li>작성자라면 수정 및 삭제를 할 수 있습니다.</li><li>좋아요 버튼을 눌러서 좋아요 목록에 추가할 수 있습니다.</li><li>다른 사용자들이 레시피에 평점이나 후기 댓글을 남길 수 있습니다.</li></ul>|
|<h3>레시피 페이지</h3>![레시피 페이지](https://user-images.githubusercontent.com/108377283/227827273-f7a002ca-6b14-44c0-95b6-be71e481d60c.png)|<ul><li>레시피를 검색할 수 있는 텍스트 검색과 이미지 검색 버튼이 있습니다.</li><li>금주의 추천 레시피는 조회수, 좋아요 수, 작성일 가중치를 고려하여 상위 10개의 레시피를 보여줍니다.</li><li>다양한 맛의 레시피를 제공하기 위해, 맛있고 다양한 Recipe에서는 랜덤으로 선택된 10개의 레시피를 보여줍니다.</li></ul>|
|<h3>이미지 검색</h3>![이미지 검색](https://user-images.githubusercontent.com/108377283/227827660-706048d1-5404-4e93-9e98-1759efd566a3.png)|<ul><li>검색 기능은 인공지능 이미지 분석을 통해 이루어집니다.</li><li>이미지를 업로드하면 학습된 모델에 따라 음식이 분류되며, 결과에 해당하는 레시피가 표시됩니다.</li></ul>|
|<h3>검색 결과 페이지</h3>![검색 결과 페이지](https://user-images.githubusercontent.com/108377283/227827767-5456fd60-2146-4af5-be4f-a4bb655d4d50.png)|<ul><li>검색 성공 시 보여지는 페이지입니다.</li><li>등록된 레시피들 중 검색 결과에 해당하는 레시피들을 보여줍니다.</li><li>카카오 맵 API를 이용하여 결과에 대한 맛집들을 보여줍니다.</li><li>지역 키워드를 입력하면 해당하는 지역에서 맛집 리스트를 검색합니다.</li><li>하트 버튼을 눌러 맛집을 즐겨찾기 할 수 있습니다.</li><li>리스트를 눌러 해당하는 카카오 지도 검색 페이지로 이동할 수 있습니다.</li></ul>|
|<h3>레시피 모음 페이지</h3>![레시피 모음](https://user-images.githubusercontent.com/108377283/227828144-604a573d-7ed3-49c4-bee5-b732181bef14.png)|<ul><li>등록된 모든 레시피를 볼 수 있습니다.</li><li>종류별, 조리방법별로 필터링 기능을 사용하여 검색할 수 있습니다.</li></ul>|
|<h3>프로필 페이지</h3>![프로필 페이지](https://user-images.githubusercontent.com/108377283/227828167-4ce87759-6b24-4842-892e-4069ccfa0af5.png)|<ul><li>사용자는 자신의 프로필을 수정하거나 비밀번호를 변경할 수 있습니다.</li><li>좋아요한 레시피 및 자신이 작성한 레시피 목록을 볼 수 있습니다.</li></ul>|
|<h3>맛집 즐겨찾기</h3>![맛집 즐겨찾기](https://user-images.githubusercontent.com/108377283/227828183-a1a6af3a-2846-4a48-81bb-7c087f7b8ed1.png)|<ul><li>즐겨찾기한 맛집 리스트를 확인할 수 있습니다.</li><li>즐겨찾기한 맛집이 지도에 마크가 표시됩니다.</li><li>다시 즐겨찾기를 해제할 수 있습니다.</li></ul>|

</br>

## 📁 프로젝트 구조

### Front-End

```
📦front
 ┣ 📂public
 ┃ ┗ 📜favicon.png
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜authFetcher.ts
 ┃ ┃ ┣ 📜predictionFetcher.ts
 ┃ ┃ ┣ 📜recipeFetcher.ts
 ┃ ┃ ┗ 📜restaurantFetcher.ts
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜background.jpg
 ┃ ┃ ┣ 📜basicProfileImg.png
 ┃ ┃ ┣ 📜favoriteMarker.png
 ┃ ┃ ┣ 📜favoriteMarker2.png
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📜mainImg.png
 ┃ ┃ ┣ 📜mainRecipeImg.jpg
 ┃ ┃ ┣ 📜mainRecipeImg2.jpg
 ┃ ┃ ┣ 📜mainRecipeImg3.jpg
 ┃ ┃ ┗ 📜searchImg.png
 ┃ ┣ 📂atom
 ┃ ┃ ┣ 📜alert.ts
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜restaurant.ts
 ┃ ┃ ┗ 📜searchResult.ts
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂alert
 ┃ ┃ ┃ ┣ 📜Alert.tsx
 ┃ ┃ ┃ ┣ 📜Loader.tsx
 ┃ ┃ ┃ ┗ 📜Toast.tsx
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜AuthHeader.tsx
 ┃ ┃ ┃ ┣ 📜AuthLogin.tsx
 ┃ ┃ ┃ ┣ 📜AuthLoginForm.tsx
 ┃ ┃ ┃ ┣ 📜AuthRegister.tsx
 ┃ ┃ ┃ ┗ 📜AuthRegisterForm.tsx
 ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┣ 📜CommentCard.tsx
 ┃ ┃ ┃ ┣ 📜CommentEdit.tsx
 ┃ ┃ ┃ ┣ 📜CommentForm.tsx
 ┃ ┃ ┃ ┗ 📜Comments.tsx
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜ImageSearch.tsx
 ┃ ┃ ┃ ┗ 📜Search.tsx
 ┃ ┃ ┣ 📂errorBoundary
 ┃ ┃ ┃ ┣ 📜ErrorAlert.tsx
 ┃ ┃ ┃ ┗ 📜ErrorBoundary.tsx
 ┃ ┃ ┣ 📂global
 ┃ ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Logo.tsx
 ┃ ┃ ┃ ┃ ┣ 📜NavLink.tsx
 ┃ ┃ ┃ ┃ ┗ 📜NavLinkDropDown.tsx
 ┃ ┃ ┃ ┗ 📜NotFound.tsx
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┃ ┗ 📜CustomIcon.tsx
 ┃ ┃ ┣ 📂map
 ┃ ┃ ┃ ┣ 📜KakaoMap.tsx
 ┃ ┃ ┃ ┣ 📜LandingPage.tsx
 ┃ ┃ ┃ ┗ 📜Map.tsx
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📜ConfirmModal.tsx
 ┃ ┃ ┃ ┣ 📜imageSearchModal.tsx
 ┃ ┃ ┃ ┗ 📜ImageSearchResult.tsx
 ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┣ 📜CurrentUserProfile.tsx
 ┃ ┃ ┃ ┣ 📜NicknameEditForm.tsx
 ┃ ┃ ┃ ┣ 📜PasswordEditForm.tsx
 ┃ ┃ ┃ ┣ 📜RestaurantInfoCard.tsx
 ┃ ┃ ┃ ┣ 📜UserLikedRestaurant.tsx
 ┃ ┃ ┃ ┣ 📜UserProfile.tsx
 ┃ ┃ ┃ ┣ 📜UserRecipe.tsx
 ┃ ┃ ┃ ┗ 📜UserRecipeCards.tsx
 ┃ ┃ ┣ 📂recipe
 ┃ ┃ ┃ ┣ 📜RecipeCard.tsx
 ┃ ┃ ┃ ┗ 📜SuggestionRecipe.tsx
 ┃ ┃ ┣ 📂recipeDetail
 ┃ ┃ ┃ ┣ 📜Like.tsx
 ┃ ┃ ┃ ┣ 📜RecipeComment.tsx
 ┃ ┃ ┃ ┣ 📜RecipeDetaiIngredient.tsx
 ┃ ┃ ┃ ┣ 📜RecipeDetailMain.tsx
 ┃ ┃ ┃ ┣ 📜RecipeRatingStar.tsx
 ┃ ┃ ┃ ┣ 📜RecipeScoreStatus.tsx
 ┃ ┃ ┃ ┗ 📜RecipeSteps.tsx
 ┃ ┃ ┣ 📂recipeForm
 ┃ ┃ ┃ ┣ 📂info
 ┃ ┃ ┃ ┃ ┣ 📜RecipeFormInfo.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RecipeFormInfoLeft.tsx
 ┃ ┃ ┃ ┃ ┗ 📜RecipeFormInfoRight.tsx
 ┃ ┃ ┃ ┣ 📂ingredient
 ┃ ┃ ┃ ┃ ┗ 📜RecipeFormIngredient.tsx
 ┃ ┃ ┃ ┣ 📂instruction
 ┃ ┃ ┃ ┃ ┣ 📜RecipeFormInstruction.tsx
 ┃ ┃ ┃ ┃ ┗ 📜RecipeFormInstructionInputComponent.tsx
 ┃ ┃ ┃ ┗ 📜RecipeForm.tsx
 ┃ ┃ ┗ 📂searchResult
 ┃ ┃ ┃ ┣ 📜PlaceResult.tsx
 ┃ ┃ ┃ ┗ 📜RecipeResult.tsx
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜kakaoMap.ts
 ┃ ┃ ┗ 📜recipeForm.ts
 ┃ ┣ 📂customRouter
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂hoc
 ┃ ┃ ┣ 📜Auth.tsx
 ┃ ┃ ┗ 📜BasePageComponent.tsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📂Auth
 ┃ ┃ ┃ ┣ 📜useAuthInfo.ts
 ┃ ┃ ┃ ┣ 📜useAuthRecipes.ts
 ┃ ┃ ┃ ┣ 📜useEditImg.ts
 ┃ ┃ ┃ ┣ 📜useEditNickname.ts
 ┃ ┃ ┃ ┣ 📜useEditPassword.ts
 ┃ ┃ ┃ ┣ 📜useLogin.ts
 ┃ ┃ ┃ ┗ 📜useSignup.ts
 ┃ ┃ ┣ 📂Comment
 ┃ ┃ ┃ ┣ 📜useComment.ts
 ┃ ┃ ┃ ┣ 📜useDeleteComment.ts
 ┃ ┃ ┃ ┗ 📜useEditComment.ts
 ┃ ┃ ┣ 📂Recipe
 ┃ ┃ ┃ ┣ 📜useCreateRecipe.ts
 ┃ ┃ ┃ ┣ 📜useEditRecipe.ts
 ┃ ┃ ┃ ┣ 📜useLike.ts
 ┃ ┃ ┃ ┣ 📜useRating.ts
 ┃ ┃ ┃ ┣ 📜useRatingUpdate.ts
 ┃ ┃ ┃ ┗ 📜useRecipes.ts
 ┃ ┃ ┣ 📜useEventListener.tsx
 ┃ ┃ ┣ 📜useKakaoMap.ts
 ┃ ┃ ┣ 📜useLikedRestaurant.ts
 ┃ ┃ ┣ 📜useMediaQuery.ts
 ┃ ┃ ┣ 📜useModal.ts
 ┃ ┃ ┣ 📜useOnclickOutside.tsx
 ┃ ┃ ┣ 📜usePrediction.ts
 ┃ ┃ ┣ 📜usePreview.ts
 ┃ ┃ ┣ 📜useSearchForm.ts
 ┃ ┃ ┗ 📜useSetAlert.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜collectRecipes.tsx
 ┃ ┃ ┣ 📜createRecipe.tsx
 ┃ ┃ ┣ 📜editRecipe.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜likedRestaurant.tsx
 ┃ ┃ ┣ 📜login.tsx
 ┃ ┃ ┣ 📜profile.tsx
 ┃ ┃ ┣ 📜recipe.tsx
 ┃ ┃ ┣ 📜recipeDetail.tsx
 ┃ ┃ ┣ 📜register.tsx
 ┃ ┃ ┗ 📜searchResult.tsx
 ┃ ┣ 📂storage
 ┃ ┃ ┗ 📜storage.ts
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┃ ┣ 📜fonts.css
 ┃ ┃ ┃ ┣ 📜NanumSquareNeoOTF-aLt.otf
 ┃ ┃ ┃ ┣ 📜NanumSquareNeoOTF-bRg.otf
 ┃ ┃ ┃ ┗ 📜NanumSquareNeoOTF-cBd.otf
 ┃ ┃ ┣ 📜authStyle.ts
 ┃ ┃ ┣ 📜commonStyle.ts
 ┃ ┃ ┣ 📜globalStyle.ts
 ┃ ┃ ┣ 📜recipeDetailStyle.ts
 ┃ ┃ ┣ 📜recipeFormStyle.ts
 ┃ ┃ ┗ 📜theme.ts
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┗ 📜baseComponentType.ts
 ┃ ┃ ┣ 📂recipe
 ┃ ┃ ┃ ┣ 📜recipeCardType.ts
 ┃ ┃ ┃ ┣ 📜recipeDetailType.ts
 ┃ ┃ ┃ ┗ 📜recipeFormType.ts
 ┃ ┃ ┣ 📂restaurant
 ┃ ┃ ┃ ┗ 📜restaurantType.ts
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┗ 📜searchType.ts
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜error.ts
 ┃ ┃ ┗ 📜user.ts
 ┃ ┣ 📂util
 ┃ ┃ ┣ 📜customAxios.ts
 ┃ ┃ ┣ 📜filterList.ts
 ┃ ┃ ┣ 📜imageResize.ts
 ┃ ┃ ┗ 📜profileImageResizeUtil.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜main.tsx
 ┃ ┗ 📜vite-env.d.ts
 ┣ 📜.env
 ┣ 📜.eslintrc
 ┣ 📜.prettierrc
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┣ 📜vite.config.ts
 ┗ 📜yarn.lock
```

### Back-End

```
📦back
 ┣ 📂src
 ┃ ┣ 📂configs
 ┃ ┃ ┗ 📜sequelize.js
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜constant.js
 ┃ ┣ 📂db
 ┃ ┃ ┣ 📂model
 ┃ ┃ ┃ ┣ 📜recipe.model.js
 ┃ ┃ ┃ ┣ 📜refreshToken.model.js
 ┃ ┃ ┃ ┣ 📜restaurant.model.js
 ┃ ┃ ┃ ┗ 📜user.model.js
 ┃ ┃ ┗ 📂schema
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜recipe.schema.js
 ┃ ┃ ┃ ┣ 📜recipe_comment.schema.js
 ┃ ┃ ┃ ┣ 📜recipe_like.schema.js
 ┃ ┃ ┃ ┣ 📜recipe_star.schema.js
 ┃ ┃ ┃ ┣ 📜refreshToken.schema.js
 ┃ ┃ ┃ ┣ 📜resturant.schema.js
 ┃ ┃ ┃ ┣ 📜step.schema.js
 ┃ ┃ ┃ ┗ 📜user.schema.js
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜accessTokenAuthorization.js
 ┃ ┃ ┣ 📜commonValidator.js
 ┃ ┃ ┣ 📜error.js
 ┃ ┃ ┣ 📜multer.js
 ┃ ┃ ┣ 📜recipeValidator.js
 ┃ ┃ ┣ 📜refreshTokenAuthorization.js
 ┃ ┃ ┗ 📜validationCheck.js
 ┃ ┣ 📂ml
 ┃ ┃ ┣ 📂predictionImages
 ┃ ┃ ┣ 📜classes.json
 ┃ ┃ ┣ 📜model.pt
 ┃ ┃ ┗ 📜prediction.py
 ┃ ┣ 📂routers
 ┃ ┃ ┣ 📜auth.route.js
 ┃ ┃ ┣ 📜error.route.js
 ┃ ┃ ┣ 📜prediction.route.js
 ┃ ┃ ┣ 📜recipe.route.js
 ┃ ┃ ┣ 📜recipeSearch.route.js
 ┃ ┃ ┣ 📜restaurant.route.js
 ┃ ┃ ┗ 📜user.route.js
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜auth.service.js
 ┃ ┃ ┣ 📜prediction.service.js
 ┃ ┃ ┣ 📜recipe.service.js
 ┃ ┃ ┣ 📜recipeSearch.service.js
 ┃ ┃ ┣ 📜restaurant.service.js
 ┃ ┃ ┗ 📜user.service.js
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜ApiError.js
 ┃ ┃ ┗ 📜utils.js
 ┃ ┗ 📜app.js
 ┣ 📜.env
 ┣ 📜babel.config.json
 ┣ 📜ecosystem.config.js
 ┣ 📜index.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server-register.js
```

<br />

## 🔧 DB TABLE 구조

![ERD](https://user-images.githubusercontent.com/108377283/227828319-e4d7483a-5e46-49ea-a9ed-71223e73517b.png)

