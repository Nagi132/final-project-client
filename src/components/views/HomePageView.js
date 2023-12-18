/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1>Home Page</h1>
      <img 
      src={"https://static.wixstatic.com/media/39d1a3_320669541e8640e99ca1faccd8e168ca~mv2.png/v1/fill/w_640,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/39d1a3_320669541e8640e99ca1faccd8e168ca~mv2.png"} 
      height="75%"
      width="45%"
      />
    </div>
  );    
}

export default HomePageView;