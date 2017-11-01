var c;
var ctx; //canvas Context
var cSVGtx; //canvas SVG Context

//socketIO 전역변수
var socket;
var selectShape;

var tool;

$(document).ready(function(){
    //jQuery 이용하여 canvas element 객체 얻기
    //ctx = $('#cv').get(0).getContext('2d');
    //var svgcanvas = new SVGCanvas();

    //cSVGtx = new CanvasSVG.Deferred();
    //cSVGtx.wrapCanvas(c);

    c = document.getElementById("cv");
    ctx = c.getContext("2d");

    //jQuery bind 이용하여 canvas에 마우스 시작,이동,끝 이벤트 핸들러 등록
    $('#cv').bind('mousedown',draw.start); //왜 이건 document.으로 못 부르는지.....
    $('#cv').bind('mousemove',draw.move);
    $('#cv').bind('mouseup',draw.end);

    //기본 모양 색상 설정
    shape.setShape();

    //clear 버튼에 이벤트 핸들러 등록
    $('#clear').bind('click',draw.clear);

    //색상 선택 select 설정
    for(var select in color_map){
        $('#pen_color').append('<option value=' + color_map[select].value + '>' +  color_map[select].name + '</option>');
    }
    //색상 선택 select 설정
    for(var i = 2 ; i < 15 ; i++){
        $('#pen_width').append('<option value=' + i + '>' +  i + '</option>');
    }
    $('select').bind('change',shape.change);

    ctx.strokeRect(703, 40, 860, 90);

    socket = io.connect('http://' + window.location.host);
    socket.on('linesend_toclient', function (data) { //데이터 전달 받음
        draw.drawfromServer(data);
    });
});

function tools(value){
    console.log(value);
    if(value == 'pen'){
        tool = 'pen';
        shape.setShape();
    }
    else{
        tool = 'eraser';
        //지우개 구현을 시작하지
        setpreview();
    }
}


function svg_load() {
    //document.getElementById("captions").appendChild(ctx.getSVG());
}
function svg_save() {
    //canvas to SVG
    ctx.toDataURL();
    //save to local
}

var msg = {
    line : {
        send : function(type,x,y){
            //console.log(type,x,y);
            socket.emit('linesend', {'type': type , 'x':x , 'y':y , 'color': shape.color , 'width' : shape.width });
        }
    }
}

//색상 배열
var color_map =
    [
        {'value':'white','name':'하얀색'},
        {'value':'red','name':'빨간색'},
        {'value':'orange','name':'주황색'},
        {'value':'yellow','name':'노란색'},
        {'value':'blue','name':'파랑색'},
        {'value':'black','name':'검은색'}
    ];

var shape = {
    //기본 색상,두께 설정
    color : 'white',
    width : 3,
    change : function(){
        var color = $('#pen_color option:selected').val();
        var width = $('#pen_width option:selected').val();
        shape.setShape(color,width);
    },
    //변경
    setShape : function(color,width){
        tool='pen';
        setpreview();

        if(color != null)
            this.color = color;
        if(width != null)
            this.width = width;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;

        ctx.beginPath();
        ctx.moveTo(720,100);
        ctx.lineTo(850,100);
        ctx.stroke();
    },
    setEraser : function(){

    }
}

function setpreview(){
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2;
    ctx.strokeRect(703, 40, 860, 90);
    ctx.font = "25px Gulim";
    ctx.fillStyle = 'white';
    ctx.clearRect(703, 0, 750, 35);
    ctx.fillText("미리보기", 740, 28);
    ctx.clearRect(713, 45, 855, 80);
    ctx.font = "20px Gulim";
    ctx.fillText(tool, 775, 75);
}
//그리기
var draw = {
    drawing : null,
    start : function(e){
        this.drawing = true;
        if(tool == "pen") {
            ctx.beginPath();
            ctx.moveTo(e.pageX, e.pageY);
            msg.line.send('start', e.pageX, e.pageY);
        }
        else{
            ctx.clearRect(e.pageX-10, e.pageY-10, 20, 20);
            msg.line.send('erase', e.pageX, e.pageY);
        }
    },
    move : function(e){
        if(this.drawing){
            if(tool == "pen") {
                ctx.lineTo(e.pageX, e.pageY);
                ctx.stroke();
                msg.line.send('move', e.pageX, e.pageY);
            }
            else{
                ctx.clearRect(e.pageX-10, e.pageY-10, 20, 20);
                msg.line.send('erase', e.pageX, e.pageY);
            }
        }
    },
    end : function(e){
        this.drawing = false;
        if(tool == "pen"){
            msg.line.send('end');
        }
    },
    clear : function(){
        //전체 지우기
        ctx.clearRect(0, 0, cv.width,cv.height);
        shape.setShape();
        msg.line.send('clear');
    },

    //그린 내용 남의 브라우저에도 그려주기
    drawfromServer : function(data){

        if(data.type == 'start'){
            ctx.beginPath();
            ctx.moveTo(data.x,data.y);
            ctx.strokeStyle = data.color;
            ctx.lineWidth = data.width;
        }

        if(data.type == 'move'){
            ctx.lineTo(data.x,data.y);
            ctx.stroke();
        }

        if(data.type == 'end'){
        }

        if(data.type == 'clear'){
            ctx.clearRect(0, 0, cv.width,cv.height);
            shape.setShape();
        }
        if(data.type == 'erase'){
            ctx.clearRect(data.x-10, data.y-10, 20, 20);
        }
    }
}
