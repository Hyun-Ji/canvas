var canvasTests = [
    {
        name:   "Basic",
        func:   function (ctx) {
            // trivial test
            ctx.fillStyle = '#f90';
            ctx.strokeStyle = '#000';
            ctx.fillRect(10, 10, 200, 100);
            ctx.lineWidth *= 2;
            ctx.strokeRect(10, 10, 200, 100);
            ctx.fillStyle = 'rgba(0,200,200,0.5)';
            ctx.fillRect(170, 70, 100, 100);
        }
    },

    {
        name:   "Chart",
        func:   function (ctx) {
            ctx.fillStyle = '#08f';
            var chart = function (x, w, val) {
                ctx.beginPath();
                ctx.rect(x,100-val,w,val);
                ctx.fill();
            }
            var w=5;
            for (var x=0; x < 500; x+=w) {
                chart( x, w, 100*Math.random() );
            }
        }
    },

    {
        name:   "Arc",
        func:   function (context) {
            context.fillStyle = 'red';
            context.fillRect(100,  50,  50,  50);
            context.fillRect( 50,  50,  50,  50);
            context.fillRect( 50, 100,  50,  50);
            context.fillStyle = 'green';
            context.fillRect(100, 100, 100, 100);
            context.fillStyle = 'silver';
            context.moveTo(200,100);
            context.arc(100, 100, 100, 0, Math.PI/2, true);
            context.fill();
        }
    },

    {
        name:   "Paths",
        func:   function (context) {
            context.strokeStyle = 'navy';
            context.fillStyle = 'red';
            // control
            context.fillRect(375, 105, 10, 10);
            // P
            context.beginPath();
            context.lineWidth = 10;
            context.translate(10, 10);
            context.moveTo(0, 200);
            context.arc(0, 50, 50, Math.PI/2, 3*Math.PI/2, true);
            context.lineTo(0, 100);
            context.stroke();
            // A
            context.translate(75, 0);
            context.scale(0.1, 0.1);
            context.lineWidth = 100;
            context.beginPath();
            context.moveTo(0, 2000);
            context.lineTo(500, 0);
            context.lineTo(1000, 2000);
            context.moveTo(250, 1000);
            context.lineTo(750, 1000);
            context.stroke();
            // S
            context.beginPath();
            context.scale(10, 10);
            context.translate(125, 0);
            context.moveTo(100, 50);
            context.arc(50, 50, 50, 0, Math.PI/2, true);
            context.arc(50, 150, 50, -Math.PI/2, Math.PI, false);
            context.lineWidth = 10;
            context.stroke();
            // S
            context.translate(120, 0);
            context.stroke();
        }
    },
    
    {
        name:   "Double Strokes",
        func:   function (context) {
            context.strokeStyle = 'blue';
            context.lineWidth = 10;
            context.moveTo(10, 10);
            context.lineTo(190, 10);
            context.stroke();
            context.strokeStyle = 'navy';
            context.translate(0, 30);
            context.stroke();
        }
    },
    
    {
        name:   "rotate direction",
        func:   function (ctx) {
            with(ctx) {
                translate(150, 150);
                fillStyle = 'red';
                fillRect(0, 0, 150, 150);
                rotate(Math.PI / 2);
                fillStyle = 'green';
                fillRect(0, -150, 150, 150);
            }
        }
    },
    
    {
        name:   "Simple path transform",
        func:   function (context) {
            context.fillStyle = 'red';
            context.fillRect(0, 0, 200, 200);
            context.fillStyle = 'green';
            context.rect(0, 0, 100, 100);
            context.fill();
            context.translate(0, 100);
            context.fill();
            context.translate(100, 0);
            context.fill();
            context.translate(0, -100);
            context.fill();
        }
    },
    
    {
        name:   "Triangles z",
        func:   function (context) {
            var t = 20;
            var d = 100;
            var y = d * Math.sqrt(3/4);
            var x1 = t * 2;
            var x2 = x1 + d + t * 2;
            var y1 = t;

            // control start
            context.beginPath();
            // triangle 1
            context.moveTo(d/2+x1,  0+y1);
            context.lineTo(d+x1,  y+y1);
            context.lineTo(0+x1, y+y1);
            context.lineTo(d/2+x1,  0+y1);
            context.strokeStyle = 'red';
            context.lineWidth = t/2;
            context.stroke();
            // triangle 2
            context.beginPath();
            context.moveTo(d/2+x2,  0+y1);
            context.lineTo(d+x2,  y+y1);
            context.lineTo(0+x2, y+y1);
            context.lineTo(d/2+x2,  0+y1);
            context.strokeStyle = 'red';
            context.lineWidth = t/2;
            context.stroke();

            // test start
            context.beginPath();
            // triangle 1
            context.moveTo(d/2+x1,  0+y1);
            context.lineTo(d+x1,  y+y1);
            context.lineTo(0+x1, y+y1);
            context.closePath();
            // triangle 2
            context.moveTo(d/2+x2,  0+y1);
            context.lineTo(d+x2,  y+y1);
            context.lineTo(0+x2, y+y1);
            context.closePath();
            // paint
            context.strokeStyle = 'green';
            context.lineWidth = t;
            context.stroke();
        }
    },
    
    {
        name:   "Scale, save+restore",
        func:   function (context) {
            var x = 50;
            var y = 50;
            var r = 40;
            var zoom = 0.5;

            context.save();
            context.fillStyle = 'red';
            context.beginPath();
            context.arc(x/zoom, y/zoom, r/zoom, 0, Math.PI*2, true);
            context.scale(zoom, zoom);
            context.fill();
            context.restore();

            context.save();
            context.fillStyle = 'green';
            context.beginPath();
            context.scale(zoom, zoom);
            context.arc(x/zoom, y/zoom, r/zoom, 0, Math.PI*2, true);
            context.fill();
            context.restore();
        }
    },
    
    {
        name:   "Path stroke/fill",
        func:   function (context) {
            context.beginPath();
            context.arc(50, 50, 40, 0, Math.PI*2, true);
            context.fillStyle = 'red';
            context.strokeStyle = 'maroon';
            context.fill();
            context.stroke();
            context.fillStyle = 'lime';
            context.strokeStyle = 'green';
            context.lineWidth = 10;
            context.stroke();
            context.fill();
        }
    },
    
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },
    // 
    // {
    //     name:   "XXX",
    //     func:   function (ctx) {
    //     }
    // },


];

var canvasTestsLive = [
{
    name:   "AniRects (live)",
    func:   function (animatedctx) {
        var iterations = 200;
        var addBox = function () {
            animatedctx.beginPath();
            if (Math.random() > 0.99) animatedctx.clearRect(0,0,animatedctx.canvas.width,animatedctx.canvas.height);
            animatedctx.fillStyle='rgba('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
            animatedctx.rect(Math.random()*500,Math.random()*100,Math.random()*100, Math.random()*100 );
            animatedctx.fill();
            iterations--;
            if (iterations) setTimeout(addBox, 50);
            else alert("animation stopped");
        }
        addBox();
    }
},
];
