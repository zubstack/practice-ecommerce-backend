import Cart from '../models/cart.model.js';

class CartService {
  constructor() {}

  async findAll() {
    return await Cart.find({});
  }
  async findWithUserId(userId) {
    const result = await Cart.findOne({ user: userId });
    return result;
  }

  async removeCartItem(userId, productId) {
    const cart = await this.findWithUserId(userId);
    const filteredProducts = cart.products.filter(
      (item) => item.product.toString() !== productId
    );
    cart.products = filteredProducts;
    await cart.save();
    return cart.products;
  }

  async updateCart(quantity, userId, productId, productPrice) {
    const cart = await this.findWithUserId(userId);
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex >= 0) {
      cart.products[productIndex].quantity = quantity;
      cart.products[productIndex].totalPrice = quantity * productPrice;
      await cart.save();
    } else {
      const newProduct = {
        quantity,
        product: productId,
        totalPrice: productPrice * quantity,
      };
      cart.products.push(newProduct);
      await cart.save();
    }
    return productId;
  }

  async create(quantity, userId, productId, productPrice) {
    const newCart = {
      user: userId,
      products: [
        {
          quantity,
          product: productId,
          totalPrice: productPrice * quantity,
        },
      ],
    };
    const cart = new Cart(newCart);
    const result = await cart.save();
    return result;
  }
}

export default CartService;
