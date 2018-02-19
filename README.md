# animation-fill-mode

| 值 | 说明 |
|--- | --- |
| forwards | 动画执行完毕后，将状停留在最后一帧 |
| backwards | 动画在等待期间（delay），将状态设为第一帧 |
| both | 同时设置 forwards 与 backwards |
| none | 默认值。动画等待期间与执行完毕后不会影响元素的状态 |

# 如何再次手动触发 animation

在不设置`animation-iteration-count `的情况，要想再次触发 animation 动画，需要先移除元素的 `animation-name` 属性，再将 `animation-name` 添加进去，但必须是异步添加：

# transform-origin

定位变换的中心点。

```js
// 同步添加的方式不会两次触发 animation 动画
button.onclick = function () {
  targetElem.classList.remove('bounceIn');
  targetElem.classList.add('bounceIn');
};

// 必须异步添加，才能触发 animation 动画
button.onclick = function () {
  targetElem.classList.remove('bounceIn');

  clearTimeout(this.timer);
  this.timer = setTimeout(function () {
    targetElem.classList.add('bounceIn');
  }, 10);
};
```
