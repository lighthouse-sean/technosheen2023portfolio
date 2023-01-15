import React from "react"
import SocialLinks from "./SocialLinks"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const HomeHero = () => {
  const { site } = useStaticQuery(graphql`
    query coverImage {
      site {
        siteMetadata {
          title
          cover
        }
      }
    }
  `)

  return (
    <section className="home-cover-area">
      <div className="container">
        <div
          className={`row home-cover-wrap${
            site.siteMetadata.cover && site.siteMetadata.cover !== ""
              ? " has-cover-image"
              : ""
          }`}
        >
          {site.siteMetadata.cover && site.siteMetadata.cover !== "" && (
            <div className="col-lg-5">
              <div className="cover-img-container">
                <div className="cover-img-wrap">
                  <StaticImage
                    src="../assets/images/cover.jpg"
                    alt={`${site.siteMetadata.title} Cover`}
                    width={400}
                    height={400}
                    style={{ position: "absolute", borderRadius: "50%" }}
                    placeholder="blurred"
                  />
                  {/* <img
                    loading="lazy"
                    srcSet=""
                    src={site.siteMetadata.cover}
                    alt={`${site.siteMetadata.title} Cover`}
                  ></img> */}

                  <div className="dot-parent dot-1">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-2">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-3">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-4">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-5">
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="col-lg-7">
            <div className="home-cover-content-wrap">
              <h1 className="heading-large">Hi 👋  I'm Sean</h1>
              <div className="intro-description">
                 I'm a fullstack engineer with <a style={{color:'#e6e6e6'}} href="https://lhchq.com/" target="_blank" rel="noreferrer">Lighthouse Creative Group</a>.
                 I specialize in AEM, Hubspot, and Wordpress development.
              </div>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
