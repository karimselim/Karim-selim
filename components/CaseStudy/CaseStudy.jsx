import React from 'react';
import NextLink from 'next/link';
import { Reveal, WordReveal, Rule, Count } from './Reveal';
import useCursorStyle from '../../hooks/useCursorStyle';
import {
  Page,
  Back,
  Kind,
  Title,
  Summary,
  Block,
  BlockTitle,
  Text,
  List,
  Chips,
  Stats,
  Stat,
  Links,
  BugList,
} from './styles';

const CaseStudy = ({ study }) => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const hover = {
    onMouseEnter: addCursorBorder,
    onMouseLeave: removeCursorBorder,
  };

  return (
    <Page>
      <NextLink href="/case-studies" passHref>
        <Back {...hover}>All projects</Back>
      </NextLink>
      <Kind>{study.kind}</Kind>
      <Title>
        <WordReveal text={study.title} />
      </Title>
      <Reveal delay={0.6}>
        <Summary>{study.summary}</Summary>
      </Reveal>

      <Block>
        <Rule />
        <BlockTitle>Problem</BlockTitle>
        <Reveal>
          <Text>{study.problem}</Text>
        </Reveal>
      </Block>

      <Block>
        <Rule />
        <BlockTitle>What I tested</BlockTitle>
        <Reveal>
        <List>
          {study.tested.map(item => (
            <li key={item}>{item}</li>
          ))}
        </List>
        </Reveal>
      </Block>

      <Block>
        <Rule />
        <BlockTitle>Tools</BlockTitle>
        <Reveal>
        <Chips>
          {study.tools.map(tool => (
            <li key={tool}>{tool}</li>
          ))}
        </Chips>
        </Reveal>
      </Block>

      <Block>
        <Rule />
        <BlockTitle>Result</BlockTitle>
        <Reveal>
          <Stats>
            {study.result.map(item => (
              <Stat key={item.label}>
                <Count value={item.value} />
                <span>{item.label}</span>
              </Stat>
            ))}
          </Stats>
          {study.resultNote && <Text>{study.resultNote}</Text>}
        </Reveal>
      </Block>

      {study.bugs && study.bugs.length > 0 && (
        <Block>
          <Rule />
          <BlockTitle>{`Bugs found (${study.bugs.length})`}</BlockTitle>
          <Reveal>
            <BugList>
              {study.bugs.map(bug => (
                <li key={bug.title}>
                  <strong>{bug.title}</strong>
                  {bug.detail && <span>{bug.detail}</span>}
                </li>
              ))}
            </BugList>
          </Reveal>
        </Block>
      )}

      <Block>
        <Rule />
        <BlockTitle>Evidence</BlockTitle>
        <Reveal>
        <Links>
          {study.evidence.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                {...hover}
              >
                {link.label}
              </a>
            </li>
          ))}
        </Links>
        </Reveal>
      </Block>
    </Page>
  );
};

export default CaseStudy;
