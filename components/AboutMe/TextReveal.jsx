import React, { useEffect } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap/dist/gsap';
import { H1, Container, P, Space, Text, SmallSpace } from './styles';
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

    // Animate H1 element
    const h1 = document.querySelector('.h1-title');
    const h1Words = h1.textContent.split(' ').map(word => word.trim());

    // Clear the original text and append the words as spans
    h1.innerHTML = '';
    h1Words.forEach((word, i) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      h1.appendChild(span);

      // Add a space after each word except the last one
      if (i < h1Words.length - 1) {
        h1.appendChild(document.createTextNode(' '));
      }

      // Animate each word
      gsap.to(span, {
        opacity: 1,
        y: 0,
        color: theme.text, // Apply dynamic theme-based color
        scrollTrigger: {
          trigger: h1,
          start: 'top 75%',
        },
        delay: i * 0.1, // Adds stagger effect
        duration: 1,
      });
    });

    // Cleanup on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [theme]);

  return (
    <>
      <SmallSpace />
      <div>
        <div className="img">
          <H1 className="h1-title">About me</H1>
        </div>
        <Container className="container">
          <Text className="text">
            <P>
              Front-end development is what I do so you don’t have to do it. The
              goal is simple: code it until it works, then make it look cool.
            </P>
          </Text>
        </Container>
        <Space />
      </div>
    </>
  );
};

export default TextReveal;
