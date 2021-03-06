        const soundGup =  document.getElementById('soundGup')
        const gameOver = document.getElementById('gameOver')
        const celeste = document.getElementById('celeste')
        const violeta = document.getElementById('violeta')
        const naranja = document.getElementById('naranja')
        const verde = document.getElementById('verde')
        const btnEmpezar = document.getElementById('btnEmpezar')
        var SCORE_INIT = 0      
        const ULTIMO_NIVEL = 10

         
        class Juego{
          constructor() {
              this.inicializar = this.inicializar.bind(this)
              this.inicializar()
              this.generarSecuencia()
              setTimeout(this.siguienteNivel, 500)
           }

            inicializar(){
                this.siguienteNivel = this.siguienteNivel.bind(this)
                this.elegirColor = this.elegirColor.bind(this)
                this.toggleBtnEmpezar()
                this.nivel = 1
                this.colores = {
                    celeste,
                    violeta,
                    naranja,
                    verde
                }
                this.sound = {
                    soundGup,
                    gameOver
                }
            }

            toggleBtnEmpezar(){
              if (btnEmpezar.classList.contains('hide')){
                btnEmpezar.classList.remove('hide')    
              }else{
                btnEmpezar.classList.add('hide')
              }
              
            }

            generarSecuencia(){
                this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4 ))
            }

            siguienteNivel(){
                this.subnivel = 0
                this.iluminarSecuencia()
                this.agregarEventosClick()
            }

            transformarNumeroAColor(numero){
                switch(numero){
                    case 0: 
                        return 'celeste'
                    case 1:
                        return 'violeta'
                    case 2:
                        return 'naranja'
                    case 3:
                        return 'verde'
                }
            }

            transformarColorANumero(color){
                switch(color){
                    case 'celeste': 
                        return 0
                    case 'violeta':
                        return 1
                    case 'naranja':
                        return 2
                    case 'verde':
                        return 3
                }
            }

            // Revisar bien porque con var (tiene que ver con el ambito de let const(son locales) y var (son globales))
            iluminarSecuencia(){
                for(let i = 0; i < this.nivel; i ++){
                    const color = this.transformarNumeroAColor(this.secuencia[i])
                    setTimeout(() => this.iluminarColor(color),1000 * i)
                }
            }

            iluminarColor(color) {
                this.colores[color].classList.add('light')
                this.playSound()
                setTimeout(() => this.apagarColor(color), 350)
            }

            apagarColor(color){
                this.colores[color].classList.remove('light')
            }

            agregarEventosClick(){
                this.colores.celeste.addEventListener('click',this.elegirColor)
                this.colores.verde.addEventListener('click',this.elegirColor)
                this.colores.violeta.addEventListener('click',this.elegirColor)
                this.colores.naranja.addEventListener('click',this.elegirColor)
            }

            eliminarEventosClick(){
                this.colores.celeste.removeEventListener('click',this.elegirColor)
                this.colores.verde.removeEventListener('click',this.elegirColor)
                this.colores.violeta.removeEventListener('click',this.elegirColor)
                this.colores.naranja.removeEventListener('click',this.elegirColor)
            }

            playSound(){
               this.sound.soundGup.play();
            }

            gameOverSound(){
                this.sound.gameOver.play();
            }

            scoreUp(){
                SCORE_INIT+=5
                document.getElementById("score").innerHTML = SCORE_INIT
            }

            scoreClen(){
                SCORE_INIT=0
                document.getElementById("score").innerHTML = SCORE_INIT
            }
            
            levelClean(){
                this.nivel =0
                document.getElementById("level").innerHTML = this.nivel
            }

            levelUp(){
                document.getElementById("level").innerHTML = this.nivel
            }


            elegirColor(ev){
                const nombreColor = ev.target.dataset.color
                const numeroColor = this.transformarColorANumero(nombreColor)
                this.iluminarColor(nombreColor)
                this.playSound()
                if (numeroColor === this.secuencia[this.subnivel]){
                    this.subnivel++
                    this.scoreUp()
                    if(this.subnivel === this.nivel){
                        this.nivel ++
                        this.levelUp()
                        this.eliminarEventosClick()
                        if(this.nivel === (ULTIMO_NIVEL +1) ){
                            this.ganoElJuego()
                        }else {
                            setTimeout(this.siguienteNivel,1500)
                        }
                    }
                } else {
                    this.gameOverSound()
                    this.perdioElJuego()
                }
            }

            ganoElJuego(){
              swal('Symon Says',`Felicitaciones Ganaste el Juego xD SCORE ES: ${ SCORE_INIT } !!`, 'success')
                .then(()=>{
                    this.levelClean()
                    this.scoreClen()
                    this.inicializar()
                })
            }


            perdioElJuego(){
              swal('Symon Says',`Fin del Juego tu SCORE ES: ${ SCORE_INIT } !!`, 'error')
                .then(() => {
                    this.eliminarEventosClick()
                    this.levelClean()
                    this.scoreClen()
                    this.inicializar()

                })
            }

        }

        function empezarJuego(){
            window.juego = new Juego()
        }