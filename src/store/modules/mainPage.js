import axios from "axios";

export default {
  state: {
    goods: null,
    errorMessage: "",
    addedGoods: [],
    addedGoodsId: [], //масив з id
    totalPrice: 0,
  },

  actions: {
    async getGoodsFromApi(ctx) {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        if (res.status === 200) {
          ctx.commit("setGoods", res.data.products);
        } else {
          ctx.commit("setErrorMessages", "Невдалося завантажити");
        }
      } catch (error) {
        console.log(error);
        ctx.commit("setErrorMessages", "Невідома помилка при завантаженні");
      }
    },

    countPrice(ctx) {
      let totalPrice = 0;
      ctx.state.addedGoods.forEach((element) => {
        totalPrice += element.good.price * element.quantity;
      });
      ctx.commit("setTotalPrice", totalPrice);
    },

    //================================================================
    plusOne(ctx, good) {
      console.log("plusOne");

      const index = ctx.state.addedGoods.findIndex(
        (element) => element.good.id === good.id
      );

      const findGood = ctx.state.addedGoods.find(
        (element) => element.good.id === good.id
      );

      //console.log(index)

      const newGood = {
        good: findGood.good,
        quantity: findGood.quantity + 1,
      };

      ctx.state.addedGoods.splice(index, 1, newGood);
      localStorage.setItem("addedGoods", JSON.stringify(ctx.state.addedGoods));
      ctx.dispatch("countPrice");
    },

    //================================================================
    minusOne(ctx, good) {
      console.log("minusOne");

      const index = ctx.state.addedGoods.findIndex(
        (element) => element.good.id === good.id
      );
      const findGood = ctx.state.addedGoods.find(
        (element) => element.good.id === good.id
      );

      const addedGood = ctx.state.addedGoods.find(
        (el) => el.good.id === good.id
      );

      if (addedGood.quantity <= 1) {
        const newAddedGoods = ctx.state.addedGoods.filter(
          (el) => el.good.id !== addedGood.good.id
        );
        ctx.commit("minusAddedGood", newAddedGoods);
        localStorage.setItem("addedGoods", JSON.stringify(newAddedGoods));
        ctx.dispatch("countPrice");
      } else {
        const newGood = {
          good: findGood.good,
          quantity: findGood.quantity - 1,
        };

        ctx.state.addedGoods.splice(index, 1, newGood);
        localStorage.setItem(
          "addedGoods",
          JSON.stringify(ctx.state.addedGoods)
        );
        ctx.dispatch("countPrice");
      }
    },

    // =================================================================
    makeOrder(ctx, user) {
      console.log(user);

      const addedGoods = ctx.state.addedGoods;
      console.log(addedGoods);

      const totalPrice = ctx.state.totalPrice;

      const order = {
        user: user,
        totalPrice: totalPrice,
        items: addedGoods.map((item) => ({
          id: item.good.id,
          title: item.good.title,
          quantity: item.quantity,
          price: item.good.price,
        })),
      };

      console.log(order);

      ctx.commit("clear");
      ctx.commit("updateTotalPrice");
      ctx.commit("updateAddedGoods");
      // axios.post('', order)
      //   .then(response => {
      //     console.log('Order sent', response);
      //   })
      //   .catch(error => {
      //     console.error('Error', error);
      //   });
    },
  },

  mutations: {
    clear(state) {
      state.totalPrice = 0;
      state.addedGoods = [];
      localStorage.removeItem("addedGoods");
      localStorage.removeItem("totalPrice");
    },

    minusAddedGood(state, data) {
      state.addedGoods = data;
      //console.log(data)
    },

    //============================================================================
    addGood(state, data) {
      const good = {
        good: data,
        quantity: 1,
      };

      state.addedGoods.push(good);
      localStorage.setItem("addedGoods", JSON.stringify(state.addedGoods));

      // ========
      let totalPrice = parseFloat(state.totalPrice) + good.good.price;
      state.totalPrice = totalPrice.toFixed(2);
      //========
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },

    addGoodsId(state) {
      const elements = [];
      state.addedGoods.forEach((el) => elements.push(el.good.id));
      state.addedGoodsId = elements;
    },
    // ========
    setTotalPrice(state, totalPrice) {
      state.totalPrice = totalPrice.toFixed(2);
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    //================================
    updateTotalPrice(state) {
      if (localStorage.getItem("totalPrice")) {
        state.totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
      }
    },
    updateAddedGoods(state) {
      if (localStorage.getItem("addedGoods")) {
        state.addedGoods = JSON.parse(localStorage.getItem("addedGoods"));
      }
    },

    // =================================================================
    setGoods(state, data) {
      state.goods = data;
    },
    setErrorMessages(state, data) {
      state.errorMessage = data;
    },
  },

  getters: {
    getErrorMessages: (state) => state.errorMessage,
    getGoods: (state) => state.goods,
    getAddedGoods: (state) => state.addedGoods,
    getTotalPrice: (state) => state.totalPrice,
    getAddedGoodsId: (state) => state.addedGoodsId,
  },
};
