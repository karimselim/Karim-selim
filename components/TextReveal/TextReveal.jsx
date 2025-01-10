import React, { useEffect } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap/dist/gsap';
import { Container, P, Text, SmallSpace } from './styles';
import { useTheme } from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = () => {
  const theme = useTheme(); // Access the current theme (lightTheme or darkTheme)

  useEffect(() => {
    const paragraphs = document.querySelectorAll('.text p');

    // Animate paragraphs
    paragraphs.forEach(p => {
      // Split the paragraph text into words
      const words = p.textContent.split(' ').map(word => word.trim());

      // Clear the paragraph content to append processed words
      p.innerHTML = '';

      // Loop through each word
      words.forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.style.display = 'inline-block'; // Keeps the word together
        wordSpan.style.opacity = '0';
        wordSpan.style.transform = 'translateY(20px)';
        wordSpan.style.whiteSpace = 'normal';

        // Append the word span to the paragraph
        p.appendChild(wordSpan);

        // Add a space after each word except the last one
        if (i < words.length - 1) {
          p.appendChild(document.createTextNode(' '));
        }

        // Animate each word
        gsap.to(wordSpan, {
          opacity: 1,
          y: 0,
          color: theme.text, // Apply dynamic theme-based color
          scrollTrigger: {
            trigger: wordSpan,
            start: 'top 60%',
            end: 'top 25%',
            scrub: true,
          },
          delay: i * 0.05, // Adds stagger effect
        });
      });
    });
  }, [theme]);

  return (
    <>
      <SmallSpace />
      <div>
        <div className="img"></div>
        <Container className="container">
          <Text className="text">
            <P>
              Hey there! I’m Karim Selim, the guy who turns blank screens into
              experiences that click, swipe, and wow. Crafting front-end magic
              is my passion, and I’m proud to do it right from the heart of
              Silicon Valley, where innovation thrives and coffee never runs
              out. When I’m not busy bringing ideas to life with code, you’ll
              find me chasing inspiration in the latest web trends or perfecting
              designs that don’t just look good—they feel alive. My mantra? If
              it’s not sleek, smooth, and stunning, it’s not done yet. Let’s
              build the future, one pixel at a time.
            </P>
          </Text>
        </Container>
      </div>
    </>
  );
};

export default TextReveal;
