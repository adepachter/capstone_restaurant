
/**
 * Order.js controller
const stripe = require("stripe")("sk_test_51JVytaGoCiL1gCdhR7egN2PhpTUVzP2JuZUJcKNF8y6xs8n0juSUU6dStD5cyoYBaynNhDJNvl3NoAUVUPtu6gge00cUsIbMVh");
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */
"use strict";

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

const stripe = require("stripe")("sk_test_51JVytaGoCiL1gCdhR7egN2PhpTUVzP2JuZUJcKNF8y6xs8n0juSUU6dStD5cyoYBaynNhDJNvl3NoAUVUPtu6gge00cUsIbMVh");

module.exports = {
  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const { address, amount, dishes, token, city, state } = JSON.parse(
      ctx.request.body
    );
    const stripeAmount = Math.floor(amount * 100);
    // charge on stripe
    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: stripeAmount,
      currency: "usd",
      description: `Order ${new Date()} by Arno`,
      source: token,
    });

    // Register the order in the database
    const order = await strapi.services.order.create({
      //user: ctx.state.user,
      charge_id: charge.id,
      amount: stripeAmount,
      address,
      dishes,
      city,
      state,
    });

    return order;
  },
};