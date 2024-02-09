/* eslint-disable no-underscore-dangle */
import Category from '../models/category.js';
import Product from '../models/product.js';
import User from '../models/user.js';

const initialProducts = [
  {
    name: 'Zion 3 GS',
    brand: 'jordan',
    variants: [
      {
        variant_name: 'default',
        size: [
          '39',
          '40',
          '41,5',
          '42',
          '43',
          '43,5',
          '44',
          '45',
          '46',
          '47',
          '47,5',
        ],
        price: 109,
        images: [
          'https://static.basketballstore.net/image/cache/catalog/basketball%20store/scarpe/basket/jordan/DV3869-110-jordan-zion-3-gs-scarpa-da-basket-zion-williamson-nba-638x638.jpg',
        ],
      },
    ],
    available: true,
    description:
      "The new Jordan Zion 3 GS basketball shoe honors Zion Williamson's high level of play. Parquet-ready technology helps you run fast, give your best and react quickly when you're on the court.",
    details: [
      'Side to side, left to right. Herringbone traction outsole gives traction on hardwood floors with every step',
      'Soft foam in the midsole provides heel and ankle support',
      'Nike Air helps give you more boost on jumps, and adds cushioning for landings.',
    ],
  },
  {
    name: 'Speed X',
    brand: 'li-ning',
    variants: [
      {
        variant_name: 'ejector',
        size: [
          '39',
          '40',
          '41,5',
          '42',
          '43',
          '43,5',
          '44',
          '45',
          '46',
          '47',
          '47,5',
        ],
        price: 130,
        images: [
          'https://static.basketballstore.net/image/cache/catalog/basketball%20store/scarpe/basket/Li-Ning/ABAT085-3-li-ning-speed-10-ejector-scarpa-da-basket-nba-13-638x638.jpg',
        ],
      },
      {
        variant_name: 'ice',
        size: [
          '39',
          '40',
          '41,5',
          '42',
          '43',
          '43,5',
          '44',
          '45',
          '46',
          '47',
          '47,5',
        ],
        price: 130,
        images: [
          'https://static.basketballstore.net/image/cache/catalog/basketball%20store/scarpe/basket/Li-Ning/ABAT085-9-li-ning-speed-10-ice-scarpa-da-basket-nba-13-638x638.jpg',
        ],
      },
      {
        variant_name: 'pink panther',
        size: [
          '39',
          '40',
          '41,5',
          '42',
          '43',
          '43,5',
          '44',
          '45',
          '46',
          '47',
          '47,5',
        ],
        price: 130,
        images: [
          'https://static.basketballstore.net/image/cache/catalog/basketball%20store/scarpe/basket/Li-Ning/ABAT085-6-li-ning-pink-panther-scarpa-da-basket-nba-0-638x638.jpg',
        ],
      },
    ],
    available: true,
    description:
      'Li-Ning Speed X basketball shoes are designed to speed crossovers with sensational forefoot thrust.',
    details: [
      'Full-length Boom technology reduces midsole weight and gives sensational cushioning and responsiveness on the run and jump.',
      'Dual medial TPU insert design is designed to control torsion and prevent injury.',
      'The outsole consists of two elements made with different technologies to ensure top-level performance in any playing situation.',
      'Rounded roll entry and exit for faster running.',
    ],
  },
];

const getNonExistingId = async () => {
  const { model } = await getProductExamples();
  const product = new Product(model);
  await product.save();
  await product.deleteOne();

  return product._id.toString();
};

const productsInDb = async () => {
  const products = await Product.find({});
  return products.map((product) => product.toJSON());
};

const initializeCategories = async () => {
  await Category.deleteMany({});
  const categoryObject = { category_name: 'shoes', products: [] };
  const categoryInstance = new Category(categoryObject);
  await categoryInstance.save();
};

const getFirstCategory = async () => {
  const [firstCategory] = await Category.find({});
  return firstCategory;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getProductExamples = async () => {
  const firstCategory = await getFirstCategory();

  return {
    model: {
      name: 'Harden Vol 7 - Grey',
      brand: 'adidas',
      variants: [
        {
          variant_name: 'default',
          size: ['39', '42', '43', '43,5', '44', '47,5'],
          price: 135,
          images: [
            'https://static.basketballstore.net/image/cache/catalog/basketball%20store/scarpe/basket/adidas/IE9257-adidas-harden-vol-7-grey-scarpe-basket-0-638x638.jpg',
          ],
        },
      ],
      available: true,
      description:
        'The adidas Harden Vol. 7 basketball shoe is the seventh signature installment from the Philadelphia Seventy Sixers star.From his lethal stepback to his love of luxury fashion, there is no doubt that James Harden has style both on and off the court. With his new signature adidas Basketball shoes, it all comes into play. The upper takes inspiration from the bold look of his flashy down jackets, and the details support his explosive movements on the court. A hybrid BOOST and Lightstrike midsole provides lightweight energy while the outsole pattern supports every jump, cut or change of direction giving you maximum traction.',
      details: [
        'BOOST midsole',
        'Lightstrike cushioning',
        'Lace-up closure',
        'Textile upper',
        'Regular fit',
        'Rubber outsole',
        'Weight: 474gr (9US)',
      ],
      category_id: firstCategory._id,
    },
    bad: {},
  };
};

export {
  initialProducts,
  productsInDb,
  getNonExistingId,
  usersInDb,
  initializeCategories,
  getFirstCategory,
  getProductExamples,
};
