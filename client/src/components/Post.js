import React from "react";
export default function Post() {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://blog.wego.com/wp-content/uploads/shutterstock_2289237897.jpg"
          alt=""
        />
      </div>

      <div className="texts">
        <h2>
          Holidays Germany: A Friendly Itinerary Through the Land of Innovators
          and Visionaries
        </h2>
        <p className="info">
          <span className="author">Nemer Jawid</span>
          <time>2024-05-29 15:45</time>
        </p>
        <p className="summary">
          As the day fades into the evening, enjoy a leisurely stroll along the
          tranquil banks of the Spree River, soaking in the peaceful ambiance
          and picturesque scenery.{" "}
        </p>
      </div>
    </div>
  );
}
