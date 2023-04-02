import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Purewater',
      email: 'admin123@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Doe',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],

  whats: [
    {
      name: 'Pure Budgetting',
      image: '/images/budget3.png',
      slug: 'pure-budgetting',
      description:
        'Allocate budgets to important expenses and avoid instances of overspending ',
    },
    {
      name: 'Good Budgetting',
      image: '/images/budget2.png',
      slug: 'good-budgetting',
      description: 'Real time budget tracking  and custimizable budget  ',
    },
    {
      name: 'Cool Budgetting',
      image: '/images/budget4.jpeg',
      slug: 'cool-budgetting',
      description: 'To the point and no extra fee for services ',
    },
    {
      name: 'Realible Budgetting',
      image: '/images/budget5.jpeg',
      slug: 'reliable-budgetting',
      description:
        '24/7 services it is , customer satisfaction is our main interest ',
    },
  ],
  hows: [
    {
      name: 'Navigate Around',
      image: '/images/Banner.png',
      slug: 'navigate-around',
      description: 'Lets help you on how to get started with us ',
    },
  ],
  customers: [
    {
      name: 'Lucia Wanjiru',
      slug: 'lucia-wanjiru',
      image: '/images/Ateam.jpg',
    },
    {
      name: 'Daren Wallace',
      slug: 'daren-wallace',
      image: '/images/Bteam.jpg',
    },
    {
      name: 'Dennis Hobbs',
      slug: 'dennis-hobbs',
      image: '/images/Cteam.jpg',
    },
    {
      name: 'Geogina Alex',
      slug: 'geogina-alex',
      image: '/images/Dteam.jpg',
    },
    {
      name: 'Christine Dale',
      slug: 'christine-dale',
      image: '/images/Eteam.jpg',
    },

    {
      name: 'Johnathan Kalonzo',
      slug: 'johnathan-kalonzo',

      image: '/images/Fteam.jpg',
    },
    {
      name: 'Sebastien Cliff',
      slug: 'sebastien-cliff',
      image: '/images/Gteam.jpg',
    },
    {
      name: 'Clair Hellen',
      slug: 'clair-hellen',
      image: '/images/Fteam.jpg',
    },
    {
      name: 'Irene Anyango',
      slug: 'irene-anyango',
      image: '/images/Hteam.jpg',
    },
    {
      name: 'Cynthia Chepkerui',
      slug: 'cynthia chepkekui',
      image: '/images/Iteam.jpg',
    },
    {
      name: 'Brenda Lee',
      slug: 'brenda-lee',
      image: '/images/smart.png',
    },
  ],
};

export default data;
