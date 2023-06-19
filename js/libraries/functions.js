var canvas, scoreContainer, gameContainer, ctx, audioLose, audioWin

/**canvas property* */

const canvasSize = 400
const canvasBorder = "3px solid red"
const canvasbackgroundColor = "black"
const canvasOpacity = "0.8"


/**score property* */

var score = 0
const scoreColore = "white"

/**snack property* */


var setpX = 0
var setpY = 0

const snackColor = "orange"
const snackSize = 20
var blockUnit = canvasSize / snackSize
var snackX = Math.trunc(Math.random() * blockUnit) * snackSize
var snackY = Math.trunc(Math.random() * blockUnit) * snackSize


/**food property* */

var rayonFood = snackSize / 2
var foodX = Math.trunc(Math.random() * blockUnit) * snackSize + rayonFood
var foodY = Math.trunc(Math.random() * blockUnit) * snackSize + rayonFood








export const snackGame = {

    start: () => {
        snackGame.initMedia()
        snackGame.createCanvas()
        snackGame.createSnack()
        snackGame.initMoovSnack()
        setInterval(snackGame.updateMoovSnack, 100)

    },

    createCanvas: () => {

        gameContainer = document.createElement("div")

        scoreContainer = document.createElement("div")
        scoreContainer.id = "score"
        scoreContainer.style.color = scoreColore
        scoreContainer.style.fontSize = "50px"
        scoreContainer.innerHTML = score
        scoreContainer.style.position = "fixed"
        scoreContainer.style.zIndex = 1000

        canvas = document.createElement('canvas');
        canvas.width = canvasSize
        canvas.height = canvasSize
        canvas.style.border = canvasBorder
        canvas.style.background = canvasbackgroundColor
        canvas.style.opacity = canvasOpacity



        gameContainer.id = "game-container"
        gameContainer.style.display = "flex"
        gameContainer.style.flexDirection = "column"
        gameContainer.style.justifyContent = "center"
        gameContainer.style.alignItems = "center"
        ctx = canvas.getContext('2d');


        gameContainer.appendChild(scoreContainer)
        gameContainer.appendChild(canvas)
        document.body.appendChild(gameContainer)






    },


    initMedia: () => {

        audioLose = document.createElement("audio")
        audioLose.src = "/asset/media/aa.mp3"

        audioWin = document.createElement("audio")
        audioWin.src =  "/asset/media/aa.mp3"



    },


    createSnack: () => {


        ctx.fillStyle = snackColor;
        ctx.clearRect(0, 0, canvasSize, canvasSize)
        ctx.fillRect(snackX, snackY, snackSize, snackSize);
        snackGame.createFood()





    },


    createFood: () => {
        ctx.beginPath();
        ctx.arc(foodX, foodY, rayonFood, 0, 2 * Math.PI);
        ctx.fillStyle = snackColor
        ctx.fill()
        ctx.closePath()

    },


    updateMoovSnack: () => {
        snackX += setpX * snackSize
        snackY += setpY * snackSize
        snackGame.createSnack()
        snackGame.checkClass()

    },


    initMoovSnack: () => {

        document.addEventListener("keydown", (event) => {

            switch (event.key) {
                case "ArrowUp":
                    setpX = 0
                    setpY = -1


                    break;

                case "ArrowDown":
                    setpX = 0
                    setpY = 1



                    break;

                case "ArrowRight":
                    setpX = 1
                    setpY = 0

                    break;
                case "ArrowLeft":
                    setpX = -1
                    setpY = 0



                    break;
                case " ":
                    setpX = 0
                    setpY = 0


                    break;

                default:
                    break;
            }
        })

    },



    checkClass: () => {

        if ((snackX < 0 || snackX > (canvasSize - snackSize)) || (snackY < 0 || (snackY > canvasSize - snackSize))) {

            //ERROR

            audioLose.play()

            setpX = 0
            setpY = 0

            snackX = Math.trunc(Math.random() * blockUnit) * snackSize
            snackY = Math.trunc(Math.random() * blockUnit) * snackSize

        }else if (((foodX - rayonFood) === snackX) && ((foodY - rayonFood) === snackY)) {

            //WIN

            audioWin.play()
            foodX = Math.trunc(Math.random() * blockUnit) * snackSize + rayonFood
            foodY = Math.trunc(Math.random() * blockUnit) * snackSize + rayonFood



           

        }
    }


}






