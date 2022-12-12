const mockData = {
  recipeDatas: [
    {
      img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
      title: '김치찌개1',
      channelUuid: 12321,
      views: 123,
      likes: 23,
      creator: '들자구',
      onMoreClick: () => console.log('onMoreClick'),
      index: 1,
    },
    {
      img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
      title: '김치찌개2',
      channelUuid: 1232,
      views: 123,
      likes: 23,
      creator: '들자구',
      onMoreClick: () => console.log('onMoreClick'),
      index: 2,
    },
    {
      img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
      title: '김치찌개3',
      channelUuid: 12321,
      views: 123,
      likes: 23,
      creator: '들자구',
      onMoreClick: () => console.log('onMoreClick'),
      index: 3,
    },
    {
      img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
      title: '김치찌개4',
      channelUuid: 12321,
      views: 123,
      likes: 23,
      creator: '들자구',
      onMoreClick: () => console.log('onMoreClick'),
      index: 4,
    },
    {
      img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
      title: '김치찌개5',
      channelUuid: 12321,
      views: 123,
      likes: 23,
      creator: '들자구',
      onMoreClick: () => console.log('onMoreClick'),
      index: 5,
    },
    {
      img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
      title: '김치찌개6',
      channelUuid: 12321,
      views: 123,
      likes: 23,
      creator: '들자구',
      onMoreClick: () => console.log('onMoreClick'),
      index: 6,
    },
    {
      img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
      title: '김치찌개7',
      channelUuid: 12321,
      views: 123,
      likes: 23,
      creator: '들자구',
      onMoreClick: () => console.log('onMoreClick'),
      index: 7,
    },
    {
      img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
      title: '김치찌개',
      channelUuid: 12321,
      views: 123,
      likes: 23,
      creator: '들자구',
      onMoreClick: () => console.log('onMoreClick'),
      index: 8,
    },
    {
      img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
      title: '김치찌개',
      channelUuid: 12321,
      views: 123,
      likes: 23,
      creator: '들자구',
      onMoreClick: () => console.log('onMoreClick'),
      index: 9,
    },
    {
      img: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/8add/f8a5ea5841a7e12f2b24d72d33778a6c1ad2d62900007df7c1ee2160a540.jpg',
      title: '김치찌개',
      channelUuid: 12321,
      views: 123,
      likes: 23,
      creator: '들자구',
      onMoreClick: () => console.log('onMoreClick'),
      index: 10,
    },
  ],
  filterByType: ['전체', '밥', '반찬', '후식', '국&찌개', '면', '탕'],
  filterByMethod: ['전체', '볶기', '찌기', '튀기기', '끓이기', '굽기', '기타'],

  auth: {
    name: 'dlzagu',
    email: 'eodnsdlekd@naver.com',
  },

  recipeDetail: [
    {
      dishId: 21,
      name: '황태미역 곤약스프',
      method: '끓이기',
      category: '국&찌개',
      smallThumbnailUrl:
        'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00641_2.png',
      largeThumbnailUrl:
        'http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00641_1.png',
      ingredient: [
        { name: '황태채', amount: '100g' },
        { name: '곤약', amount: '100g' },
        { name: '건미역', amount: '20g' },
        { name: '들깨가루', amount: '20g' },
        { name: '두부', amount: '50g' },
        { name: '된장', amount: '10g' },
        { name: '액젓', amount: '10g' },
        { name: '표고버섯', amount: '1개' },
      ],
      serving: 1,
      cookingTime: 20,
      views: 6,
      recipeLikes: 0,
      steps: [
        {
          stepId: 23,
          content: '훈제오리 가슴살을 슬라이스한다.',
          imageUrl:
            'http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00641_1.png',
          step: 1,
        },
        {
          stepId: 24,
          content: '슬라이스한 훈제오리는 팬에 굽는다.',
          imageUrl:
            'http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00641_2.png',
          step: 2,
        },

        {
          stepId: 25,
          content: '양파는 채썰고 찬물에 담근 뒤 건진다.',
          imageUrl:
            'http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00641_3.png',
          step: 3,
        },
        {
          stepId: 26,
          content: '레디쉬는 채썰고 찬물에 담근 뒤 건진다.',
          imageUrl:
            'http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00641_4.png',
          step: 4,
        },
        {
          stepId: 27,
          content: '먹기 직전에 발사믹소스를 만든다.',
          imageUrl:
            'http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00641_5.png',
          step: 5,
        },
        {
          stepId: 28,
          content:
            '접시에 훈제오리와 양파채, 레디쉬,\n 블루베리를 담고 발사믹소스를 \n 올린다.',
          imageUrl:
            'http://www.foodsafetykorea.go.kr/uploadimg/cook/20_00641_6.png',
          step: 6,
        },
      ],
      recipeComments: [],
      recipeStars: [],
      writer: {
        userId: 6,
        email: 'test@gmail.com',
        nickname: '테스트용',
        profileUrl:
          'https://m.nongmin.com/upload/news/202007/20200711032704602/20200711032704602.jpg',
      },
    },
  ],

  comments: [
    {
      user: {
        profileUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5wHDD6sXA3M1EhvtDL6MC38-6G27SiCg7g&usqp=CAU',
        nickname: '들자구',
        userId: 9,
      },
      content: '안녕하세요 ~ 정말 맛있네요 ',
      id: 12,
    },
    {
      user: {
        profileUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5wHDD6sXA3M1EhvtDL6MC38-6G27SiCg7g&usqp=CAU',
        nickname: '들자구',
        userId: 9,
      },
      content: '안녕하세요 ~ 정말 맛있네요 ',
      id: 12,
    },
    {
      user: {
        profileUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5wHDD6sXA3M1EhvtDL6MC38-6G27SiCg7g&usqp=CAU',
        nickname: '들자구',
        userId: 9,
      },
      content: '안녕하세요 ~ 정말 맛있네요 ',
      id: 12,
    },
    {
      user: {
        profileUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5wHDD6sXA3M1EhvtDL6MC38-6G27SiCg7g&usqp=CAU',
        nickname: '들자구',
        userId: 9,
      },
      content: '안녕하세요 ~ 정말 맛있네요 ',
      id: 12,
    },
    {
      user: {
        profileUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5wHDD6sXA3M1EhvtDL6MC38-6G27SiCg7g&usqp=CAU',
        nickname: '들자구',
        userId: 9,
      },
      content: '안녕하세요 ~ 정말 맛있네요 ',
      id: 12,
    },
    {
      user: {
        profileUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5wHDD6sXA3M1EhvtDL6MC38-6G27SiCg7g&usqp=CAU',
        nickname: '들자구',
        userId: 9,
      },
      content: '안녕하세요 ~ 정말 맛있네요 ',
      id: 12,
    },
  ],
};

export default mockData;
