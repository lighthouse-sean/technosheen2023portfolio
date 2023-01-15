import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import { Disqus } from "gatsby-plugin-disqus"
import Layout from "../components/Layout"
import Tags from "../components/Tags"
import PrevNextProjects from "../components/PrevNextProjects"
import Seo from "../components/Seo"
import User from "../assets/svg-icons/user.svg"
import author from "./author"
import ShareLinks from "../components/ShareLinks"
import AuthorInfoCard from "../components/AuthorInfoCard"

const project = ({ data, location }) => {
  const { project, site } = data

  const disqusConfig = {
    config: {
      url: project.fields.slug,
      identifier: project.id,
      title: project.frontmatter.title,
      language: site.siteMetadata.siteLanguage,
    },
  }
  return (
    <Layout>
      <Seo
        title={project.frontmatter.title}
        description={project.frontmatter.description || project.excerpt}
        image={getSrc(project.frontmatter.seoImage)}
        author={project.frontmatter.author}
        date={project.frontmatter.date}
      />
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <article className="single-project">
                <header className="project-header">
                  <h1 className="project-title">{project.frontmatter.title}</h1>
                  <div className="project-meta flex">
                    <div className="author-list flex">
                      <Link
                        className="author-image"
                        to={`/author${project.frontmatter.author.fields.slug}`}
                        aria-label={project.frontmatter.author.name}
                      >
                        {project.frontmatter.author.profilePicture !== null ? (
                          <GatsbyImage
                            image={getImage(
                              project.frontmatter.author.profilePicture
                            )}
                            alt={author.name}
                          />
                        ) : (
                          <User />
                        )}
                      </Link>
                      <Link
                        to={`/author${project.frontmatter.author.fields.slug}`}
                        className="author-name"
                      >
                        {project.frontmatter.author.name}
                      </Link>
                      &nbsp;
                    </div>
                    <time
                      className="project-date"
                      dateTime={project.frontmatter.date}
                    >
                      {project.frontmatter.dateFormatted}
                    </time>
                    <span className="read-time">
                      {project.timeToRead} min read
                    </span>
                  </div>
                </header>
                {project.frontmatter.featuredImage && (
                  <div className="featured-image-wrap">
                    <GatsbyImage
                      image={getImage(project.frontmatter.featuredImage)}
                      alt={project.frontmatter.title}
                    />
                  </div>
                )}
                <div
                  className="project-content"
                  dangerouslySetInnerHTML={{ __html: project.html }}
                />
                <div className="project-footer">
                  <div className="tag-wrap">
                    {project.frontmatter.tags && (
                      <Tags tags={project.frontmatter.tags} />
                    )}
                  </div>
                  <ShareLinks
                    url={location.href}
                    title={project.frontmatter.title}
                  />
                  <AuthorInfoCard author={project.frontmatter.author} />
                </div>
              </article>
              <PrevNextProjects prev={data.prev} next={data.next} />
              <div className="comment-wrap">
                <div className="comment-container">
                  <Disqus config={disqusConfig} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedProjects projects={project.related} count={4} />
    </Layout>
  )
}

export default project

export const query = graphql`
  query BlogQuery($slug: String!, $prev: String, $next: String) {
    project: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        date
        dateFormatted: date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              width: 1000
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              transformOptions: { fit: COVER }
            )
          }
        }
        seoImage: featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FIXED, height: 600, width: 1200)
          }
        }
        description
        tags {
          ...TagQueryFragment
        }
        author {
          ...AuthorQueryFragment
        }
        featured
      }
      excerpt(pruneLength: 150)
      related {
        id
        timeToRead
        fields {
          slug
        }
        frontmatter {
          published
          title
          date
          dateFormatted: date(formatString: "MMMM DD, YYYY")
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 340
                placeholder: BLURRED
                formats: [AUTO, WEBP]
                transformOptions: { fit: COVER }
                aspectRatio: 1.75
              )
            }
          }
        }
      }
    }
    prev: markdownRemark(fields: { slug: { eq: $prev } }) {
      ...PrevNextProjectFragment
    }
    next: markdownRemark(fields: { slug: { eq: $next } }) {
      ...PrevNextProjectFragment
    }
    site {
      siteMetadata {
        disqusShortName
        siteLanguage
      }
    }
  }
`
