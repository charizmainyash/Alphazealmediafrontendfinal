// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './Services.css';




const HeadingText = ({ text, startAnimation }) => {
  const [placeholder, setPlaceholder] = useState('');
  const [animationTriggered, setAnimationTriggered] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    let isMounted = true;

    function tick() {
      if (isMounted) {
        setPlaceholder((prev) => prev + text[placeholder.length]);
      }
    }

    if (inView && !animationTriggered && startAnimation) {
      if (placeholder.length < text.length) {
        let addChar = setInterval(tick, 100);
        return () => {
          clearInterval(addChar);
          isMounted = false;
        };
      }

      setAnimationTriggered(true);
    }
  }, [inView, animationTriggered, placeholder, startAnimation, text]);

  return (
    <div
      ref={ref}
      className="s-main-header-text text-9xl font-bold my-4 text-center"
    >
      {placeholder}
      
    </div>
  );
};






const RevealText = ({ index, text, startAnimation }) => {
  const [placeholder, setPlaceholder] = useState('');
  const [animationTriggered, setAnimationTriggered] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    let isMounted = true;

    function tick() {
      if (isMounted) {
        setPlaceholder((prev) => prev + text[placeholder.length]);
      }
    }

    if (inView && !animationTriggered && startAnimation) {
      if (placeholder.length < text.length) {
        let addChar = setInterval(tick, 30);
        return () => {
          clearInterval(addChar);
          isMounted = false;
        };
      }

      setAnimationTriggered(true);
    }
  }, [inView, animationTriggered, placeholder, startAnimation, text]);

  return (
    <div>
      <hr className="border-dashed border-1 border-gray-400 my-4"></hr> 
    <div
      ref={ref}
      className={`s-text ${index % 2 === 0 ? 's-text-anim text-left' : 's-text-anim w-1/2 ml-auto flex justify-start'} text-4xl font-bold my-4`}
    >
      {/* <hr className="border-dashed border-1 border-gray-400 my-4"></hr> */}
      {placeholder}
      {/* <hr className="border-dashed border-1 border-gray-400 my-4"></hr>  */}
    </div>
    </div>
  );
};

export const Service = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // const services = [
  //   '1. Social Media Content Strategy',
  //   '2. Digital Community Engagement',
  //   '3. Influencers campaign',
  //   '4. Brand Image Development',
  //   '5. Outreach Campaign Oversight',
  //   '6. Visual storytelling / Image crafting',
  //   '7. Product/lifestyle imagery creation',
  //   '8. Visual Brand Narration',
  //   '9. User-Generated Storytelling',
  // ];
  const services = [
    '1. BRAND LAUNCH CAMPAIGN',
    '2. REBRANDING & PACKAGING',
    '3. CREATIVE SHOOTS',
    '4. AD FILM PRODUCTION',
    '5. USER GENERATED CONTENT',
    '6. NARRATIVE BUILDING',
    '7. SOCIAL MEDIA MANAGEMENT',
    '8. INFLUENCER CAMPAIGN',
    '9. CELEBRITY ENDORSEMENTS',
    '10. ART DIRECTION',
    '11. CUSTOM WEB DEVELOPMENT',
  ];

  const heading = [
    'SERVICES'
    
  ];

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
      }, 500); // 2 seconds delay between sentences
    }
  }, [inView, currentSentenceIndex, services.length]);

  return (
    <div className="service bg-white p-10 py-4" ref={ref}>
      
      {heading.map((service, index) => (
       <div>
         <HeadingText key={index} index={index} text={service} startAnimation={index <= currentSentenceIndex} />
        
       </div>

      ))}


      {services.map((service, index) => (
       <div>
         <RevealText key={index} index={index} text={service} startAnimation={index <= currentSentenceIndex} />
        
       </div>

      ))}
      
    </div>
  );
};
export default HeadingText;