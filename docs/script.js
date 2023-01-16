var feature; // eventually: all svg paths (countries) of the world
//  , toggle; // animation on/off control

var projection = d3.geoOrthographic()

    .scale(window.innerWidth/7)
    .rotate([51.03, -12.37])
    .clipAngle(90)
    .translate([400, 400]);


var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("#body").append("svg:svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .on("mousedown", mousedown);

if (frameElement) frameElement.style.height = '800px';
//if (frameElement) frameElement.style.width = '1500px';

d3.json("https://gist.githubusercontent.com/phil-pedruco/10447085/raw/426fb47f0a6793776a044f17e66d17cbbf8061ad/countries.geo.json", function (collection) {
    feature = svg.selectAll("path")
        .data(collection.features)
        .enter().append("svg:path")
        .attr("d", clip);

    feature.append("svg:title")
        .text(function (d) { return d.properties.name; });

    //startAnimation();
    document.getElementById("body").children[0].children[23].style.fill = "#9D2E7F"
    document.getElementById("body").children[0].children[23].addEventListener("mouseover", function(){    
        document.getElementById("body").children[0].children[23].style.fill = "#714A88"
        document.getElementById("cidade").innerHTML="Brasil"
        document.getElementById("loja1").style.display=""
        document.getElementById("loja2").style.display=""
        document.getElementById("loja3").style.display=""
        document.getElementById("loja4").style.display=""
    })
    document.getElementById("body").children[0].children[23].addEventListener("mouseout", function () {
        document.getElementById("body").children[0].children[23].style.fill = "#9D2E7F"
        document.getElementById("cidade").innerHTML = ""
        document.getElementById("loja1").style.display = "none"
        document.getElementById("loja2").style.display = "none"
        document.getElementById("loja3").style.display = "none"
        document.getElementById("loja4").style.display = "none"
    })
    document.getElementById("body").children[0].children[28].style.fill = "#9D2E7F"
    document.getElementById("body").children[0].children[28].addEventListener("mouseover", function () {
        document.getElementById("body").children[0].children[28].style.fill = "#714A88"
        document.getElementById("cidade").innerHTML = "Canadá"
        document.getElementById("loja1").style.display = ""
        document.getElementById("loja2").style.display = ""
        document.getElementById("loja3").style.display = "none"
        document.getElementById("loja4").style.display = "none"
    })
    document.getElementById("body").children[0].children[28].addEventListener("mouseout", function () {
        document.getElementById("body").children[0].children[28].style.fill = "#9D2E7F"
        document.getElementById("cidade").innerHTML = ""
        document.getElementById("loja1").style.display = "none"
        document.getElementById("loja2").style.display = "none"
        document.getElementById("loja3").style.display = "none"
        document.getElementById("loja4").style.display = "none"
    })
    document.getElementById("body").children[0].children[133].style.fill = "#9D2E7F"
    document.getElementById("body").children[0].children[133].addEventListener("mouseover", function () {
        document.getElementById("body").children[0].children[133].style.fill = "#714A88"
        document.getElementById("cidade").innerHTML = "Portugual"
        document.getElementById("loja1").style.display = ""
        document.getElementById("loja2").style.display = ""
        document.getElementById("loja3").style.display = ""
        document.getElementById("loja4").style.display = "none"
      
    })
    document.getElementById("body").children[0].children[133].addEventListener("mouseout", function () {
        document.getElementById("body").children[0].children[133].style.fill = "#9D2E7F"
        document.getElementById("cidade").innerHTML = ""
        document.getElementById("loja1").style.display = "none"
        document.getElementById("loja2").style.display = "none"
        document.getElementById("loja3").style.display = "none"
        document.getElementById("loja4").style.display = "none"
    })
});


function startAnimation() {
    done = false;
    d3.timer(function () {
        var rotate = projection.rotate();
        rotate = [rotate[0] + 0.1, rotate[1]];
        projection.rotate(rotate);
        //    circle.center(rotate);
        refresh();
        return done;
    });
}

function animationState() {
    return 'animation: ' + (done ? 'off' : 'on');
}

d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);


var m0
    , o0
    , done
    ;

function mousedown() {
    m0 = [d3.event.pageX, d3.event.pageY];
    o0 = projection.rotate();
    d3.event.preventDefault();
}

function mousemove() {
    if (m0) {
        var m1 = [d3.event.pageX, d3.event.pageY]
            , o1 = [o0[0] - (m0[0] - m1[0]) / 8, o0[1] - (m1[1] - m0[1]) / 8];
        projection.rotate(o1);
        //    circle.center(o1);
        refresh();
    }
}

function mouseup() {
    if (m0) {
        mousemove();
        m0 = null;
    }
}

function refresh(duration) {
    (duration ? feature.transition().duration(duration) : feature).attr("d", clip);
}

function clip(d) {
    return path(d);
}

function reframe(css) {
    for (var name in css)
        frameElement.style[name] = css[name] + 'px';
}
