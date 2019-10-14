import { Product, ProductCore } from '../../../repositories';
import logger from '../../../libs/logger';

export const productQueries = {
  getProduct: async (_, { productId }) => {
    try {
      const { ownerId: owner, ...product } = await ProductCore.findOne({ _id: productId })
      .lean()
      .populate({ path: 'ownerId' })
      .exec();

      return {
        ...product,
        owner
      };
    }
    catch(err) {
      logger.error(`error finding product with id: ${productId}`, err);
    }
  },
  getProductCore: async (_, { productId }) => {
    try {
      const product = await Product.findOne({ _id: productId });

      return product;
    }
    catch(err) {
      logger.error(`error finding product with id: ${productId} `, err);
    }
  },
  getCoreProductsByOwner: async(_, { userId:ownerId }) => {
    try {
      const selectedProducts = await Product.find({ownerId})
        .lean()
        .populate({ path: 'ownerId'})
        .exec();

      const products = selectedProducts.map(product => ({
        ...product,
        owner: {...product.ownerId}
      }));

      return products;
    }
    catch(err) {
      logger.error(`error finding products with userId: ${products}`, err);
    }
  },
  getProducts: async(_, { userId:vendorId }) => {
    try {
      const products = await Product.find({vendorId});
      console.log('selectedProducts', products);

      return products;
    }
    catch(err) {
      logger.error(`error finding products with userId: ${products}`, err);
    }
  }
};
