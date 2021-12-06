// import css
import "./css/PageNotFound.css";

function PageNotFound() {
  return (
    <div className="pageNotFound">
      <div className="pageNotFound-container">
        <body className="pageNotFound-body">
          <p className="pageNotFound-title">Page Not Found</p>
          <p className="pageNotFound-text">
            Sorry, the requested page was not found.
          </p>
        </body>
      </div>
    </div>
  );
}

export default PageNotFound;
