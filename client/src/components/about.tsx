import 'bootstrap/dist/css/bootstrap.min.css';// Import Bootstrap styles for responsive design

// About Page Component
const AboutPage = () => {
  return (
    <div>
      <br />
      <h1>
        Welcome to My Cookbook
      </h1>
      <br />
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <img
              src="https://www.svgrepo.com/show/486929/about.svg"
              width="25%"
              alt="About"
              className="d-inline-block align-text-top img-fluid"
            />
          </div>
          <div className="col">
            My Cookbook v0.1
            <br />
            developed by
            <br />
            @Abd Rahman AlKhatib
            <br />
            @Afaf Konkabess
            <br />
            @Muhab Jabraouti
            <br />
            @Rawan Al Sheikh Ali
            <br />
            Icons from <a href="https://www.svgrepo.com/">svgrepo</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;// Export AboutPage component for use in the app
