//Selecting the eye div


//mousemove for devices with mouse aand touchmove for touchcreen devices
document.querySelector('body').addEventListener('mousemove', eyeball);
function eyeball(){
  const eye = document.querySelectorAll(".iris");
  eye.forEach(function(eye){
      /* getBoundingClientRect() method returns the position relative to the viewport */
      let eyeX = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      let eyeY = eye.getBoundingClientRect().top + eye.clientHeight / 2;

      let radian = Math.atan2((event.pageX - eyeX), (event.pageY - eyeY));
      //Convert Radians to Degrees
      let rotationDegrees =  radian * (180 / Math.PI) * -1 + 45;
      //Rotate the eye
      eye.style.transform = "rotate(" + rotationDegrees + "deg)";
    });
}
