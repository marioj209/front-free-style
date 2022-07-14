import React from 'react'
import LeftPanel from './LeftPanel'
import General from './General'
function Admin() {
  return (
    <div className="flex">
      <div className="flex-none bg-blue-500">
        <LeftPanel />
      </div>
      <div className="bg-gray-300 grow">
        <General />
      </div>
    </div>
  );
}

export default Admin