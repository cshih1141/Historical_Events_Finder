import React from 'react';

const Event = ({histEvent}) => (
  <div className="events">
    <div>
      {histEvent.date}
    </div>
    <div>
      {histEvent.description}
    </div>
  </div>
);

export default Event;