import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
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
import { Cards, Card, CardTitle, CardLine } from '../../components/CaseStudy/cards';

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
        <link
          rel="canonical"
          href="https://karim-selim.vercel.app/case-studies"
        />
      </Head>
      <Page>
        <NextLink href="/" passHref>
          <Back {...hover}>Back to the site</Back>
        </NextLink>
        <Title>Projects</Title>
        <Summary>QA work first, then the frontend projects I built.</Summary>

        <Kind style={{ marginTop: '3.5rem' }}>QA case studies</Kind>
        <Cards>
          {caseStudies.map(study => (
            <Card key={study.slug}>
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
          ))}
        </Cards>

        <Kind style={{ marginTop: '3.5rem' }}>Frontend projects</Kind>
        <Cards>
          {devProjects.map(project => (
            <Card key={project.id}>
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
          ))}
        </Cards>
      </Page>
    </>
  );
};

export default Projects;
