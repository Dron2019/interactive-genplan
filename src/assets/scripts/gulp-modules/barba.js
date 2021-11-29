import barba from '@barba/core';
import gsap from 'gsap';
import ztext from '../modules/ztext/ztext';




var ztxt = new ztext(".hero-text", {
  depth: "30px",
  layers: 15,
  fade: true,
  direction: "forwards",
  event: "pointer",
  eventRotation: "35deg"
});
barba.init({
    transitions: [{
        name: 'default-transition',
        leave(data) {
            return gsap.to(data.current.container, {
                opacity: 0
              });
        },
        enter(data) {
            return gsap.from(data.next.container, {
                opacity: 0
              });
        }
      }]
})