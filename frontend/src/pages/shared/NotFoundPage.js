/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React from 'react';
import { Link } from 'react-router-dom';

// UI Components
import { Result, Button } from 'antd';


/* -------------------------------------------------------------------------- */
/*                               Not Found Page                               */
/* -------------------------------------------------------------------------- */
function NotFoundPage() {
  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
}

export default NotFoundPage;
