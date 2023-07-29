// import React from "react";
// const Home = (props) => {
//   return (
//     <div className="container">
//       <div className="row divPadding">
//         <div className="col-md-6">
//           <div className="card shodow">
//             <div className="card-body"></div>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <img
//             src="https://t3.ftcdn.net/jpg/05/53/37/84/240_F_553378481_GN2s3TjPC3RvoQzMlZ0BBAGAZLX0VQA1.jpg"
//             alt="Electric"
//             className="img"
//           ></img>
//           <header>
//             <h1>Welcome to our Electric Vehicle Charging Station</h1>
//           </header>
//           <section>
//             <h2>About Us</h2>
//             <p>
//               Here at our charging station, we offer a wide range of charging
//               options for electric vehicles from various manufacturers. Our
//               stations are strategically located for your convenience.
//             </p>
//           </section>
//           <section>
//             <h2>Available Charging Options</h2>
//             <ul>
//               <li>
//                 <strong>Fast Charging</strong>
//                 <span>- High-speed charging suitable for quick top-ups.</span>
//               </li>
//               <li>
//                 <strong>Standard Charging</strong>
//                 <span>- Normal charging for overnight or extended stays.</span>
//               </li>
//               <li>
//                 <strong>Slow Charging</strong>
//                 <span>- Low-power charging ideal for longer stays.</span>
//               </li>
//             </ul>
//           </section>
//           <section>
//             <h2>Our Partners</h2>
//             <p>
//               We are proud to collaborate with renowned car manufacturers such
//               as Tata, MG, Mahindra, and Kia. You can find their electric
//               vehicle models at our stations.
//             </p>
//           </section>
//           <section>
//             <h2>How to Book</h2>
//             <p>
//               To make a booking, you need to sign up or log in to your account.
//               We offer different roles like admin, staff, and customer, each
//               with specific privileges.
//             </p>
//             <p>
//               Once logged in, you can choose a station, select a charging
//               option, specify the start and end date/time, and make your
//               payment. The booking will be confirmed upon successful payment.
//             </p>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Home;

import React from "react";

const Home = (props) => {
  return (
    <div className="container">
      <div className="row divPadding">
        <div className="col-md-6">
          <header>
            <h3 className="display-6 text-primary mb-6">Welcome to our Electric Vehicle Charging Station Tracker</h3>
          </header>
          <section>
            <h2 className="h4">About Us</h2>
            <p className="lead">
              Here at our charging station, we offer a wide range of charging
              options for electric vehicles from various manufacturers. Our
              stations are strategically located for your convenience.
            </p>
          </section>
          <section>
            <h2 className="h4">How to Book</h2>
            <p className="lead">
              To make a booking, you need to sign up or log in to your account.
              We offer different roles with specific privileges.
            </p>
            <p className="lead">
            Once logged in, you can choose a station, select a charging
              option, and specify the start and end date/time for your charging session.
              The booking will be confirmed, and you can start charging your vehicle
              at the selected station.
            </p>
          </section>
        </div>
        <div className="col-md-6">
          <img
            // src="https://t4.ftcdn.net/jpg/04/96/72/57/240_F_496725738_rLoyzy9qGeTUkqCVn5D7pW7ZA5ONiyiC.jpg"
            src="https://as1.ftcdn.net/v2/jpg/05/08/40/78/1000_F_508407822_XLb7LGJpPsXlLpCKg62DdsArQnd5EKvD.jpg"
            // src="https://t3.ftcdn.net/jpg/05/77/10/62/240_F_577106282_3B7CPA57xiU58xKv1H6OljGvOXfONHAu.jpg"
            alt="Electric"
            className="img-fluid rounded shadow"
            style={{ width: "100%", height: "auto", maxWidth: "600px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home