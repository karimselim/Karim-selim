import React from 'react';
import CaseStudy from '../../components/CaseStudy';
import caseStudies from '../../utils/constants/caseStudies';

const CaseStudyPage = ({ study }) => (
  <>
    <CaseStudy study={study} />
  </>
);

export const getStaticPaths = async () => ({
  paths: caseStudies.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps = async ({ params }) => ({
  props: {
    study: caseStudies.find(({ slug }) => slug === params.slug),
    seo: (study => ({
      title: `${study.title} - Karim Selim`,
      description: study.summary,
      url: `https://karim-selim.vercel.app/case-studies/${study.slug}`,
    }))(caseStudies.find(({ slug }) => slug === params.slug)),
  },
});

export default CaseStudyPage;
