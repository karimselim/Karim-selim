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
      // Split the paragraph text into sentences by finding periods
      const sentences = p.textContent
        .split('.')
        .map(sentence => sentence.trim());

      // Clear the paragraph content to append processed sentences
      p.innerHTML = '';

      // Loop through each sentence
      sentences.forEach(sentence => {
        // Create a container for each sentence to apply padding or margin
        const sentenceContainer = document.createElement('div');

        // Split each sentence into words
        const words = sentence.split(' ').map((word, i, arr) => {
          const wordSpan = document.createElement('span');
          wordSpan.textContent = word;
          wordSpan.style.display = 'inline-block'; // Keeps the word together
          wordSpan.style.opacity = '0';
          wordSpan.style.transform = 'translateY(20px)';
          wordSpan.style.whiteSpace = 'normal';

          return wordSpan;
        });

        // Append the words for the current sentence to the sentence container
        words.forEach((word, i) => {
          sentenceContainer.appendChild(word);
          // After each word (except the last one), add a single space
          if (i < words.length - 1) {
            sentenceContainer.appendChild(document.createTextNode(' ')); // Single space between words
          }
        });

        // Add the period (now treated like any other character)
        const periodSpan = document.createElement('span');
        periodSpan.textContent = '.'; // Period is treated as a normal character
        sentenceContainer.appendChild(periodSpan);

        // Append the sentence container to the paragraph
        p.appendChild(sentenceContainer);

        // Use the text color from the current theme
        const themeColor = theme.text;

        // Animate each word individually based on its position
        words.forEach((word, i) => {
          gsap.to(word, {
            opacity: 1,
            y: 0,
            color: themeColor, // Apply dynamic theme-based color
            scrollTrigger: {
              trigger: word,
              start: 'top 60%',
              end: 'top 25%',
              scrub: true,
            },
            delay: i * 0.05, // Adds stagger effect
          });

          // Animate each letter within the word
          const letters = word.textContent.split('').map(letter => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent =
              letter === ' ' || letter === '\u00A0' ? '' : letter; // Remove spaces or non-breaking spaces
            letterSpan.style.display = 'inline-block';
            return letterSpan;
          });

          word.innerHTML = ''; // Clear the word and append the letters
          letters.forEach(letter => word.appendChild(letter));

          letters.forEach((letter, i) => {
            gsap.to(letter, {
              opacity: 1,
              y: 0,
              color: themeColor, // Apply dynamic theme-based color
              scrollTrigger: {
                trigger: letter,
                start: 'top 60%',
                end: 'top 25%',
                scrub: true,
              },
              delay: i * 0.05, // Adds stagger effect to each letter
            });
          });
        });
      });
    });

    // Animate H1 element
    const h1 = document.querySelector('.h1-title');
    const h1Letters = h1.textContent.split('').map(letter => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' || letter === '\u00A0' ? '' : letter; // Remove spaces or non-breaking spaces
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      return span;
    });

    // Clear the original text and append the letters as spans
    h1.innerHTML = '';
    h1Letters.forEach(span => h1.appendChild(span));

    // Use the text color from the current theme
    const themeColor = theme.text;

    // Animate each letter individually based on its position
    h1Letters.forEach((span, i) => {
      gsap.to(span, {
        opacity: 1,
        y: 0,
        color: themeColor, // Apply dynamic theme-based color
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
  /** */

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
