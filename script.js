const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})
const gift_img = document.getElementById('gift_img')
const Konfettis = []
const Gifts = []

class Konfetti {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.speedX = Math.random() * 10 - 5
        this.speedY = Math.random() * 10 - 5
        this.size = 1
        this.angel = Math.random()
        this.width = 20
        this.height = 40
        this.color = 'hsl(' + Math.floor(Math.random() * 360) + ', 100%, 50%)'
    }
    update() {
        this.size -= 0.005
        this.x += this.speedX
        this.y += this.speedY
    }
    draw() {
        ctx.save()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width * this.size, this.height * this.size)
        ctx.fill()
        ctx.restore()
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i in Konfettis) {
        if (Konfettis[i].size <= 0.01 || Konfettis[i].y > canvas.height || Konfettis[i].y < - this.height || Konfettis[i].x > canvas.width || Konfettis[i].x < - this.width) {
            Konfettis.splice(i, 1)
            i--
        }
    }
    for (var i in Gifts) {
        if (Gifts[i].clicked || Gifts[i].y > canvas.height || Gifts[i].y < - this.height || Gifts[i].x > canvas.width || Gifts[i].x < - this.width) {
            Gifts.splice(i, 1)
            i--
        }
    }
    Konfettis.forEach( konfetti => {
        konfetti.update()
        konfetti.draw()
    })
    Gifts.forEach( gift => {
        gift.update()
        gift.draw()
    })
    requestAnimationFrame(animate)
}
animate()

window.addEventListener('click', function(e) {
    mouse.x = e.x
    mouse.y = e.y
    for (var i in Gifts) {
        if (collision(Gifts[i], mouse)) {
            Gifts[i].click()
        }
    }
})

class Gift {
    constructor() {
        this.S_width = 800
        this.S_height = 600
        this.size = .31
        this.width = this.S_width * this.size
        this.height = this.S_height * this.size
        this.img = gift_img
        this.x = Math.random() * (canvas.width - this.width)
        this.y = 0
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() + 2
        this.clicked = false
        this.content = Math.random() * 31 + 69
    }
    update() {
        this.x += this.speedX
        this.y += this.speedY
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    click() {   
        this.clicked = true   
        for (let i = 0; i < this.content; i++) {
            Konfettis.push(new Konfetti(this.x + this.width * .5, this.y + this.height * .5));
        }
    }
}

class Mouse {
    constructor() {
        this.x = undefined
        this.y = undefined
        this.width = 1
        this.height = 1
    }
}

let mouse = new Mouse()

setInterval(() => {
    Gifts.push(new Gift());
}, 1000);

function collision(r1, r2) {
    if (r1.x + r1.width >= r2.x &&
          r1.x <= r2.x + r2.width &&
        r1.y + r1.height >= r2.y &&
          r1.y <= r2.y + r2.height)
    {
      return true;
    }
    
    return false;
  }