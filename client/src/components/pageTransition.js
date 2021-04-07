const 
paperTransition = {     //to make page transition using framer-motion library
  in: {
    opacity: 1,
    x:0,
  },
  out:{
    opacity: 0,
    x: "-100vw"
  }
},
pageTransition = (duration, transition)=> {return {
    duration: duration,
    transition: transition
  }}

export { paperTransition, pageTransition }