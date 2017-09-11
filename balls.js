// balls.js
// Animate some number of balls on a javascript canvas.
// Illustrates
    // Literal Notation for creating objects
    // Literal Notation for adding a method to an object
    // Dot Notation for adding a method to an object
    // Template Notation for strings
    // Creating the balls completely within the bounds of the canvas
    // The canvas property of the context

var balls = [];     // global balls array

window.onload = function() {
    // getElementsByTagName() returns an array-like object of all the
    // elements with the given tag name
    // The canvas and its context are local variables in this function scope
    var cnv = document.getElementsByTagName("canvas")[0];
    var ctx = cnv.getContext("2d"); // cnv and ctx are local variables to this function scope
    cnv.width = 900;
    cnv.height = 600;

    // create 20 balls using object literals
    for(let i = 0; i < 20; i++) {
        var radius = (Math.random() * 20) + 5;    // radius between 5 and 25
        var red = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        // object literal notation to create a ball
        var ball = {
            ctx: ctx,   // save the context for drawing
            r: radius,  // the random radius
            // random x and y location
            // Make sure that the ball is initially completely within the canvas
            // because otherwise it might get stuck
            x: (Math.random() * (cnv.width - (2*radius))) + radius,
            y: (Math.random() * (cnv.height - (2*radius))) + radius,
            dx: (Math.random() * 3) + 2,
            dy: (Math.random() * 3) + 2,          
            // use the template string notation to create the color
            color: `rgb(${red},${green},${blue})`,
            // add a method to the object using literal notation
            draw: function() {
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y,this.r,0,Math.PI * 2);
                this.ctx.fillStyle = this.color;
                this.ctx.fill();
                this.ctx.stroke();
                }
            }
        // Add a second method to the ball object using the dot notation
        // Update the location of the ball each animation frame,
        // reversing direction when the ball hits an edge.
        ball.update = function() {
            var cnv = this.ctx.canvas;  // use the canvas property of the context to get the bounds
            this.x += this.dx;
            if(this.x + this.r >= cnv.width ||
                this.x - this.r <= 0)
                this.dx = -this.dx;
            this.y += this.dy;
            if(this.y + this.r >= cnv.height ||
                this.y - this.r <= 0)
                this.dy = -this.dy;
           
            }
        balls.push(ball);   // add this ball to the array
       }
    requestAnimationFrame(animate); // kick off the animation
    }
    
// animate() -- each animation frame
function animate() {
    if(balls.length) {
        var ctx = balls[0].ctx;     // because it's not global
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        // use the for(;;) loop notation to draw all the balls.
        for(let i = 0; i < balls.length; i++) {
            balls[i].draw();
            }
        // use the forEach() loop notation to update all the balls
        balls.forEach(function(ball) { ball.update(); })
        }
    requestAnimationFrame(animate);
    }    