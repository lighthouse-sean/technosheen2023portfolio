import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProjectItem from "./ProjectItem"

const ProjectLoop = ({ projects, sectionTitle }) => {
  const data = useStaticQuery(graphql`
    query ProjectPerPageQuery {
      site {
        siteMetadata {
          projectPerPage
        }
      }
    }
  `)
  const { projectPerPage } = data.site.siteMetadata

  // state to check is load more button is clicked and projects currently being added to page
  const [isLoading, setIsLoading] = useState(false)

  // state to keep track currently visible projects
  const [visibleProjects, setVisibleProjects] = useState([
    ...projects.slice(0, projectPerPage),
  ])

  // state is there more projects to load
  const [hasMore, setHasMore] = useState(projects.length > projectPerPage)

  // handle load more button click
  const handleLoadMore = () => {
    setIsLoading(true)
  }

  // add next group of projects to visible project list
  useEffect(() => {
    if (isLoading && hasMore) {
      const isMore = projects.length > visibleProjects.length
      const nextPageProjects = isMore
        ? [
            ...projects.slice(
              visibleProjects.length,
              visibleProjects.length + projectPerPage
            ),
          ]
        : []
      setVisibleProjects([...visibleProjects, ...nextPageProjects])
      setIsLoading(false)
    }
  }, [isLoading, hasMore, projects, visibleProjects, projectPerPage])

  // check is there is more projects to load after project loading
  useEffect(() => {
    const isMore = visibleProjects.length < projects.length
    setHasMore(isMore)
  }, [visibleProjects, projects])

  // get the featured image

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1 js-project-list-wrap">
          {sectionTitle && (
            <h2 className="h4 section-title">
              <span>{sectionTitle}</span>
            </h2>
          )}
          {visibleProjects.map((project, index) => (
            <ProjectItem project={project} key={index} />
          ))}
        </div>
      </div>
      {hasMore && (
        <div className="row">
          <div className="col">
            <div className="pagination-wrap text-center" id="pagination-wrap">
              <button
                className={`btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
                onClick={handleLoadMore}
              >
                <span>Show more projects</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectLoop
