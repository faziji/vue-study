# Vue 组件传参的八种方式总结

> Vue 组件的使用不管是在平常工作还是在面试面试中，都是频繁出现的。因此系统的梳理一下组件之间的传参还是非常有必要的

# 一、props 传参

## 子组件定义 props 有三种方式:

```
// 第一种数组方式
props: [xxx, xxx, xxx]
// 第二种对象方式
props: { xxx: Number, xxx: String}
// 第三种对象嵌套对象方式
props: {
    xxx: {
        //类型不匹配会警告
        type: Number,
        default: 0,
        required: true,
        // 返回值不是 true,会警告
        validator(val) { return val === 10}
    }
}
复制代码
```

第三种对象默认支持 4 种属性，并且都是非必填的。可以随意使用

### 小结

 - 传递静态值还是动态值，除了字符串外，最好都加上：`<blog-post v-bind:title="post.title"></blog-post>`

 - 传入一个对象的所有属性可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)

   

   ---

## 父组件传参的俩种方式

第一种静态属性传参

注意：

1. 在不定义 props 类型的情况下 props 接受到的均为 String。
2. 当 props 属性指定为 Boolean 时，并且只有属性 key 没有值 value 时接受到的是 true

```
<!--props 接受到的均为 String -->
<children xxx="123"></children>

<!-- 有只有属性没有值, 这种情况 props 指定类型是 Boolean 则接收到的是 true -->
<children xxx></children>
复制代码
```

第二种动态属性传参

注意：

1. 需要区分非简写形式传入的值是对象，则会对应 props 中多个值
2. 会保留传入值的类型
3. 如果是表达式则获取到的是表达式的计算结果

```
<!-- prop 接收到 Number 类型的 123-->
<children :xxx="123"></children>

<!-- prop 接收到 Array 类型的 [1, 2, 3]-->
<children v-bind:xxx="[1, 2, 3]"></children>

<!-- prop 会接收到 xxx1 和 xxx2 俩个参数。这种不支持简写形式-->
<children v-bind="{xxx1: 1, xxx2: 2}"></children>
复制代码
```

# 二、![attrs 和](https://juejin.im/equation?tex=attrs%20%E5%92%8C)listeners

**$attrs**

$attrs 会获取到 props 中未定义的属性（class 和 style 属性除外）,支持响应式。常用的场景有俩种：

1. 组件嵌套组件时可以使用 $attrs 来支持过多的属性支持。比如 elementUI 的 table 组件。支持的属性十几个，而平常封装的时候用的最多的也就一俩个。
2. 属性默认是添加在父组件上的，有时候想把多余的属性添加在子组件上（可以结合 inheritAttrs: false 属性，让父属性不接受多余的属性）

**$listeners** 定义的事件都在子组件的根元素上，有时候想加到其他元素上。就可以使用 $listerners。它包含了父组件中的事件监听器(除了带有 .native 修饰符的监听器)

# 三、$emit 通知

Vue 默认有 $on $emit $once $off 几种方法来实现发布订阅模式，这也应用在了组件传参上。在组件上添加的特殊方法 @abc="methods" 就相当于使用了 $on 来监听这个方法。因此组件内可以使用 $emit 来进行通知。

**这里有一道考题: for 循环的时候如何拿到子组件的传值和 for 中循环的值**

答案有俩种，一是 $event, 二是 闭包。只是需要注意 $event 只能获取到第一个值

```
<template v-for="item in [1, 2, 3]">
    <children @abc="((val, val2) => getValue(val, item))"></children>
</template>
复制代码
```

# 四、v-model

这个其实是一种通过 ![emit，](https://juejin.im/equation?tex=emit%EF%BC%8C)on 的组合方式。优点再于同步值方便,写法优雅。下面三种写法其实是一个意思

```
// 写法 1
<children v-model="a"></children>
{
    model: {
        prop: 'value',
        event: 'update:a',
    },
    methods: {
        a() { this.$emit('update:a', 1)}
    }
}

// 写法 2
<children :a="a" @update:a="a = $event"></children>
{
    props: ['a']
    methods: {
        a() { this.$emit('update:a', 1)}
    }
}
// 写法 3 
// 1. 事件名必须是 update: + 属性名
// 2. 参数不能是表达式，最好是 data 里面的属性
<children :a.sync="a"></children>
{
    props: ['a']
    methods: {
        a() { this.$emit('update:a', 1)}
    }
}
复制代码
```

# 五、插槽

```
<template>
    <div>
        <!--默认插槽-->
        <slot></slot>
        <!--另一种默认插槽的写法-->
        <slot name="default"></slot>
        <!--具名插槽-->
        <slot name="footer"></slot>
        <!--传参插槽-->
        <slot v-bind:user="user" name="header"></slot>
    </div>
</template>

<!--使用-->
<children>
    <!--跑到默认插槽中去-->
    <div>123</div>
    <!--另一种默认插槽的写法-->
    <template v-slot:default></template>
    <!--跑到具名插槽 footer 中去-->
    <template v-slot:footer></template>
    <!--缩写形式-->
    <template #footer></template>
    <!--获取子组件的值-->
    <template v-slot:header="slot">{{slot.user}}</template>
    <!--结构插槽值-->
    <template v-slot:header="{user: person}">{{person}}</template>
    <!--老式写法，可以写到具体的标签上面-->
    <template slot="footer" slot-scope="scope"></template>
</children>
复制代码
```

# 六、$refs, $root, $parent, $children

1. $root 获取根组件
2. $parent 获取父组件
3. $children 获取子组件(所有的子组件，不保证顺序)
4. $refs 组件获取组件实例，元素获取元素

# 七、project / inject

**注意：注入的值是非响应的**

```
<!--父组件 提供-->
{
    project() {
        return {
            parent: this
        }
    }
}
<!--子组件 注入-->
{
    // 写法一
    inject: ['parent']
    // 写法二
    inject: { parent: 'parent' }
    // 写法三
    inject: {
        parent: {
            from: 'parent',
            default: 222
        }
    }
}
复制代码
```

# 八、Vuex

这个相当于单独维护的一组数据，就不过多的说了。