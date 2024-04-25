const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


var timeout;

function cursurmove(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#cursur").style.transform= `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`
    })
}


function curscurStretch(){ 
    // define default scale
    var xscale = 1;
    var yscale = 1;

    xprev = 0;
    yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout)
       xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev)
       yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev)

        xprev = dets.clientX
        yprev = dets.clientY

        cursurmove(xscale, yscale)

        setTimeout(function(){
           timeout = document.querySelector("#cursur").style.transform= `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        }, 100)
        
    })
}


function firstPage(){
    var tl = gsap.timeline()
    
    tl.from(".nav",{
        y: -10,
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut,
    })
    
    .to(".blackelem",{
        y:0,
        duration: 1.3,
        delay:-1,
        ease: Expo.easeInOut,
        stagger: 0.2
    })
    .from(".herofoter",{
        y:-1,
        opacity: 0,
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut,
    })
}

function imageShow(){
    document.querySelectorAll(".elem").forEach(function(elem){
        var rotate = 0;
        var diffrot = 0;
        elem.addEventListener("mousemove",function(dets){
           var diff = dets.clientY - elem.getBoundingClientRect().top;
           diffrot = dets.clientX - rotate;
           rotate = dets.clientX
           gsap.to(elem.querySelector("img"),{
               opacity: 1,
               ease: Power1,
               top: diff,
               left: dets.clientX,
               rotate: gsap.utils.clamp(-20, 20, diffrot*.4)
            })
        })
        elem.addEventListener("mouseleave",function(dets){
           gsap.to(elem.querySelector("img"),{
               opacity: 0,
               ease: Power1,
               duration: 0.5
            })
        })
    })
}

document.querySelector(".about img").addEventListener("mouseenter", function(){
    this.style.scale = 1.2
})
document.querySelector(".about img").addEventListener("mouseleave", function(){
    this.style.scale = 1
})


// gsap.to("#nav",{
//     backgroundColor: "#fff",
//     duration: "0.5",
//     height: "100px",
//     zindex: 999,
//     scrollTrigger:{
//         trigger: "#nav",
//         scroll: "#body",
//         // markers: true,
//         start: "top -10%",
//         end: "top -11%",
//         scrub: 1
//     }

// })

imageShow()
curscurStretch()
cursurmove()
firstPage()


