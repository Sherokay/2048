let data = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];
let score = 0;
let best = 0;
let flag = 0;
let wrong = 0;

// 生成随机的二维坐标
function newIndex () {
  let num = Math.floor(Math.random()*16);
  let i = parseInt(num / 4);
  let j = num % 4;
  while (data[i][j] !== 0) {
    // console.log(i,j,flag,"not 0");
    if (flag > 15) {
      i = j = 5;
      if (wrong > 2) {
        if (confirm("你输了，是否开始新游戏？")) {
          wrong = 0;
          newGame();
        }
      }
      break;
    }
    num = Math.floor(Math.random()*16);
    i = parseInt(num / 4);
    j = num % 4;
  }
  return {i,j};
}
// 获取box的序号
function getIndex (i,j) {
  return i*4 + j;
}
// 新增随机的2或4
function addBox () {
  let newNum = [2,4];
  let {i,j} = newIndex();
  let key = parseInt(Math.random() + 0.3);
  try {
    data[i][j] += newNum[key];
    wrong = 0;
  } catch (error) {
    wrong++;
    console.log(wrong);
  }
  // console.log(i,j,newNum[key]);
  score += newNum[key];
  $(".score").html(score);
  randerData();
}
function moveLeft () {
  console.log("left");
  clearLeft();
  for(let i=0;i<4;i++) {
    for(let j=0;j<3;j++) {
      if (data[i][j] === data[i][j+1]) {
        data[i][j] *= 2;
        data[i][j+1] = 0;
      }
    }
  }
  clearLeft();
  randerData();
  setTimeout(()=> {
    addBox();
  },300)
}
function clearLeft () {
  for(let i=0;i<4;i++) {
    for(let j=0;j<4;j++) {
      if (data[i][j] !== 0) {
        for (let k = 0; k < j; k++) {
          if (data[i][k] === 0) {
            data[i][k] = data[i][j];
            data[i][j] = 0;
            break;
          }
        }
      }
    }
  }
}
function moveRight () {
  console.log("right");
  clearRight();
  for(let i=0;i<4;i++) {
    for(let j=3;j>-1;j--) {
      if (data[i][j-1] === data[i][j]) {
        data[i][j] *= 2;
        data[i][j-1] = 0;
      }
    }
  }
  clearRight();
  randerData();
  setTimeout(()=> {
    addBox();
  },300)
}
function clearRight () {
  for(let i=0;i<4;i++) {
    for(let j=3;j>-1;j--) {
      if (data[i][j] !== 0) {
        for (let k = 3; k > j; k--) {
          if (data[i][k] === 0) {
            data[i][k] = data[i][j];
            data[i][j] = 0;
            break;
          }
        }
      }
    }
  }
}
function moveUp () {
  console.log("up");
  clearUp();
  for(let j=0;j<4;j++) {
    for(let i=0;i<3;i++) {
      if (data[i][j] === data[i+1][j]) {
        data[i][j] *= 2;
        data[i+1][j] = 0;
      }
    }
  }
  clearUp();
  randerData();
  setTimeout(()=> {
    addBox();
  },300)
}
function clearUp () {
  for(let j=0;j<4;j++) {
    for(let i=0;i<4;i++) {
      if (data[i][j] !== 0) {
        for(let k=0;k<i;k++) {
          if (data[k][j] === 0) {
            data[k][j] = data[i][j];
            data[i][j] = 0;
            break;
          }
        }
      }
    }
  }
}
function moveDown () {
  console.log("down");
  clearDown();
  for(let j=0;j<4;j++) {
    for(let i=3;i>0;i--) {
      if (data[i][j] === data[i-1][j]) {
        data[i][j] *= 2;
        data[i-1][j] = 0;
      }
    }
  }
  clearDown();
  randerData();
  setTimeout(()=> {
    addBox();
  },300)
}
function clearDown () {
  for(let j=0;j<4;j++) {
    for(let i=3;i>-1;i--) {
      if (data[i][j] !== 0) {
        for(let k=3;k>i;k--) {
          if (data[k][j] === 0) {
            data[k][j] = data[i][j];
            data[i][j] = 0;
            break;
          }
        }
      }
    }
  }
}
function randerData () {
  flag = 0;
  // console.log(data);
  $("main .box").removeClass(function (index, className) {
    return (className.match(/\bb-\S+/g) || []).join(' ');
  });
  $("main .box").html("");
  for(let i=0;i<4;i++) {
    for(let j=0;j<4;j++) {
      if (data[i][j] !== 0) {
        flag += 1;
        let num = getIndex(i,j);
        $("main .box").eq(num).addClass("b-"+ data[i][j]);
        $("main .box").eq(num).html(data[i][j]);
      }
    }
  }
}
function newGame () {
  best = score > best ? score : best;
  score = 0;
  $(".score").html(score);
  $(".best").html(best);
  data = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  randerData();
  addBox();
  addBox();
}
$(document).ready(function() {
  addBox();
  addBox();
  $(".newgame").click(function (){
    newGame();
  });
  let startX = 0;
  let startY = 0;
  let moveX = 0;
  let moveY = 0;
  $("main").on("touchstart",function(e){
    e.preventDefault();
    startX = e.originalEvent.changedTouches[0].pageX;
    startY = e.originalEvent.changedTouches[0].pageY;
  });
  $("main").on("touchmove",function(e){
    e.preventDefault();
    moveX = e.originalEvent.changedTouches[0].pageX - startX;
    moveY = e.originalEvent.changedTouches[0].pageY - startY;
  });
  $("main").on("touchend",function(e){
    e.preventDefault();
    let x = Math.abs(moveX);
    let y = Math.abs(moveY);
    if (x > y) {
      if (moveX > 0) {
        console.log("right");
        moveRight();
      } else {
        console.log("left");
        moveLeft();
      }
    } else {
      if (moveY < 0) {
        console.log("up");
        moveUp();
      } else {
        console.log("down");
        moveDown();
      }
    }
  });
});
$(document).keydown(function (e) {
  e.preventDefault();
  var code = e.keyCode | e.which;
  switch (code) {
    case 37:
      moveLeft();
      break;
    case 39:
      moveRight();
      break;
    case 38:
      moveUp();
      break;
    case 40:
      moveDown();
      break;
    default:
      break;
  }
});


