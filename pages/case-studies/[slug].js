import React from 'react';
import Head from 'next/head';
import CaseStudy from '../../components/CaseStudy';
import caseStudies from '../../utils/constants/caseStudies';

const CaseStudyPage = ({ study }) => (
  <>
    <Head>
      <title>{`${study.title} - Karim Selim`}</title>
      <meta name="description" content={study.summary} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={`${study.title} - Karim Selim`} />
      <meta property="og:description" content={study.summary} />
      <meta
        property="og:url"
        content={`https://karim-selim.vercel.app/case-studies/${study.slug}`}
      />
      <meta
        property="og:image"
        content="https://karim-selim.vercel.app/imgs/hero-poster.jpg"
      />
      <link
        rel="canonical"
        href={`https://karim-selim.vercel.app/case-studies/${study.slug}`}
      />
    </Head>
    <CaseStudy study={study} />
  </>
);

export const getStaticPaths = async () => ({
  paths: caseStudies.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps = async ({ params }) => ({
  props: { study: caseStudies.find(({ slug }) => slug === params.slug) },
});

export default CaseStudyPage;
