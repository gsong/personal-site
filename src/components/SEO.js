import Helmet from "react-helmet";
import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const SEO = ({ description, lang = "en", meta = [], keywords = [], title }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(query);
  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: siteMetadata.twitter,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: "keywords",
                content: keywords.join(", "),
              }
            : [],
        )
        .concat(meta)}
    />
  );
};

const query = graphql`
  query SEOQuery {
    site {
      siteMetadata {
        title
        description
        twitter
      }
    }
  }
`;

export default SEO;
