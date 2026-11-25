import React from 'react';
import NextLink from 'next/link';
import { Reveal, WordReveal, Rule, Count, GrowBar } from './Reveal';
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
  Chip,
  BugHead,
  AreaTag,
  Chart,
  BarRow,
  Track,
  Fill,
  Compare,
  CompareRow,
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

      {study.compare && study.compare.length > 0 && (
        <Block>
          <Rule />
          <BlockTitle>Before and after</BlockTitle>
          <Reveal>
            <Compare>
              {study.compare.map(row => {
                const max = Math.max(row.before, row.after);
                return (
                  <CompareRow key={row.label}>
                    <h3>{row.label}</h3>
                    <div>
                      <span>Before</span>
                      <Track>
                        <GrowBar percent={(row.before / max) * 100}>
                          <Fill tone="before" />
                        </GrowBar>
                      </Track>
                      <span>{row.beforeText}</span>
                    </div>
                    <div>
                      <span>After</span>
                      <Track>
                        <GrowBar percent={(row.after / max) * 100} delay={0.25}>
                          <Fill tone="after" />
                        </GrowBar>
                      </Track>
                      <span>{row.afterText}</span>
                    </div>
                  </CompareRow>
                );
              })}
            </Compare>
            <Text>Measured on this site in a headless browser, so real devices will differ.</Text>
          </Reveal>
        </Block>
      )}

      {study.bugs && study.bugs.length > 0 && (
        <Block>
          <Rule />
          <BlockTitle>{`Bugs found (${study.bugs.length})`}</BlockTitle>
          <Reveal>
            <Chart>
              {Object.entries(
                study.bugs.reduce((acc, bug) => {
                  const area = bug.area || 'Other';
                  acc[area] = (acc[area] || 0) + 1;
                  return acc;
                }, {})
              )
                .sort((a, b) => b[1] - a[1])
                .map(([area, count]) => (
                  <BarRow key={area}>
                    <span>{area}</span>
                    <Track>
                      <GrowBar percent={(count / study.bugs.length) * 100}>
                        <Fill tone="after" />
                      </GrowBar>
                    </Track>
                    <span>{count}</span>
                  </BarRow>
                ))}
            </Chart>
            <BugList>
              {study.bugs.map(bug => (
                <li key={bug.title}>
                  <BugHead>
                    {bug.severity && <Chip level={bug.severity}>{bug.severity}</Chip>}
                    {bug.area && <AreaTag>{bug.area}</AreaTag>}
                  </BugHead>
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
