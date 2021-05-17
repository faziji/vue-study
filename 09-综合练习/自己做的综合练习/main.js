const app = new Vue({
  el: "#app",
  // 导入几本书籍
  data: {
    books: [
      {
        name: "《算法导论》",
        beginDate: "2006-9",
        price: 80.0,
        count: 1,
      },
      {
        name: "《UNIX编程艺术》",
        beginDate: "2006-2",
        price: 59.0,
        count: 1,
      },
      {
        name: "《编程大全》",
        beginDate: "2008-10",
        price: 39.0,
        count: 1,
      },
      {
        name: "《代码大全》",
        beginDate: "2006-3",
        price: 128.0,
        count: 1,
      },
    ],
  },
  methods: {
    decrement(index) {
      this.books[index].count--;
    },
    increment(index) {
      this.books[index].count++;
    },
    remove(index) {
      this.books.splice(index, 1);
    },
  },
  filters: {
    showPrice(price) {
      return "￥" + price.toFixed(2); //toFixed开始的时候不小心写成fix
    },
  },
  computed: {
    totalPrice() {
      let total = 0;

      for (let i = 0; i < this.books.length; i++) {
        total += this.books[i].price + this.books[i].count;
      }

      return total
    },
  },
});
