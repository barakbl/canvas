$( document ).ready(function() {
   xo.init();
   xo.boardDraw();
    $( "body" ).on( "click", "canvas", function(event) {
        xo.clicked(event);
    });
});


var xo = {
    clicked : function(event) {
        var x = event.offsetX;
        var y = event.offsetY;

        if(x < 95) {
            row = 0;
        } else if (x  > 105 && x < 195) {
            row = 1;
        } else if (x > 205) {
            row = 2;
        } else {
            return;
        }

        if(y < 95) {
            col = 0;
        } else if (y  > 105 && y < 195) {
            col = 1;
        } else if (y > 205) {
            col = 2;
        } else {
            return;
        }
        this.play(row,col);


    },
    play : function(row, col) {
        if(this.turn == 0) {
            this.x(row,col)
        } else {
            this.circle(row,col);
        }
        this.changeTurn();
        this.displayPlayer();
    },
    changeTurn : function() {
        if(this.turn)
            this.turn = 0;
        else
            this.turn = 1;
    },
    circle : function(row, col) {
        //round
        var x = 50 + (row * 100);
        var y = 50 + (col * 100);
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(x,y,30,0,Math.PI*2,true); // Outer circle
        ctx.fill();
        ctx.stroke();
    },
    x : function(row, col) {
        var ctx = this.ctx;
        ctx.beginPath(row,col);
        ctx.moveTo(20 + (row * 100),20 + (col * 100));
        ctx.lineTo(80 + (row * 100), 80 + (col * 100));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(80 + (row * 100),20 + (col * 100));
        ctx.lineTo(20 + (row * 100), 80 + (col * 100));
        ctx.stroke();
    }, 
    canvasLeft : 0,
    canvasTop : 0,
    canvas : '',
    ctx : {},
    matrix : [],
    turn : 0,
    users : ["X", "O"],


    init : function() {
        var pos = $('canvas').position();
        this.canvasLeft = pos.left;
        this.canvasTop = pos.top;

        this.canvas = document.getElementById('xo');
        this.ctx =  this.canvas.getContext('2d');
        this.turn = Math.floor((Math.random() * 2));
        this.displayPlayer();
    },
    displayPlayer : function() {
        $('h2').html(this.users[this.turn] +  ' now');
    },
    boardDraw : function() {
        var ctx = this.ctx;
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.strokeRect(0, 0, 300, 300)

        ////////////////////////////////////////////////////
        // y
        ctx.beginPath();
        ctx.moveTo(100,0);
        ctx.lineTo(100, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(200,0);
        ctx.lineTo(200, 300);
        ctx.stroke();

        // x
        ctx.beginPath();
        ctx.moveTo(0,100);
        ctx.lineTo(300, 100);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,200);
        ctx.lineTo(300, 200);
        ctx.stroke();
        ////////////////////////////////////////////////////

    }
}

