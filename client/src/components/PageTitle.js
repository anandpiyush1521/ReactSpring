import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function PageTitle({title}) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null;
}

export default PageTitle
