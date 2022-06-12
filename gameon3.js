const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background3.png'
})

const dust = new Sprite({
  position: {
    x: 267,
    y: 400
  },
  imageSrc: './img/layer_3.png',
  scale: 2.5,
  framesMax: 3
})

const fire = new Sprite({
  position: {
    x: 830,
    y: 390
  },
  imageSrc: './img/fire/png/orange/loops/burning_loop_1.png',
  scale: 2.5,
  framesMax: 8 
})

const fire1 = new Sprite({
  position: {
    x: 690,
    y: 410
  },
  imageSrc: './img/fire/png/orange/loops/burning_loop_3.png',
  scale: 2,
  framesMax: 6 
})

const dust2 = new Sprite({
  position: {
    x: 0,
    y: 400
  },
  imageSrc: './img/layer_3.png',
  scale: 2.5,
  framesMax: 3
})

const dust3 = new Sprite({
  position: {
    x: 534,
    y: 400
  },
  imageSrc: './img/layer_3.png',
  scale: 2.5,
  framesMax: 3
})

const dust4 = new Sprite({
  position: {
    x: 801,
    y: 400
  },
  imageSrc: './img/layer_3.png',
  scale: 2.5,
  framesMax: 3
})

const player = new Fighter({
  position: {
    x: 300,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8
    },
    run1: {
      imageSrc: './img/samuraiMack/Run1.png',
      framesMax: 8
    },
    run2: {
      imageSrc: './img/samuraiMack/Run2.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})

const enemy = new Fighter({
  position: {
    x: 700,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4
    },
    run1: {
      imageSrc: './img/kenji/Run1.png',
      framesMax: 8
    },
    run2: {
      imageSrc: './img/kenji/Run2.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})

console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  dust.update()
  dust2.update()
  dust3.update()
  dust4.update()
  fire.update()
  fire1.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run2')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run1')
  } else {
    player.switchSprite('idle')
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run1')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
    enemy.switchSprite('run2')
  } else {
    enemy.switchSprite('idle')
  }

  // jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
    enemy.velocity.y = 20
    player.velocity.y = 20
    player.velocity.x = 0
    enemy.velocity.x = 0
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
    enemy.velocity.y = 20
    player.velocity.y = 20
    player.velocity.x = 0
    enemy.velocity.x = 0
  } 
}

animate()

var count = 0,lm
var limited = 1

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        if(player.position.x < 0){
          keys.d.pressed = true
        }
        else if(player.position.x > 0){
          keys.d.pressed = true
        }
        else {
          keys.d.pressed = false
        }
        player.lastKey = 'd'
        break
      case 'a':
        if(player.position.x - 5 + 215 < 0){
          keys.a.pressed = false
        }
        else if(player.position.x + 215> 0){
          keys.a.pressed = true
        }

        player.lastKey = 'a'
        break
      case 'w':
        count ++
        if (count == 1){
          lm = player.position.y
        }
      
        if (lm == player.position.y ){
          player.velocity.y = -20
          limited = 1
          }
          else if (limited < 1 && lm > player.position.y){
            player.velocity.y = -20
            limited= limited + 1
          }
        break
      case ' ':
        player.attack()
        break
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        count ++
        if (count == 1){
          lm = enemy.position.y
        }
      
        if (lm == enemy.position.y ){
          enemy.velocity.y = -20
          limited = 1
          }
          else if (limited < 1 && lm > enemy.position.y){
            enemy.velocity.y = -20
            limited= limited + 1
          }
        break
      case 'ArrowDown':
        enemy.attack()
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
