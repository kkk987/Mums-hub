import React from 'react';
import { Heading, Section } from "react-bulma-components"

const ImpDocs = () => (
  <Section className="content" data-cy="disclaim">
    <Heading className="has-text-centered">Disclaimer</Heading>
    <p className="has-text-justified">Mums-hub is a website that is designed for informative purpose only.</p>
    
    <p className="has-text-justified">The contents of this website such as texts, graphics, images and other materials contained are for informational purpose only.
        The content is not intended to be a substitute for medical advice, diagnosis or treatment. Always seek advice of a qualified 
        health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or 
        delay in seeking it because of something you have read on Mums-Hub.</p>

    <p className="has-text-justified">If you think you may have a medical emergency, call your doctor or dial 000 immediately. Mums-Hub does not recommend or endorse 
        any specific tests, physicians, products, procedures, opinions or other information that may be mentioned in the website.
        Reliance on any information mentioned in this website is solely ay your own risk. </p>

  </Section>
);
export default ImpDocs;