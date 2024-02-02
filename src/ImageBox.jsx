import React from 'react';

function ImageBox() {
  return (
    <div className="container-fluid graph-msg-row mt-5">
      <div className="row justify-content-center">
        <div className="col-11 borderBox stat">

          {/* Combined rows into a single flex container */}
          <div className="d-flex flex-wrap justify-content-center align-items-start mt-3">

            {/* Individual stats-box now has consistent external margins */}
            <div className="stats-box">
              <h5 className="fw-bold mb-0 fs-13 text-body-emphasis text-center">January 2024</h5>
              <p className="mt-2 text-center">Explore our delicious near-to-expire projects and savor the flavors of freshness!</p>
            </div>

            <div className="stats-box mt-5">
              <img style={{ width: "120px", height: "120px" }} src='https://img.freepik.com/free-photo/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger-splash-sauce_90220-1266.jpg?w=740&t=st=1706860712~exp=1706861312~hmac=20aff427148f57e06af13d29a8a4ea50c8daaf69f5337c24f9d439fbf909aec4' alt="Delicious Burger" />
            </div>

            <div className="stats-box">
              <h5 className="fw-bold mb-0 fs-13 text-body-emphasis text-center">March 2024</h5>
              <p className="mt-2 text-center">Indulge in our delightful near-to-expire projects and experience a burst of flavors!</p>
            </div>

            <div className="stats-box mt-5">
              <img style={{ width: "120px", height: "120px", objectFit: "cover" }} src='https://img.freepik.com/free-photo/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger-splash-sauce_90220-1266.jpg?w=740&t=st=1706860712~exp=1706861312~hmac=20aff427148f57e06af13d29a8a4ea50c8daaf69f5337c24f9d439fbf909aec4' alt="Delicious Burger" />
            </div>

            {/* Assuming there's a break between the rows */}
            <div className="w-100"></div>

            <div className="stats-box">
              <img style={{ width: "120px", height: "120px", objectFit: "cover" }} src='https://img.freepik.com/free-photo/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger-splash-sauce_90220-1266.jpg?w=740&t=st=1706860712~exp=1706861312~hmac=20aff427148f57e06af13d29a8a4ea50c8daaf69f5337c24f9d439fbf909aec4' alt="Delicious Burger" />
            </div>

            <div className="stats-box">
              <h5 className="mt-4 fw-bold mb-0 fs-13 text-body-emphasis text-center">January 2024</h5>
              <p className="mt-2 text-center">Satisfy your cravings with our near-to-expire projects - a feast for your taste buds!</p>
            </div>

            <div className="stats-box">
              <img style={{ width: "120px", height: "120px", objectFit: "cover" }} src='https://img.freepik.com/free-photo/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger-splash-sauce_90220-1266.jpg?w=740&t=st=1706860712~exp=1706861312~hmac=20aff427148f57e06af13d29a8a4ea50c8daaf69f5337c24f9d439fbf909aec4' alt="Delicious Burger" />
            </div>

            <div className="stats-box">
              <h5 className="mt-4 fw-bold mb-0 fs-13 text-body-emphasis text-center">January 2023</h5>
              <p className="mt-2 text-center">Embark on a culinary journey with our near-to-expire projects - a blend of innovation and taste!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageBox;
