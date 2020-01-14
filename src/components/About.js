import React from 'react';
import { Heading, Section } from "react-bulma-components"

const About = () => (
  <Section data-cy="about-content" className="content">
    <Heading className="has-text-centered">About Mum's Hub</Heading>
    <p className="has-text-justified">Mums-hub is a website that is designed as an informative blog to help pregnant woman navigate through pregnancy.</p>
    
    <p className="has-text-justified">Pregnancy is one of the most exciting as well as daunting times in a woman's life. 
        Optimising health and wellbeing during pregnancy is essential for the woman; her family’s and her 
        infant’s future and ongoing health. Unfortunately for a number of women, pregnancy can be a 
        stressful period and lead to significant physical and psychological illness.</p>

    <p className="has-text-justified">Tracey Dorling, who has a massive 20+ years of experience working as a midwife supports many women through
        this process every day. With all this experience her insight and input in the information delivered on this 
        platform is vital and useful to many women every day. </p>
  </Section>
);
export default About;