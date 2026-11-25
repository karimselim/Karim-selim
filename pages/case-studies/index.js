import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Reveal, WordReveal } from '../../components/CaseStudy/Reveal';
import useCursorStyle from '../../hooks/useCursorStyle';
import caseStudies from '../../utils/constants/caseStudies';
import devProjects from '../../utils/constants/devProjects';
import {
  Page,
  Back,
  Kind,
  Title,
  Summary,
  Chips,
  Links,
} from '../../components/CaseStudy/styles';
import { Cards, Card, CardTitle, CardLine, Tag } from '../../components/CaseStudy/cards';

const Projects = () => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const hover = {
    onMouseEnter: addCursorBorder,
    onMouseLeave: removeCursorBorder,
  };

  return (
    <>
      <Head>
        <title>Projects - Karim Selim</title>
        <meta
          name="description"
          content="QA case studies and frontend projects by Karim Selim."
        />
        <meta property="og:title" content="Projects - Karim Selim" />
        <meta
          property="og:description"
          content="QA case studies and frontend projects by Karim Selim."
        />
        <meta
          property="og:url"
          content="https://karim-selim.vercel.app/case-studies"
        />
        <meta
          property="og:image"
          content="https://karim-selim.vercel.app/imgs/hero-poster.jpg"
        />
        <link
          rel="canonical"
          href="https://karim-selim.vercel.app/case-studies"
        />
      </Head>
      <Page>
        <NextLink href="/" passHref>
          <Back {...hover}>Back to the site</Back>
        </NextLink>
        <Title>
          <WordReveal text="Projects" />
        </Title>
        <Reveal delay={0.5}>
          <Summary>QA work first, then the frontend projects I built.</Summary>
        </Reveal>

        <Kind style={{ marginTop: '3.5rem' }}>QA case studies</Kind>
        <Cards>
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.12}>
            <Card>
              <Tag>QA</Tag>
              <CardTitle>{study.title}</CardTitle>
              <CardLine>{study.summary}</CardLine>
              <Links>
                <li>
                  <NextLink href={`/case-studies/${study.slug}`} passHref>
                    <a {...hover}>Read the case study</a>
                  </NextLink>
                </li>
              </Links>
            </Card>
            </Reveal>
          ))}
        </Cards>

        <Kind style={{ marginTop: '3.5rem' }}>Frontend projects</Kind>
        <Cards>
          {devProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.12}>
            <Card>
              <Tag>Frontend</Tag>
              <CardTitle>{project.title}</CardTitle>
              <CardLine>{project.line}</CardLine>
              <Chips>
                {project.stack.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </Chips>
              <Links>
                <li>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...hover}
                  >
                    Live site
                  </a>
                </li>
                <li>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...hover}
                  >
                    Code
                  </a>
                </li>
              </Links>
            </Card>
            </Reveal>
          ))}
        </Cards>
      </Page>
    </>
  );
};

export default Projects;
