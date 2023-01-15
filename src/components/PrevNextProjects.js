import React from 'react'
import NextProject from './NextProject'
import PrevProject from './PrevProject'

const PrevNextProjects = ({ prev, next }) => {
  return (
    <div className="prev-nex-wrap">
      <div className="row">
        <div className="col-md-6">
          {next &&
            <NextProject project={next} />
          }
        </div>
        <div className="col-md-6">
          {prev &&
            <PrevProject project={prev} />
          }
        </div>
      </div>
    </div>
  )
}

export default PrevNextProjects