import React from 'react';
import NextLink from 'next/link';
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
      <Title>{study.title}</Title>
      <Summary>{study.summary}</Summary>

      <Block>
        <BlockTitle>Problem</BlockTitle>
        <Text>{study.problem}</Text>
      </Block>

      <Block>
        <BlockTitle>What I tested</BlockTitle>
        <List>
          {study.tested.map(item => (
            <li key={item}>{item}</li>
          ))}
        </List>
      </Block>

      <Block>
        <BlockTitle>Tools</BlockTitle>
        <Chips>
          {study.tools.map(tool => (
            <li key={tool}>{tool}</li>
          ))}
        </Chips>
      </Block>

      <Block>
        <BlockTitle>Result</BlockTitle>
        <div>
          <Stats>
            {study.result.map(item => (
              <Stat key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </Stat>
            ))}
          </Stats>
          {study.resultNote && <Text>{study.resultNote}</Text>}
        </div>
      </Block>

      <Block>
        <BlockTitle>Evidence</BlockTitle>
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
      </Block>
    </Page>
  );
};

export default CaseStudy;
