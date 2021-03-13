import React, { useState } from 'react'
import { useTrail, a, to } from 'react-spring'

const Trail = ({ open, children, ...props }) => {
  const items = React.Children.toArray(children)
  const trailsub = useTrail(items.length, {
    config: { mass: 50, tension: 2000, friction: 500 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 'auto' : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div className="trails-main" {...props}>
      <div>
        {trailsub.map(({ x, height, ...rest }, index) => (
          <a.div
            className="trails-text"
            style={{ ...rest, transform: x.to((x) => `translate3d(0,${x}px,0)`) }}>
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    </div>
  )
}

export default Trail;